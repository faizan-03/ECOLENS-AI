const CVAnalysis = require('../models/CVAnalysis');

const analyzeImage = async (req, res, next) => {
  try {
    const mockAnalysis = {
      detectedObjects: ['car', 'smokestack'],
      estimatedImpact: 'High',
      confidence: 0.92
    };

    const analysis = new CVAnalysis({
      imageUrl: req.file ? req.file.path : req.body.imageUrl,
      detectedObjects: mockAnalysis.detectedObjects,
      estimatedImpact: mockAnalysis.estimatedImpact,
      confidence: mockAnalysis.confidence,
      processingTime: 1500
    });

    await analysis.save();

    res.status(200).json(mockAnalysis);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeImage
};