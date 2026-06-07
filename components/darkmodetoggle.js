'use client'

import { useState, useEffect } from 'react'
import useDarkMode from '@/hooks/use-dark-mode'
import Button from './button'
import {Moon, Sun} from 'lucide-react'

export default function DarkModeToggle({defaultMode = 'dark'}) {
  const {theme, toggleTheme} = useDarkMode(defaultMode)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])
  
  // Prevent hydration mismatch by rendering placeholder until mounted
  if (!mounted) {
    return <Button variant="ghost" size="sm"><div className="w-4 h-4" /></Button>
  }
  
  return <Button variant="ghost" size="sm" onClick={toggleTheme}>
    {theme === 'light' && <Moon className="w-6 h-6" />}
    {theme === 'dark' && <Sun className="w-6 h-6" />}
  </Button>
}