import { useEffect } from 'react'
import About from './components/About'
import Background from './components/Background'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'

const App: React.FC = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element
      const anchor = target.closest && (target.closest('a') as HTMLAnchorElement | null)
      if (!anchor) return
      const href = anchor.getAttribute('href') || ''
      if (!href.startsWith('#')) return
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) return
      // internal anchor: smooth scroll to element accounting for sticky header
      e.preventDefault()
      const header = document.querySelector('.site-header') as HTMLElement | null
      const headerHeight = header ? header.getBoundingClientRect().height : 0
      const top = window.scrollY + el.getBoundingClientRect().top - headerHeight - 12
      window.scrollTo({ top, behavior: 'smooth' })
      // update URL hash without jumping
      try {
        history.pushState(null, '', href)
      } catch {}
    }

    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div className="app">
      <Background />
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
