import { NavLink } from 'react-router-dom'
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiDashboardLine,
  RiFileListLine,
  RiBankLine,
  RiSettings3Line,
  RiShieldStarLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri'
import { clearAuthToken } from '../api/session'

const navItems = [
  { to: '/dashboard', label: 'DASHBOARD', Icon: RiDashboardLine, end: true },
  { to: '/dashboard/expenses', label: 'LEDGER', Icon: RiFileListLine },
  { to: '/dashboard/savings', label: 'WEALTH & SAVINGS', Icon: RiBankLine },
  { to: '/dashboard/settings', label: 'COMMAND CENTER', Icon: RiSettings3Line },
]

function SideBar({ collapsed, onToggle }) {
  const handleLogout = () => {
    clearAuthToken()
    window.location.href = '/authentication/login'
  }

  return (
    <aside className={`dashboard-sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="sidebar-branding">
        <div className="sidebar-brand-mark" aria-hidden="true">
          <RiShieldStarLine />
        </div>
        <div className="sidebar-brand-copy" aria-hidden={collapsed}>
          <p className="sidebar-brand-title">EXECUTIVE</p>
          <p className="sidebar-brand-subtitle">TERMINAL ADMIN</p>
        </div>
        <button
          type="button"
          className="sidebar-collapse-button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
        </button>
      </div>

      <nav className="sidebar-navigation" aria-label="Dashboard navigation">
        {navItems.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'is-active' : ''}`}
            title={collapsed ? label : undefined}
          >
            <Icon className="sidebar-nav-icon" />
            <span className="sidebar-nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="sidebar-logout-button" onClick={handleLogout}>
        <RiLogoutBoxRLine className="sidebar-nav-icon" />
        <span className="sidebar-nav-label">LOG OUT</span>
      </button>
    </aside>
  )
}

export default SideBar