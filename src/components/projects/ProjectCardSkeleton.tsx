function ProjectCardSkeleton() {
  return (
    <div className="relative">
      {/* Invisible spacer — mirrors ProjectCard's spacer to reserve the same grid height */}
      <div className="invisible pointer-events-none p-6 flex flex-col gap-4" aria-hidden="true">
        <div>
          <p className="text-lg font-semibold">&nbsp;</p>
          <p className="text-sm mt-1">&nbsp;</p>
        </div>
        <p className="text-sm">&nbsp;<br />&nbsp;</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-xs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="px-3 py-1 text-xs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="px-3 py-1 text-xs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <p className="text-sm">&nbsp;</p>
      </div>

      {/* Skeleton card — absolutely positioned over the spacer, animated */}
      <div className="absolute inset-0 bg-slate-800 rounded-lg p-6 flex flex-col gap-4 animate-pulse">
        <div>
          <div className="h-5 bg-slate-700 rounded w-3/5" />
          <div className="h-3 bg-slate-700 rounded w-2/5 mt-2" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-slate-700 rounded" />
          <div className="h-3 bg-slate-700 rounded w-4/5" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-5 bg-slate-700 rounded-full w-14" />
          <div className="h-5 bg-slate-700 rounded-full w-14" />
          <div className="h-5 bg-slate-700 rounded-full w-14" />
        </div>
        <div className="h-3 bg-slate-700 rounded w-20" />
      </div>
    </div>
  )
}

export default ProjectCardSkeleton
