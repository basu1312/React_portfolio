import { motion } from 'framer-motion'
import profile from '../../data/profile'
import { withSectionHeading } from '../../shared/hoc/withSectionHeading'

const ResumeContent: React.FC = () => (
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
          Work Experience
        </div>
        <div className="timeline">
          {profile.experiences.map((exp) => (
            <div key={exp.role} className="timeline-item">
              <span className="timeline-badge">{exp.period}</span>
              <div className="timeline-title">{exp.role}</div>
              <div className="timeline-company">{exp.company}</div>
              {'clientProjects' in exp && exp.clientProjects ? (
                exp.clientProjects.map((cp) => (
                  <div key={cp.client} className="timeline-client-section">
                    <div className="timeline-client-header">
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      <span className="timeline-client-name">{cp.client}</span>
                      {'label' in cp && cp.label && (
                        <span className="timeline-client-label">{cp.label}</span>
                      )}
                    </div>
                    <div className="timeline-desc">
                      <ul>
                        {cp.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                'bullets' in exp && exp.bullets && (
                  <div className="timeline-desc">
                    <ul>
                      {(exp.bullets).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
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
)

const Resume = withSectionHeading(ResumeContent, {
  sectionId: 'resume',
  prefix: 'Resume &',
  gradient: 'Credentials',
})

export default Resume

