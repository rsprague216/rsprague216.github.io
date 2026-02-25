import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ProjectCard({ project }: ProjectCardProps) {
  function handleCardClick() {
    window.open(project.githubUrl, '_blank')
  }

  return (
    <div className="relative">
      {/* Invisible spacer — reserves grid height matching the collapsed card */}
      <div className="invisible pointer-events-none p-6 flex flex-col gap-4" aria-hidden="true">
        <div>
          <p className="text-lg font-semibold">&nbsp;</p>
          <p className="text-sm mt-1">&nbsp;</p>
        </div>
        <p className="text-sm line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="px-3 py-1 text-xs">{t}</span>
          ))}
        </div>
        <p className="text-sm">&nbsp;</p>
      </div>

      {/* Actual card — absolutely positioned, expands in all directions on hover */}
      <div
        className="group absolute inset-0 hover:-top-4 hover:-left-4 hover:-right-4 hover:bottom-auto hover:min-h-[calc(100%+2rem)] z-10 hover:z-20 bg-slate-800 rounded-lg p-6 flex flex-col gap-4 transition-all duration-200 hover:shadow-2xl hover:shadow-black/50 cursor-pointer"
        onClick={handleCardClick}
      >
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
          <p className="text-sm text-slate-500 mt-1">Updated {formatDate(project.pushedAt)}</p>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2 group-hover:line-clamp-none">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="bg-slate-700 text-slate-300 rounded-full px-3 py-1 text-xs">
              {t}
            </span>
          ))}
        </div>
        <div className="flex text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-slate-400 hover:text-slate-100 transition-colors"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
