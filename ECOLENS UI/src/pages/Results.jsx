import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Download, Share2, BookOpen, TrendingUp, Target, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card'
import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

const Results = () => {
  const { isDarkMode } = useContext(ThemeContext)
  // Sample data for charts
  const emissionData = [
    { year: '2020', emissions: 1200, target: 1000 },
    { year: '2025', emissions: 1100, target: 800 },
    { year: '2030', emissions: 950, target: 600 },
    { year: '2035', emissions: 750, target: 400 },
    { year: '2040', emissions: 500, target: 200 },
    { year: '2050', emissions: 200, target: 0 }
  ]

  const impactData = [
    { category: 'Transportation', current: 400, improved: 150 },
    { category: 'Energy', current: 350, improved: 100 },
    { category: 'Food', current: 250, improved: 200 },
    { category: 'Consumption', current: 200, improved: 100 }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4`}>
            Your Climate Impact Report
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Personalized insights and projections based on your analysis
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Key Metrics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Annual Impact</CardTitle>
                <CardDescription>Your estimated CO₂ footprint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-500'} mb-2`}>
                  1,200 kg
                </div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'}`}>
                  CO₂ equivalent per year
                </div>
                <div className={`${isDarkMode ? 'mt-4 p-3 bg-gray-800 border border-gray-700 rounded-lg' : 'mt-4 p-3 bg-gray-100 rounded-lg'}`}>
                  <div className={`${isDarkMode ? 'text-sm font-medium text-gray-100 mb-1' : 'text-sm font-medium mb-1'}`}>Global Average</div>
                  <div className={`${isDarkMode ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}`}>4,800 kg CO₂/year</div>
                  <div className={`${isDarkMode ? 'text-xs text-green-300 mt-1' : 'text-xs text-green-500 mt-1'}`}>75% below average!</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Improvement Potential</CardTitle>
                <CardDescription>With recommended changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-green-300' : 'text-green-500'} mb-2`}>
                  550 kg
                </div>
                <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'}`}>
                  Potential annual footprint
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Reduction</span>
                    <span className="font-medium">54%</span>
                  </div>
                  <div className={`${isDarkMode ? 'w-full bg-gray-700 rounded-full h-2' : 'w-full bg-gray-200 rounded-full h-2'}`}>
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '54%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Climate Impact Score</CardTitle>
                <CardDescription>Based on lifestyle analysis</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="text-center">
                  <div className={`text-4xl font-bold ${isDarkMode ? 'text-green-300' : 'text-green-500'} mb-2`}>B+</div>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'} mb-4`}>
                    Above average environmental consciousness
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Transportation</span>
                      <span className="text-green-500">A-</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Energy Use</span>
                      <span className="text-yellow-500">B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consumption</span>
                      <span className="text-orange-500">C+</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emissions Projection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Emissions Projection
                </CardTitle>
                <CardDescription>
                  Your projected CO₂ footprint with and without improvements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={emissionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="emissions" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="Current Path"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="Improved Path"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Impact by Category</CardTitle>
                <CardDescription>
                  Comparison of current vs. improved scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="current" fill="#ef4444" name="Current" />
                      <Bar dataKey="improved" fill="#22c55e" name="Improved" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Actions you can take to reduce your climate impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-green-500 mb-1">High Impact</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Switch to electric vehicle or public transportation
                        </p>
                        <div className="text-xs text-green-500 font-medium">
                          Potential reduction: 300 kg CO₂/year
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-yellow-500 mb-1">Medium Impact</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Install solar panels or switch to renewable energy
                        </p>
                        <div className="text-xs text-yellow-500 font-medium">
                          Potential reduction: 200 kg CO₂/year
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-orange-500 mb-1">Quick Wins</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Reduce meat consumption and minimize food waste
                        </p>
                        <div className="text-xs text-orange-500 font-medium">
                          Potential reduction: 150 kg CO₂/year
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-500" />
                  Take Action
                </CardTitle>
                <CardDescription>
                  Turn your insights into measurable climate action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Based on your analysis, we've identified key areas where you can make the biggest impact. 
                    Start with small actions and track your progress over time.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/actions" className="block">
                      <Button className="w-full flex items-center justify-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Action Plan
                      </Button>
                    </Link>
                    <Link to="/actions" className="block">
                      <Button variant="outline" className="w-full flex items-center justify-center">
                        <Target className="h-4 w-4 mr-2" />
                        Track Progress
                      </Button>
                    </Link>
                  </div>
                  <div className={`${isDarkMode ? 'mt-4 p-3 bg-blue-900 border border-blue-800 rounded-lg' : 'mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'}`}>
                      <p className={`${isDarkMode ? 'text-sm text-blue-300' : 'text-sm text-blue-700'}`}>
                        💡 <strong>Tip:</strong> Start with 2-3 small actions to build momentum, then gradually add more ambitious goals.
                      </p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
