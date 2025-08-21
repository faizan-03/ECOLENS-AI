const mongoose = require('mongoose');
const dataService = require('../../../src/services/dataService');
const CO2Data = require('../../../src/models/CO2Data');

describe('DataService', () => {
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

  describe('getGlobalCO2Data', () => {
    it('should return global CO2 data when available', async () => {
      // Insert test data
      await CO2Data.insertMany([
        { country: 'Pakistan', countryCode: 'PK', year: 2020, emissions: 200, source: 'OWID', dataType: 'historical' },
        { country: 'India', countryCode: 'IN', year: 2020, emissions: 500, source: 'OWID', dataType: 'historical' }
      ]);

      const result = await dataService.getGlobalCO2Data();

      expect(result).toHaveProperty('year');
      expect(result).toHaveProperty('emissions');
      expect(Array.isArray(result.year)).toBe(true);
      expect(Array.isArray(result.emissions)).toBe(true);
    });

    it('should return fallback data when no data available', async () => {
      const result = await dataService.getGlobalCO2Data();

      expect(result).toEqual({
        year: [2000, 2005, 2010, 2015, 2020],
        emissions: [280, 310, 340, 400, 420]
      });
    });
  });

  describe('getCountryCO2Data', () => {
    it('should return country data when available', async () => {
      await CO2Data.insertMany([
        { country: 'Pakistan', countryCode: 'PK', year: 2000, emissions: 100, source: 'OWID', dataType: 'historical' },
        { country: 'Pakistan', countryCode: 'PK', year: 2010, emissions: 150, source: 'OWID', dataType: 'historical' }
      ]);

      const result = await dataService.getCountryCO2Data('PK');

      expect(result.country).toBe('Pakistan');
      expect(result.years).toEqual([2000, 2010]);
      expect(result.emissions).toEqual([100, 150]);
    });

    it('should return fallback data for Pakistan when no data available', async () => {
      const result = await dataService.getCountryCO2Data('PK');

      expect(result.country).toBe('Pakistan');
      expect(result.years).toEqual([2000, 2005, 2010, 2020]);
      expect(result.emissions).toEqual([100, 120, 180, 250]);
    });

    it('should throw error for unknown country with no fallback', async () => {
      await expect(dataService.getCountryCO2Data('XX')).rejects.toThrow();
    });
  });

  describe('getTimelineData', () => {
    it('should return timeline data when available', async () => {
      await CO2Data.insertMany([
        { country: 'Pakistan', countryCode: 'PK', year: 2000, emissions: 100, source: 'OWID', dataType: 'historical' },
        { country: 'Pakistan', countryCode: 'PK', year: 2010, emissions: 150, source: 'OWID', dataType: 'historical' }
      ]);

      const result = await dataService.getTimelineData('PK');

      expect(result.country).toBe('Pakistan');
      expect(result.timeline).toHaveLength(2);
      expect(result.timeline[0]).toEqual({ year: 2000, value: 100 });
    });
  });

  describe('validateCountryCode', () => {
    it('should validate correct country codes', () => {
      expect(dataService.validateCountryCode('PK')).toBe(true);
      expect(dataService.validateCountryCode('USA')).toBe(true);
      expect(dataService.validateCountryCode('pk')).toBe(true);
    });

    it('should reject invalid country codes', () => {
      expect(dataService.validateCountryCode('P')).toBe(false);
      expect(dataService.validateCountryCode('PKXX')).toBe(false);
      expect(dataService.validateCountryCode('')).toBe(false);
      expect(dataService.validateCountryCode(null)).toBe(false);
    });
  });

  describe('formatResponse', () => {
    it('should format successful response', () => {
      const data = { test: 'data' };
      const result = dataService.formatResponse(data);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(data);
      expect(result.timestamp).toBeDefined();
    });
  });
});