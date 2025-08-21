const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const CO2Data = require('../../src/models/CO2Data');

describe('Data API Integration Tests', () => {
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
    await CO2Data.deleteMany({});
  });

  describe('GET /api/data/co2/global', () => {
    it('should return global CO2 data', async () => {
      const response = await request(app)
        .get('/api/data/co2/global');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('year');
      expect(response.body.data).toHaveProperty('emissions');
      expect(Array.isArray(response.body.data.year)).toBe(true);
      expect(Array.isArray(response.body.data.emissions)).toBe(true);
    });

    it('should return fallback data when no database data', async () => {
      const response = await request(app)
        .get('/api/data/co2/global');

      expect(response.status).toBe(200);
      expect(response.body.data.year).toEqual([2000, 2005, 2010, 2015, 2020]);
      expect(response.body.data.emissions).toEqual([280, 310, 340, 400, 420]);
    });
  });

  describe('GET /api/data/co2/country/:countryCode', () => {
    it('should return country data for Pakistan', async () => {
      const response = await request(app)
        .get('/api/data/co2/country/PK');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.country).toBe('Pakistan');
      expect(response.body.data).toHaveProperty('years');
      expect(response.body.data).toHaveProperty('emissions');
    });

    it('should return 400 for invalid country code', async () => {
      const response = await request(app)
        .get('/api/data/co2/country/INVALID');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Invalid country code format');
    });

    it('should return 404 for unknown country', async () => {
      const response = await request(app)
        .get('/api/data/co2/country/XX');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('No CO2 data available');
    });

    it('should work with database data', async () => {
      // Insert test data
      await CO2Data.insertMany([
        { country: 'Pakistan', countryCode: 'PK', year: 2000, emissions: 100, source: 'OWID', dataType: 'historical' },
        { country: 'Pakistan', countryCode: 'PK', year: 2010, emissions: 150, source: 'OWID', dataType: 'historical' }
      ]);

      const response = await request(app)
        .get('/api/data/co2/country/PK');

      expect(response.status).toBe(200);
      expect(response.body.data.country).toBe('Pakistan');
      expect(response.body.data.years).toEqual([2000, 2010]);
      expect(response.body.data.emissions).toEqual([100, 150]);
    });
  });
});