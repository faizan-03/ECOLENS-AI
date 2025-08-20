
export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  CV_SERVICE_URL: import.meta.env.VITE_CV_SERVICE_URL || 'http://localhost:5000',
  ENVIRONMENT: import.meta.env.MODE || 'development',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
}


export const API_ENDPOINTS = {
  CV: {
    ANALYZE: '/cv/analyze',
    HISTORY: '/cv/history',
  },
  SIMULATION: {
    RUN: '/simulation/run',
    RESULTS: '/simulation/results',
    SCENARIOS: '/simulation/scenarios',
  },
  NARRATIVE: {
    GENERATE: '/narrative/generate',
    TEMPLATES: '/narrative/templates',
  },
  USER: {
    PROFILE: '/user/profile',
    SIMULATIONS: '/user/simulations',
  },
}


export const EMISSION_FACTORS = {
  CAR_KM: 0.192, 
  FLIGHT_KM: 0.255, 
  ELECTRICITY_KWH: 0.5, 
  GAS_M3: 2.03, 
  MEAT_KG: 27, 
  TREE_ANNUAL_ABSORPTION: 22, 
}


export const CLIMATE_SCENARIOS = {
  OPTIMISTIC: {
    id: 'optimistic',
    name: 'Green Transition',
    description: 'Aggressive climate action and sustainable practices',
    tempMultiplier: 0.7,
    co2Multiplier: 0.8,
  },
  CURRENT: {
    id: 'current',
    name: 'Current Trends',
    description: 'Based on existing policies and behaviors',
    tempMultiplier: 1.0,
    co2Multiplier: 1.0,
  },
  PESSIMISTIC: {
    id: 'pessimistic',
    name: 'Business as Usual',
    description: 'Limited climate action, continued high emissions',
    tempMultiplier: 1.4,
    co2Multiplier: 1.3,
  },
}


export const FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, 
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
}


export const CHART_COLORS = {
  PRIMARY: '#22c55e',
  SECONDARY: '#3b82f6',
  DANGER: '#ef4444',
  WARNING: '#f59e0b',
  SUCCESS: '#10b981',
  INFO: '#06b6d4',
}


export const DEFAULT_CHART_CONFIG = {
  margin: { top: 20, right: 30, left: 20, bottom: 5 },
  animationDuration: 1000,
}


export const TIME_PERIODS = [2030, 2040, 2050]


export const GWP_VALUES = {
  CO2: 1,
  CH4: 25, 
  N2O: 298, 
  SF6: 22800, 
}


export const APP_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}


export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  ANALYSIS_HISTORY: 'analysisHistory',
  THEME: 'theme',
}
