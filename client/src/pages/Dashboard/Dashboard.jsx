import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#0a0b0e]">
      <SideBar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard