import React from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Resume from './components/Resume'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
        <Resume />
      </main>
      <Footer />
    </div>
  )
}

export default App
