function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-slate-500">
        <span>&copy; {new Date().getFullYear()} Ryan Sprague</span>
        <ul className="flex gap-4">
          <li>
            <a
              href="https://www.linkedin.com/in/ryan-sprague-8a7316169/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/rsprague216"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
