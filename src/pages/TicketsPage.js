import { useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ticketTypes } from '../data/demoData';
import { useTicketStore } from '../context/TicketStore';

const defaultForm = {
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

function TicketsPage() {
  const { role } = useOutletContext();
  const { tickets: ticketList, createTicket } = useTicketStore();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  function setUploadedFile(file) {
    if (!file) {
      setForm((prev) => ({
        ...prev,
        fileName: '',
        fileData: '',
        fileType: '',
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        fileName: file.name,
        fileData: typeof reader.result === 'string' ? reader.result : '',
        fileType: file.type || '',
      }));
    };
    reader.readAsDataURL(file);
  }

  const visibleTickets = useMemo(() => {
    const scopedTickets = role === 'Contractor'
      ? ticketList.filter((ticket) => ticket.createdByRole === 'Contractor')
      : ticketList;

    return scopedTickets.filter((ticket) => {
      const matchesType = typeFilter === 'All' || ticket.type === typeFilter;
      const haystack = `${ticket.id} ${ticket.title} ${ticket.project} ${ticket.status}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [query, role, ticketList, typeFilter]);

  function onCreateTicket() {
    if (!form.type || !form.title.trim() || !form.description.trim() || !form.project || !form.discipline || !form.priority) {
      return;
    }
    createTicket({
      form: {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
      },
      role,
      routeTo: 'Developer',
    });
    setForm(defaultForm);
    setShowCreateForm(false);
  }

  return (
    <section className="screen">
      <div className="screen-header">
        <div>
          <h2>Tickets</h2>
          <p>Create tickets, search tickets, and process approvals/send back.</p>
        </div>
        <button type="button" className="btn" onClick={() => setShowCreateForm((prev) => !prev)}>
          Create Ticket
        </button>
      </div>

      {showCreateForm ? (
        <article className="card">
          <h3>Create Ticket</h3>
          <div className="form-grid">
            <label className="field">
              <span>Ticket Type</span>
              <select value={form.type} onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}>
                {ticketTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Discipline</span>
              <select value={form.discipline} onChange={(event) => setForm((prev) => ({ ...prev, discipline: event.target.value }))}>
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
                placeholder="Enter ticket title"
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              />
            </label>
            <label className="field full-width">
              <span>Description</span>
              <textarea
                rows="5"
                placeholder="Detailed explanation"
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              />
            </label>
            <label className="field">
              <span>Project</span>
              <select value={form.project} onChange={(event) => setForm((prev) => ({ ...prev, project: event.target.value }))}>
                <option>Project A</option>
                <option>Project B</option>
                <option>Project C</option>
              </select>
            </label>
            <label className="field">
              <span>Priority</span>
              <select value={form.priority} onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </label>
            <label className="field full-width">
              <span>File Upload (Optional)</span>
              <input
                id="ticket-file-upload"
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
              {form.fileName ? <small>Selected: {form.fileName}</small> : null}
            </label>
          </div>
          <div className="inline-actions">
            <button type="button" className="btn" onClick={onCreateTicket}>Create</button>
          </div>
        </article>
      ) : null}

      <article className="card filter-grid">
        <input
          type="search"
          placeholder="Search by ticket id, title, project, status"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
          <option>All</option>
          {ticketTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </article>

      <article className="card responsive-table-wrap">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Type</th>
              <th>Title</th>
              <th>Project</th>
              <th>Created By</th>
              <th>Current Owner</th>
              <th>Stage Gate</th>
              <th>Status</th>
              <th className="created-date-col">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {visibleTickets.length === 0 ? (
              <tr>
                <td className="empty-state-cell" colSpan={9}>No tickets found</td>
              </tr>
            ) : (
              visibleTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td><Link to={`/tickets/${ticket.id}`}>{ticket.id}</Link></td>
                  <td>{ticket.type}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.project}</td>
                  <td>{ticket.createdByRole}</td>
                  <td>{ticket.currentOwnerRole}</td>
                  <td>{ticket.stageGate}</td>
                  <td>{ticket.status}</td>
                  <td className="created-date-col">{ticket.createdDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mobile-cards">
          {visibleTickets.length === 0 ? (
            <p className="empty-state-text">No tickets found</p>
          ) : (
            visibleTickets.map((ticket) => (
              <article key={ticket.id} className="mobile-card">
                <h4><Link to={`/tickets/${ticket.id}`}>{ticket.id}</Link></h4>
                <p>{ticket.type}</p>
                <p>{ticket.title}</p>
                <p>{ticket.createdByRole} -> {ticket.reviewByRole}</p>
                <p>{ticket.stageGate}</p>
                <p>{ticket.status}</p>
                <small>Created {ticket.createdDate}</small>
              </article>
            ))
          )}
        </div>
      </article>
    </section>
  );
}

export default TicketsPage;
