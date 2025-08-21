const dataService = require('../services/dataService');

const getTimelineData = async (req, res, next) => {
  try {
    const { countryCode } = req.params;

    if (!dataService.validateCountryCode(countryCode)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid country code format'
        }
      });
    }

    const data = await dataService.getTimelineData(countryCode);
    
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTimelineData
};