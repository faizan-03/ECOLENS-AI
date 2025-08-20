import { cn } from "@/utils/cn"
import { forwardRef, useContext } from "react"
import ThemeContext from '@/context/ThemeContext'

const Button = forwardRef(({ 
  children, 
  variant = "default", 
  size = "default", 
  className, 
  asChild = false,
  ...props 
}, ref) => {
  const { isDarkMode } = useContext(ThemeContext)
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
  
  const variants = {
    default: cn("bg-green-500 text-white hover:bg-green-600", isDarkMode && "ring-0"),
    destructive: cn("bg-red-500 text-white hover:bg-red-600", isDarkMode && "ring-0"),
    outline: isDarkMode ? "border border-gray-600 bg-gray-800 text-gray-100 hover:bg-gray-700" : "border border-gray-300 hover:bg-gray-100 hover:text-gray-900",
    secondary: isDarkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: isDarkMode ? "hover:bg-gray-800 hover:text-white" : "hover:bg-gray-100 hover:text-gray-900",
    link: "underline-offset-4 hover:underline text-green-500"
  }
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md"
  }

  const Comp = asChild ? "span" : "button"

  return (
    <Comp
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  )
})

Button.displayName = "Button"

export default Button
