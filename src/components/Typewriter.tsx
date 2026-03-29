import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Typewriter: React.FC<{ words: string[]; period?: number }> = ({ words, period = 2600 }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), period)
    return () => clearInterval(t)
  }, [words, period])

  return (
    <div className="typewriter">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default Typewriter
