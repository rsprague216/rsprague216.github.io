import { Link } from 'react-router-dom'

interface HeroSectionProps {
  name: string
  title: string
  bio: string[]
  imageSrc?: string
}

function HeroSection({ name, title, bio, imageSrc }: HeroSectionProps) {
  return (
    <section className="pt-10 pb-10 flex flex-col gap-8">
      <div className="flex flex-row items-center sm:items-stretch gap-6 sm:gap-10">
        {imageSrc && (
          <div className="w-20 h-20 sm:w-auto sm:h-auto sm:max-h-64 aspect-square shrink-0 rounded-lg overflow-hidden">
            <img src={imageSrc} alt={name} className="w-full h-full object-cover object-top scale-125 origin-top" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 mb-2 sm:mb-4">{name}</h1>
          <p className="text-base sm:text-xl text-slate-400">{title}</p>
          <div className="hidden sm:flex flex-col gap-4 mt-6">
            {bio.map((p, i) => (
              <p key={i} className="text-slate-300">{p}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:hidden">
        {bio.map((p, i) => (
          <p key={i} className="text-slate-300">{p}</p>
        ))}
      </div>
      <div className="flex gap-4">
        <Link
          to="/projects"
          className="px-6 py-3 bg-slate-100 text-slate-900 font-medium rounded hover:bg-white transition-colors"
        >
          View Projects
        </Link>
        <Link
          to="/about"
          className="px-6 py-3 border border-slate-600 text-slate-300 rounded hover:border-slate-400 hover:text-slate-100 transition-colors"
        >
          About Me
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
