import projects from '../data/projects'
import ProjectCard from './ProjectCard'


const Projects: React.FC = () => {
  return (
    <section id="projects" className="container projects">
      <h2>Selected Projects</h2>
      <div className="grid">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  )
}

export default Projects

