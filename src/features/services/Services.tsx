import { motion } from 'framer-motion'

const services = [
  {
    id: 1,
    colorClass: '1',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3" />
        <line x1="13" y1="11" x2="17" y2="11" />
      </svg>
    ),
    title: 'Frontend Architecture Consulting',
    desc: 'Defining scalable UI architectures for enterprise banking and financial systems. From micro-frontend blueprints to component-driven standards — built to last at scale.',
    tags: ['React', 'TypeScript', 'Module Federation', 'Architecture', 'Azure DevOps'],
  },
  {
    id: 2,
    colorClass: '2',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    title: 'Design System Engineering',
    desc: 'Building world-class component libraries — 58+ production components with Storybook documentation, WCAG 2.1 accessibility compliance, and Styled Components workflows.',
    tags: ['Design Systems', 'Storybook', 'WCAG 2.1', 'Styled Components', 'MUI'],
  },
  {
    id: 3,
    colorClass: '3',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Micro-Frontend Implementation',
    desc: 'Architecting Module Federation workflows with Webpack, enabling independent deployments, parallel team velocity, and seamless migration from legacy monoliths.',
    tags: ['Webpack', 'Module Federation', 'Micro-MFE', 'CI/CD', 'Independent Deploys'],
  },
  {
    id: 4,
    colorClass: '4',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI-Assisted Engineering',
    desc: 'Integrating RAG pipelines, Model Context Protocol (MCP) systems, and GitHub Copilot workflows — proven to accelerate engineering productivity by 40–60% while maintaining type safety.',
    tags: ['RAG', 'MCP', 'GitHub Copilot', 'Prompt Engineering', 'TypeScript'],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const Services: React.FC = () => (
  <section id="services" className="section">
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Consulting <span className="section-title-gradient">Services</span>
    </motion.h2>

    <motion.div
      className="services-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {services.map((svc) => (
        <motion.div
          key={svc.id}
          className={`service-card service-card-${svc.colorClass}`}
          variants={cardVariants}
        >
          <div className={`service-icon-wrap service-icon-${svc.colorClass}`}>
            {svc.icon}
          </div>
          <span className="service-number">{String(svc.id).padStart(2, '0')}</span>
          <div className="service-title">{svc.title}</div>
          <p className="service-desc">{svc.desc}</p>
          <div className="service-tags">
            {svc.tags.map((t) => (
              <span key={t} className={`service-tag service-tag-${svc.colorClass}`}>{t}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
)

export default Services
