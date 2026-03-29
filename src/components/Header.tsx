import profile from '../data/profile'
import ThemeToggle from './ThemeToggle'

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="container header-grid">
        <div className="header-left">
          <a className="logo" href="#">{profile.name}</a>
        </div>

        <div className="header-center">
          <nav>
            <a href="#projects">Selected Projects</a>
            <a href="#about">About Me</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="header-right">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
