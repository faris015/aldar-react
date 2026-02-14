import { integrations } from '../data/demoData';

function IntegrationsPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Integrations</h2>
        <p>Check connector sync status and run sync.</p>
      </div>

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Integration</th>
              <th>Last Sync Date</th>
              <th>Status</th>
              <th>Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {integrations.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.lastSync}</td>
                <td>{item.status}</td>
                <td>{item.result}</td>
                <td><button type="button" className="btn btn-tonal">Sync Now</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mobile-cards">
          {integrations.map((item) => (
            <article key={item.name} className="mobile-card">
              <h4>{item.name}</h4>
              <p>{item.status}</p>
              <p>{item.result}</p>
              <small>{item.lastSync}</small>
              <button type="button" className="btn btn-tonal">Sync Now</button>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default IntegrationsPage;
