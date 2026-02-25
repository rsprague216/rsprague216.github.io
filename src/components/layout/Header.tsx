import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-slate-100 transition-colors ${isActive ? 'text-slate-100' : ''}`

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-sm text-right hover:text-slate-100 hover:bg-slate-800 transition-colors ${isActive ? 'text-slate-100' : 'text-slate-400'}`

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 relative">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold tracking-tight hover:text-slate-100 transition-colors">
          Ryan Sprague
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden sm:block">
          <ul className="flex gap-6 text-sm text-slate-400">
            <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
            <li><NavLink to="/projects" className={linkClass}>Projects</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
          </ul>
        </nav>

        {/* Hamburger button (mobile only) */}
        <button
          className="sm:hidden text-slate-400 hover:text-slate-100 transition-colors p-1"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute left-0 right-0 top-full bg-slate-900 border-b border-slate-800 z-50">
          <nav>
            <ul>
              <li><NavLink to="/" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/about" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>About</NavLink></li>
              <li><NavLink to="/projects" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Projects</NavLink></li>
              <li><NavLink to="/contact" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
