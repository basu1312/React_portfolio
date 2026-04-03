import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import profile from '../../data/profile'

const SKILL_ICONS: Record<string, JSX.Element> = {
  frontend: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  architecture: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  ),
  UI: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
    </svg>
  ),
  AI: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  testing: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  DevOps: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  APIs: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
  Auth: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  Tools: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Accessibility: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
}

const TOP_PROFICIENCIES = [
  { name: 'React.js & Ecosystem', pct: 92 },
  { name: 'TypeScript', pct: 90 },
  { name: 'Micro-Frontend Architecture', pct: 87 },
  { name: 'Design System Engineering', pct: 85 },
  { name: 'AI-Assisted Development', pct: 83 },
  { name: 'CI/CD & DevOps', pct: 79 },
]

const ALL_TECH = [
  'React.js', 'TypeScript', 'Next.js', 'JavaScript', 'Redux Toolkit',
  'Module Federation', 'Webpack', 'MUI', 'Storybook', 'Styled Components',
  'Jest', 'React Testing Library', 'WCAG 2.1', 'NVDA',
  'Azure DevOps', 'GitHub Actions', 'RAG', 'MCP', 'GitHub Copilot',
  'REST APIs', 'OIDC', 'JWT', 'Figma', 'SonarQube', 'Jira',
]

interface ProficiencyProps {
  readonly name: string
  readonly pct: number
  readonly delay: number
}

function ProficiencyBar({ name, pct, delay }: ProficiencyProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAnimate(true), delay * 1000)
      return () => clearTimeout(t)
    }
  }, [inView, delay])

  return (
    <div className="proficiency-item" ref={ref}>
      <div className="proficiency-header">
        <span className="proficiency-name">{name}</span>
        <span className="proficiency-pct">{pct}%</span>
      </div>
      <div className="proficiency-track">
        <div
          className={`proficiency-fill${animate ? ' animate' : ''}`}
          style={{ width: `${pct}%`, transform: animate ? 'scaleX(1)' : 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}

const About: React.FC = () => (
  <section id="about" className="section">
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      About <span className="section-title-gradient">Me</span>
    </motion.h2>

    {/* Bio + Info grid */}
    <div className="about-grid">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <p className="about-text">{profile.summary}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        <div className="about-info-grid">
          <div className="about-info-item">
            <span className="about-info-label">Full Name</span>
            <span className="about-info-value">{profile.name}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Current Role</span>
            <span className="about-info-value">{profile.title}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Location</span>
            <span className="about-info-value">{profile.location}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Email</span>
            <span className="about-info-value">
              <a href={`mailto:${profile.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                {profile.email}
              </a>
            </span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Experience</span>
            <span className="about-info-value">7+ Years</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Availability</span>
            <span className="about-info-value" style={{ color: 'var(--availability-text)' }}>
              ● Open to work
            </span>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Scrolling tech marquee */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <div className="marquee-section">
        <div className="marquee-track">
          {[...ALL_TECH, ...ALL_TECH].map((tech, i) => (
            <span key={`${tech}-${i}`} className="marquee-item">
              {tech}
              <span className="marquee-dot" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Key Proficiencies */}
    <motion.div
      className="proficiency-section"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
    >
      <div className="proficiency-title">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
        Core Proficiencies
      </div>
      <div className="proficiency-grid">
        {TOP_PROFICIENCIES.map((p, i) => (
          <ProficiencyBar key={p.name} name={p.name} pct={p.pct} delay={i * 0.08} />
        ))}
      </div>
    </motion.div>

    {/* Skill category bento grid */}
    <motion.div
      className="skills-section"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="skills-section-title">Technology Stack</h3>
      <div className="skills-bento">
        {Object.entries(profile.skills).map(([group, items], idx) => (
          <motion.div
            key={group}
            className="skill-category-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
          >
            <div className="skill-cat-header">
              <div className="skill-cat-icon" aria-hidden>
                {SKILL_ICONS[group] ?? (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
              </div>
              <span className="skill-cat-name">{group}</span>
            </div>
            <div className="skill-chips">
              {items.map((skill: string) => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
)

export default About


