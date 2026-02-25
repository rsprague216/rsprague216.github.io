import { useState, useMemo } from 'react'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import ProjectGrid from '../components/projects/ProjectGrid'
import ProjectFilter from '../components/projects/ProjectFilter'

function Projects() {
  const { repos, loading, error } = useGitHubRepos()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'recent' | 'alphabetical'>('recent')
  const [showTechFilter, setShowTechFilter] = useState(false)

  const availableTech = useMemo(
    () => [...new Set(repos.flatMap(r => r.tech))].sort(),
    [repos]
  )

  const filteredRepos = useMemo(() => {
    let result = repos
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        r =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      )
    }
    if (selectedTech.length > 0) {
      result = result.filter(r => r.tech.some(t => selectedTech.includes(t)))
    }
    if (sortOrder === 'alphabetical') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    }
    return result
  }, [repos, searchQuery, selectedTech, sortOrder])

  return (
    <>
      <h1 className="text-3xl font-bold text-slate-100 mb-8">Projects</h1>
      {!loading && (
        <ProjectFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          availableTech={availableTech}
          selectedTech={selectedTech}
          onTechToggle={tech =>
            setSelectedTech(prev =>
              prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
            )
          }
          showTechFilter={showTechFilter}
          onToggleTechFilter={() => setShowTechFilter(s => !s)}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      )}
      <ProjectGrid projects={filteredRepos} loading={loading} error={error} />
    </>
  )
}

export default Projects
