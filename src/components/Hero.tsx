import { motion } from 'framer-motion'
import React from 'react'

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        Hi, I'm Your Name
      </motion.h1>
      <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        I build delightful web experiences with React, TypeScript, and thoughtful animation.
      </motion.p>
      <motion.a href="#projects" className="cta" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        View Projects
      </motion.a>
    </section>
  )
}

export default Hero
