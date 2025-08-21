# Design Document

## Overview

The ECOLENS Backend is a Node.js/Express REST API server that serves as the central orchestration layer for the ECOLENS AI climate platform. It integrates authentication, climate data management, AI/ML services, computer vision capabilities, and visualization data processing to support the React frontend's interactive climate analysis features.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Express Backend │    │   External APIs  │
│                 │◄──►│                 │◄──►│                 │
│  - UI Components│    │  - REST Routes  │    │ - Gemini/GPT    │
│  - State Mgmt   │    │  - Controllers  │    │ - DeepSeek      │
│  - API Calls    │    │  - Services     │    │ - Climate Data  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │    MongoDB      │
                       │                 │
                       │ - Users         │
                       │ - CO2 Data      │
                       │ - Simulations   │
                       └─────────────────┘
```

### Directory Structure

```
ECOLENS BACKEND/
├── src/
│   ├── config/           # Environment and database configuration
│   ├── controllers/      # Request handlers for each route group
│   ├── middleware/       # Authentication, validation, error handling
│   ├── models/          # MongoDB schemas and data models
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic and external API integration
│   ├── utils/           # Helper functions and constants
│   ├── ml-scripts/      # Python scripts for AI/ML processing
│   ├── app.js           # Express application setup
│   └── server.js        # Server bootstrap and startup
├── tests/               # Unit and integration tests
├── .env                 # Environment variables
└── package.json         # Dependencies and scripts
```

## Components and Interfaces

### 1. Authentication System

**Components:**
- `AuthController`: Handles registration, login, and profile endpoints
- `AuthMiddleware`: JWT token validation and user session management
- `UserModel`: MongoDB schema for user data
- `AuthService`: Password hashing, token generation, and validation logic

**Key Interfaces:**
```javascript
// User Registration
POST /api/auth/register
Body: { name, email, password }
Response: { message, userId }

// User Login
POST /api/auth/login
Body: { email, password }
Response: { message, token }

// User Profile
GET /api/user/me
Headers: { Authorization: "Bearer <token>" }
Response: { userId, name, email, role }
```

### 2. Climate Data Management

**Components:**
- `DataController`: Handles CO₂ data requests and country-specific queries
- `DataService`: Processes and formats climate datasets
- `CO2DataModel`: MongoDB schema for storing climate data
- `DataAggregator`: Utility for combining multiple data sources

**Key Interfaces:**
```javascript
// Global CO₂ Data
GET /api/data/co2/global
Response: { year: [2000, 2005, ...], emissions: [280, 310, ...] }

// Country-specific Data
GET /api/data/co2/country/:countryCode
Response: { country, years, emissions }
```

### 3. AI Integration Layer

**Components:**
- `AIController`: Handles prediction and question-answering endpoints
- `AIService`: Integrates with external AI APIs (Gemini, GPT, DeepSeek)
- `PredictionEngine`: ML model integration for CO₂ forecasting
- `NLPProcessor`: Natural language processing for user questions

**Key Interfaces:**
```javascript
// AI Predictions
POST /api/ai/predict
Body: { country, yearsAhead }
Response: { country, predictedEmissions: [{ year, value }] }

// AI Question Answering
POST /api/ai/ask
Body: { question }
Response: { answer }
```

### 4. Computer Vision System

**Components:**
- `VisionController`: Handles image upload and analysis endpoints
- `VisionService`: Integrates with Python CV scripts
- `ImageProcessor`: File handling and validation
- `CVAnalysisModel`: MongoDB schema for storing analysis results

**Key Interfaces:**
```javascript
// Image Analysis
POST /api/vision/analyze
Body: FormData with image file
Response: { detectedObjects, estimatedImpact, confidence }
```

### 5. Visualization Data Provider

**Components:**
- `VisualizationController`: Handles chart and timeline data requests
- `VisualizationService`: Formats data for frontend consumption
- `ChartDataProcessor`: Aggregates and transforms data for charts

**Key Interfaces:**
```javascript
// Timeline Data
GET /api/visualization/timeline/:countryCode
Response: { country, timeline: [{ year, value }] }
```

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

### CO2 Data Model
```javascript
{
  _id: ObjectId,
  country: String,
  countryCode: String,
  year: Number,
  emissions: Number,
  source: String,
  dataType: String, // "historical" | "projected"
  createdAt: Date
}
```

### CV Analysis Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (optional),
  imageUrl: String,
  detectedObjects: [String],
  estimatedImpact: String, // "Low" | "Medium" | "High"
  confidence: Number,
  processingTime: Number,
  createdAt: Date
}
```

### Simulation Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (optional),
  inputData: Object, // User choices or image analysis results
  results: Object,   // Predictions and analysis results
  sessionId: String,
  createdAt: Date
}
```

## Error Handling

### Error Response Format
```javascript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable error message",
    details: {} // Additional error context (optional)
  }
}
```

### Error Categories
- **Validation Errors (400)**: Invalid input data, missing required fields
- **Authentication Errors (401)**: Invalid credentials, expired tokens
- **Authorization Errors (403)**: Insufficient permissions
- **Not Found Errors (404)**: Resource not found
- **External API Errors (502)**: AI service unavailable, rate limits exceeded
- **Server Errors (500)**: Database connection issues, unexpected errors

### Error Handling Middleware
- Global error handler for unhandled exceptions
- Async error wrapper for route handlers
- Request validation middleware with detailed error messages
- Rate limiting middleware for API protection

## Testing Strategy

### Unit Tests
- **Controllers**: Test request/response handling and validation
- **Services**: Test business logic and external API integration
- **Models**: Test data validation and schema constraints
- **Utilities**: Test helper functions and data transformations

### Integration Tests
- **API Endpoints**: Test complete request/response cycles
- **Database Operations**: Test CRUD operations and data integrity
- **External API Integration**: Test AI service integration with mocks
- **Authentication Flow**: Test JWT token generation and validation

### Test Structure
```
tests/
├── unit/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── utils/
├── integration/
│   ├── auth.test.js
│   ├── data.test.js
│   ├── ai.test.js
│   └── vision.test.js
└── fixtures/
    ├── users.json
    ├── co2-data.json
    └── test-images/
```

### Testing Tools
- **Jest**: Test framework and assertion library
- **Supertest**: HTTP assertion library for API testing
- **MongoDB Memory Server**: In-memory database for testing
- **Nock**: HTTP mocking for external API calls