const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');

describe('API Integration Tests', () => {
  beforeAll(async () => {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('OK');
    });
  });

  describe('CO2 Data API', () => {
    it('should return global CO2 data', async () => {
      const response = await request(app).get('/api/data/co2/global');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('year');
      expect(response.body.data).toHaveProperty('emissions');
    });

    it('should return country CO2 data', async () => {
      const response = await request(app).get('/api/data/co2/country/PK');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.country).toBe('Pakistan');
    });
  });

  describe('Simulation API', () => {
    it('should run simulation', async () => {
      const response = await request(app)
        .post('/api/simulation/run')
        .send({ country: 'Pakistan', yearsAhead: 10 });
      
      expect(response.status).toBe(200);
      expect(response.body.country).toBe('Pakistan');
      expect(response.body.predictedEmissions).toBeDefined();
    });

    it('should get scenarios', async () => {
      const response = await request(app).get('/api/simulation/scenarios');
      
      expect(response.status).toBe(200);
      expect(response.body.scenarios).toBeDefined();
      expect(Array.isArray(response.body.scenarios)).toBe(true);
    });
  });

  describe('Narrative API', () => {
    it('should generate narrative', async () => {
      const response = await request(app)
        .post('/api/narrative/generate')
        .send({ data: {}, scenario: 'current_path' });
      
      expect(response.status).toBe(200);
      expect(response.body.narrative).toBeDefined();
    });
  });

  describe('Visualization API', () => {
    it('should get timeline data', async () => {
      const response = await request(app).get('/api/visualization/timeline/PK');
      
      expect(response.status).toBe(200);
      expect(response.body.country).toBeDefined();
      expect(response.body.timeline).toBeDefined();
    });
  });
});