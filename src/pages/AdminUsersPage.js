import AdminNav from '../components/layout/AdminNav';
import { adminUsers } from '../data/demoData';

function AdminUsersPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Admin - Users</h2>
        <p>Manage user accounts.</p>
      </div>
      <AdminNav />

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Approval Level</th>
              <th>Permission</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((row) => (
              <tr key={row.email}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td>{row.level}</td>
                <td>{row.permission}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mobile-cards">
          {adminUsers.map((row) => (
            <article key={row.email} className="mobile-card">
              <h4>{row.name}</h4>
              <p>{row.email}</p>
              <p>{row.role} · {row.level}</p>
              <p>{row.permission}</p>
              <p>{row.status}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default AdminUsersPage;
