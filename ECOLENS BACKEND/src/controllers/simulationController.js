const Simulation = require('../models/Simulation');

const runSimulation = async (req, res, next) => {
  try {
    const { country, yearsAhead, scenario } = req.body;

    const mockResults = {
      country: country || 'Pakistan',
      predictedEmissions: [
        { year: 2025, value: 270 },
        { year: 2030, value: 320 }
      ],
      scenario: scenario || 'current_path',
      confidence: 0.85
    };

    const simulation = new Simulation({
      inputData: req.body,
      results: mockResults
    });

    await simulation.save();

    res.status(200).json(mockResults);
  } catch (error) {
    next(error);
  }
};

const getScenarios = async (req, res, next) => {
  try {
    const scenarios = [
      {
        id: 'current_path',
        name: 'Current Path',
        description: 'Continue current lifestyle patterns'
      },
      {
        id: 'improved_path', 
        name: 'Improved Path',
        description: 'Implement suggested improvements'
      },
      {
        id: 'no_action',
        name: 'No Action',
        description: 'No changes over time'
      }
    ];

    res.status(200).json({ scenarios });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  runSimulation,
  getScenarios
};