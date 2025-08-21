const CO2Data = require('../models/CO2Data');

const seedCO2Data = async () => {
  try {
    await CO2Data.deleteMany({});

    const sampleData = [
      { country: 'Global', countryCode: 'GLOBAL', year: 2000, emissions: 280, source: 'OWID', dataType: 'historical' },
      { country: 'Global', countryCode: 'GLOBAL', year: 2005, emissions: 310, source: 'OWID', dataType: 'historical' },
      { country: 'Global', countryCode: 'GLOBAL', year: 2010, emissions: 340, source: 'OWID', dataType: 'historical' },
      { country: 'Global', countryCode: 'GLOBAL', year: 2015, emissions: 400, source: 'OWID', dataType: 'historical' },
      { country: 'Global', countryCode: 'GLOBAL', year: 2020, emissions: 420, source: 'OWID', dataType: 'historical' },

      { country: 'Pakistan', countryCode: 'PK', year: 2000, emissions: 100, source: 'OWID', dataType: 'historical' },
      { country: 'Pakistan', countryCode: 'PK', year: 2005, emissions: 120, source: 'OWID', dataType: 'historical' },
      { country: 'Pakistan', countryCode: 'PK', year: 2010, emissions: 180, source: 'OWID', dataType: 'historical' },
      { country: 'Pakistan', countryCode: 'PK', year: 2020, emissions: 250, source: 'OWID', dataType: 'historical' },

      { country: 'United States', countryCode: 'US', year: 2000, emissions: 6000, source: 'OWID', dataType: 'historical' },
      { country: 'United States', countryCode: 'US', year: 2010, emissions: 5800, source: 'OWID', dataType: 'historical' },
      { country: 'United States', countryCode: 'US', year: 2020, emissions: 5400, source: 'OWID', dataType: 'historical' },

      { country: 'India', countryCode: 'IN', year: 2000, emissions: 1000, source: 'OWID', dataType: 'historical' },
      { country: 'India', countryCode: 'IN', year: 2010, emissions: 1800, source: 'OWID', dataType: 'historical' },
      { country: 'India', countryCode: 'IN', year: 2020, emissions: 2500, source: 'OWID', dataType: 'historical' }
    ];

    await CO2Data.insertMany(sampleData);
    console.log('✅ Sample CO2 data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding CO2 data:', error);
  }
};

module.exports = { seedCO2Data };