const express = require('express');
const { runSimulation, getScenarios } = require('../controllers/simulationController');

const router = express.Router();

router.post('/run', runSimulation);
router.get('/scenarios', getScenarios);

module.exports = router;