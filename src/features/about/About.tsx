import { motion } from 'framer-motion'
import profile from '../../data/profile'

const About: React.FC = () => (
  <section id="about" className="section">
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      About Me
    </motion.h2>

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
              <a
                href={`mailto:${profile.email}`}
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                {profile.email}
              </a>
            </span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Phone</span>
            <span className="about-info-value">{profile.phone}</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Availability</span>
            <span className="about-info-value" style={{ color: 'var(--accent)' }}>
              Open to work
            </span>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Skills */}
    <motion.div
      className="skills-section"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="skills-section-title">My Skills</h3>
      {Object.entries(profile.skills).map(([group, items]) => (
        <div key={group} className="skills-category">
          <div className="skills-category-label">{group}</div>
          <div className="skills-grid">
            {items.map((skill: string) => (
              <div key={skill} className="skill-tag">
                <span className="skill-dot" aria-hidden />
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  </section>
)

export default About

