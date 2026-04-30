import { useState, useCallback } from 'react'

const useDarkMode = (defaultTheme = 'dark') => {
  // Read actual DOM state to sync with server-rendered class
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return defaultTheme
    // Check if html has dark class (set by server)
    const hasDarkClass = document.documentElement.classList.contains('dark')
    return hasDarkClass ? 'dark' : 'light'
  })

  const setAndSaveTheme = useCallback((newTheme) => {
    console.log('Toggling to:', newTheme)
    console.log('Before - html classes:', document.documentElement.className)
    
    // Apply to DOM immediately (no delay)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
        
    // Update state
    setTheme(newTheme)
    
    // Save to localStorage and cookie
    localStorage.setItem('theme', newTheme)
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setAndSaveTheme(newTheme)
  }, [theme, setAndSaveTheme])

  return { theme, toggleTheme }
}

export default useDarkMode