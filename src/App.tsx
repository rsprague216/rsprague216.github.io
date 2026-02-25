import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Main from './components/layout/Main'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <Header />
        <Routes>
          <Route element={<Main />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
