import { Outlet } from 'react-router-dom'

function Main() {
  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
      <Outlet />
    </main>
  )
}

export default Main
