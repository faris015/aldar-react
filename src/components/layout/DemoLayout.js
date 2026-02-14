import { NavLink, Outlet } from 'react-router-dom';
import { useMemo } from 'react';
import { roleMenus } from '../../data/demoData';
import { useTicketStore } from '../../context/TicketStore';

const primaryItems = [
  { key: 'tickets', label: 'Tickets', path: '/tickets' },
  { key: 'workflow', label: 'Review Queue', path: '/workflow' },
];

const mobileItems = [
  { label: 'Tickets', path: '/tickets' },
  { label: 'Review Queue', path: '/workflow' },
];

function DemoLayout({ role, onRoleChange }) {
  const { resetDemo } = useTicketStore();
  const menu = useMemo(
    () => primaryItems.filter((item) => roleMenus[role]?.includes(item.key)),
    [role]
  );

  return (
    <div className="demo-shell">
      <header className="topbar">
        <div className="topbar-left">
          <h1>Ticketing & Approvals</h1>
          <button type="button" className="btn btn-secondary btn-small" onClick={resetDemo}>
            Reset Demo
          </button>
        </div>
        <label className="field role-field" htmlFor="role-select">
          <span>Role</span>
          <select id="role-select" value={role} onChange={(event) => onRoleChange(event.target.value)}>
            <option>Client</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>Contractor</option>
          </select>
        </label>
      </header>

      <div className="shell-content">
        <aside className="sidebar">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={false}
              className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </aside>

        <main className="main-content">
          <Outlet context={{ role }} />
        </main>
      </div>

      <nav className="bottom-nav">
        {mobileItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={false}
            className={({ isActive }) => `bottom-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default DemoLayout;
