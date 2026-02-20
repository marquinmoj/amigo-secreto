import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  ['/', 'Dashboard'],
  ['/numbers', 'Números'],
  ['/contacts', 'Contactos'],
  ['/pipeline', 'Embudo'],
  ['/bot', 'Bot']
];

export default function Layout() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="shell">
      <aside className="sidebar">
        <h1>WACRM</h1>
        {links.map(([to, label]) => (
          <Link key={to} className={pathname === to ? 'active' : ''} to={to}>
            {label}
          </Link>
        ))}
        <div className="userBox">
          <strong>{user?.name}</strong>
          <small>{user?.role}</small>
          <button onClick={logout}>Salir</button>
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
