import { NavLink } from 'react-router-dom'
import {
  RiDashboardLine,
  RiFileListLine,
  RiBankLine,
  RiSettings3Line,
  RiUserLine,
} from 'react-icons/ri'

const navItems = [
  { to: '/dashboard', label: 'DASHBOARD', Icon: RiDashboardLine },
  { to: '/expenses', label: 'EXPENSES', Icon: RiFileListLine },
  { to: '/savings', label: 'SAVINGS', Icon: RiBankLine },
  { to: '/settings', label: 'SETTINGS', Icon: RiSettings3Line },
  { to: '/profile', label: 'PROFILE', Icon: RiUserLine },
]

function SideBar() {
  return (
    <aside className="flex flex-col w-52 shrink-0 bg-[#0a0b0e] border-r border-[#1a1d24] min-h-screen">
      {/* User Profile */}
      <NavLink
        to="/profile"
        className="flex items-center gap-3 px-4 py-5 border-b border-[#1a1d24] hover:bg-[#111318] transition-colors group"
      >
        <div className="w-9 h-9 rounded-full border border-[#2a2d36] bg-[#111318] flex items-center justify-center shrink-0 group-hover:border-[#00e5ff]/40 transition-colors">
          <RiUserLine className="text-[#4a5060] text-base group-hover:text-[#00e5ff] transition-colors" />
        </div>
        <div className="text-left min-w-0">
          <p className="text-[#e0e0e0] text-[11px] font-bold tracking-[0.15em] truncate leading-tight">
            EXECUTIVE
          </p>
          <p className="text-[#00e5ff] text-[9px] tracking-[0.12em] truncate leading-tight mt-0.5">
            TERMINAL ADMIN
          </p>
        </div>
      </NavLink>

      {/* Nav Items */}
      <nav className="flex flex-col pt-2 flex-1">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-4 py-3.5 text-[10px] font-bold tracking-[0.12em] transition-colors relative',
                isActive
                  ? 'text-[#e0e0e0] bg-[#111318] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#00e5ff]'
                  : 'text-[#4a5060] hover:text-[#9ca3af] hover:bg-[#0d0f13]',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`text-base shrink-0 ${isActive ? 'text-[#00e5ff]' : 'text-[#4a5060]'}`}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default SideBar