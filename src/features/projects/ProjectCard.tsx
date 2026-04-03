import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTiltCard } from './hooks/useTiltCard'
import type { Project } from './projectsData'

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [imgError, setImgError] = useState(false)
  const { cardRef, handleMouseMove, handleMouseLeave } = useTiltCard()

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {project.image && !imgError ? (
        <img
          className="project-card-img"
          src={project.image}
          alt={project.title}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="project-card-img-placeholder" aria-hidden>
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </div>
      )}
      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((t) => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="project-card-link"
          >
            View Project &#8594;
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default ProjectCard
