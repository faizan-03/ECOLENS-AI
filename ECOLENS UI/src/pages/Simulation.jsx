import { useState, useEffect, useContext } from 'react'
import { Calendar, TrendingUp, Globe, Thermometer, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import Button from '../components/common/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card'
import { getStoredAnalysis } from '../services/climateAnalysis'
import ThemeContext from '../context/ThemeContext'

const Simulation = () => {
  const { isDarkMode } = useContext(ThemeContext)
  const [selectedYear, setSelectedYear] = useState(2030)
  const [scenario, setScenario] = useState('user_current')
  const [isAnimating, setIsAnimating] = useState(false)
  const [storedAnalysis, setStoredAnalysis] = useState(null)

  const years = [2030, 2040, 2050]

  // Load stored analysis data on component mount
  useEffect(() => {
    const analysis = getStoredAnalysis()
    if (analysis) {
      setStoredAnalysis(analysis)
    } else {
      // Mock data if no analysis found (for demo purposes)
      setStoredAnalysis({
        personal_footprint: { annual_co2_tons: 4.6, global_percentile: 72 },
        improvement_suggestions: [
          { action: 'Switch to electric vehicle', reduction: 1.8 },
          { action: 'Reduce meat consumption 50%', reduction: 0.9 },
          { action: 'Install solar panels', reduction: 0.6 }
        ]
      })
    }
  }, [])

  const scenarios = [
    { 
      id: 'user_current', 
      name: 'Your Current Path', 
      description: storedAnalysis ? 
        `Continue your current lifestyle (${storedAnalysis.personal_footprint.annual_co2_tons} tons CO₂/year from AI analysis)` :
        'Based on AI analysis of your uploaded image',
      icon: AlertTriangle,
  color: 'text-blue-500',
  colorDark: 'text-blue-300',
  bgColor: 'bg-blue-50',
  bgColorDark: 'bg-blue-900',
  borderColor: 'border-blue-200',
  borderColorDark: 'border-blue-800',
      impact: 'Your Current Impact'
    },
    { 
      id: 'user_improved', 
      name: 'Your Green Path', 
      description: storedAnalysis ? 
        `Implement ${storedAnalysis.improvement_suggestions?.length || 3} AI-suggested improvements from your lifestyle analysis` :
        'Apply all personalized improvement suggestions',
      icon: CheckCircle,
  color: 'text-green-500',
  colorDark: 'text-green-300',
  bgColor: 'bg-green-50',
  bgColorDark: 'bg-green-900',
  borderColor: 'border-green-200',
  borderColorDark: 'border-green-800',
      impact: 'Potential 70% Reduction'
    },
    { 
      id: 'no_change', 
      name: 'No Changes Made', 
      description: 'Continue current lifestyle without implementing any of the suggested improvements',
      icon: XCircle,
  color: 'text-red-500',
  colorDark: 'text-red-300',
  bgColor: 'bg-red-50',
  bgColorDark: 'bg-red-900',
  borderColor: 'border-red-200',
  borderColorDark: 'border-red-800',
      impact: 'Increasing Impact'
    }
  ]

  // Trigger animation when scenario changes
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [scenario, selectedYear])

  const getSimulationData = () => {
    if (!storedAnalysis || !storedAnalysis.personal_footprint || !storedAnalysis.personal_footprint.annual_co2_tons) {
      return { 
        personalCO2: '0.0', 
        temperatureContribution: '0.0000',
        globalRank: 'Unknown', 
        globalTemp: '1.5', 
        seaLevel: 15,
        co2Level: 410 
      }
    }
    
    // Use actual user data from image analysis
    const baseUserCO2 = storedAnalysis.personal_footprint.annual_co2_tons
    
    const yearMultipliers = {
      2030: 1.05,
      2040: 1.12,
      2050: 1.20
    }

    const scenarioCalculations = {
      user_current: {
        // User's current trajectory with slight increase over time
        annual_co2: baseUserCO2 * yearMultipliers[selectedYear],
        temp_contribution: (baseUserCO2 / 1000) * 0.1,
        global_impact_rank: baseUserCO2 > 4.8 ? 'Above Global Average' : 'Below Global Average'
      },
      user_improved: {
        // After implementing AI suggestions (70% reduction)
        annual_co2: (baseUserCO2 * 0.3) * yearMultipliers[selectedYear],
        temp_contribution: ((baseUserCO2 * 0.3) / 1000) * 0.1,
        global_impact_rank: 'Well Below Average'
      },
      no_change: {
        // Lifestyle degradation over time
        annual_co2: baseUserCO2 * yearMultipliers[selectedYear] * 1.3,
        temp_contribution: (baseUserCO2 * 1.3 / 1000) * 0.1,
        global_impact_rank: 'Well Above Average'
      }
    }

    const current = scenarioCalculations[scenario]
    
    return {
      personalCO2: current.annual_co2.toFixed(1),
      temperatureContribution: current.temp_contribution.toFixed(4),
      globalRank: current.global_impact_rank,
      // Convert personal impact to global equivalents (simplified)
      globalTemp: (1.2 + (current.annual_co2 - 2) * 0.1).toFixed(1),
      seaLevel: Math.round(15 + (current.annual_co2 - 2) * 3),
      co2Level: Math.round(410 + (current.annual_co2 - 2) * 8)
    }
  }

  const data = getSimulationData()

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-foreground'} mb-4`}>
            Climate Simulation
          </h1>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'} text-lg`}>
            Explore how different scenarios might affect our planet's future
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Year Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Time Period
                </CardTitle>
                <CardDescription>Select a year to explore</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? 'default' : 'outline'}
                      onClick={() => setSelectedYear(year)}
                      className="w-full"
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scenario Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Scenario
                </CardTitle>
                <CardDescription>Choose a climate pathway</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scenarios.map((scen) => {
                    const IconComponent = scen.icon
                    const isSelected = scenario === scen.id
                    // compute theme aware classes using dark variants when available
                    const selectedBg = isSelected ? (isDarkMode ? (scen.bgColorDark || 'bg-gray-800') : scen.bgColor) : ''
                    const selectedBorder = isSelected ? (isDarkMode ? (scen.borderColorDark || 'border-gray-700') : scen.borderColor) : (isDarkMode ? 'border-gray-700' : 'border-gray-200')
                    const selectedText = isSelected ? (isDarkMode ? (scen.colorDark || 'text-gray-100') : scen.color) : (isDarkMode ? 'text-gray-300' : 'text-gray-500')

                    return (
                      <div
                        key={scen.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-105 ${selectedBorder} ${selectedBg} ${isSelected ? 'shadow-md border-2' : ''} ${isAnimating && isSelected ? 'animate-pulse' : ''}`}
                        onClick={() => setScenario(scen.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <IconComponent className={`h-5 w-5 mt-0.5 ${selectedText}`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className={`font-medium text-sm ${isDarkMode ? 'text-gray-100' : ''}`}>{scen.name}</div>
                              {isSelected && (
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${isDarkMode ? `${scen.bgColorDark} ${scen.colorDark}` : `${scen.bgColor} ${scen.color}`}`}>
                                  Active
                                </span>
                              )}
                            </div>
                            <div className={`${isDarkMode ? 'text-gray-300 mt-1 text-xs' : 'text-xs text-gray-600 mt-1'}`}>
                              {scen.description}
                            </div>
                            <div className={`text-xs mt-2 font-medium ${isSelected ? scen.color : (isDarkMode ? 'text-gray-300' : 'text-gray-500')}`}>
                              {scen.impact}
                            </div>
                          </div>
                        </div>

                        {/* Dynamic Progress Bar based on scenario */}
                        <div className="mt-3">
                          <div className={`flex justify-between text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                            <span>Climate Impact</span>
                            <span>
                              {scen.id === 'user_improved' ? '30%' : 
                               scen.id === 'user_current' ? '65%' : '90%'}
                            </span>
                          </div>
                          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} w-full rounded-full h-2`}>
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                scen.id === 'user_improved' ? 'bg-green-500' :
                                scen.id === 'user_current' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: scen.id === 'user_improved' ? '30%' : scen.id === 'user_current' ? '65%' : '90%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Scenario Impact Banner */}
            <Card className={`transition-all duration-500 ${isDarkMode ? 'bg-gray-800 border-gray-700' : scenarios.find(s => s.id === scenario)?.bgColor || 'bg-gray-50'} ${isDarkMode ? '' : scenarios.find(s => s.id === scenario)?.borderColor || 'border-gray-200'}`}>
              <CardContent className="py-4">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const currentScenario = scenarios.find(s => s.id === scenario)
                    const IconComponent = currentScenario?.icon
                    return (
                      <>
                        <IconComponent className={`h-6 w-6 ${currentScenario?.color}`} />
                        <div>
                          <div className={`font-semibold text-sm ${isDarkMode ? 'text-gray-100' : ''}`}>
                            Currently Viewing: {currentScenario?.name}
                          </div>
                          <div className={`${isDarkMode ? 'text-gray-300' : 'text-xs text-gray-600'} `}>
                            Projections for {selectedYear} • {currentScenario?.impact}
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics with Animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={`transition-all duration-500 transform ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <Thermometer className="h-4 w-4 mr-2 text-red-500" />
                    Your CO₂ Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold transition-all duration-500 ${
                    parseFloat(data.personalCO2) > 4.0 ? 'text-red-600' :
                    parseFloat(data.personalCO2) > 2.0 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {data.personalCO2} tons
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'}`}>
                    CO₂ per year ({selectedYear})
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-xs text-gray-500'} mt-1`}>
                    Global avg: 4.8 tons • Rank: {data.globalRank}
                  </div>
                  {/* Visual indicator */}
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'mt-2 w-full bg-gray-200'} rounded-full h-1`}>
                    <div 
                      className={`h-1 rounded-full transition-all duration-700 ${
                        parseFloat(data.personalCO2) > 4.0 ? 'bg-red-500' :
                        parseFloat(data.personalCO2) > 2.0 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((parseFloat(data.personalCO2) / 8) * 100, 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`transition-all duration-500 transform ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-blue-500" />
                    Global Temperature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold transition-all duration-500 ${
                    parseFloat(data.globalTemp) > 2.0 ? 'text-red-600' :
                    parseFloat(data.globalTemp) > 1.5 ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    +{data.globalTemp}°C
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'}`}>
                    projected by {selectedYear}
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-400' : 'text-xs text-gray-500'} mt-1`}>
                    Your contribution: +{data.temperatureContribution}°C
                  </div>
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'mt-2 w-full bg-gray-200'} rounded-full h-1`}>
                    <div 
                      className={`h-1 rounded-full transition-all duration-700 ${
                        parseFloat(data.globalTemp) > 2.0 ? 'bg-red-500' :
                        parseFloat(data.globalTemp) > 1.5 ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min((parseFloat(data.globalTemp) / 3) * 100, 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`transition-all duration-500 transform ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-orange-500" />
                    CO₂ Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold transition-all duration-500 ${
                    data.co2Level > 450 ? 'text-red-600' :
                    data.co2Level > 400 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {data.co2Level} ppm
                  </div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'}`}>
                    atmospheric
                  </div>
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'mt-2 w-full bg-gray-200'} rounded-full h-1`}>
                    <div 
                      className={`h-1 rounded-full transition-all duration-700 ${
                        data.co2Level > 450 ? 'bg-red-500' :
                        data.co2Level > 400 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(((data.co2Level - 350) / 200) * 100, 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Climate Projection for {selectedYear}</CardTitle>
                <CardDescription>
                  {scenarios.find(s => s.id === scenario)?.name} scenario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`h-64 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-b from-orange-900/10 to-blue-900/10' : 'bg-gradient-to-b from-orange-100 to-blue-100'}`}>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'} text-center`}>
                    <Globe className="h-16 w-16 mx-auto mb-4" />
                    <p>Interactive climate visualization</p>
                    <p className="text-sm">(Charts will be implemented with Recharts)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Summary</CardTitle>
                <CardDescription>Key changes expected by {selectedYear}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`p-4 ${isDarkMode ? 'bg-gray-800/40 text-gray-300' : 'bg-muted/50'} rounded-lg`}>
                    <h4 className="font-medium mb-2">Environmental Changes</h4>
                    <ul className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-muted-foreground'} space-y-1`}>
                      <li>• More frequent extreme weather events</li>
                      <li>• Shifts in precipitation patterns</li>
                      <li>• Arctic ice loss acceleration</li>
                      <li>• Ocean acidification increase</li>
                    </ul>
                  </div>
                  
                  <div className={`p-4 ${isDarkMode ? 'bg-gray-800/40 text-gray-300' : 'bg-muted/50'} rounded-lg`}>
                    <h4 className="font-medium mb-2">Societal Impact</h4>
                    <ul className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-muted-foreground'} space-y-1`}>
                      <li>• Coastal communities at risk</li>
                      <li>• Agricultural productivity changes</li>
                      <li>• Water resource stress</li>
                      <li>• Climate migration patterns</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg">
              Generate Detailed Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Simulation
