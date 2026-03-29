import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Project } from '../data/projects'

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [imgError, setImgError] = useState(false)

  const media = project.image && !imgError ? (
    <div className="card-media">
      <img src={project.image} alt={project.title} onError={() => setImgError(true)} />
      <div className="media-caption">
        <h3>{project.title}</h3>
        <p className="media-sub">{project.description}</p>
      </div>
    </div>
  ) : (
    <div className="card-media placeholder">
      <div className="media-caption">
        <h3>{project.title}</h3>
        <p className="media-sub">{project.description}</p>
      </div>
    </div>
  )

  const body = (
    <>
      {media}
      <div className="card-body">
        {!media && <h3>{project.title}</h3>}
        {!media && <p>{project.description}</p>}
        <div className="tags">{project.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      </div>
      {project.link && (
        <div className="card-overlay">
          <div className="overlay-actions">
            <a className="cta" href={project.link} target="_blank" rel="noreferrer">Open</a>
          </div>
        </div>
      )}
    </>
  )

  if (project.link) {
    return (
      <motion.a
        className="card project-card"
        href={project.link}
        target="_blank"
        rel="noreferrer"
        initial={{ y: 12, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.36 }}
      >
        {body}
      </motion.a>
    )
  }

  return (
    <motion.div
      className="card project-card"
      role="article"
      initial={{ y: 12, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.36 }}
    >
      {body}
    </motion.div>
  )
}

export default ProjectCard
