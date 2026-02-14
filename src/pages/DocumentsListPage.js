import { Link } from 'react-router-dom';
import { documents } from '../data/demoData';

function DocumentsListPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <div>
          <h2>Documents</h2>
          <p>Find and manage project files.</p>
        </div>
        <Link to="/documents/upload" className="btn">Upload Document</Link>
      </div>

      <article className="card filter-grid">
        <input type="search" placeholder="Search documents" />
        <select><option>Project</option><option>Aldar Marina District</option></select>
        <select><option>Discipline</option><option>Architecture</option><option>Structural</option><option>MEP</option></select>
        <select><option>Status</option><option>WIP</option><option>Shared</option><option>Published</option></select>
        <select><option>Revision</option><option>A</option><option>B</option><option>C</option></select>
      </article>

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Document Number</th>
              <th>Title</th>
              <th>Project</th>
              <th>Discipline</th>
              <th>Revision</th>
              <th>Status</th>
              <th>Uploaded By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td><Link to={`/documents/${doc.id}`}>{doc.id}</Link></td>
                <td>{doc.title}</td>
                <td>{doc.project}</td>
                <td>{doc.discipline}</td>
                <td>{doc.revision}</td>
                <td>{doc.status}</td>
                <td>{doc.uploadedBy}</td>
                <td>{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mobile-cards">
          {documents.map((doc) => (
            <article key={doc.id} className="mobile-card">
              <h4><Link to={`/documents/${doc.id}`}>{doc.id}</Link></h4>
              <p>{doc.title}</p>
              <p>{doc.project}</p>
              <p>{doc.discipline} · Rev {doc.revision} · {doc.status}</p>
              <small>{doc.uploadedBy} · {doc.date}</small>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default DocumentsListPage;
