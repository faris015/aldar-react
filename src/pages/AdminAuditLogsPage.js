import { Link } from 'react-router-dom';
import AdminNav from '../components/layout/AdminNav';
import { auditLogs } from '../data/demoData';

function AdminAuditLogsPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Admin - Audit Logs</h2>
        <p>View activity history.</p>
      </div>
      <AdminNav />

      <article className="card filter-grid">
        <input type="date" defaultValue="2026-02-14" />
        <select><option>User</option><option>M. Khan</option><option>N. Ibrahim</option></select>
        <select><option>Action</option><option>UPLOAD_DOCUMENT</option><option>APPROVE_REVIEW</option></select>
      </article>

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Entity</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((row) => (
              <tr key={row.id}>
                <td>{row.timestamp}</td>
                <td>{row.user}</td>
                <td>{row.action}</td>
                <td>{row.entity}</td>
                <td><Link to={`/admin/audit-logs/${row.id}`}>{row.details}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mobile-cards">
          {auditLogs.map((row) => (
            <article key={row.id} className="mobile-card">
              <h4>{row.action}</h4>
              <p>{row.entity}</p>
              <p>{row.user}</p>
              <small>{row.timestamp}</small>
              <Link to={`/admin/audit-logs/${row.id}`} className="text-link">View details</Link>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default AdminAuditLogsPage;
