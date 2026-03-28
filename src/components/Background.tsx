import React from 'react'
import { motion } from 'framer-motion'

const Background: React.FC = () => {
  return (
    <div aria-hidden="true" className="background-blobs">
      <motion.div
        className="bg-blob blob1"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-blob blob2"
        animate={{ x: [0, -20, 0], y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-blob blob3"
        animate={{ x: [0, 10, 0], y: [0, -5, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
    </div>
  )
}

export default Background
