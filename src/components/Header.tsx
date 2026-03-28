import React from 'react'
import profile from '../data/profile'

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="container">
        <a className="logo" href="#">{profile.name}</a>
        <nav>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
