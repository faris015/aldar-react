import { NavLink } from 'react-router-dom';

const adminLinks = [
  { path: '/admin/users', label: 'Users' },
  { path: '/admin/roles', label: 'Roles' },
  { path: '/admin/workflow-config', label: 'Workflow Rules' },
  { path: '/admin/audit-logs', label: 'Audit Logs' },
];

function AdminNav() {
  return (
    <nav className="sub-nav">
      {adminLinks.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `sub-nav-link ${isActive ? 'active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default AdminNav;
