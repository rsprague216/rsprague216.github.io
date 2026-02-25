import { NavLink } from 'react-router-dom'

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-slate-100 transition-colors ${isActive ? 'text-slate-100' : ''}`

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold tracking-tight hover:text-slate-100 transition-colors">
          Ryan Sprague
        </NavLink>
        <nav>
          <ul className="flex gap-6 text-sm text-slate-400">
            <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
            <li><NavLink to="/projects" className={linkClass}>Projects</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
