import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import profile from '../../data/profile'
import Typewriter from './Typewriter'

const Hero: React.FC = () => {
  const words = [
    profile.title,
    'React + TypeScript Expert',
    'Design Systems Architect',
    'Micro-Frontend Engineer',
    'AI-Assisted Developer',
  ]
  const [resumeUrl, setResumeUrl] = useState('/Basu_Sharma_Resume.txt')
  const [downloadName, setDownloadName] = useState('Basu_Sharma_Resume.txt')

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      try {
        const r = await fetch('/Basu_Sharma_Resume.pdf', { method: 'HEAD' })
        if (!cancelled && r.ok) {
          setResumeUrl('/Basu_Sharma_Resume.pdf')
          setDownloadName('Basu_Sharma_Resume.pdf')
          return
        }
      } catch {}
      try {
        const r2 = await fetch('/Basu_Sharma_Resume.txt', { method: 'HEAD' })
        if (!cancelled && r2.ok) {
          setResumeUrl('/Basu_Sharma_Resume.txt')
          setDownloadName('Basu_Sharma_Resume.txt')
        }
      } catch {}
    }
    check()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="home" className="section hero-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-title">
          {profile.name}<span className="accent">.</span>
        </h1>
        <p className="hero-typewriter">
          I'm a&nbsp;<span className="tw-word"><Typewriter words={words} /></span>
        </p>
        <p className="hero-bio">
          Lead Frontend Engineer with 7+ years delivering scalable, secure, and
          high-performance web applications for Banking, E-Commerce and financial
          systems. Specialist in React, TypeScript, Design Systems and
          Micro-Frontend Architecture.
        </p>
        <div className="hero-cta">
          <a href="#about" className="btn-primary">More About Me</a>
          <a href={resumeUrl} download={downloadName} className="btn-outline">
            Download CV
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M12 15V3m0 12l-4-4m4 4l4-4M4 21h16" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
