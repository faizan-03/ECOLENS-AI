import { Leaf, Target, Users, Lightbulb, Github, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card';
import Button from '../components/common/Button';
import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

const About = () => {
  const features = [
    {
      icon: Lightbulb,
      title: "AI-Powered Analysis",
      description: "Advanced computer vision and machine learning to analyze environmental elements in images and calculate real-world CO₂ impact."
    },
    {
      icon: Target,
      title: "Climate Projections",
      description: "Data-driven simulations showing how lifestyle choices affect future climate scenarios for 2030, 2040, and 2050."
    },
    {
      icon: Users,
      title: "Personalized Insights",
      description: "Tailored recommendations and narratives based on your specific environmental footprint and lifestyle patterns."
    }
  ];

  const { isDarkMode } = useContext(ThemeContext)

  return (
    <div className={`min-h-screen py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Leaf className="h-10 w-10 text-green-500" />
            <h1 className={`text-4xl font-extrabold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>ECOLENS AI</h1>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Your AI Climate Time Machine - bridging the gap between individual actions and global climate impact through cutting-edge technology and real-world data.
          </p>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Advanced technology meets environmental science
            </p>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
        <Card key={index} className={`text-center shadow-md hover:shadow-lg transition-shadow ${isDarkMode ? 'bg-gray-800 border border-gray-700' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="mx-auto w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-green-500" />
                  </div>
          <CardTitle className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
          <CardDescription className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className={`${isDarkMode ? 'text-center bg-gray-800 border border-gray-700 shadow-md rounded-lg py-10 px-6' : 'text-center bg-white shadow-md rounded-lg py-10 px-6'}`}>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-4`}>Ready to Explore Your Climate Impact?</h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 max-w-xl mx-auto`}>
            Start your journey with ECOLENS AI today and discover how your choices shape tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-6 py-3 font-medium" asChild>
              <a href="/upload">Start Analysis</a>
            </Button>
            <Button variant="outline" size="lg" className="flex items-center px-6 py-3">
              <Github className="h-5 w-5 mr-2" />
              View Source
            </Button>
            <Button variant="outline" size="lg" className="flex items-center px-6 py-3">
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
