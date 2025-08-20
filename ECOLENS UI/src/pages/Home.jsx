import { Link } from 'react-router-dom'
import { Upload, BarChart3, Leaf, ArrowRight, Target } from 'lucide-react'
import Button from '../components/common/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const features = [
    {
      icon: Upload,
      title: "Upload & Analyze",
      description: "Upload images to detect environmental elements and calculate CO₂ impact"
    },
    {
      icon: BarChart3,
      title: "Climate Simulation",
      description: "Explore future climate scenarios based on your lifestyle choices"
    },
    {
      icon: Leaf,
      title: "Personalized Insights",
      description: "Get AI-powered narratives about your environmental impact"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`bg-gradient-to-b ${isDarkMode ? 'from-green-900/20 to-transparent' : 'from-green-50 to-transparent'} py-20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>
            Your Climate
            <span className={`${isDarkMode ? 'text-green-400' : 'text-green-500'} transition-colors duration-300`}> Time Machine</span>
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto transition-colors duration-300`}>
            Discover how your lifestyle choices impact our planet's future. 
            Upload images, explore scenarios, and visualize climate projections for 2030, 2040, and 2050.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="w-full sm:w-auto">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
              How ECOLENS AI Works
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto transition-colors duration-300`}>
              Our AI-powered platform combines computer vision, climate data, and machine learning 
              to provide personalized environmental insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className={`mx-auto w-12 h-12 ${isDarkMode ? 'bg-green-900/40' : 'bg-green-100'} rounded-lg flex items-center justify-center mb-4 transition-colors duration-300`}>
                    <feature.icon className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-500'} transition-colors duration-300`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'} py-20 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
              Start Your Climate Journey Today
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto transition-colors duration-300`}>
              Take action now and make a real difference for our planet's future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upload CTA */}
            <Card className={`text-center ${isDarkMode ? 'border-green-800 hover:border-green-700' : 'border-green-200 hover:border-green-300'} transition-all duration-300 hover:shadow-md`}>
              <CardHeader>
                <div className={`mx-auto w-16 h-16 ${isDarkMode ? 'bg-green-900/40' : 'bg-green-100'} rounded-full flex items-center justify-center mb-4 transition-colors duration-300`}>
                  <Upload className={`h-8 w-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`} />
                </div>
                <CardTitle className="text-2xl">Analyze Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">
                  Upload images to discover your environmental footprint and get AI-powered insights about your climate impact.
                </CardDescription>
                <Link to="/upload">
                  <Button size="lg" className={`w-full ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : ''}`}>
                    Upload & Analyze
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Actions CTA */}
            <Card className={`text-center ${isDarkMode ? 'border-blue-800 hover:border-blue-700' : 'border-blue-200 hover:border-blue-300'} transition-all duration-300 hover:shadow-md`}>
              <CardHeader>
                <div className={`mx-auto w-16 h-16 ${isDarkMode ? 'bg-blue-900/40' : 'bg-blue-100'} rounded-full flex items-center justify-center mb-4 transition-colors duration-300`}>
                  <Target className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`} />
                </div>
                <CardTitle className="text-2xl">Create Action Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">
                  Design personalized climate actions, track your progress, and measure your positive impact over time.
                </CardDescription>
                <Link to="/actions">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className={`w-full ${isDarkMode 
                      ? 'border-blue-500 text-blue-400 hover:bg-blue-900/30' 
                      : 'border-blue-500 text-blue-600 hover:bg-blue-50'}`}
                  >
                    Track Progress
                    <Target className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
