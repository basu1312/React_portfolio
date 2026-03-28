import { motion } from 'framer-motion'
import profile from '../data/profile'

const About: React.FC = () => (
  <section id="about" className="container about">
    <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>About Me</motion.h2>
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
      {profile.summary}
    </motion.p>

    <h3 style={{ marginTop: 18 }}>Key Skills</h3>
    <div style={{ marginTop: 8 }}>
      {Object.entries(profile.skills).map(([group, items]) => (
        <div key={group} style={{ marginBottom: 8 }}>
          <strong style={{ textTransform: 'capitalize' }}>{group}:</strong>{' '}
          {(items as string[]).slice(0, 6).join(', ')}
        </div>
      ))}
    </div>
  </section>
)

export default About
