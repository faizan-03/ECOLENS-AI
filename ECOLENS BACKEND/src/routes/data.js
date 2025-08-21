const express = require('express');
const { getGlobalCO2Data, getCountryCO2Data } = require('../controllers/dataController');
const { countryValidation } = require('../utils/validation');

const router = express.Router();

// @route   GET /api/data/co2/global
router.get('/co2/global', getGlobalCO2Data);

// @route   GET /api/data/co2/country/:countryCode
router.get('/co2/country/:countryCode', countryValidation.countryCode, getCountryCO2Data);

module.exports = router;