import { motion } from 'framer-motion'
import profile from '../../data/profile'
import { useIntersectionVisible } from './hooks/useIntersectionVisible'
import { useResumeFile } from './hooks/useResumeFile'
import Typewriter from './Typewriter'

const STATS = [
  { number: '7+', label: 'Years\nExperience' },
  { number: '58+', label: 'Components\nBuilt' },
  { number: '40-60%', label: 'Dev Productivity\nGain via AI' },
  { number: '4+', label: 'Enterprise\nClients' },
]

interface StatProps {
  readonly number: string
  readonly label: string
  readonly delay: number
}

function AnimatedStat({ number, label, delay }: StatProps) {
  const { ref, visible } = useIntersectionVisible<HTMLDivElement>()

  return (
    <motion.div
      ref={ref}
      className="hero-stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="hero-stat-number">{number}</div>
      <div className="hero-stat-label">{label.replace('\n', ' ')}</div>
    </motion.div>
  )
}

const Hero: React.FC = () => {
  const words = [
    profile.title,
    'React + TypeScript Expert',
    'Design Systems Architect',
    'Micro-Frontend Engineer',
    'AI-Assisted Developer',
  ]
  const { url: resumeUrl, downloadName } = useResumeFile()

  return (
    <section id="home" className="section hero-section">
      {/* Ambient floating blobs */}
      <div className="hero-ambient" aria-hidden>
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      <div className="hero-content">
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
            <a href="#contact" className="btn-outline">Hire Me</a>
          </div>
        </motion.div>

        {/* Animated stats row */}
        <div className="hero-stats">
          {STATS.map((stat, i) => (
            <AnimatedStat key={stat.label} number={stat.number} label={stat.label} delay={0.7 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

