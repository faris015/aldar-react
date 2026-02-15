import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTicketStore } from '../context/TicketStore';
import { ticketTypes } from '../data/demoData';

const defaultUpdateForm = {
  type: 'Shop Drawing Submission',
  title: '',
  description: '',
  project: 'Project A',
  fileName: '',
  fileData: '',
  fileType: '',
  discipline: 'Architectural',
  priority: 'High',
};

function WorkflowTasksPage() {
  const { role } = useOutletContext();
  const { tickets, resubmit } = useTicketStore();
  const [editingTicketId, setEditingTicketId] = useState('');
  const [updateForm, setUpdateForm] = useState(defaultUpdateForm);

  function setUploadedFile(file) {
    if (!file) {
      setUpdateForm((prev) => ({
        ...prev,
        fileName: '',
        fileData: '',
        fileType: '',
      }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUpdateForm((prev) => ({
        ...prev,
        fileName: file.name,
        fileData: typeof reader.result === 'string' ? reader.result : '',
        fileType: file.type || '',
      }));
    };
    reader.readAsDataURL(file);
  }

  const tasks = useMemo(() => {
    if (role === 'Contractor') {
      return tickets.filter((ticket) => ticket.currentOwnerRole === 'Contractor');
    }
    return tickets.filter(
      (ticket) => ticket.currentOwnerRole === role && ticket.lifecycleStatus !== 'Published'
    );
  }, [role, tickets]);

  function openUpdateForm(task) {
    setEditingTicketId(task.id);
    setUpdateForm({
      type: task.type || 'Shop Drawing Submission',
      title: task.title || '',
      description: task.description || '',
      project: task.project || 'Project A',
      fileName: task.fileName || '',
      fileData: task.fileData || '',
      fileType: task.fileType || '',
      discipline: task.discipline || 'Architectural',
      priority: task.priority || 'High',
    });
  }

  function submitUpdate() {
    if (!editingTicketId) return;
    if (!updateForm.type || !updateForm.title.trim() || !updateForm.description.trim() || !updateForm.project || !updateForm.discipline || !updateForm.priority) {
      return;
    }

    resubmit(editingTicketId, role, {
      type: updateForm.type,
      title: updateForm.title.trim(),
      description: updateForm.description.trim(),
      project: updateForm.project,
      fileName: updateForm.fileName || '',
      fileData: updateForm.fileData || '',
      fileType: updateForm.fileType || '',
      discipline: updateForm.discipline,
      priority: updateForm.priority,
    });

    setEditingTicketId('');
    setUpdateForm(defaultUpdateForm);
  }

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Approval Workflow</h2>
        <p>Role queue for review, approve, send back, and final approval.</p>
      </div>

      {role === 'Contractor' && editingTicketId ? (
        <article className="card">
          <h3>Update Ticket</h3>
          <div className="form-grid">
            <label className="field">
              <span>Ticket Type</span>
              <select value={updateForm.type} onChange={(event) => setUpdateForm((prev) => ({ ...prev, type: event.target.value }))}>
                {ticketTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Discipline</span>
              <select value={updateForm.discipline} onChange={(event) => setUpdateForm((prev) => ({ ...prev, discipline: event.target.value }))}>
                <option>Architectural</option>
                <option>Structural</option>
                <option>Electrical</option>
                <option>Mechanical</option>
                <option>Civil</option>
              </select>
            </label>
            <label className="field full-width">
              <span>Title</span>
              <input
                value={updateForm.title}
                onChange={(event) => setUpdateForm((prev) => ({ ...prev, title: event.target.value }))}
              />
            </label>
            <label className="field full-width">
              <span>Description</span>
              <textarea
                rows="5"
                value={updateForm.description}
                onChange={(event) => setUpdateForm((prev) => ({ ...prev, description: event.target.value }))}
              />
            </label>
            <label className="field">
              <span>Project</span>
              <select value={updateForm.project} onChange={(event) => setUpdateForm((prev) => ({ ...prev, project: event.target.value }))}>
                <option>Project A</option>
                <option>Project B</option>
                <option>Project C</option>
              </select>
            </label>
            <label className="field">
              <span>Priority</span>
              <select value={updateForm.priority} onChange={(event) => setUpdateForm((prev) => ({ ...prev, priority: event.target.value }))}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </label>
            <label className="field full-width">
              <span>File Upload (Optional)</span>
              <input
                type="file"
                accept=".pdf,.dwg,.doc,.docx"
                onChange={(event) => setUploadedFile(event.target.files?.[0])}
              />
              <div
                className="dropzone"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  setUploadedFile(event.dataTransfer.files?.[0]);
                }}
              >
                Drag and drop file here (Demo)
                <small>Allowed: PDF, DWG, DOC, DOCX</small>
              </div>
              {updateForm.fileName ? <small>Selected: {updateForm.fileName}</small> : null}
            </label>
          </div>
          <div className="inline-actions">
            <button type="button" className="btn" onClick={submitUpdate}>Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingTicketId('')}>Cancel</button>
          </div>
        </article>
      ) : null}

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Request</th>
              <th>Created By</th>
              <th>Reviewer</th>
              <th>Stage Gate</th>
              <th>Status</th>
              <th>Current Owner</th>
              <th className="created-date-col">Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td className="empty-state-cell" colSpan={9}>No tickets found</td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.createdByRole}</td>
                  <td>{task.reviewByRole}</td>
                  <td>{task.stageGate}</td>
                  <td>{task.status}</td>
                  <td>{task.currentOwnerRole}</td>
                  <td className="created-date-col">{task.createdDate}</td>
                  <td>
                    {role === 'Contractor' ? (
                      <button type="button" className="btn btn-secondary" onClick={() => openUpdateForm(task)}>
                        Update
                      </button>
                    ) : (
                      <Link to={`/workflow/review/${task.id}`}>Open Review</Link>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mobile-cards">
          {tasks.length === 0 ? (
            <p className="empty-state-text">No tickets found</p>
          ) : (
            tasks.map((task) => (
              <article key={task.id} className="mobile-card">
                <h4>{task.id}</h4>
                <p>{task.title}</p>
                <p>{task.createdByRole} -> {task.reviewByRole}</p>
                <p>{task.stageGate}</p>
                <p>{task.status}</p>
                <p>Owner: {task.currentOwnerRole}</p>
                <small>Created {task.createdDate}</small>
                {role === 'Contractor' ? (
                  <button type="button" className="btn btn-secondary" onClick={() => openUpdateForm(task)}>
                    Update
                  </button>
                ) : (
                  <Link to={`/workflow/review/${task.id}`} className="text-link">Open Review</Link>
                )}
              </article>
            ))
          )}
        </div>
      </article>
    </section>
  );
}

export default WorkflowTasksPage;
