import { useGitHubRepos } from '../hooks/useGitHubRepos'
import ProjectGrid from '../components/ProjectGrid'

function Projects() {
  const { repos, loading, error } = useGitHubRepos()

  return <ProjectGrid projects={repos} loading={loading} error={error} />
}

export default Projects
