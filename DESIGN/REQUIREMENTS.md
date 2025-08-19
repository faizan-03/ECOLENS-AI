# REQUIREMENTS.md

## Project: ECOLENS AI 🌍

**Tagline:**  
AI Climate Time Machine – Making Climate Change Interactive, Visual, and Actionable.

---

## 1. Problem Statement  
Climate change is one of the biggest threats to humanity, yet for most people, it feels abstract and distant. Traditional data reports and charts fail to capture urgency. Communities, policy-makers, and individuals need an **interactive, visual, and AI-powered tool** to **see the impact of climate actions** and make better decisions.

---

## 2. Objectives  

- ✅ Provide a **visual, interactive platform** to explore climate change impacts across time (past, present, future).  
- ✅ Integrate **computer vision** for real-time CO₂/object detection from images (e.g., vehicles, factories, trees).  
- ✅ Use **AI (Gemini, GPT, DeepSeek APIs)** to generate **personalized climate insights** and **policy simulations**.  
- ✅ Present **datasets + AI predictions** in a way that is **easy to understand** for students, researchers, and the general public.  

---

## 3. Key Features (Functional Requirements)  

1. **Interactive Climate Time Machine**  
   - Users select a region and a year → see CO₂ levels, temperature rise, and effects.  
   - Future projections generated using AI models.  

2. **Computer Vision Module**  
   - Upload or capture an image → AI detects emission sources (cars, smoke, trees).  
   - Estimates **CO₂ contribution or offset** in real time.  

3. **AI Climate Insights (LLM Integration)**  
   - Users ask questions in natural language (“What if we reduce car use by 20%?”).  
   - Gemini/GPT/DeepSeek respond with data-backed answers & graphs.  

4. **Personalized Climate Actions**  
   - AI recommends steps for individuals, communities, and industries.  
   - Example: “Planting 100 trees offsets X tons of CO₂ per year.”  

5. **Visualization Dashboard**  
   - Charts, maps, and time-lapse effects.  
   - Comparison mode: *What happens if we do nothing vs. take action?*  

---

## 4. Non-Functional Requirements  

- **Scalability** → MERN backend supports growth in datasets and users.  
- **Performance** → Real-time CO₂ analysis under 2 seconds for image inputs.  
- **Reusability** → Modular React components and Python AI scripts.  
- **Maintainability** → Clear separation of backend, frontend, and AI services.  
- **Security** → JWT authentication, safe API key usage for external AI models.  
- **User Experience** → Responsive design for desktop, tablet, mobile.  

---

## 5. Users & Stakeholders  

- 🌱 **Students/Researchers** → For learning and data exploration.  
- 🏛️ **Policy Makers** → To test policies with simulations.  
- 🌍 **General Public** → Awareness, education, personal actions.  

---

## 6. Tech Stack  

- **Frontend (ECOLENS UI)** → React, TailwindCSS, Recharts/Three.js for visuals.  
- **Backend (ECOLENS BACKEND)** → Node.js (Express) + MongoDB.  
- **AI/ML** → Python (FastAPI/Flask microservices), Gemini/GPT/DeepSeek APIs.  
- **Computer Vision** → OpenCV, TensorFlow/PyTorch.  
- **Deployment** → Docker + Cloud (AWS/Azure/Render/Heroku).  

---

## 7. Constraints  

- Must be hackathon-buildable in limited time.  
- Use open-source climate datasets (NASA, NOAA, Our World in Data).  
- Free-tier usage of AI APIs (Gemini, GPT, DeepSeek).  

---

## 8. Success Criteria  

- Users can **see climate change visually** across time.  
- Image upload → AI successfully detects emissions/greenery.  
- AI gives **clear, data-backed answers** to user queries.  
- Smooth, engaging **UI/UX** with minimal lag.  

---
