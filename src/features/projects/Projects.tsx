import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import projects from './projectsData'

const Projects: React.FC = () => (
  <section id="portfolio" className="section">
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Portfolio
    </motion.h2>
    <div className="portfolio-grid">
      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i} />
      ))}
    </div>
  </section>
)

export default Projects
