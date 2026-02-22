import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTicketStore } from '../context/TicketStore';
import formatStatusLabel from '../utils/formatStatusLabel';

function parseStamp(stamp) {
  return new Date(String(stamp).replace(' ', 'T'));
}

function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return '0m';
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

function toCapitalizedStatus(status) {
  return String(status || '')
    .toLowerCase()
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function lifecycleStatusFromAction(action) {
  const map = {
    'Create Ticket': 'INITIATED',
    'Initiate Submission': 'INITIATED',
    Resubmitted: 'INITIATED',
    'Internal Review Approved': 'INTERNALLY_REVIEWED',
    'Approve and Issue as Shared': 'INTERNALLY_APPROVED',
    'QA Approved': 'QA_APPROVED',
    'Recommend for Approval': 'RECOMMENDED_FOR_APPROVAL',
    Approved: 'APPROVED',
    'Internal Review Rejected': 'REJECTED_INTERNALLY',
    'Reject Internally': 'REJECTED_INTERNALLY',
    'QA Rejected': 'QA_REJECTED',
    'Recommend Rejected': 'RECOMMENDED_REJECTED',
    Rejected: 'REJECTED',
  };
  return map[action] || '';
}

function TicketDetailPage() {
  const { ticketId } = useParams();
  const { tickets } = useTicketStore();

  const ticket = useMemo(
    () => tickets.find((item) => item.id === ticketId) || tickets[0],
    [ticketId, tickets]
  );
  const flowSteps = useMemo(() => {
    if (!ticket) return [];
    const syntheticCreated = {
      time: ticket.createdAt || `${ticket.createdDate} 09:00:00`,
      role: ticket.createdByRole,
      action: 'Initiate Submission',
      note: 'Ticket created and submitted into workflow.',
    };
    const source = ticket.history?.length ? ticket.history : [syntheticCreated];
    const ordered = [...source].sort((a, b) => parseStamp(a.time) - parseStamp(b.time));
    if (!['Create Ticket', 'Initiate Submission'].includes(ordered[0]?.action)) ordered.unshift(syntheticCreated);
    return ordered.map((step, index) => {
      const lifecycleStatus = lifecycleStatusFromAction(step.action) || (index === ordered.length - 1 ? ticket.lifecycleStatus : '');
      if (index === 0) {
        return {
          ...step,
          elapsed: 'Start',
          lifecycleStatus,
          lifecycleLabel: toCapitalizedStatus(lifecycleStatus) || 'In Progress',
        };
      }
      const elapsedMs = parseStamp(step.time) - parseStamp(ordered[index - 1].time);
      return {
        ...step,
        elapsed: formatDuration(elapsedMs),
        lifecycleStatus,
        lifecycleLabel: toCapitalizedStatus(lifecycleStatus) || 'In Progress',
      };
    });
  }, [ticket]);
  const awaitingText = ticket
    ? (ticket.status === 'APPROVED'
      ? 'Completed final approval.'
      : `Awaiting ${ticket.currentOwnerRole} review/approval.`)
    : '';

  if (!ticket) {
    return (
      <section className="screen">
        <article className="card">
          <h3>Ticket not found</h3>
        </article>
      </section>
    );
  }

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Ticket Detail</h2>
        <p>{ticket.id} · {formatStatusLabel(ticket.status)} · {ticket.stageGate}</p>
      </div>

      <div className="grid-2 review-layout">
        <article className="card ticket-main-card">
          <h3>Ticket Details</h3>
          <p className="muted-text">{ticket.title}</p>
          <article className="file-panel">
            <h4>Download File</h4>
            {ticket.fileData && ticket.fileName ? (
              <a href={ticket.fileData} download={ticket.fileName} className="file-download-link">
                <span>{ticket.fileName}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3a1 1 0 0 1 1 1v9.59l2.3-2.29a1 1 0 1 1 1.4 1.41l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.41l2.3 2.29V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z" />
                </svg>
              </a>
            ) : (
              <p className="muted-text">No file uploaded</p>
            )}
          </article>
          <ul className="compact-list">
            <li><span>Project</span><small>{ticket.project}</small></li>
            <li><span>Work Package</span><small>{ticket.workPackage || 'N/A'}</small></li>
            <li><span>Originator</span><small>{ticket.originator || 'N/A'}</small></li>
            <li><span>Discipline</span><small>{ticket.discipline || 'N/A'}</small></li>
            <li><span>Area</span><small>{ticket.area || 'N/A'}</small></li>
            <li><span>Building ID</span><small>{ticket.buildingId || 'N/A'}</small></li>
            <li><span>Level and Location</span><small>{ticket.levelAndLocation || 'N/A'}</small></li>
            <li><span>File Type</span><small>{ticket.metadataFileType || 'N/A'}</small></li>
            <li><span>Current Owner</span><small>{ticket.currentOwnerRole}</small></li>
            <li><span>Created Date</span><small>{ticket.createdDate}</small></li>
          </ul>
        </article>

        <article className="card ticket-main-card">
          <h3>Timeline Flow</h3>
          <div className="flowchart-list">
            {flowSteps.map((step, index) => (
              <div key={`${step.time}-${step.action}`} className="flow-step">
                <span className="flow-node">{index + 1}</span>
                <div className="flow-content">
                  <strong>{step.lifecycleLabel || toCapitalizedStatus(step.lifecycleStatus) || 'In Progress'}</strong>
                  <p>{step.role}</p>
                  <small>{step.time}</small>
                </div>
                <span className="flow-duration">Time: {step.elapsed}</span>
              </div>
            ))}
          </div>
          <ul className="compact-list">
            <li><span>Lifecycle Status</span><small>{formatStatusLabel(ticket.lifecycleStatus)}</small></li>
            <li><span>Stage Gate</span><small>{ticket.stageGate}</small></li>
            <li><span>Created By</span><small>{ticket.createdByRole}</small></li>
            <li><span>Review By</span><small>{ticket.reviewByRole}</small></li>
            <li><span>Approve By</span><small>{ticket.approveByRole}</small></li>
            <li><span>Current State</span><small>{awaitingText}</small></li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default TicketDetailPage;
