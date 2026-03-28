import { motion } from 'framer-motion'
import React from 'react'
import type { Project } from '../data/projects'

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.a
      className="card project-card"
      href={project.link}
      target="_blank"
      rel="noreferrer"
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.24 }}
    >
      <div className="card-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">{project.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      </div>
      <div className="card-overlay">
        <div className="overlay-actions">
          <a className="cta" href={project.link} target="_blank" rel="noreferrer">Open</a>
        </div>
      </div>
    </motion.a>
  )
}

export default ProjectCard
