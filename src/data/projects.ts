export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  pushed_at: string
  fork: boolean
}

export interface Project {
  id: number
  name: string
  title: string
  description: string
  tech: string[]
  githubUrl: string
  liveUrl?: string
  pushedAt: string
}

export function mapRepo(repo: GitHubRepo): Project {
  return {
    id: repo.id,
    name: repo.name,
    title: repo.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    description: repo.description ?? '',
    tech: repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : []),
    githubUrl: repo.html_url,
    liveUrl: repo.homepage ?? undefined,
    pushedAt: repo.pushed_at,
  }
}
