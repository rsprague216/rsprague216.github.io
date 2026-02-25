import type { Project } from '../data/projects'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
  loading: boolean
  error: string | null
}

function ProjectGrid({ projects, loading, error }: ProjectGridProps) {
  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-100 mb-8">Projects</h1>
      {error && (
        <p className="text-slate-500 text-sm">Could not load projects: {error}</p>
      )}
      {loading && !error && (
        <p className="text-slate-500 text-sm">Loading...</p>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectGrid
