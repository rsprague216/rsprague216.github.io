import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { featuredRepos } from '../data/featured'
import HeroSection from '../components/home/HeroSection'
import FeaturedProjects from '../components/home/FeaturedProjects'

function Home() {
  const { repos, loading, error } = useGitHubRepos()
  const featured = repos.filter(r => featuredRepos.includes(r.name))

  return (
    <>
      <HeroSection
        name="Ryan Sprague"
        title="Full-Stack Software Developer"
        bio={[
          "I build web applications across the full stack — React, .NET Blazor, Bootstrap, and TailwindCSS on the front end; C#, Node.js, ASP.NET, and SQL on the back end. My professional background includes NetSuite ERP development with SuiteScript, where I built custom implementations for enterprise clients.",
        ]}
        imageSrc="/ryan_grad.jpg"
      />
      <FeaturedProjects projects={featured} loading={loading} error={error} />
    </>
  )
}

export default Home
