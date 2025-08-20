import { useState, useCallback } from 'react'
import { cvService, simulationService, narrativeService } from '../services/apiServices'

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (apiCall, ...params) => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall(...params)
      return result
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, execute, setError }
}

export const useImageAnalysis = () => {
  const { loading, error, execute } = useApi()

  const analyzeImage = useCallback(async (imageData) => {
    return execute(cvService.analyzeImage, imageData)
  }, [execute])

  const getHistory = useCallback(async () => {
    return execute(cvService.getAnalysisHistory)
  }, [execute])

  return {
    loading,
    error,
    analyzeImage,
    getHistory,
  }
}

export const useSimulation = () => {
  const { loading, error, execute } = useApi()

  const runSimulation = useCallback(async (params) => {
    return execute(simulationService.runSimulation, params)
  }, [execute])

  const getResults = useCallback(async (simulationId) => {
    return execute(simulationService.getSimulationResults, simulationId)
  }, [execute])

  const getScenarios = useCallback(async () => {
    return execute(simulationService.getScenarios)
  }, [execute])

  return {
    loading,
    error,
    runSimulation,
    getResults,
    getScenarios,
  }
}

export const useNarrative = () => {
  const { loading, error, execute } = useApi()

  const generateNarrative = useCallback(async (data) => {
    return execute(narrativeService.generateNarrative, data)
  }, [execute])

  const getTemplates = useCallback(async () => {
    return execute(narrativeService.getTemplates)
  }, [execute])

  return {
    loading,
    error,
    generateNarrative,
    getTemplates,
  }
}
