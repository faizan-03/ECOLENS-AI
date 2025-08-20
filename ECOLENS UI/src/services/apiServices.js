import api from './api'

export const cvService = {
  
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

  
  getAnalysisHistory: async () => {
    const response = await api.get('/cv/history')
    return response.data
  },
}

export const simulationService = {
  
  runSimulation: async (params) => {
    const response = await api.post('/simulation/run', params)
    return response.data
  },

  
  getSimulationResults: async (simulationId) => {
    const response = await api.get(`/simulation/results/${simulationId}`)
    return response.data
  },

  
  getScenarios: async () => {
    const response = await api.get('/simulation/scenarios')
    return response.data
  },
}

export const narrativeService = {
  
  generateNarrative: async (data) => {
    const response = await api.post('/narrative/generate', data)
    return response.data
  },

  
  getTemplates: async () => {
    const response = await api.get('/narrative/templates')
    return response.data
  },
}

export const userService = {
  
  getProfile: async () => {
    const response = await api.get('/user/profile')
    return response.data
  },

  
  updateProfile: async (profileData) => {
    const response = await api.put('/user/profile', profileData)
    return response.data
  },

  
  getSavedSimulations: async () => {
    const response = await api.get('/user/simulations')
    return response.data
  },
}
