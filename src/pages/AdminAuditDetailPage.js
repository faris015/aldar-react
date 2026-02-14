import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import AdminNav from '../components/layout/AdminNav';
import { auditLogs } from '../data/demoData';

function AdminAuditDetailPage() {
  const { auditId } = useParams();
  const entry = useMemo(
    () => auditLogs.find((row) => row.id === auditId) || auditLogs[0],
    [auditId]
  );

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Audit Detail</h2>
        <p>{entry.id} · {entry.action}</p>
      </div>
      <AdminNav />

      <article className="card">
        <p><strong>User:</strong> {entry.user}</p>
        <p><strong>Time:</strong> {entry.timestamp}</p>
        <p><strong>Entity:</strong> {entry.entity}</p>
        <p><strong>Details:</strong> {entry.details}</p>
        <p><strong>Before Value:</strong> {entry.beforeValue}</p>
        <p><strong>After Value:</strong> {entry.afterValue}</p>
      </article>
    </section>
  );
}

export default AdminAuditDetailPage;
