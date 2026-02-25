interface ProjectFilterProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  availableTech: string[]
  selectedTech: string[]
  onTechToggle: (tech: string) => void
  showTechFilter: boolean
  onToggleTechFilter: () => void
  sortOrder: 'recent' | 'alphabetical'
  onSortChange: (order: 'recent' | 'alphabetical') => void
}

function ProjectFilter({
  searchQuery,
  onSearchChange,
  availableTech,
  selectedTech,
  onTechToggle,
  showTechFilter,
  onToggleTechFilter,
  sortOrder,
  onSortChange,
}: ProjectFilterProps) {
  const activeCount = selectedTech.length

  function toggleSort() {
    onSortChange(sortOrder === 'recent' ? 'alphabetical' : 'recent')
  }

  return (
    <div className="mb-6">
      {/* Row 1: search | filter button | sort toggle — flush button group */}
      <div className="flex items-stretch bg-slate-800 border border-slate-700 rounded-lg overflow-hidden mb-2">
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search projects…"
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 px-4 py-2 text-sm focus:outline-none"
        />

        <button
          onClick={onToggleTechFilter}
          className={`flex items-center gap-1.5 px-3 py-2 text-sm border-l border-slate-700 transition-colors cursor-pointer ${
            showTechFilter || activeCount > 0
              ? 'bg-sky-700 text-sky-100'
              : 'text-slate-400 hover:text-slate-100'
          }`}
          title="Filter by technology"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
              clipRule="evenodd"
            />
          </svg>
          Filter{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>

        <button
          onClick={toggleSort}
          className="flex items-center justify-center gap-1.5 w-24 py-2 text-sm border-l border-slate-700 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          title={sortOrder === 'recent' ? 'Sort: recently updated — click for A–Z' : 'Sort: A–Z — click for recently updated'}
        >
          {sortOrder === 'recent' ? (
            /* Clock icon — recently updated */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            /* A–Z bars icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2 3.75A.75.75 0 0 1 2.75 3h11.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 7.5a.75.75 0 0 1 .75-.75h7.508a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.5ZM14 7a.75.75 0 0 1 .75.75v6.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 1 1 1.1-1.02l1.95 2.1V7.75A.75.75 0 0 1 14 7ZM2 11.25a.75.75 0 0 1 .75-.75h4.508a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {sortOrder === 'recent' ? 'Recent' : 'A–Z'}
        </button>
      </div>


      {/* Row 2: tech pills (collapsible) */}
      {showTechFilter && availableTech.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {availableTech.map(tech => (
            <button
              key={tech}
              onClick={() => onTechToggle(tech)}
              className={`rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
                selectedTech.includes(tech)
                  ? 'bg-sky-700 text-sky-100'
                  : 'bg-slate-700 text-slate-400 hover:text-slate-100'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectFilter
