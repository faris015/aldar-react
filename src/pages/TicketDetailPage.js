import { useMemo } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useTicketStore } from '../context/TicketStore';
import { getRoleCapability } from '../data/demoData';

function parseStamp(stamp) {
  return new Date(String(stamp).replace(' ', 'T'));
}

function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return '0m';
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function TicketDetailPage() {
  const { ticketId } = useParams();
  const { role } = useOutletContext();
  const { tickets, approveAndSend, finalApprove, resubmit, reviewTicket, sendBack } = useTicketStore();

  const ticket = useMemo(
    () => tickets.find((item) => item.id === ticketId) || tickets[0],
    [ticketId, tickets]
  );
  const capability = getRoleCapability(role);
  const isOwner = ticket?.currentOwnerRole === role;
  const isDesignerStep = isOwner && role === 'Designer';
  const isDeveloperStep = isOwner && role === 'Developer';
  const isClientStep = isOwner && role === 'Client';
  const isContractorResubmit = role === 'Contractor' && ticket?.currentOwnerRole === 'Contractor';
  const latestRoleAction = useMemo(
    () => ticket?.history?.find((row) => row.role === role && ['Approve and Send', 'Final Approve', 'Send Back'].includes(row.action)),
    [role, ticket]
  );
  const flowSteps = useMemo(() => {
    if (!ticket) return [];
    const syntheticCreated = {
      time: ticket.createdAt || `${ticket.createdDate} 09:00:00`,
      role: ticket.createdByRole,
      action: 'Create Ticket',
      note: 'Ticket created and submitted into workflow.',
    };
    const source = ticket.history?.length ? ticket.history : [syntheticCreated];
    const ordered = [...source].sort((a, b) => parseStamp(a.time) - parseStamp(b.time));
    if (ordered[0]?.action !== 'Create Ticket') ordered.unshift(syntheticCreated);
    return ordered.map((step, index) => {
      if (index === 0) return { ...step, elapsed: 'Start' };
      const elapsedMs = parseStamp(step.time) - parseStamp(ordered[index - 1].time);
      return { ...step, elapsed: formatDuration(elapsedMs) };
    });
  }, [ticket]);
  const awaitingText = ticket
    ? (ticket.lifecycleStatus === 'Published'
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
        <p>{ticket.id} · {ticket.status} · {ticket.stageGate}</p>
      </div>

      <article className="card ticket-main-card">
        <h3>{ticket.title}</h3>
        <div className="grid-2">
          <div>
            <p><strong>Type:</strong> {ticket.type}</p>
            <p><strong>Project:</strong> {ticket.project}</p>
            <p><strong>Created By:</strong> {ticket.createdByRole}</p>
            <p><strong>Review By:</strong> {ticket.reviewByRole}</p>
            <p><strong>Approve By:</strong> {ticket.approveByRole}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
          </div>
          <div>
            <p><strong>Lifecycle Status:</strong> {ticket.lifecycleStatus}</p>
            <p><strong>Stage Gate:</strong> {ticket.stageGate}</p>
            <p><strong>Current Owner:</strong> {ticket.currentOwnerRole}</p>
            <p><strong>Linked Document:</strong> {ticket.linkedDocument}</p>
            <p><strong>Due Date:</strong> {ticket.dueDate}</p>
          </div>
        </div>

        <article className="card">
          <p><strong>Created:</strong> {ticket.createdAt} by {ticket.createdByRole}</p>
          <p><strong>Current State:</strong> {awaitingText}</p>

          <div className="flowchart-list">
            {flowSteps.map((step, index) => (
              <div key={`${step.time}-${step.action}`} className="flow-step">
                <span className="flow-node">{index + 1}</span>
                <div className="flow-content">
                  <strong>{step.action}</strong>
                  <p>{step.role}</p>
                  <small>{step.time}</small>
                </div>
                <span className="flow-duration">Time: {step.elapsed}</span>
              </div>
            ))}
          </div>

        </article>

        <div className="inline-actions">
          {latestRoleAction ? (
            <span className="chip chip-muted">
              {latestRoleAction.action === 'Final Approve' ? '✓ Approved' : '✓ Sent'}
            </span>
          ) : (
            <>
              {(isDesignerStep || isDeveloperStep) && capability.review ? (
                <button type="button" className="btn btn-secondary" onClick={() => reviewTicket(ticket.id, role)}>Review</button>
              ) : null}
              {isContractorResubmit ? (
                <button type="button" className="btn btn-tonal" onClick={() => resubmit(ticket.id, role)}>Upload Revision & Resubmit</button>
              ) : null}
              {isDesignerStep ? (
                <>
                  <button type="button" className="btn" onClick={() => approveAndSend(ticket.id, role, 'Developer')}>
                    Approve & Send to Developer
                  </button>
                  <button type="button" className="btn" onClick={() => approveAndSend(ticket.id, role, 'Client')}>
                    Approve & Send to Client
                  </button>
                </>
              ) : null}
              {isDeveloperStep ? (
                <button type="button" className="btn" onClick={() => approveAndSend(ticket.id, role, 'Client')}>
                  Approve & Send to Client
                </button>
              ) : null}
              {(isDesignerStep || isDeveloperStep) ? (
                <button type="button" className="btn btn-danger" onClick={() => sendBack(ticket.id, role)}>Send Back</button>
              ) : null}
              {isClientStep ? (
                <button type="button" className="btn" onClick={() => finalApprove(ticket.id, role)}>Final Approve</button>
              ) : null}
            </>
          )}
        </div>
      </article>
    </section>
  );
}

export default TicketDetailPage;
