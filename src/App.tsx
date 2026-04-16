import { useState } from 'react';
import About from './features/about/About';
import Contact from './features/contact/Contact';
import ThemeToggle from './features/header/ThemeToggle';
import Hero from './features/hero/Hero';
import Projects from './features/projects/Projects';
import Resume from './features/resume/Resume';
import Services from './features/services/Services';
import Sidebar from './features/sidebar/Sidebar';
import { useActiveSection } from './shared/hooks/useActiveSection';
import { useSmoothScroll } from './shared/hooks/useSmoothScroll';

const SECTIONS = [
  'home',
  'about',
  'services',
  'portfolio',
  'resume',
  'contact',
];

const NAV_LABELS: Record<string, string> = {
  home: 'Home',
  about: 'About',
  services: 'Services',
  portfolio: 'Works',
  resume: 'Resume',
  contact: 'Contact',
};

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTIONS);

  useSmoothScroll();

  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="main-wrap">
        {/* Top Navigation */}
        <nav className="top-nav" aria-label="Section navigation">
          <div className="top-nav-links">
            {SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={activeSection === section ? 'active' : ''}
              >
                {NAV_LABELS[section] ?? section}
              </a>
            ))}
          </div>

          <div className="top-nav-actions">
            <ThemeToggle />
          </div>
        </nav>

        {/* Sections in Professional Order */}
        <main>
          <section id="home">
            <Hero />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="services">
            <Services />
          </section>

          <section id="portfolio">
            <Projects />
          </section>

          <section id="resume">
            <Resume />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </main>

        {/* Footer */}
        <footer className="main-footer">
          <div className="footer-content">
            <span className="footer-brand">Basu Sharma</span>
            <span className="footer-copy">
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
            <span className="footer-built">
              Built with <span>React</span> + <span>TypeScript</span>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
