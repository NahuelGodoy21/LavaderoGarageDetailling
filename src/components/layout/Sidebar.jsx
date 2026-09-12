import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const menuItems = [
  { to: '/panel', icon: '📊', label: 'Dashboard', end: true },
  { to: '/panel/ordenes', icon: '🧾', label: 'Órdenes' },
  { to: '/panel/clientes', icon: '👤', label: 'Clientes' },
  { to: '/panel/vehiculos', icon: '🚗', label: 'Vehículos' },
  { to: '/panel/servicios', icon: '⚙️', label: 'Servicios' },
  { to: '/panel/gastos', icon: '💰', label: 'Gastos' },
  { to: '/panel/empleados', icon: '👨‍💼', label: 'Empleados' },
]

export default function Sidebar({ open, onClose }) {
  const { perfil, logout } = useAuth()

  const visibleItems = menuItems.filter(item => {
    if (item.to === '/panel/empleados' && perfil?.rol !== 'admin') return false
    return true
  })

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'active' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src="/logo.png" alt="Logo" className="sidebar-logo" />
          <span className="sidebar-brand text-gradient">GARAGE DETAILING</span>
        </div>

        <nav className="sidebar-nav">
          {visibleItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{perfil?.nombre?.charAt(0) || 'U'}</div>
            <div>
              <div className="sidebar-username">{perfil?.nombre || 'Usuario'}</div>
              <div className="sidebar-role">{perfil?.rol || 'empleado'}</div>
            </div>
          </div>
          <button className="sidebar-logout" onClick={logout}>Cerrar sesión</button>
        </div>
      </aside>
    </>
  )
}
