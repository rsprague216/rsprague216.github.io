import type { Project } from '../../data/projects'
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'

interface ProjectGridProps {
  projects: Project[]
  loading: boolean
  error: string | null
}

function ProjectGrid({ projects, loading, error }: ProjectGridProps) {
  return (
    <section>
      {error && (
        <p className="text-slate-500 text-sm">Could not load projects: {error}</p>
      )}
      {loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 6 }, (_, i) => <ProjectCardSkeleton key={i} />)}
        </div>
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
