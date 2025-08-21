const { generateToken, verifyToken, decodeToken, isTokenExpired } = require('../../../src/utils/jwt');

// Mock config
jest.mock('../../../src/config', () => ({
  JWT_SECRET: 'test-secret',
  JWT_EXPIRE: '7d'
}));

describe('JWT Utils', () => {
  const testPayload = {
    id: '507f1f77bcf86cd799439011',
    email: 'test@example.com',
    role: 'user'
  };

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(testPayload);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = generateToken(testPayload);
      const decoded = verifyToken(token);
      
      expect(decoded.id).toBe(testPayload.id);
      expect(decoded.email).toBe(testPayload.email);
      expect(decoded.role).toBe(testPayload.role);
    });

    it('should throw error for invalid token', () => {
      expect(() => {
        verifyToken('invalid-token');
      }).toThrow();
    });
  });

  describe('decodeToken', () => {
    it('should decode token without verification', () => {
      const token = generateToken(testPayload);
      const decoded = decodeToken(token);
      
      expect(decoded.id).toBe(testPayload.id);
      expect(decoded.email).toBe(testPayload.email);
    });
  });

  describe('isTokenExpired', () => {
    it('should return false for valid token', () => {
      const token = generateToken(testPayload);
      const expired = isTokenExpired(token);
      
      expect(expired).toBe(false);
    });

    it('should return true for invalid token', () => {
      const expired = isTokenExpired('invalid-token');
      
      expect(expired).toBe(true);
    });
  });
});