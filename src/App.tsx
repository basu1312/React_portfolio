import { useState } from 'react'
import About from './features/about/About'
import Contact from './features/contact/Contact'
import ThemeToggle from './features/header/ThemeToggle'
import Hero from './features/hero/Hero'
import Projects from './features/projects/Projects'
import Resume from './features/resume/Resume'
import Services from './features/services/Services'
import Sidebar from './features/sidebar/Sidebar'
import { useActiveSection } from './shared/hooks/useActiveSection'
import { useSmoothScroll } from './shared/hooks/useSmoothScroll'

const SECTIONS = ['home', 'about', 'services', 'resume', 'portfolio', 'contact']

const NAV_LABELS: Record<string, string> = {
  home: 'Home',
  about: 'About',
  services: 'Services',
  resume: 'Resume',
  portfolio: 'Works',
  contact: 'Contact',
}

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTIONS)
  useSmoothScroll()

  return (
    <div className="layout">
      <Sidebar
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
                {NAV_LABELS[s] ?? s}
              </a>
            ))}
          </div>
          <div className="top-nav-actions">
            <ThemeToggle />
          </div>
        </nav>
        <Hero />
        <About />
        <Services />
        <Resume />
        <Projects />
        <Contact />
        <footer className="main-footer">
          <div className="footer-content">
            <span className="footer-brand">Basu Sharma</span>
            <span className="footer-copy">&copy; {new Date().getFullYear()} All rights reserved.</span>
            <span className="footer-built">
              Built with <span>React</span> + <span>TypeScript</span>
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App

