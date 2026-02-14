import AdminNav from '../components/layout/AdminNav';
import WorkflowSelector from '../components/core/WorkflowSelector';
import { stageGates, statusFlow } from '../data/demoData';

function AdminWorkflowConfigPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Admin - Workflow Rules</h2>
        <p>Set stage gates and approval rules.</p>
      </div>
      <AdminNav />

      <article className="card">
        <WorkflowSelector states={stageGates} />
        <p className="muted-text"><strong>Status Flow:</strong> {statusFlow.join(' -> ')}</p>
        <div className="inline-actions">
          <button type="button" className="btn">Save Workflow Rules</button>
        </div>
      </article>
    </section>
  );
}

export default AdminWorkflowConfigPage;
