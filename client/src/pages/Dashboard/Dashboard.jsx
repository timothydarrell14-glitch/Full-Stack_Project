import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import SideBar from '../../components/SideBar'
import '../../styles/Dashboard.css'

function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className={`dashboard-shell ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <SideBar
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
      />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard