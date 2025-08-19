# 🌍 AI Climate Time Machine – System Design

## 1. Overview
The AI Climate Time Machine is a **MERN + AI/ML powered web platform** that allows users to explore how their lifestyle choices (food, transport, energy, etc.) impact the planet’s future.  
It combines **computer vision**, **CO₂ datasets**, and **AI narrative generation (GPT, Gemini, DeepSeek APIs)** to create an **interactive, educational, and personalized climate simulation**.

---

## 2. High-Level Architecture
**Frontend (React.js + TailwindCSS)**  
- Interactive UI for choices & scenario building  
- Upload/scan images for computer vision analysis  
- Dynamic visualization (charts, graphs, maps, time travel simulation)  
- User session handling  

**Backend (Node.js + Express)**  
- REST API for user requests & responses  
- Routes for climate simulation, AI narrative, CV analysis, and dataset queries  
- Auth (JWT / cookie-based session for hackathon scope optional)  
- Data aggregation from ML services + external APIs  

**Machine Learning/AI Layer (Python microservices + APIs)**  
- **Computer Vision Service**: analyzes uploaded images (food/transport/energy appliances) → returns estimated CO₂ impact  
- **Climate Simulation Engine**: consumes CO₂ datasets + user actions → projects emission scenarios for 2030/2040/2050  
- **AI Narrative Engine**: GPT / Gemini / DeepSeek APIs → generates user-friendly storytelling of results  

**Database (MongoDB)**  
- Stores user sessions & simulation results  
- Stores historical actions & CV inferences  
- Stores curated CO₂ datasets and mapping tables  

---

## 3. Data Flow
1. **User Input**  
   - Select lifestyle choices (dropdowns/sliders) OR upload an image.  
2. **Frontend → Backend**  
   - User input sent to backend API.  
3. **Backend → AI/ML Services**  
   - If image → sent to CV model (Python script) → returns estimated CO₂ impact.  
   - If choice → mapped to CO₂ datasets from MongoDB.  
4. **Climate Simulation Engine**  
   - Takes total emissions → applies climate scenario models → generates projections for 2030, 2040, 2050.  
5. **AI Narrative Engine**  
   - Generates a personalized story ("By 2040, your choices could…").  
6. **Frontend Visualization**  
   - Displays interactive time travel simulation, graphs, and future world narrative.  

---

## 4. Core Components
### 4.1 Frontend (React.js)
- **Scenario Builder UI**: sliders for diet, transport, energy, waste.  
- **Image Upload UI**: integrates CV API.  
- **Simulation Viewer**: charts, maps, future projections.  
- **Storytelling Section**: GPT-generated narrative.  

### 4.2 Backend (Node.js/Express)
- API Routes:  
  - `/api/cv-analyze` → send image → get CO₂ data  
  - `/api/simulate` → send user actions → get projection  
  - `/api/narrative` → send results → get AI-generated story  
- Orchestration layer between frontend, ML services, and AI APIs  

### 4.3 AI/ML Services
- **Computer Vision (Python + TensorFlow/PyTorch)**: classify meals, vehicles, or appliances.  
- **Simulation Engine (Python)**: apply CO₂ multipliers, datasets, and scenario models.  
- **AI Narrative (GPT, Gemini, DeepSeek APIs)**: generate simplified educational storytelling.  

### 4.4 Database (MongoDB)
- **Users Collection**: `userId`, session, preferences  
- **Simulations Collection**: `input`, `results`, `timestamp`  
- **CO₂ Dataset Collection**: category → emission factor mappings  
- **Image Analysis Collection**: CV results for audit/logging  

---

## 5. External APIs & Datasets
- **GPT / Gemini / DeepSeek APIs** → Natural language storytelling  
- **CO₂ Emission Datasets** (curated open datasets for food, transport, energy, waste)  
- **Computer Vision Models** (pre-trained + fine-tuned for emission classification)  

---

## 6. Key Features
- 🌱 Lifestyle impact simulation (sliders + dataset mapping)  
- 📷 Computer vision (upload image → CO₂ estimation)  
- 🕰️ Time travel mode (see 2030, 2040, 2050 scenarios)  
- 🧠 AI storytelling (personalized, engaging narrative)  
- 📊 Interactive visualizations (charts, graphs, future world maps)  

---

## 7. Future Enhancements (Post-Hackathon)
- Real-time API integration with global climate databases  
- Multi-user leaderboard: compare personal climate futures  
- AR/VR integration for immersive climate time travel  
