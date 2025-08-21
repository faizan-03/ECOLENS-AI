# ECOLENS Backend API

🌍 **AI Climate Time Machine Backend** - Node.js/Express API server for climate data analysis and AI integration.

## Features

- 🔐 **Authentication System** - JWT-based user authentication
- 📊 **Climate Data APIs** - Global and country-specific CO₂ emission data
- 🤖 **AI Integration** - Gemini, OpenAI, and DeepSeek API integration
- 📷 **Computer Vision** - Image analysis for emission impact estimation
- 📈 **Visualization APIs** - Data formatting for charts and timelines
- 🛡️ **Security** - Rate limiting, CORS, helmet protection
- 📝 **Comprehensive Logging** - Request logging and error handling

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Python 3.8+ (for ML scripts)

### Installation

1. **Clone and navigate to backend directory**
```bash
cd "ECOLENS BACKEND"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy .env file and update with your actual API keys
cp .env.example .env
```

4. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Environment Variables

Update the `.env` file with your actual API keys:

```env
# Required
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# AI APIs (at least one required)
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
DEEPSEEK_API_KEY=your_deepseek_key

# Optional
NOAA_API_KEY=your_noaa_key
NASA_API_KEY=your_nasa_key
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/me` - Get user profile

### Climate Data
- `GET /api/data/co2/global` - Global CO₂ trends
- `GET /api/data/co2/country/:countryCode` - Country-specific data

### AI Services
- `POST /api/ai/predict` - CO₂ emission predictions
- `POST /api/ai/ask` - Climate question answering

### Computer Vision
- `POST /api/vision/analyze` - Image analysis for emissions

### Visualization
- `GET /api/visualization/timeline/:countryCode` - Timeline data

### Health Check
- `GET /health` - Server health status

## Development

### Running Tests
```bash
npm test
npm run test:watch
```

### Database Seeding
```bash
npm run seed
```

### Project Structure
```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Helper functions
├── ml-scripts/     # Python ML scripts
├── app.js          # Express app setup
└── server.js       # Server entry point
```

## Contributing

1. Follow the existing code structure
2. Add tests for new features
3. Update documentation
4. Follow conventional commit messages

## License

MIT License - see LICENSE file for details