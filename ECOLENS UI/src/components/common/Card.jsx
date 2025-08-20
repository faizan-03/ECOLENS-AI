import { cn } from "@/utils/cn"
import { useContext } from 'react'
import ThemeContext from '@/context/ThemeContext'

const Card = ({ children, className, ...props }) => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <div
      className={cn(
        "rounded-lg border shadow-sm transition-colors duration-200",
        isDarkMode 
          ? "border-gray-700 bg-gray-800 text-gray-100" 
          : "border-gray-200 bg-white text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const CardTitle = ({ children, className, ...props }) => {
  const { isDarkMode } = useContext(ThemeContext)
  
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight", 
        isDarkMode ? "text-gray-100" : "text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

const CardDescription = ({ children, className, ...props }) => {
  const { isDarkMode } = useContext(ThemeContext)
  
  return (
    <p
      className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600", className)}
      {...props}
    >
      {children}
    </p>
  )
}

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
