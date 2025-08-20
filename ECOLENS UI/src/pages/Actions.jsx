import React, { useState, useEffect, useContext } from 'react'
import { FaPlus, FaCheck, FaClock, FaTrash, FaCalculator, FaCar, FaPlane, FaBolt, FaLeaf, FaTimes, FaBullseye } from 'react-icons/fa'
import { MdTrendingUp } from 'react-icons/md'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card'
import Button from '../components/common/Button'
import ThemeContext from '../context/ThemeContext'
import {
  getStoredActions,
  createAction,
  updateActionProgress,
  updateActionStatus,
  deleteAction,
  getActionStats,
  estimateConsumption,
  ACTION_CATEGORIES,
  ACTION_TEMPLATES
} from '../services/actionsService'

const Actions = () => {
  const [actions, setActions] = useState([])
  const [stats, setStats] = useState({})
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'TRANSPORTATION',
    estimatedImpact: 'Medium',
    co2Savings: '',
    difficulty: 'Medium'
  })

  useEffect(() => {
    loadActions()
  }, [])

  const loadActions = () => {
    const storedActions = getStoredActions()
    const actionStats = getActionStats()
    setActions(storedActions)
    setStats(actionStats)
  }

  
  const [estimateInputs, setEstimateInputs] = useState({
    carMilesDaily: '',
    flightsPerYear: '',
    electricityKWhDaily: ''
  })
  const [estimateResult, setEstimateResult] = useState(null)
  const { isDarkMode } = useContext(ThemeContext)

  const runEstimate = () => {
    const res = estimateConsumption(estimateInputs)
    setEstimateResult(res)
  }

  const handleCreateAction = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    createAction(formData)
    loadActions()
    setShowCreateForm(false)
    setFormData({
      title: '',
      description: '',
      category: 'TRANSPORTATION',
      estimatedImpact: 'Medium',
      co2Savings: '',
      difficulty: 'Medium'
    })
  }

  const handleUseTemplate = (template) => {
    setFormData(template)
    setShowCreateForm(true)
  }

  const handleProgressUpdate = (actionId, newProgress) => {
    const note = `Progress updated to ${newProgress}%`
    updateActionProgress(actionId, { progress: newProgress, note })
    loadActions()
  }

  const handleStatusChange = (actionId, newStatus) => {
    updateActionStatus(actionId, newStatus)
    loadActions()
  }

  const handleDeleteAction = (actionId) => {
    if (window.confirm('Are you sure you want to delete this action?')) {
      deleteAction(actionId)
      loadActions()
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="h-5 w-5 text-green-500" />
      case 'paused':
        return <FaClock className="h-5 w-5 text-yellow-500" />
      default:
        return <FaBullseye className="h-5 w-5 text-blue-500" />
    }
  }

  const getImpactColor = (impact) => {
    
    switch (impact.toLowerCase()) {
      case 'high':
        return isDarkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'
      case 'medium':
        return isDarkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
      default:
        return isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>Climate Action Plans</h1>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Create, track, and measure your climate impact journey</p>
      </div>

      {}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`}>Know Your Daily Impact</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Quick daily habit check to estimate your annual CO₂ footprint</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {}
          <Card className="text-center">
            <CardHeader className="pb-3">
              <div className="mx-auto w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <FaCar className="text-blue-600 text-xl" />
              </div>
              <CardTitle className="text-lg">Car Miles</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="number"
                placeholder="Daily miles"
                value={estimateInputs.carMilesDaily}
                onChange={(e) => setEstimateInputs({ ...estimateInputs, carMilesDaily: e.target.value })}
                className={`w-full px-3 py-2 rounded-md text-center ${isDarkMode ? 'bg-transparent border border-gray-600 text-gray-100' : 'border border-gray-300 text-gray-900'}`}
              />
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>miles per day</p>
            </CardContent>
          </Card>

          {}
          <Card className="text-center">
            <CardHeader className="pb-3">
              <div className="mx-auto w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <FaPlane className="text-green-600 text-xl" />
              </div>
              <CardTitle className="text-lg">Air Travel</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="number"
                placeholder="Annual flights"
                value={estimateInputs.flightsPerYear}
                onChange={(e) => setEstimateInputs({ ...estimateInputs, flightsPerYear: e.target.value })}
                className={`w-full px-3 py-2 rounded-md text-center ${isDarkMode ? 'bg-transparent border border-gray-600 text-gray-100' : 'border border-gray-300 text-gray-900'}`}
              />
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>flights per year</p>
            </CardContent>
          </Card>

          {}
          <Card className="text-center">
            <CardHeader className="pb-3">
              <div className="mx-auto w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
                <FaBolt className="text-yellow-600 text-xl" />
              </div>
              <CardTitle className="text-lg">Electricity</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="number"
                placeholder="Daily kWh"
                value={estimateInputs.electricityKWhDaily}
                onChange={(e) => setEstimateInputs({ ...estimateInputs, electricityKWhDaily: e.target.value })}
                className={`w-full px-3 py-2 rounded-md text-center ${isDarkMode ? 'bg-transparent border border-gray-600 text-gray-100' : 'border border-gray-300 text-gray-900'}`}
              />
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>kWh per day</p>
            </CardContent>
          </Card>
        </div>

        {}
        <div className="text-center">
          <div className="flex gap-3 justify-center items-center mb-4">
            <Button onClick={runEstimate}>Calculate Impact</Button>
            <Button variant="outline" onClick={() => { 
              setEstimateInputs({ carMilesDaily: '', flightsPerYear: '', electricityKWhDaily: '' }); 
              setEstimateResult(null) 
            }}>
              Reset
            </Button>
          </div>
          
          {estimateResult && (
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-1`}>{estimateResult.annual_co2_tons} t</div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'} mb-2`}>Annual CO₂ Emissions</div>
                  <div className={`${isDarkMode ? 'text-blue-400 text-lg font-semibold' : 'text-lg font-semibold text-blue-600'} mb-2`}>{estimateResult.daily_co2_kg} kg daily</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>
                    Consumption Level: <span className={`font-medium ${
                      estimateResult.consumptionType === 'High' ? (isDarkMode ? 'text-red-300' : 'text-red-600') : 
                      estimateResult.consumptionType === 'Medium' ? (isDarkMode ? 'text-yellow-300' : 'text-yellow-600') : (isDarkMode ? 'text-green-300' : 'text-green-600')
                    }`}>
                      {estimateResult.consumptionType}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-sm font-medium text-gray-600'}`}>Total Actions</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{stats.totalActions}</p>
              </div>
              <FaBullseye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-sm font-medium text-gray-600'}`}>Completed</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>{stats.completedActions}</p>
              </div>
              <FaCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-sm font-medium text-gray-600'}`}>CO₂ Saved</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>{stats.totalCO2Savings}t</p>
              </div>
              <MdTrendingUp className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-sm font-medium text-gray-600'}`}>Completion Rate</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>{stats.completionRate}%</p>
              </div>
              <div className={`${isDarkMode ? 'w-8 h-8 rounded-full bg-purple-800 flex items-center justify-center' : 'w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center'}`}>
                <span className={`${isDarkMode ? 'text-purple-200 font-bold text-sm' : 'text-purple-600 font-bold text-sm'}`}>%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaLeaf className="h-5 w-5 text-green-500" />
            Action Templates
          </CardTitle>
          <CardDescription>
            Choose from proven climate actions to start tracking your impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACTION_TEMPLATES.map((template, index) => (
              <div key={index} className={`${isDarkMode ? 'border border-gray-700 bg-gray-800' : 'border border-gray-200'} rounded-lg p-4 hover:border-green-300 transition-colors`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{template.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${ACTION_CATEGORIES[template.category].color}`}>
                    {ACTION_CATEGORIES[template.category].name}
                  </span>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'} mb-3`}>{template.description}</p>
                <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mb-3`}>
                  <span className={`px-2 py-1 rounded ${getImpactColor(template.estimatedImpact)}`}>
                    {template.estimatedImpact} Impact
                  </span>
                  <span className={`${isDarkMode ? 'font-medium text-green-200' : 'font-medium text-green-600'}`}>{template.co2Savings}</span>
                </div>
                <Button
                  onClick={() => handleUseTemplate(template)}
                  className="w-full"
                  size="sm"
                >
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {}
      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Action Plan</CardTitle>
            <CardDescription>Define your climate action and start tracking progress</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAction} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Action Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Use bike for daily commute"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {Object.entries(ACTION_CATEGORIES).map(([key, category]) => (
                      <option key={key} value={key}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  placeholder="Describe your action plan and goals..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Impact
                  </label>
                  <select
                    value={formData.estimatedImpact}
                    onChange={(e) => setFormData({ ...formData, estimatedImpact: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CO₂ Savings (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.co2Savings}
                    onChange={(e) => setFormData({ ...formData, co2Savings: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 1.2 tons/year"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Create Action Plan
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Action Plans ({actions.length})
        </h2>
        {!showCreateForm && (
          <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
            <FaPlus className="h-4 w-4" />
            New Action
          </Button>
        )}
      </div>

      {actions.length === 0 && !showCreateForm ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FaBullseye className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No action plans yet</h3>
            <p className="text-gray-600 mb-6">Start your climate journey by creating your first action plan</p>
            <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2 mx-auto">
              <FaPlus className="h-4 w-4" />
              Create Your First Action
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {actions.map((action) => (
            <Card key={action.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(action.status)}
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${ACTION_CATEGORIES[action.category]?.color}`}>
                        {ACTION_CATEGORIES[action.category]?.icon} {ACTION_CATEGORIES[action.category]?.name}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getImpactColor(action.estimatedImpact)}`}>
                        {action.estimatedImpact} Impact
                      </span>
                    </div>
                    {action.description && (
                      <CardDescription>{action.description}</CardDescription>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteAction(action.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {}
                  <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`${isDarkMode ? 'text-gray-300' : 'text-sm font-medium text-gray-700'}`}>Progress</span>
                          <span className={`${isDarkMode ? 'text-gray-100' : 'text-sm font-medium text-gray-900'}`}>{action.progress}%</span>
                        </div>
                        <div className={`${isDarkMode ? 'w-full bg-gray-700 rounded-full h-2' : 'w-full bg-gray-200 rounded-full h-2'}`}>
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${action.progress}%` }}
                          />
                        </div>
                  </div>

                  {}
                  <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={action.progress}
                        onChange={(e) => handleProgressUpdate(action.id, parseInt(e.target.value))}
                        className={`flex-1 h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg appearance-none cursor-pointer slider`}
                      />
                  </div>

                  {}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      {action.co2Savings && (
                        <span className="font-medium text-green-600">
                          💚 {action.co2Savings}
                        </span>
                      )}
                      <span>📅 {new Date(action.createdAt).toLocaleDateString()}</span>
                    </div>
                    <select
                      value={action.status}
                      onChange={(e) => handleStatusChange(action.id, e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Actions
