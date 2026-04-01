import { useEffect, useState } from 'react'
import About from './features/about/About'
import Contact from './features/contact/Contact'
import ThemeToggle from './features/header/ThemeToggle'
import Hero from './features/hero/Hero'
import Projects from './features/projects/Projects'
import Resume from './features/resume/Resume'
import Sidebar from './features/sidebar/Sidebar'

const SECTIONS = ['home', 'about', 'resume', 'portfolio', 'contact']

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY + 120 >= el.offsetTop) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const smoothScrollTo = (targetY: number, duration = 860) => {
      const startY = window.scrollY
      const diff = targetY - startY
      if (Math.abs(diff) < 1) return
      const startTime = performance.now()
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        window.scrollTo(0, startY + diff * easeInOutCubic(progress))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const handler = (e: MouseEvent) => {
      const target = e.target as Element
      const anchor = target.closest && (target.closest('a') as HTMLAnchorElement | null)
      if (!anchor) return
      const href = anchor.getAttribute('href') || ''
      if (!href.startsWith('#')) return
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      smoothScrollTo(el.getBoundingClientRect().top + window.scrollY)
      try {
        history.pushState(null, '', href)
      } catch {}
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div className="layout">
      <Sidebar
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <div className="main-wrap">
        <nav className="top-nav" aria-label="Section navigation">
          <div className="top-nav-links">
            {SECTIONS.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className={activeSection === s ? 'active' : ''}
              >
                {s === 'portfolio' ? 'Works' : s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </div>
          <div className="top-nav-actions">
            <ThemeToggle />
          </div>
        </nav>
        <Hero />
        <About />
        <Resume />
        <Projects />
        <Contact />
        <footer className="main-footer">
          &copy; {new Date().getFullYear()} Basu Sharma. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default App
