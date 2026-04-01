import { motion } from 'framer-motion'
import profile from '../../data/profile'

const Resume: React.FC = () => (
  <section id="resume" className="section">
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Resume
    </motion.h2>

    <div className="resume-cols">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <div className="timeline-col-title">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
          </svg>
          Experience
        </div>
        <div className="timeline">
          {profile.experiences.map((exp) => (
            <div key={exp.role} className="timeline-item">
              <span className="timeline-badge">{exp.period}</span>
              <div className="timeline-title">{exp.role}</div>
              <div className="timeline-company">{exp.company}</div>
              <div className="timeline-desc">
                <ul>
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="timeline-col-title">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
            <path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5" />
          </svg>
          Education &amp; Certifications
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <span className="timeline-badge">2014 &ndash; 2018</span>
            <div className="timeline-title">{profile.Education.degree}</div>
            <div className="timeline-company">{profile.Education.school}</div>
          </div>
          {profile.Certifications.map((cert) => (
            <div key={cert} className="timeline-item">
              <span className="timeline-badge">Certification</span>
              <div className="timeline-title">{cert}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)

export default Resume
