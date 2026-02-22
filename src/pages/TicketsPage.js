import { useMemo, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ticketCreationMetadata, ticketTypes } from '../data/demoData';
import { useTicketStore } from '../context/TicketStore';
import formatStatusLabel from '../utils/formatStatusLabel';

const REQUIRED_FIELDS = [
  'workPackage',
  'project',
  'originator',
  'discipline',
  'area',
  'buildingId',
  'levelAndLocation',
  'metadataFileType',
  'title',
  'fileName',
];

const FIELD_LABELS = {
  workPackage: 'Work Package',
  project: 'Project',
  originator: 'Originator',
  discipline: 'Discipline',
  area: 'Area',
  buildingId: 'Building ID / Type / Component ID',
  levelAndLocation: 'Level and Location',
  metadataFileType: 'File Type',
  title: 'Title',
  fileName: 'File Upload',
};

function createDefaultForm() {
  return {
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
}

function validateField(name, value) {
  if (!REQUIRED_FIELDS.includes(name)) return '';
  if (!String(value || '').trim()) {
    return `${FIELD_LABELS[name]} is required.`;
  }
  return '';
}

function validateForm(form) {
  return REQUIRED_FIELDS.reduce((acc, field) => {
    acc[field] = validateField(field, form[field]);
    return acc;
  }, {});
}

function getStatusPillClass(status) {
  const rejectedStatuses = ['REJECTED_INTERNALLY', 'QA_REJECTED', 'RECOMMENDED_REJECTED', 'REJECTED'];
  if (status === 'APPROVED') return 'ticket-status-pill status-approved';
  if (rejectedStatuses.includes(status)) return 'ticket-status-pill status-rejected';
  return 'ticket-status-pill status-progress';
}

function TicketsPage() {
  const { role } = useOutletContext();
  const { tickets: ticketList, createTicket } = useTicketStore();
  const formCardRef = useRef(null);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState(createDefaultForm);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  function getInputClass(name) {
    return touched[name] && errors[name] ? 'input-error' : '';
  }

  function getSelectClass(name) {
    return [getInputClass(name), !form[name] ? 'select-placeholder' : ''].filter(Boolean).join(' ');
  }

  function updateFormField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  }

  function onFieldBlur(name) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, form[name]),
    }));
  }

  function setUploadedFile(file) {
    if (!file) {
      updateFormField('fileName', '');
      setForm((prev) => ({ ...prev, fileData: '', fileType: '' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateFormField('fileName', file.name);
      setForm((prev) => ({ ...prev, fileData: typeof reader.result === 'string' ? reader.result : '', fileType: file.type || '' }));
    };
    reader.readAsDataURL(file);
  }

  const visibleTickets = useMemo(() => {
    const scopedTickets = role === 'Contractor'
      ? ticketList.filter((ticket) => ticket.createdByRole === 'Contractor')
      : ticketList;

    return scopedTickets.filter((ticket) => {
      const matchesType = typeFilter === 'All' || ticket.type === typeFilter;
      const haystack = [
        ticket.id,
        ticket.title,
        ticket.project,
        ticket.workPackage,
        ticket.originator,
        ticket.discipline,
        ticket.area,
        ticket.buildingId,
        ticket.levelAndLocation,
        ticket.metadataFileType,
        ticket.fileName,
        ticket.status,
      ].join(' ').toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [query, role, ticketList, typeFilter]);

  function onCreateTicket() {
    if (role !== 'Contractor') return;
    const nextErrors = validateForm(form);
    const hasErrors = Object.values(nextErrors).some(Boolean);
    setErrors(nextErrors);
    setTouched(REQUIRED_FIELDS.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    if (hasErrors) {
      requestAnimationFrame(() => {
        const firstInvalid = formCardRef.current?.querySelector('.input-error');
        if (!firstInvalid) return;
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof firstInvalid.focus === 'function') {
          firstInvalid.focus();
        }
      });
      return;
    }
    createTicket({
      form: {
        ...form,
        type: 'Shop Drawing Submission',
        title: form.title.trim(),
      },
      role,
    });
    setForm(createDefaultForm());
    setTouched({});
    setErrors({});
    setShowCreateForm(false);
  }

  return (
    <section className="screen">
      <div className="screen-header">
        <div>
          <h2>Tickets</h2>
          <p>Create submissions, track status flow, and process role-based workflow actions.</p>
        </div>
        {role === 'Contractor' ? (
          <button type="button" className="btn" onClick={() => setShowCreateForm((prev) => !prev)}>
            Create Ticket
          </button>
        ) : null}
      </div>

      {showCreateForm ? (
        <article ref={formCardRef} className="card ticket-create-card">
          <div className="ticket-create-head">
            <div>
              <h3>Create Ticket</h3>
              <p>Fill project metadata first, then add your submission details.</p>
            </div>
            <button
              type="button"
              className="ticket-create-close"
              aria-label="Close create ticket form"
              onClick={() => setShowCreateForm(false)}
            >
              ×
            </button>
          </div>
          <div className="ticket-create-body">
            <div className="ticket-form-section">
              <h4>Project Context</h4>
              <div className="ticket-form-grid">
                <label className="field">
                  <span>Work Package</span>
                  <select
                    className={getSelectClass('workPackage')}
                    value={form.workPackage}
                    onChange={(event) => updateFormField('workPackage', event.target.value)}
                    onBlur={() => onFieldBlur('workPackage')}
                  >
                    <option value="">Select work package</option>
                    {ticketCreationMetadata.workPackages.map((workPackage) => (
                      <option key={workPackage}>{workPackage}</option>
                    ))}
                  </select>
                  {touched.workPackage && errors.workPackage ? <small className="field-error">{errors.workPackage}</small> : null}
                </label>
                <label className="field">
                  <span>Project</span>
                  <select
                    className={getSelectClass('project')}
                    value={form.project}
                    onChange={(event) => updateFormField('project', event.target.value)}
                    onBlur={() => onFieldBlur('project')}
                  >
                    <option value="">Select project</option>
                    {ticketCreationMetadata.projects.map((project) => (
                      <option key={project}>{project}</option>
                    ))}
                  </select>
                  {touched.project && errors.project ? <small className="field-error">{errors.project}</small> : null}
                </label>
                <label className="field">
                  <span>Originator</span>
                  <select
                    className={getSelectClass('originator')}
                    value={form.originator}
                    onChange={(event) => updateFormField('originator', event.target.value)}
                    onBlur={() => onFieldBlur('originator')}
                  >
                    <option value="">Select originator</option>
                    {ticketCreationMetadata.originators.map((originator) => (
                      <option key={originator}>{originator}</option>
                    ))}
                  </select>
                  {touched.originator && errors.originator ? <small className="field-error">{errors.originator}</small> : null}
                </label>
                <label className="field">
                  <span>Discipline</span>
                  <select
                    className={getSelectClass('discipline')}
                    value={form.discipline}
                    onChange={(event) => updateFormField('discipline', event.target.value)}
                    onBlur={() => onFieldBlur('discipline')}
                  >
                    <option value="">Select discipline</option>
                    {ticketCreationMetadata.disciplines.map((discipline) => (
                      <option key={discipline}>{discipline}</option>
                    ))}
                  </select>
                  {touched.discipline && errors.discipline ? <small className="field-error">{errors.discipline}</small> : null}
                </label>
              </div>
            </div>

            <div className="ticket-form-section">
              <h4>Location and Classification</h4>
              <div className="ticket-form-grid">
                <label className="field">
                  <span>Area</span>
                  <select
                    className={getSelectClass('area')}
                    value={form.area}
                    onChange={(event) => updateFormField('area', event.target.value)}
                    onBlur={() => onFieldBlur('area')}
                  >
                    <option value="">Select area</option>
                    {ticketCreationMetadata.areas.map((area) => (
                      <option key={area}>{area}</option>
                    ))}
                  </select>
                  {touched.area && errors.area ? <small className="field-error">{errors.area}</small> : null}
                </label>
                <label className="field">
                  <span>Building ID / Type / Component ID</span>
                  <select
                    className={getSelectClass('buildingId')}
                    value={form.buildingId}
                    onChange={(event) => updateFormField('buildingId', event.target.value)}
                    onBlur={() => onFieldBlur('buildingId')}
                  >
                    <option value="">Select building ID</option>
                    {ticketCreationMetadata.buildingIds.map((buildingId) => (
                      <option key={buildingId}>{buildingId}</option>
                    ))}
                  </select>
                  {touched.buildingId && errors.buildingId ? <small className="field-error">{errors.buildingId}</small> : null}
                </label>
                <label className="field">
                  <span>Level and Location</span>
                  <select
                    className={getSelectClass('levelAndLocation')}
                    value={form.levelAndLocation}
                    onChange={(event) => updateFormField('levelAndLocation', event.target.value)}
                    onBlur={() => onFieldBlur('levelAndLocation')}
                  >
                    <option value="">Select level and location</option>
                    {ticketCreationMetadata.levelAndLocations.map((levelAndLocation) => (
                      <option key={levelAndLocation}>{levelAndLocation}</option>
                    ))}
                  </select>
                  {touched.levelAndLocation && errors.levelAndLocation ? <small className="field-error">{errors.levelAndLocation}</small> : null}
                </label>
                <label className="field">
                  <span>File Type</span>
                  <select
                    className={getSelectClass('metadataFileType')}
                    value={form.metadataFileType}
                    onChange={(event) => updateFormField('metadataFileType', event.target.value)}
                    onBlur={() => onFieldBlur('metadataFileType')}
                  >
                    <option value="">Select file type</option>
                    {ticketCreationMetadata.fileTypes.map((metadataFileType) => (
                      <option key={metadataFileType}>{metadataFileType}</option>
                    ))}
                  </select>
                  {touched.metadataFileType && errors.metadataFileType ? <small className="field-error">{errors.metadataFileType}</small> : null}
                </label>
              </div>
            </div>

            <div className="ticket-form-section">
              <h4>Submission</h4>
              <div className="ticket-form-grid">
                <label className="field full-width">
                  <span>Title</span>
                  <input
                    className={getInputClass('title')}
                    placeholder="Enter ticket title"
                    value={form.title}
                    onChange={(event) => updateFormField('title', event.target.value)}
                    onBlur={() => onFieldBlur('title')}
                  />
                  {touched.title && errors.title ? <small className="field-error">{errors.title}</small> : null}
                </label>
                <label className="field full-width">
                  <span>File Upload</span>
                  <input
                    className={getInputClass('fileName')}
                    id="ticket-file-upload"
                    type="file"
                    accept=".pdf,.dwg,.doc,.docx"
                    onChange={(event) => setUploadedFile(event.target.files?.[0])}
                    onBlur={() => onFieldBlur('fileName')}
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
                  {touched.fileName && errors.fileName ? <small className="field-error">{errors.fileName}</small> : null}
                </label>
              </div>
            </div>
            <div className="inline-actions ticket-create-actions">
              <button type="button" className="btn" onClick={onCreateTicket}>Create</button>
            </div>
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
              <th>Title</th>
              <th>Work Package</th>
              <th>Discipline</th>
              <th>Project</th>
              <th>Current Owner</th>
              <th>Status</th>
              <th className="created-date-col">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {visibleTickets.length === 0 ? (
              <tr>
                <td className="empty-state-cell" colSpan={8}>No tickets found</td>
              </tr>
            ) : (
              visibleTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td><Link to={`/tickets/${ticket.id}`}>{ticket.id}</Link></td>
                  <td>{ticket.title}</td>
                  <td>{ticket.workPackage || '-'}</td>
                  <td>{ticket.discipline || '-'}</td>
                  <td>{ticket.project}</td>
                  <td>{ticket.currentOwnerRole}</td>
                  <td>
                    <span className={getStatusPillClass(ticket.status)}>{formatStatusLabel(ticket.status)}</span>
                  </td>
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
                <p>{ticket.title}</p>
                <p>Work Package: {ticket.workPackage || '-'}</p>
                <p>Discipline: {ticket.discipline || '-'}</p>
                <p>Project: {ticket.project}</p>
                <p>Owner: {ticket.currentOwnerRole}</p>
                <p><span className={getStatusPillClass(ticket.status)}>{formatStatusLabel(ticket.status)}</span></p>
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
