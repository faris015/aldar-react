import { Link } from 'react-router-dom';
import { archivedProjects } from '../data/demoData';

function ArchiveListPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Project Archive</h2>
        <p>View archived project handover packages.</p>
      </div>

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Archive Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {archivedProjects.map((item) => (
              <tr key={item.id}>
                <td><Link to={`/archive/${item.id}`}>{item.name}</Link></td>
                <td>{item.archiveDate}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mobile-cards">
          {archivedProjects.map((item) => (
            <article key={item.id} className="mobile-card">
              <h4><Link to={`/archive/${item.id}`}>{item.name}</Link></h4>
              <p>{item.status}</p>
              <small>{item.archiveDate}</small>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default ArchiveListPage;
