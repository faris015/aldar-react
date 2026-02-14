import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SkeletonBlock from '../components/common/SkeletonBlock';
import SLAIndicator from '../components/core/SLAIndicator';
import StatusChip from '../components/core/StatusChip';
import { activities, kpis } from '../data/mockData';

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="screen">
      <h1>Dashboard</h1>
      {loading ? (
        <SkeletonBlock />
      ) : (
        <>
          <div className="kpi-grid">
            {kpis.map((kpi) => (
              <article key={kpi.label} className={`card card-kpi ${kpi.tone}`}>
                <p>{kpi.label}</p>
                <h2>{kpi.value}</h2>
              </article>
            ))}
          </div>

          <div className="dashboard-grid">
            <article className="card">
              <h3>Tickets by Status</h3>
              <div className="donut-placeholder" />
            </article>
            <article className="card">
              <h3>Tickets by Discipline</h3>
              <div className="bar-chart-placeholder">
                <span style={{ height: '45%' }} />
                <span style={{ height: '70%' }} />
                <span style={{ height: '55%' }} />
                <span style={{ height: '80%' }} />
              </div>
            </article>
            <article className="card">
              <h3>SLA Compliance</h3>
              <SLAIndicator text="92% within SLA" />
            </article>
          </div>

          <article className="card">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              {activities.map((item) => (
                <li key={item.id}>
                  <strong>{item.ticket}</strong>
                  <span>{item.action}</span>
                  <small>{item.time}</small>
                  <StatusChip status={item.status} />
                </li>
              ))}
            </ul>
          </article>
        </>
      )}

      <button type="button" className="fab" onClick={() => setShowActions(true)}>
        +
      </button>

      {showActions ? (
        <div className="dialog-backdrop" onClick={() => setShowActions(false)}>
          <div className="dialog-card" onClick={(event) => event.stopPropagation()}>
            <h3>Quick Actions</h3>
            <button type="button" className="btn btn-block" onClick={() => navigate('/tickets/new')}>
              Create Ticket
            </button>
            <button type="button" className="btn btn-secondary btn-block">Upload Document</button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default DashboardPage;
