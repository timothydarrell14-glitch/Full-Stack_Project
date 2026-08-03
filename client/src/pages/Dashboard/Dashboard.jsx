import { Outlet } from 'react-router-dom'
import SideBar from '../../components/SideBar'
import '../../styles/Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard-shell">
      <SideBar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard