import { Link } from 'react-router-dom';
import { transmittals } from '../data/demoData';

function TransmittalListPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <div>
          <h2>Transmittals</h2>
          <p>Send and track document packages.</p>
        </div>
        <Link to="/transmittals/new" className="btn">Create Transmittal</Link>
      </div>

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Transmittal Number</th>
              <th>Title</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transmittals.map((item) => (
              <tr key={item.id}>
                <td><Link to={`/transmittals/${item.id}`}>{item.id}</Link></td>
                <td>{item.title}</td>
                <td>{item.sender}</td>
                <td>{item.recipient}</td>
                <td>{item.status}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mobile-cards">
          {transmittals.map((item) => (
            <article key={item.id} className="mobile-card">
              <h4><Link to={`/transmittals/${item.id}`}>{item.id}</Link></h4>
              <p>{item.title}</p>
              <p>{item.sender} -> {item.recipient}</p>
              <small>{item.status} · {item.date}</small>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default TransmittalListPage;
