import { motion, useScroll, useTransform } from 'framer-motion'

const Background: React.FC = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, -120])
  const y2 = useTransform(scrollY, [0, 800], [0, -70])
  const y3 = useTransform(scrollY, [0, 800], [0, -30])

  return (
    <div aria-hidden="true" className="background-blobs">
      <motion.div
        className="bg-blob blob1"
        style={{ y: y1 }}
        animate={{ x: [0, 30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-blob blob2"
        style={{ y: y2 }}
        animate={{ x: [0, -20, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-blob blob3"
        style={{ y: y3 }}
        animate={{ x: [0, 10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
    </div>
  )
}

export default Background
