const { body, param, query, validationResult } = require('express-validator');

// Validation helper to check for errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors.array()
      }
    });
  }
  next();
};

// User validation rules
const userValidation = {
  register: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
    handleValidationErrors
  ],

  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
    
    handleValidationErrors
  ],

  updateProfile: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    
    body('preferences.defaultCountry')
      .optional()
      .isLength({ min: 2, max: 3 })
      .withMessage('Country code must be 2-3 characters'),
    
    body('preferences.units')
      .optional()
      .isIn(['metric', 'imperial'])
      .withMessage('Units must be either metric or imperial'),
    
    body('preferences.notifications')
      .optional()
      .isBoolean()
      .withMessage('Notifications must be a boolean value'),
    
    handleValidationErrors
  ]
};

// Country code validation
const countryValidation = {
  countryCode: [
    param('countryCode')
      .isLength({ min: 2, max: 3 })
      .isAlpha()
      .withMessage('Country code must be 2-3 letters'),
    
    handleValidationErrors
  ]
};

// AI prediction validation
const aiValidation = {
  predict: [
    body('country')
      .notEmpty()
      .withMessage('Country is required')
      .isLength({ min: 2, max: 50 })
      .withMessage('Country name must be between 2 and 50 characters'),
    
    body('yearsAhead')
      .isInt({ min: 1, max: 50 })
      .withMessage('Years ahead must be between 1 and 50'),
    
    handleValidationErrors
  ],

  ask: [
    body('question')
      .notEmpty()
      .withMessage('Question is required')
      .isLength({ min: 10, max: 500 })
      .withMessage('Question must be between 10 and 500 characters'),
    
    handleValidationErrors
  ]
};

// File upload validation
const fileValidation = {
  image: [
    (req, res, next) => {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'No image file provided'
          }
        });
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed'
          }
        });
      }

      // Check file size (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (req.file.size > maxSize) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'File size too large. Maximum size is 10MB'
          }
        });
      }

      next();
    }
  ]
};

// Query parameter validation
const queryValidation = {
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
    
    handleValidationErrors
  ],

  dateRange: [
    query('startYear')
      .optional()
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage('Start year must be between 1900 and current year'),
    
    query('endYear')
      .optional()
      .isInt({ min: 1900, max: new Date().getFullYear() + 50 })
      .withMessage('End year must be between 1900 and 50 years from now'),
    
    handleValidationErrors
  ]
};

module.exports = {
  handleValidationErrors,
  userValidation,
  countryValidation,
  aiValidation,
  fileValidation,
  queryValidation
};