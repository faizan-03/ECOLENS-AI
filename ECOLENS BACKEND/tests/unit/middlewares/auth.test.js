const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { protect, authorize, optionalAuth } = require('../../../src/middlewares/auth');
const User = require('../../../src/models/User');

// Mock config
jest.mock('../../../src/config', () => ({
  JWT_SECRET: 'test-secret',
  JWT_EXPIRE: '7d'
}));

const app = express();
app.use(express.json());

// Test routes
app.get('/protected', protect, (req, res) => {
  res.json({ success: true, user: req.user.email });
});

app.get('/admin-only', protect, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'Admin access granted' });
});

app.get('/optional', optionalAuth, (req, res) => {
  res.json({ success: true, authenticated: !!req.user });
});

describe('Auth Middleware', () => {
  let user;
  let adminUser;
  let userToken;
  let adminToken;

  beforeAll(async () => {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});

    // Create test users
    user = new User({
      name: 'Test User',
      email: 'user@test.com',
      password: 'password123',
      role: 'user'
    });
    await user.save();

    adminUser = new User({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });
    await adminUser.save();

    // Generate tokens
    userToken = user.getSignedJwtToken();
    adminToken = adminUser.getSignedJwtToken();
  });

  describe('protect middleware', () => {
    it('should allow access with valid token', async () => {
      const response = await request(app)
        .get('/protected')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toBe('user@test.com');
    });

    it('should deny access without token', async () => {
      const response = await request(app)
        .get('/protected');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('should deny access with invalid token', async () => {
      const response = await request(app)
        .get('/protected')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('authorize middleware', () => {
    it('should allow admin access to admin route', async () => {
      const response = await request(app)
        .get('/admin-only')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should deny user access to admin route', async () => {
      const response = await request(app)
        .get('/admin-only')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });
  });

  describe('optionalAuth middleware', () => {
    it('should work with valid token', async () => {
      const response = await request(app)
        .get('/optional')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.authenticated).toBe(true);
    });

    it('should work without token', async () => {
      const response = await request(app)
        .get('/optional');

      expect(response.status).toBe(200);
      expect(response.body.authenticated).toBe(false);
    });
  });
});