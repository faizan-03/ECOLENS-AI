import { useState, useEffect } from 'react'
import { STORAGE_KEYS } from '../utils/constants'

export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, 'light')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return { theme, setTheme, toggleTheme }
}

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage(STORAGE_KEYS.USER_PREFERENCES, {
    units: 'metric', // 'metric' or 'imperial'
    notifications: true,
    dataSharing: false,
    language: 'en',
  })

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return { preferences, updatePreference, setPreferences }
}
