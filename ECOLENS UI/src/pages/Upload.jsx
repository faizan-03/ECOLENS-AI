import { useState, useRef, useContext } from 'react'
import { Upload as UploadIcon, Camera, Link as LinkIcon, X, CheckCircle, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card'
import Loader from '../components/common/Loader'
import { analyzeImageForClimate, storeAnalysisResults } from '../services/climateAnalysis'
import ThemeContext from '../context/ThemeContext'

const Upload = () => {
  const { isDarkMode } = useContext(ThemeContext)
  const [uploadMethod, setUploadMethod] = useState('file') 
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [analysisStep, setAnalysisStep] = useState(0)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const analysisSteps = [
    'Scanning image content...',
    'Detecting lifestyle elements...',
    'Calculating carbon footprint...',
    'Generating personalized insights...',
    'Analysis complete!'
  ]

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value
    setImageUrl(url)
    if (url) {
      setPreview(url)
    }
  }

  const clearImage = () => {
    setSelectedFile(null)
    setImageUrl('')
    setPreview(null)
    setAnalysis(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const analyzeImage = async () => {
    if (!selectedFile && !imageUrl) return
    
    setIsAnalyzing(true)
    setAnalysisStep(0)
    
    try {
      
      for (let i = 0; i < analysisSteps.length; i++) {
        setAnalysisStep(i)
        await new Promise(resolve => setTimeout(resolve, 800))
      }
      
      
      const imageData = uploadMethod === 'file' ? selectedFile : imageUrl
      const result = await analyzeImageForClimate(imageData)
      
      
      storeAnalysisResults(result)
      
      setAnalysis(result)
    } catch (error) {
      console.error('Analysis failed:', error)
      setAnalysis({
        error: 'Analysis failed. Please try again.',
        detectedItems: [],
        personal_footprint: { annual_co2_tons: 0 }
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const navigateToSimulation = () => {
    navigate('/simulation')
  }

  const navigateToResults = () => {
    navigate('/results')
  }

  return (
    <div className={`min-h-screen py-8 ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Upload & Analyze
          </h1>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
            Upload an image to detect environmental elements and calculate CO₂ impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {}
          <Card>
            <CardHeader>
              <CardTitle>Choose Upload Method</CardTitle>
              <CardDescription>
                Upload a file from your device or provide an image URL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {}
              <div className="flex space-x-4">
                <Button
                  variant={uploadMethod === 'file' ? 'default' : 'outline'}
                  onClick={() => setUploadMethod('file')}
                  className="flex-1"
                >
                  <UploadIcon className="h-4 w-4 mr-2" />
                  File Upload
                </Button>
                <Button
                  variant={uploadMethod === 'url' ? 'default' : 'outline'}
                  onClick={() => setUploadMethod('url')}
                  className="flex-1"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Image URL
                </Button>
              </div>

              {}
              {uploadMethod === 'file' && (
                <div className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition-colors ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className={`h-12 w-12 mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} mb-4`} />
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                      Click to upload or drag and drop
                    </p>
                    <p className={`${isDarkMode ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}`}>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}

              {}
              {uploadMethod === 'url' && (
                <div className="space-y-4">
                  <input
                    type="url"
                    placeholder="Enter image URL..."
                    value={imageUrl}
                    onChange={handleUrlChange}
                    className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-900'}`}
                  />
                </div>
              )}

              {}
              {preview && (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={clearImage}
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader size="sm" className="mr-2" />
                        Analyzing Image...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                AI-detected environmental elements and CO₂ impact assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysis && !isAnalyzing && (
                <div className={`text-center py-8 ${isDarkMode ? 'text-gray-300' : 'text-muted-foreground'}`}>
                  Upload an image to see analysis results
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-8">
                  <Loader className="mx-auto mb-4" />
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{analysisSteps[analysisStep]}</p>
                  <div className={`w-full rounded-full h-2 max-w-xs mx-auto ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {analysis && !analysis.error && (
                <div className="space-y-6">
                  {}
                  <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-r from-green-50 to-blue-50 border'}`}>
                    <h3 className={`text-lg font-semibold mb-3 flex items-center ${isDarkMode ? 'text-white' : ''}`}>
                      <CheckCircle className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-500'} mr-2`} />
                      Your Climate Profile
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} `}>
                          {analysis.personal_footprint.annual_co2_tons} tons
                        </div>
                        <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'}`}>Annual CO₂ Footprint</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {analysis.personal_footprint.global_percentile}%
                        </div>
                        <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'}`}>Above Global Average</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${analysis.personal_footprint.category === 'below_average' ? (isDarkMode ? 'text-green-300' : 'text-green-600') : analysis.personal_footprint.category === 'average' ? (isDarkMode ? 'text-yellow-300' : 'text-yellow-600') : (isDarkMode ? 'text-red-300' : 'text-red-600')}`}>
                          {analysis.personal_footprint.category.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className={`${isDarkMode ? 'text-gray-300' : 'text-sm text-gray-600'}`}>Impact Category</div>
                      </div>
                    </div>
                  </div>

                  {}
                  <div>
                    <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : ''}`}>AI-Detected Lifestyle Elements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {analysis.detectedItems.map((item, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className={`h-4 w-4 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                            <span className={`font-medium ${isDarkMode ? 'text-white' : ''}`}>{item.item}</span>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                              {item.co2_impact} tons CO₂/year
                            </div>
                            <div className={`${isDarkMode ? 'text-xs text-gray-400' : 'text-xs text-gray-500'}`}>
                              {Math.round(item.confidence * 100)}% confidence
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {}
                  <div>
                    <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : ''}`}>Personalized Improvement Suggestions</h3>
                    <div className="space-y-3">
                      {analysis.improvement_suggestions.map((suggestion, index) => (
                        <div key={index} className={`${isDarkMode ? 'p-4 border border-green-800 bg-green-900/20 rounded-lg' : 'p-4 border border-green-200 bg-green-50 rounded-lg'}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`font-medium ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>{suggestion.action}</h4>
                              <p className={`${isDarkMode ? 'text-green-200' : 'text-green-700'} text-sm mt-1`}>
                                Potential reduction: {suggestion.potential_reduction} tons CO₂/year
                              </p>
                              <div className={`${isDarkMode ? 'flex items-center space-x-4 mt-2 text-xs text-green-300' : 'flex items-center space-x-4 mt-2 text-xs text-green-600'}`}>
                                <span>Difficulty: {suggestion.difficulty}</span>
                                <span>Cost: {suggestion.cost_estimate}</span>
                                <span>Timeline: {suggestion.timeline}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`${isDarkMode ? 'text-lg font-bold text-green-300' : 'text-lg font-bold text-green-600'}`}>
                                -{suggestion.potential_reduction}
                              </div>
                              <div className={`${isDarkMode ? 'text-xs text-green-300' : 'text-xs text-green-500'}`}>tons CO₂</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                    <Button 
                      onClick={navigateToSimulation}
                      className="flex-1 flex items-center justify-center"
                      size="lg"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Explore Climate Simulation
                    </Button>
                    <Button 
                      onClick={navigateToResults}
                      variant="outline"
                      className="flex-1 flex items-center justify-center"
                      size="lg"
                    >
                      View Detailed Results
                    </Button>
                  </div>
                </div>
              )}

              {analysis && analysis.error && (
                <div className="text-center py-8">
                  <div className="text-red-600 mb-4">{analysis.error}</div>
                  <Button onClick={() => setAnalysis(null)} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Upload
