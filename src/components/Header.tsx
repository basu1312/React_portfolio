import profile from '../data/profile'
import ThemeToggle from './ThemeToggle'

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="container header-grid">
        <div className="header-left">
          <a className="logo" href="#">{profile.name}</a>
        </div>

        <div className="header-right">
          <nav>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#resume">Resume</a>
            <a href="#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
