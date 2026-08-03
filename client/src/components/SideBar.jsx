import { NavLink } from 'react-router-dom'
import {
  RiDashboardLine,
  RiFileListLine,
  RiBankLine,
  RiSettings3Line,
  RiShieldStarLine,
} from 'react-icons/ri'

const navItems = [
  { to: '/dashboard', label: 'DASHBOARD', Icon: RiDashboardLine },
  { to: '/expenses', label: 'LEDGER', Icon: RiFileListLine },
  { to: '/savings', label: 'WEALTH & SAVINGS', Icon: RiBankLine },
  { to: '/settings', label: 'COMMAND CENTER', Icon: RiSettings3Line },
]

function SideBar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-branding">
        <div className="sidebar-brand-mark" aria-hidden="true">
          <RiShieldStarLine />
        </div>
        <div className="sidebar-brand-copy">
          <p className="sidebar-brand-title">EXECUTIVE</p>
          <p className="sidebar-brand-subtitle">TERMINAL ADMIN</p>
        </div>
      </div>

      <nav className="sidebar-navigation" aria-label="Dashboard navigation">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'is-active' : ''}`}
          >
            <Icon className="sidebar-nav-icon" />
            <span className="sidebar-nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default SideBar