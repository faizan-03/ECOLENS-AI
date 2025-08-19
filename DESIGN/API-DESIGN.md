1. Authentication APIs
POST /api/auth/register

Description: Register a new user.
Request (JSON):

{
  "name": "Faizan",
  "email": "faizan@example.com",
  "password": "securePassword123"
}


Response (201):

{
  "message": "User registered successfully",
  "userId": "64b123abc45"
}

POST /api/auth/login

Description: Login and get JWT token (HTTP-only cookie).
Request (JSON):

{
  "email": "faizan@example.com",
  "password": "securePassword123"
}


Response (200):

{
  "message": "Login successful",
  "token": "jwt_token_here"
}

2. User Profile
GET /api/user/me

Description: Get logged-in user profile.
Headers: Authorization: Bearer <jwt_token>
Response (200):

{
  "userId": "64b123abc45",
  "name": "Faizan",
  "email": "faizan@example.com",
  "role": "user"
}

3. CO₂ Data APIs
GET /api/data/co2/global

Description: Get global CO₂ emission trends.
Response (200):

{
  "year": [2000, 2005, 2010, 2015, 2020],
  "emissions": [280, 310, 340, 400, 420]
}

GET /api/data/co2/country/:countryCode

Description: Get country-specific CO₂ data.
Example: /api/data/co2/country/PK
Response (200):

{
  "country": "Pakistan",
  "years": [2000, 2005, 2010, 2020],
  "emissions": [100, 120, 180, 250]
}

4. AI Prediction APIs
POST /api/ai/predict

Description: Predict future CO₂ levels using ML models.
Request (JSON):

{
  "country": "Pakistan",
  "yearsAhead": 10
}


Response (200):

{
  "country": "Pakistan",
  "predictedEmissions": [
    {"year": 2025, "value": 270},
    {"year": 2030, "value": 320}
  ]
}

POST /api/ai/ask

Description: Ask climate-related questions to AI (Gemini/GPT/DeepSeek).
Request (JSON):

{
  "question": "How will deforestation affect CO2 emissions in the next 20 years?"
}


Response (200):

{
  "answer": "Deforestation contributes significantly to CO₂ levels..."
}

5. Computer Vision APIs
POST /api/vision/analyze

Description: Upload an image (factories, forests, cars) to estimate emission impact.
Request: Multipart form-data

file: image.jpg

Response (200):

{
  "detectedObjects": ["car", "smokestack"],
  "estimatedImpact": "High",
  "confidence": 0.92
}

6. Visualization APIs
GET /api/visualization/timeline/:countryCode

Description: Get timeline dataset for charts.
Response (200):

{
  "country": "Pakistan",
  "timeline": [
    {"year": 2000, "value": 100},
    {"year": 2005, "value": 120},
    {"year": 2010, "value": 180}
  ]
}