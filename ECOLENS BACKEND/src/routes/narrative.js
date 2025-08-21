const express = require('express');
const { generateNarrative, getTemplates } = require('../controllers/narrativeController');

const router = express.Router();

router.post('/generate', generateNarrative);
router.get('/templates', getTemplates);

module.exports = router;