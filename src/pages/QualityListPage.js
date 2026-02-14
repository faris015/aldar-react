import { Link } from 'react-router-dom';
import { qualityIssues } from '../data/demoData';

function QualityListPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <div>
          <h2>Quality Issues</h2>
          <p>Track issues and corrective actions.</p>
        </div>
        <Link to="/quality/new" className="btn">Create Issue</Link>
      </div>

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Document</th>
              <th>Raised By</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {qualityIssues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>{issue.document}</td>
                <td>{issue.raisedBy}</td>
                <td>{issue.assignedTo}</td>
                <td>{issue.status}</td>
                <td><Link to={`/quality/${issue.id}`}>Open</Link></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mobile-cards">
          {qualityIssues.map((issue) => (
            <article key={issue.id} className="mobile-card">
              <h4>{issue.id}</h4>
              <p>{issue.document}</p>
              <p>{issue.raisedBy} -> {issue.assignedTo}</p>
              <small>{issue.status}</small>
              <Link to={`/quality/${issue.id}`} className="text-link">Open</Link>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default QualityListPage;
