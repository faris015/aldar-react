import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTicketStore } from '../context/TicketStore';
import { ticketCreationMetadata } from '../data/demoData';
import formatStatusLabel from '../utils/formatStatusLabel';

const defaultUpdateForm = {
  title: '',
  project: '',
  workPackage: '',
  originator: '',
  area: '',
  buildingId: '',
  levelAndLocation: '',
  metadataFileType: '',
  fileName: '',
  fileData: '',
  fileType: '',
  discipline: '',
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
      (ticket) => ticket.currentOwnerRole === role && ticket.status !== 'APPROVED'
    );
  }, [role, tickets]);

  function openUpdateForm(task) {
    setEditingTicketId(task.id);
    setUpdateForm({
      title: task.title || '',
      project: task.project || '',
      workPackage: task.workPackage || '',
      originator: task.originator || '',
      area: task.area || '',
      buildingId: task.buildingId || '',
      levelAndLocation: task.levelAndLocation || '',
      metadataFileType: task.metadataFileType || '',
      fileName: task.fileName || '',
      fileData: task.fileData || '',
      fileType: task.fileType || '',
      discipline: task.discipline || '',
    });
  }

  function submitUpdate() {
    if (!editingTicketId) return;
    if (
      !updateForm.title.trim()
      || !updateForm.project
      || !updateForm.workPackage
      || !updateForm.originator
      || !updateForm.area
      || !updateForm.buildingId
      || !updateForm.levelAndLocation
      || !updateForm.metadataFileType
      || !updateForm.discipline
      || !updateForm.fileName
    ) {
      return;
    }

    resubmit(editingTicketId, role, {
      type: 'Shop Drawing Submission',
      title: updateForm.title.trim(),
      project: updateForm.project,
      workPackage: updateForm.workPackage,
      originator: updateForm.originator,
      area: updateForm.area,
      buildingId: updateForm.buildingId,
      levelAndLocation: updateForm.levelAndLocation,
      metadataFileType: updateForm.metadataFileType,
      fileName: updateForm.fileName || '',
      fileData: updateForm.fileData || '',
      fileType: updateForm.fileType || '',
      discipline: updateForm.discipline,
    });

    setEditingTicketId('');
    setUpdateForm(defaultUpdateForm);
  }

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Approval Workflow</h2>
        <p>Role queue for final approved workflow stages and rejection returns.</p>
      </div>

      {role === 'Contractor' && editingTicketId ? (
        <article className="card">
          <h3>Update Ticket</h3>
          <div className="form-grid">
            <label className="field">
              <span>Work Package</span>
              <select value={updateForm.workPackage} onChange={(event) => setUpdateForm((prev) => ({ ...prev, workPackage: event.target.value }))}>
                <option value="">Select work package</option>
                {ticketCreationMetadata.workPackages.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Project</span>
              <select value={updateForm.project} onChange={(event) => setUpdateForm((prev) => ({ ...prev, project: event.target.value }))}>
                <option value="">Select project</option>
                {ticketCreationMetadata.projects.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Originator</span>
              <select value={updateForm.originator} onChange={(event) => setUpdateForm((prev) => ({ ...prev, originator: event.target.value }))}>
                <option value="">Select originator</option>
                {ticketCreationMetadata.originators.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Discipline</span>
              <select value={updateForm.discipline} onChange={(event) => setUpdateForm((prev) => ({ ...prev, discipline: event.target.value }))}>
                <option value="">Select discipline</option>
                {ticketCreationMetadata.disciplines.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Area</span>
              <select value={updateForm.area} onChange={(event) => setUpdateForm((prev) => ({ ...prev, area: event.target.value }))}>
                <option value="">Select area</option>
                {ticketCreationMetadata.areas.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Building ID / Type / Component ID</span>
              <select value={updateForm.buildingId} onChange={(event) => setUpdateForm((prev) => ({ ...prev, buildingId: event.target.value }))}>
                <option value="">Select building ID</option>
                {ticketCreationMetadata.buildingIds.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Level and Location</span>
              <select value={updateForm.levelAndLocation} onChange={(event) => setUpdateForm((prev) => ({ ...prev, levelAndLocation: event.target.value }))}>
                <option value="">Select level and location</option>
                {ticketCreationMetadata.levelAndLocations.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>File Type</span>
              <select value={updateForm.metadataFileType} onChange={(event) => setUpdateForm((prev) => ({ ...prev, metadataFileType: event.target.value }))}>
                <option value="">Select file type</option>
                {ticketCreationMetadata.fileTypes.map((option) => (
                  <option key={option}>{option}</option>
                ))}
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
              <span>File Upload</span>
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
              <th>Work Package</th>
              <th>Discipline</th>
              <th>Status</th>
              <th>Current Owner</th>
              <th className="created-date-col">Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td className="empty-state-cell" colSpan={8}>No tickets found</td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td><Link to={`/tickets/${task.id}`}>{task.id}</Link></td>
                  <td>{task.title}</td>
                  <td>{task.workPackage || '-'}</td>
                  <td>{task.discipline || '-'}</td>
                  <td>{formatStatusLabel(task.status)}</td>
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
                <h4><Link to={`/tickets/${task.id}`}>{task.id}</Link></h4>
                <p>{task.title}</p>
                <p>Work Package: {task.workPackage || '-'}</p>
                <p>Discipline: {task.discipline || '-'}</p>
                <p>{formatStatusLabel(task.status)}</p>
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
