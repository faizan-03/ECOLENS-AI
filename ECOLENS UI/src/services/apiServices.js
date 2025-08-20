import api from './api'

export const cvService = {
  // Analyze image for environmental elements
  analyzeImage: async (imageData) => {
    const formData = new FormData()
    
    if (imageData.file) {
      formData.append('image', imageData.file)
    } else if (imageData.url) {
      formData.append('imageUrl', imageData.url)
    }

    const response = await api.post('/cv/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    return response.data
  },

  // Get analysis history
  getAnalysisHistory: async () => {
    const response = await api.get('/cv/history')
    return response.data
  },
}

export const simulationService = {
  // Run climate simulation
  runSimulation: async (params) => {
    const response = await api.post('/simulation/run', params)
    return response.data
  },

  // Get simulation results
  getSimulationResults: async (simulationId) => {
    const response = await api.get(`/simulation/results/${simulationId}`)
    return response.data
  },

  // Get available scenarios
  getScenarios: async () => {
    const response = await api.get('/simulation/scenarios')
    return response.data
  },
}

export const narrativeService = {
  // Generate personalized narrative
  generateNarrative: async (data) => {
    const response = await api.post('/narrative/generate', data)
    return response.data
  },

  // Get narrative templates
  getTemplates: async () => {
    const response = await api.get('/narrative/templates')
    return response.data
  },
}

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/user/profile')
    return response.data
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/user/profile', profileData)
    return response.data
  },

  // Get user's saved simulations
  getSavedSimulations: async () => {
    const response = await api.get('/user/simulations')
    return response.data
  },
}
