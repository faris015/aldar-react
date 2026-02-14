import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import UserAvatar from '../core/UserAvatar';
import { notifications, user } from '../../data/mockData';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/tickets', label: 'Tickets' },
  { path: '/folders', label: 'Folders' },
  { path: '/workflow-config', label: 'Workflow' },
  { path: '/users', label: 'Users' },
  { path: '/profile', label: 'Settings' },
];

const mobileItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/tickets', label: 'Tickets' },
  { path: '/tickets/new', label: 'Create' },
  { path: '/profile', label: 'Profile' },
];

function pageTitle(pathname) {
  if (pathname.startsWith('/tickets/new')) return 'Create Ticket';
  if (pathname.startsWith('/tickets/')) return 'Ticket Detail';
  if (pathname.startsWith('/tickets')) return 'Tickets';
  if (pathname.startsWith('/folders')) return 'Folder Management';
  if (pathname.startsWith('/workflow-config')) return 'Workflow Configuration';
  if (pathname.startsWith('/users/new')) return 'Create User';
  if (pathname.startsWith('/users')) return 'User Management';
  if (pathname.startsWith('/profile')) return 'Profile';
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  return 'Construction CDE';
}

function AppLayout({ onLogout, onToggleNotifications }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="layout-shell">
      <header className="appbar">
        <div className="appbar-left">
          <span className="logo-badge">CDE</span>
          <div>
            <strong>Construction Ticketing System</strong>
            <p>{pageTitle(location.pathname)}</p>
          </div>
        </div>
        <div className="appbar-right">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleNotifications}
            aria-label="Notifications"
          >
            Bell
          </button>
          <button type="button" className="avatar-btn" onClick={() => navigate('/profile')}>
            <UserAvatar initials={user.avatar} />
          </button>
          <button type="button" className="btn btn-secondary" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="layout-content">
        <aside className="sidebar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </aside>

        <main className="main-panel">
          <Outlet />
        </main>
      </div>

      <nav className="bottom-nav">
        {mobileItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `bottom-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export function NotificationsPanel({ open, onClose }) {
  if (!open) return null;

  return (
    <aside className="notifications-panel">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button type="button" onClick={onClose}>Close</button>
      </div>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
            <small>{notification.time}</small>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AppLayout;
