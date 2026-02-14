import AdminNav from '../components/layout/AdminNav';
import { roles } from '../data/demoData';

function AdminRolesPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Admin - Roles</h2>
        <p>Role permissions and workflow actions.</p>
      </div>
      <AdminNav />

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Create</th>
              <th>Review</th>
              <th>Approve</th>
              <th>Send Back</th>
              <th>Publish</th>
              <th>Close</th>
              <th>Assigned Users</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((row) => (
              <tr key={row.role}>
                <td>{row.role}</td>
                <td>{row.create}</td>
                <td>{row.review}</td>
                <td>{row.approve}</td>
                <td>{row.sendBack}</td>
                <td>{row.publish}</td>
                <td>{row.close}</td>
                <td>{row.users}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mobile-cards">
          {roles.map((row) => (
            <article key={row.role} className="mobile-card">
              <h4>{row.role}</h4>
              <p>Create {row.create} · Review {row.review} · Approve {row.approve}</p>
              <p>Send Back {row.sendBack} · Publish {row.publish} · Close {row.close}</p>
              <small>{row.users} users</small>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default AdminRolesPage;
