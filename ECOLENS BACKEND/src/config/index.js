require('dotenv').config();

const config = {
  // Server Configuration
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecolens-ai',
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // AI API Keys
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  
  // Data Source APIs
  NOAA_API_KEY: process.env.NOAA_API_KEY,
  NASA_API_KEY: process.env.NASA_API_KEY,
  OWID_API_BASE: process.env.OWID_API_BASE || 'https://raw.githubusercontent.com/owid/co2-data/master/',
  
  // File Upload Configuration
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 10 * 1024 * 1024, // 10MB
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',
  
  // ML Model Paths
  CV_MODEL_PATH: process.env.CV_MODEL_PATH || './models/emission_detector.h5',
  PREDICTION_MODEL_PATH: process.env.PREDICTION_MODEL_PATH || './models/co2_predictor.pkl',
  
  // Data Update Configuration
  DATA_UPDATE_ENABLED: process.env.DATA_UPDATE_ENABLED === 'true',
  DATA_UPDATE_INTERVAL: process.env.DATA_UPDATE_INTERVAL || 'daily',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100, // requests per window
};

// Validation
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  if (config.NODE_ENV === 'production') {
    process.exit(1);
  }
}

module.exports = config;