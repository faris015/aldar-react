import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { qualityIssues } from '../data/demoData';

function QualityDetailPage() {
  const { issueId } = useParams();

  const issue = useMemo(
    () => qualityIssues.find((item) => item.id === issueId) || qualityIssues[0],
    [issueId]
  );

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Quality Issue Detail</h2>
        <p>{issue.id} · Document {issue.document}</p>
      </div>

      <article className="card">
        <p><strong>Raised By:</strong> {issue.raisedBy}</p>
        <p><strong>Assigned To:</strong> {issue.assignedTo}</p>
        <p><strong>Status:</strong> {issue.status}</p>
        <p><strong>Due Date:</strong> {issue.dueDate}</p>

        <label className="field full-width">
          <span>Add Comment</span>
          <textarea rows="5" placeholder="Add update" />
        </label>

        <div className="inline-actions">
          <button type="button" className="btn">Mark Resolved</button>
          <button type="button" className="btn btn-secondary">Add Comment</button>
        </div>
      </article>
    </section>
  );
}

export default QualityDetailPage;
