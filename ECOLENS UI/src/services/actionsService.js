

const ACTIONS_STORAGE_KEY = 'ecolens_climate_actions'


export const ACTION_CATEGORIES = {
  TRANSPORTATION: {
    name: 'Transportation',
    icon: '🚗',
    color: 'bg-blue-100 text-blue-800'
  },
  ENERGY: {
    name: 'Energy',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-800'
  },
  CONSUMPTION: {
    name: 'Consumption',
    icon: '🛒',
    color: 'bg-purple-100 text-purple-800'
  },
  WASTE: {
    name: 'Waste Reduction',
    icon: '♻️',
    color: 'bg-green-100 text-green-800'
  },
  NATURE: {
    name: 'Nature Conservation',
    icon: '🌱',
    color: 'bg-emerald-100 text-emerald-800'
  }
}


export const ACTION_TEMPLATES = [
  {
    title: 'Use Public Transportation',
    category: 'TRANSPORTATION',
    description: 'Replace car trips with public transport 3 days per week',
    estimatedImpact: 'Medium',
    co2Savings: '1.2 tons/year',
    difficulty: 'Easy'
  },
  {
    title: 'Switch to LED Bulbs',
    category: 'ENERGY',
    description: 'Replace all incandescent bulbs with LED alternatives',
    estimatedImpact: 'Low',
    co2Savings: '0.3 tons/year',
    difficulty: 'Easy'
  },
  {
    title: 'Reduce Meat Consumption',
    category: 'CONSUMPTION',
    description: 'Go meatless 2 days per week',
    estimatedImpact: 'High',
    co2Savings: '0.8 tons/year',
    difficulty: 'Medium'
  },
  {
    title: 'Start Home Composting',
    category: 'WASTE',
    description: 'Compost organic waste instead of throwing away',
    estimatedImpact: 'Medium',
    co2Savings: '0.5 tons/year',
    difficulty: 'Medium'
  },
  {
    title: 'Plant Native Trees',
    category: 'NATURE',
    description: 'Plant and maintain 5 native trees in your area',
    estimatedImpact: 'High',
    co2Savings: '0.6 tons/year',
    difficulty: 'Hard'
  }
]


export const createAction = (actionData) => {
  const actions = getStoredActions()
  const newAction = {
    id: generateActionId(),
    ...actionData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: 0,
    status: 'active', 
    progressEntries: []
  }
  
  actions.push(newAction)
  localStorage.setItem(ACTIONS_STORAGE_KEY, JSON.stringify(actions))
  return newAction
}


export const getStoredActions = () => {
  try {
    const stored = localStorage.getItem(ACTIONS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading actions:', error)
    return []
  }
}


export const updateActionProgress = (actionId, progressData) => {
  const actions = getStoredActions()
  const actionIndex = actions.findIndex(action => action.id === actionId)
  
  if (actionIndex === -1) return null
  
  const action = actions[actionIndex]
  const progressEntry = {
    id: generateProgressId(),
    date: new Date().toISOString(),
    note: progressData.note || '',
    progressValue: progressData.progress
  }
  
  action.progressEntries.push(progressEntry)
  action.progress = progressData.progress
  action.updatedAt = new Date().toISOString()
  
  
  if (progressData.progress >= 100) {
    action.status = 'completed'
  }
  
  actions[actionIndex] = action
  localStorage.setItem(ACTIONS_STORAGE_KEY, JSON.stringify(actions))
  return action
}


export const updateActionStatus = (actionId, status) => {
  const actions = getStoredActions()
  const actionIndex = actions.findIndex(action => action.id === actionId)
  
  if (actionIndex === -1) return null
  
  actions[actionIndex].status = status
  actions[actionIndex].updatedAt = new Date().toISOString()
  
  localStorage.setItem(ACTIONS_STORAGE_KEY, JSON.stringify(actions))
  return actions[actionIndex]
}


export const deleteAction = (actionId) => {
  const actions = getStoredActions()
  const filteredActions = actions.filter(action => action.id !== actionId)
  localStorage.setItem(ACTIONS_STORAGE_KEY, JSON.stringify(filteredActions))
  return true
}


export const getActionStats = () => {
  const actions = getStoredActions()
  const totalActions = actions.length
  const completedActions = actions.filter(action => action.status === 'completed').length
  const activeActions = actions.filter(action => action.status === 'active').length
  const totalCO2Savings = actions
    .filter(action => action.status === 'completed')
    .reduce((total, action) => {
      const savings = parseFloat(action.co2Savings?.replace(/[^0-9.]/g, '') || 0)
      return total + savings
    }, 0)
  
  const avgProgress = totalActions > 0 
    ? actions.reduce((sum, action) => sum + action.progress, 0) / totalActions 
    : 0
  
  return {
    totalActions,
    completedActions,
    activeActions,
    totalCO2Savings: totalCO2Savings.toFixed(1),
    avgProgress: Math.round(avgProgress),
    completionRate: totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0
  }
}


export const clearAllActions = () => {
  localStorage.removeItem(ACTIONS_STORAGE_KEY)
  return true
}


export const estimateConsumption = (inputs) => {
  
  const milesDaily = Number(inputs.carMilesDaily) || 0
  const flightsPerYear = Number(inputs.flightsPerYear) || 0
  const electricityKWhDaily = Number(inputs.electricityKWhDaily) || 0

  
  const tonPerMile = 0.000404 
  const tonPerFlight = 0.15 
  const tonPerKWh = 0.000233 

  const annualMiles = milesDaily * 365
  const carCO2 = annualMiles * tonPerMile
  const flightCO2 = flightsPerYear * tonPerFlight
  const electricityCO2 = electricityKWhDaily * 365 * tonPerKWh

  const totalAnnualCO2 = +(carCO2 + flightCO2 + electricityCO2).toFixed(2)

  let consumptionType = 'Low'
  if (totalAnnualCO2 >= 4) consumptionType = 'High'
  else if (totalAnnualCO2 >= 2.5) consumptionType = 'Medium'

  return {
    annual_co2_tons: totalAnnualCO2,
    daily_co2_kg: +(totalAnnualCO2 * 1000 / 365).toFixed(2), 
    breakdown: {
      car: +carCO2.toFixed(2),
      flights: +flightCO2.toFixed(2),
      electricity: +electricityCO2.toFixed(2)
    },
    consumptionType
  }
}


const generateActionId = () => {
  return 'action_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

const generateProgressId = () => {
  return 'progress_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export default {
  createAction,
  getStoredActions,
  updateActionProgress,
  updateActionStatus,
  deleteAction,
  getActionStats,
  clearAllActions,
  estimateConsumption,
  ACTION_CATEGORIES,
  ACTION_TEMPLATES
}
