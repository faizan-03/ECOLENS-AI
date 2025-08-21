const express = require('express');
const { getTimelineData } = require('../controllers/visualizationController');

const router = express.Router();

router.get('/timeline/:countryCode', getTimelineData);

module.exports = router;