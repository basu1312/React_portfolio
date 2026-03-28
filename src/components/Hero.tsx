import React from 'react'
import { motion } from 'framer-motion'
import profile from '../data/profile'

const Hero: React.FC = () => {
  const intro = profile.summary.split('.').slice(0, 1).join('').trim() + '.'
  return (
    <section id="hero" className="hero">
      <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        Hi, I'm {profile.name}
      </motion.h1>
      <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        {intro}
      </motion.p>
      <div style={{ marginTop: 18, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <motion.a href="#projects" className="cta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          View Projects
        </motion.a>
        <motion.a href="/Basu_Sharma_Resume.txt" className="cta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          Download Resume
        </motion.a>
      </div>
    </section>
  )
}

export default Hero
