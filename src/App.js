import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="app-nav">
          <div className="nav-left">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Dashboard
            </NavLink>
          </div>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `profile-link ${isActive ? 'active-link' : ''}`
            }
          >
            <svg
              className="profile-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4m0 2c-4.41 0-8 1.79-8 4v2h16v-2c0-2.21-3.59-4-8-4" />
            </svg>
            <span>faris</span>
          </NavLink>
        </nav>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
