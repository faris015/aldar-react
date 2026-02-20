import { useMemo, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useTicketStore } from '../context/TicketStore';
import CadViewerModal from '../components/common/CadViewerModal';

function ReviewScreenPage() {
  const { ticketId } = useParams();
  const { role } = useOutletContext();
  const { tickets, approveAndSend, finalApprove, sendBack } = useTicketStore();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const ticket = useMemo(() => tickets.find((item) => item.id === ticketId), [ticketId, tickets]);
  const isOwner = ticket?.currentOwnerRole === role;
  const isDesignerStep = isOwner && role === 'Designer';
  const isDeveloperStep = isOwner && role === 'Developer';
  const isClientStep = isOwner && role === 'Client';
  const latestRoleAction = useMemo(
    () => ticket?.history?.find((row) => row.role === role && ['Approve and Send', 'Final Approve', 'Send Back'].includes(row.action)),
    [role, ticket]
  );
  const hasCadFile = useMemo(() => {
    const fileName = String(ticket?.fileName || '').toLowerCase();
    const fileType = String(ticket?.fileType || '').toLowerCase();
    return fileName.endsWith('.dwg') || fileName.endsWith('.dxf') || fileType.includes('dwg') || fileType.includes('dxf');
  }, [ticket]);
  const cadUrn = ticket?.cadUrn || ticket?.apsUrn || '';

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
        <div>
          <h2>Ticket Approval</h2>
          <p>Ticket {ticket.id} · Stage {ticket.stageGate} · Owner {ticket.currentOwnerRole}</p>
        </div>
      </div>

      <div className="grid-2 review-layout">
        <article className="card">
          <h3>Ticket Details</h3>
          <ul className="compact-list">
            <li><span>Ticket Type</span><small>{ticket.type}</small></li>
            <li><span>Title</span><small>{ticket.title}</small></li>
            <li><span>Description</span><small>{ticket.description || 'No description provided'}</small></li>
            <li><span>Project</span><small>{ticket.project}</small></li>
            <li><span>Discipline</span><small>{ticket.discipline || 'N/A'}</small></li>
            <li><span>Priority</span><small>{ticket.priority}</small></li>
            <li>
              <span>File</span>
              {ticket.fileName ? (
                <div className="file-action-row">
                  {ticket.fileData ? (
                    <a href={ticket.fileData} download={ticket.fileName} className="text-link">
                      {ticket.fileName}
                    </a>
                  ) : (
                    <small>{ticket.fileName}</small>
                  )}
                  {(hasCadFile || cadUrn) ? (
                    <button type="button" className="btn btn-secondary btn-small" onClick={() => setIsViewerOpen(true)}>
                      Viewer
                    </button>
                  ) : null}
                </div>
              ) : (
                <small>{ticket.fileName || 'No file uploaded'}</small>
              )}
            </li>
          </ul>
        </article>

        <article className="card">
          <h3>Decision</h3>
          <ul className="compact-list">
            <li><span>Created By</span><small>{ticket.createdByRole}</small></li>
            <li><span>Review By</span><small>{ticket.reviewByRole}</small></li>
          </ul>
          <label className="field comments-field">
            <span>Comments</span>
            <textarea rows="9" placeholder="Add clear review comments" />
          </label>
          <div className="inline-actions">
            {latestRoleAction ? (
              <span className="chip chip-muted">
                {latestRoleAction.action === 'Final Approve' ? '✓ Approved' : '✓ Sent'}
              </span>
            ) : (
              <>
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
      </div>

      <CadViewerModal open={isViewerOpen} onClose={() => setIsViewerOpen(false)} urn={cadUrn} title="DWG Model Viewer" />
    </section>
  );
}

export default ReviewScreenPage;
