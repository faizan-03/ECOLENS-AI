const express = require('express');
const multer = require('multer');
const { analyzeImage } = require('../controllers/cvController');

const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'));
    }
  }
});

router.post('/analyze', upload.single('image'), analyzeImage);

module.exports = router;