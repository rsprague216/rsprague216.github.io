import type { Project } from '../../data/projects'
import ProjectCard from '../projects/ProjectCard'
import ProjectCardSkeleton from '../projects/ProjectCardSkeleton'

interface FeaturedProjectsProps {
  projects: Project[]
  loading: boolean
  error: string | null
}

function FeaturedProjects({ projects, loading, error }: FeaturedProjectsProps) {
  return (
    <section className="pb-6">
      <h2 className="text-2xl font-semibold text-slate-100 mb-6">Featured Projects</h2>
      {error && (
        <p className="text-slate-500 text-sm">Could not load projects: {error}</p>
      )}
      {loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
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

export default FeaturedProjects
