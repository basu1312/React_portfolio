import { withSectionHeading } from '../../shared/hoc/withSectionHeading'
import ProjectCard from './ProjectCard'
import projects from './projectsData'

const ProjectsContent: React.FC = () => (
  <div className="portfolio-grid">
    {projects.map((p, i) => (
      <ProjectCard key={p.title} project={p} index={i} />
    ))}
  </div>
)

const Projects = withSectionHeading(ProjectsContent, {
  sectionId: 'portfolio',
  prefix: 'Featured',
  gradient: 'Projects',
})

export default Projects

