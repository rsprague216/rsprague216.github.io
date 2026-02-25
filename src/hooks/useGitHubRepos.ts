import { useState, useEffect } from 'react'
import { type GitHubRepo, type Project, mapRepo } from '../data/projects'

interface UseGitHubReposResult {
  repos: Project[]
  loading: boolean
  error: string | null
}

export function useGitHubRepos(): UseGitHubReposResult {
  const [repos, setRepos] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/users/rsprague216/repos?per_page=100&sort=pushed')
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
        return res.json() as Promise<GitHubRepo[]>
      })
      .then(data => {
        setRepos(data.filter(r => !r.fork && r.name !== 'rsprague216.github.io').map(mapRepo))
        setLoading(false)
      })
      .catch(err => {
        setError((err as Error).message)
        setLoading(false)
      })
  }, [])

  return { repos, loading, error }
}
