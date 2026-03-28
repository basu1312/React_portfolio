import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Background from './components/Background'

const App: React.FC = () => {
  return (
    <div className="app">
      <Background />
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
