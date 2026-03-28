import React, { useEffect, useState } from 'react'

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])

  return (
    <button
      aria-label="Toggle theme"
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zM18.24 4.84l1.79-1.79 1.79 1.79-1.79 1.79-1.79-1.79zM20 11v2h3v-2h-3zM6.76 19.16l-1.79 1.79L3.17 19.16l1.79-1.79 1.8 1.79zM17 21h2v-3h-2v3zM12 6a6 6 0 100 12 6 6 0 000-12z" fill="currentColor"/></svg>
      )}
    </button>
  )
}

export default ThemeToggle
