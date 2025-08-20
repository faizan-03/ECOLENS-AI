import { Leaf } from 'lucide-react';
import { FaGithub, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <Leaf className={`h-6 w-6 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
              <span className="text-lg font-semibold">ECOLENS AI</span>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md leading-relaxed`}>
              AI-powered climate analysis and action tracking for a sustainable future.
            </p>
          </div>

          {}
          <div>
            <h3 className="text-sm font-medium mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/faizan-03/ECOLENS-AI" 
                 className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}>
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" 
                 className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors duration-200`}>
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@ecolens.ai" 
                 className={`${isDarkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-600'} transition-colors duration-200`}>
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className={`text-xs flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2025 ECOLENS AI. Made with <FaHeart className="h-3 w-3 text-red-500 mx-1" /> for our planet.
            </p>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="#" className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                Privacy
              </a>
              <a href="#" className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
