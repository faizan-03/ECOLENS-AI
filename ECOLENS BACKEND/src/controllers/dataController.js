const dataService = require('../services/dataService');

// @desc    Get global CO2 emission trends
// @route   GET /api/data/co2/global
// @access  Public
const getGlobalCO2Data = async (req, res, next) => {
  try {
    const data = await dataService.getGlobalCO2Data();
    
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get country-specific CO2 data
// @route   GET /api/data/co2/country/:countryCode
// @access  Public
const getCountryCO2Data = async (req, res, next) => {
  try {
    const { countryCode } = req.params;

    // Validate country code format
    if (!dataService.validateCountryCode(countryCode)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid country code format. Must be 2-3 letters.'
        }
      });
    }

    const data = await dataService.getCountryCO2Data(countryCode);
    
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    // Handle specific error for country not found
    if (error.message.includes('No data found for country code')) {
      return res.status(404).json({
        success: false,
        error: {
          message: `No CO2 data available for country code: ${req.params.countryCode}`
        }
      });
    }
    
    next(error);
  }
};

module.exports = {
  getGlobalCO2Data,
  getCountryCO2Data
};