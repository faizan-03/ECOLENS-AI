

const API_BASE_URL = 'http://localhost:3001/api'


export const analyzeImageForClimate = async () => {
  
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  
  const mockAnalysis = {
    detectedItems: [
      { item: 'SUV vehicle', confidence: 0.95, co2_impact: 2.3 },
      { item: 'disposable coffee cups', confidence: 0.87, co2_impact: 0.2 },
      { item: 'packaged foods', confidence: 0.82, co2_impact: 1.1 },
      { item: 'single-use plastics', confidence: 0.78, co2_impact: 0.4 }
    ],
    lifestyle_factors: {
      transportation: {
        type: 'high_emission_vehicle',
        weekly_usage: 'frequent',
        co2_tons_year: 2.3
      },
      consumption: {
        waste_level: 'high',
        packaging_preference: 'convenience',
        co2_tons_year: 1.8
      },
      energy: {
        estimated_usage: 'above_average',
        source_type: 'mixed_grid',
        co2_tons_year: 0.5
      }
    },
    personal_footprint: {
      annual_co2_tons: 4.6,
      global_percentile: 72, 
      country_percentile: 58, 
      category: 'above_average'
    },
    improvement_suggestions: [
      {
        action: 'Switch to electric or hybrid vehicle',
        potential_reduction: 1.8,
        difficulty: 'medium',
        cost_estimate: 'high',
        timeline: '6-12 months'
      },
      {
        action: 'Reduce single-use items by 70%',
        potential_reduction: 0.9,
        difficulty: 'easy',
        cost_estimate: 'low',
        timeline: 'immediate'
      },
      {
        action: 'Install solar panels or switch to renewable energy',
        potential_reduction: 0.6,
        difficulty: 'medium',
        cost_estimate: 'medium',
        timeline: '3-6 months'
      }
    ],
    location_context: {
      country: 'US',
      climate_zone: 'temperate',
      renewable_energy_availability: 'high'
    }
  }
  
  return mockAnalysis
}


export const generateClimateProjections = (userAnalysis, scenario, targetYear) => {
  const baseFootprint = userAnalysis.personal_footprint.annual_co2_tons
  
  const yearMultipliers = {
    2030: 1.05,
    2040: 1.12,
    2050: 1.20
  }
  
  const scenarioCalculations = {
    current_path: {
      description: 'Continue your current lifestyle patterns',
      co2_trajectory: baseFootprint * yearMultipliers[targetYear],
      temp_contribution: (baseFootprint * yearMultipliers[targetYear] / 1000) * 0.00012,
      likelihood: 'high'
    },
    improved_path: {
      description: 'Implement all suggested improvements',
      co2_trajectory: baseFootprint * 0.3 * yearMultipliers[targetYear],
      temp_contribution: (baseFootprint * 0.3 * yearMultipliers[targetYear] / 1000) * 0.00012,
      likelihood: 'achievable'
    },
    no_action: {
      description: 'No changes, lifestyle degradation over time',
      co2_trajectory: baseFootprint * 1.4 * yearMultipliers[targetYear],
      temp_contribution: (baseFootprint * 1.4 * yearMultipliers[targetYear] / 1000) * 0.00012,
      likelihood: 'concerning'
    }
  }
  
  const projection = scenarioCalculations[scenario]
  
  
  const globalImpact = {
    temperature_rise: 1.2 + (projection.co2_trajectory - 2) * 0.08,
    sea_level_rise: 15 + (projection.co2_trajectory - 2) * 2.5,
    co2_atmospheric: 410 + (projection.co2_trajectory - 2) * 6
  }
  
  return {
    personal: projection,
    global: globalImpact,
    comparison: {
      global_average: 4.8,
      country_average: 5.2,
      target_1_5c: 2.3,
      your_rank: projection.co2_trajectory > 4.8 ? 'above_average' : 'below_average'
    }
  }
}


export const storeAnalysisResults = (analysisData) => {
  localStorage.setItem('ecolens_climate_analysis', JSON.stringify({
    ...analysisData,
    timestamp: Date.now(),
    version: '1.0'
  }))
}


export const getStoredAnalysis = () => {
  const stored = localStorage.getItem('ecolens_climate_analysis')
  if (!stored) return null
  
  const data = JSON.parse(stored)
  
  
  const isExpired = Date.now() - data.timestamp > 24 * 60 * 60 * 1000
  if (isExpired) {
    localStorage.removeItem('ecolens_climate_analysis')
    return null
  }
  
  return data
}


export const clearAnalysisResults = () => {
  localStorage.removeItem('ecolens_climate_analysis')
}
