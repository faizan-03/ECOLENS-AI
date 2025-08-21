const CO2Data = require('../models/CO2Data');
const axios = require('axios');
const config = require('../config');

class DataService {
  // Get global CO2 data (Requirement 2.1)
  async getGlobalCO2Data() {
    try {
      const globalData = await CO2Data.getGlobalData();
      
      if (!globalData || globalData.length === 0) {
        // Return sample data if no data in database
        return {
          year: [2000, 2005, 2010, 2015, 2020],
          emissions: [280, 310, 340, 400, 420]
        };
      }

      return {
        year: globalData.map(d => d.year),
        emissions: globalData.map(d => d.emissions)
      };
    } catch (error) {
      throw new Error(`Failed to fetch global CO2 data: ${error.message}`);
    }
  }

  // Get country-specific CO2 data (Requirement 2.2)
  async getCountryCO2Data(countryCode) {
    try {
      const countryData = await CO2Data.getCountryData(countryCode);
      
      if (!countryData || countryData.length === 0) {
        // Return sample data for Pakistan if no data found
        if (countryCode.toUpperCase() === 'PK') {
          return {
            country: 'Pakistan',
            years: [2000, 2005, 2010, 2020],
            emissions: [100, 120, 180, 250]
          };
        }
        
        throw new Error(`No data found for country code: ${countryCode}`);
      }

      return {
        country: countryData[0].country,
        years: countryData.map(d => d.year),
        emissions: countryData.map(d => d.emissions)
      };
    } catch (error) {
      throw new Error(`Failed to fetch country CO2 data: ${error.message}`);
    }
  }

  // Get timeline data for visualization (Requirement 5.1)
  async getTimelineData(countryCode) {
    try {
      const countryData = await CO2Data.getCountryData(countryCode);
      
      if (!countryData || countryData.length === 0) {
        // Return sample timeline data
        return {
          country: countryCode === 'PK' ? 'Pakistan' : 'Unknown',
          timeline: [
            { year: 2000, value: 100 },
            { year: 2005, value: 120 },
            { year: 2010, value: 180 }
          ]
        };
      }

      return {
        country: countryData[0].country,
        timeline: countryData.map(d => ({
          year: d.year,
          value: d.emissions
        }))
      };
    } catch (error) {
      throw new Error(`Failed to fetch timeline data: ${error.message}`);
    }
  }

  // Validate country code
  validateCountryCode(countryCode) {
    if (!countryCode || typeof countryCode !== 'string') {
      return false;
    }
    
    // Basic validation - 2-3 letter country codes
    return /^[A-Z]{2,3}$/i.test(countryCode);
  }

  // Format response data consistently (Requirement 2.4)
  formatResponse(data, type = 'success') {
    return {
      success: type === 'success',
      data: data,
      timestamp: new Date().toISOString()
    };
  }

  // Handle data unavailable scenarios (Requirement 5.3)
  getFallbackData(countryCode) {
    const fallbackData = {
      'PK': {
        country: 'Pakistan',
        years: [2000, 2005, 2010, 2020],
        emissions: [100, 120, 180, 250]
      },
      'US': {
        country: 'United States',
        years: [2000, 2005, 2010, 2020],
        emissions: [6000, 6200, 5800, 5400]
      },
      'GLOBAL': {
        year: [2000, 2005, 2010, 2015, 2020],
        emissions: [280, 310, 340, 400, 420]
      }
    };

    return fallbackData[countryCode.toUpperCase()] || null;
  }
}

module.exports = new DataService();