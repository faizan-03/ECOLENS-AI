const generateNarrative = async (req, res, next) => {
  try {
    const { data, scenario } = req.body;

    const mockNarrative = {
      narrative: "Based on your current lifestyle choices, by 2030 your carbon footprint could contribute to a 0.2°C temperature increase. However, by implementing the suggested changes, you could reduce your impact by 60% and help limit global warming.",
      keyPoints: [
        "Transportation accounts for 45% of your carbon footprint",
        "Switching to renewable energy could save 2.3 tons CO2/year",
        "Reducing consumption could save 1.8 tons CO2/year"
      ],
      recommendations: [
        "Consider electric or hybrid vehicle",
        "Install solar panels",
        "Reduce single-use items"
      ]
    };

    res.status(200).json(mockNarrative);
  } catch (error) {
    next(error);
  }
};

const getTemplates = async (req, res, next) => {
  try {
    const templates = [
      {
        id: 'personal_impact',
        name: 'Personal Impact',
        description: 'Focus on individual carbon footprint'
      },
      {
        id: 'global_perspective',
        name: 'Global Perspective', 
        description: 'Broader environmental impact'
      }
    ];

    res.status(200).json({ templates });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateNarrative,
  getTemplates
};