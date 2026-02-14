import { Link } from 'react-router-dom';
import { dashboardStats, demoJourneySteps, reviewTasks, tickets, transmittals } from '../data/demoData';

function Dashboard() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Dashboard</h2>
        <p>Quick view of ticket queue and approval progress.</p>
      </div>

      <div className="stats-grid">
        {dashboardStats.map((item) => (
          <article key={item.label} className="card stat-card">
            <p>{item.label}</p>
            <h3>{item.value}</h3>
          </article>
        ))}
      </div>

      <div className="grid-2">
        <article className="card">
          <h3>My Tickets</h3>
          <ul className="compact-list">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <div>
                  <strong>{ticket.id}</strong>
                  <p>{ticket.title}</p>
                </div>
                <small>{ticket.status}</small>
              </li>
            ))}
          </ul>
          <Link to="/tickets" className="text-link">Open ticket queue</Link>
        </article>

        <article className="card">
          <h3>Pending Approvals</h3>
          <ul className="compact-list">
            {reviewTasks.map((task) => (
              <li key={task.id}>
                <div>
                  <strong>{task.ticketId}</strong>
                  <p>{task.title}</p>
                </div>
                <small>{task.stageGate} · {task.reviewer}</small>
              </li>
            ))}
          </ul>
          <Link to="/workflow" className="text-link">Open approvals</Link>
        </article>
      </div>

      <article className="card">
        <h3>Recent Transmittals</h3>
        <div className="pill-row">
          {transmittals.map((row) => (
            <span key={row.id} className="chip chip-muted">{row.id} · {row.status}</span>
          ))}
        </div>
      </article>

      <article className="card">
        <h3>End-to-End Demo Flow</h3>
        <ol className="demo-flow-list">
          {demoJourneySteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>
    </section>
  );
}

export default Dashboard;
