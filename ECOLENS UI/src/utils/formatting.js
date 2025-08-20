// Format large numbers with proper units
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Format CO2 values
export const formatCO2 = (kg) => {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} tons`
  }
  return `${kg.toFixed(0)} kg`
}

// Format temperature with degree symbol
export const formatTemperature = (temp) => {
  return `${temp}°C`
}

// Format percentage
export const formatPercentage = (value, decimals = 0) => {
  return `${value.toFixed(decimals)}%`
}

// Convert file size to human readable format
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Validate image file
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please select a valid image file (JPEG, PNG, GIF, WebP)' }
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' }
  }
  
  return { valid: true }
}

// Validate URL
export const validateImageUrl = (url) => {
  try {
    new URL(url)
    return { valid: true }
  } catch {
    return { valid: false, error: 'Please enter a valid URL' }
  }
}

// Calculate color intensity based on value
export const getIntensityColor = (value, max, colors = ['green', 'yellow', 'red']) => {
  const intensity = Math.min(value / max, 1)
  
  if (intensity < 0.33) return colors[0]
  if (intensity < 0.66) return colors[1]
  return colors[2]
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
