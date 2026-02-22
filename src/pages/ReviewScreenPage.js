import { useEffect, useMemo, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { useTicketStore } from '../context/TicketStore';
import { authorityOrder } from '../data/demoData';
import formatStatusLabel from '../utils/formatStatusLabel';

function ReviewScreenPage() {
  const { ticketId } = useParams();
  const { role } = useOutletContext();
  const { tickets, finalApprove, sendBack } = useTicketStore();
  const [approveDialog, setApproveDialog] = useState({
    open: false,
    actionLabel: 'Approve',
    defaultRole: '',
    mode: 'default',
    customRole: '',
  });
  const [rejectDialog, setRejectDialog] = useState({
    open: false,
    actionLabel: 'Reject',
    defaultRole: '',
    mode: 'default',
    customRole: '',
  });
  const [decisionFeedback, setDecisionFeedback] = useState('');
  const ticket = useMemo(() => tickets.find((item) => item.id === ticketId), [ticketId, tickets]);
  const isOwner = ticket?.currentOwnerRole === role;
  const isApproverRole = ['Internal Team Approver', 'Consultant Approver'].includes(role);
  const actionableStatuses = ['INITIATED', 'INTERNALLY_REVIEWED', 'INTERNALLY_APPROVED', 'ISSUED_FOR_SHARED', 'QA_APPROVED', 'RECOMMENDED_FOR_APPROVAL'];
  const resolvedStatus = useMemo(() => {
    if (!ticket) return '';
    if (['REJECTED_INTERNALLY', 'QA_REJECTED', 'RECOMMENDED_REJECTED', 'REJECTED'].includes(ticket.status)) {
      if (ticket.currentOwnerRole === 'Internal Team Reviewer') return 'INITIATED';
      if (ticket.currentOwnerRole === 'Internal Team Approver') return 'INTERNALLY_REVIEWED';
      if (ticket.currentOwnerRole === 'Consultant QA Team') return 'INTERNALLY_APPROVED';
      if (ticket.currentOwnerRole === 'Consultant Reviewer') return 'QA_APPROVED';
      if (ticket.currentOwnerRole === 'Consultant Approver') return 'RECOMMENDED_FOR_APPROVAL';
    }
    return ticket.status;
  }, [ticket]);
  const canTakeDecision = isOwner && role !== 'Contractor' && actionableStatuses.includes(resolvedStatus);
  const isConsultantApprover = role === 'Consultant Approver';
  const currentRoleRank = authorityOrder.indexOf(role);
  const approveRoleOptions = useMemo(
    () => authorityOrder
      .filter((item) => item !== role && authorityOrder.indexOf(item) >= 0 && authorityOrder.indexOf(item) < currentRoleRank)
      .sort((a, b) => authorityOrder.indexOf(b) - authorityOrder.indexOf(a)),
    [currentRoleRank, role]
  );
  const rejectRoleOptions = useMemo(
    () => authorityOrder.filter((item) => item !== role && authorityOrder.indexOf(item) > currentRoleRank),
    [currentRoleRank, role]
  );

  useEffect(() => {
    setDecisionFeedback('');
  }, [ticketId, role]);

  function getNextRoleByStatus(status) {
    if (status === 'INITIATED') return 'Internal Team Approver';
    if (status === 'INTERNALLY_REVIEWED') return 'Consultant QA Team';
    if (status === 'INTERNALLY_APPROVED') return 'Consultant Reviewer';
    if (status === 'ISSUED_FOR_SHARED') return 'Consultant Reviewer';
    if (status === 'QA_APPROVED') return 'Consultant Approver';
    if (status === 'RECOMMENDED_FOR_APPROVAL') return 'Consultant Approver';
    return ticket?.currentOwnerRole || '';
  }

  function getDefaultNextRole() {
    if (!ticket) return '';
    return getNextRoleByStatus(resolvedStatus);
  }

  function getPreviousRoleByStatus(status) {
    if (status === 'INITIATED') return 'Contractor';
    if (status === 'INTERNALLY_REVIEWED') return 'Internal Team Reviewer';
    if (status === 'INTERNALLY_APPROVED') return 'Internal Team Approver';
    if (status === 'ISSUED_FOR_SHARED') return 'Internal Team Approver';
    if (status === 'QA_APPROVED') return 'Consultant QA Team';
    if (status === 'RECOMMENDED_FOR_APPROVAL') return 'Consultant Reviewer';
    return 'Contractor';
  }

  function openApproveDialog(actionLabel) {
    const defaultRole = getDefaultNextRole();
    setApproveDialog({
      open: true,
      actionLabel,
      defaultRole,
      mode: 'default',
      customRole: '',
    });
  }

  function closeApproveDialog() {
    setApproveDialog((prev) => ({ ...prev, open: false }));
  }

  function openRejectDialog(actionLabel) {
    const defaultRole = getPreviousRoleByStatus(resolvedStatus || '');
    setRejectDialog({
      open: true,
      actionLabel,
      defaultRole,
      mode: 'default',
      customRole: '',
    });
  }

  function closeRejectDialog() {
    setRejectDialog((prev) => ({ ...prev, open: false }));
  }

  function confirmApproveAction() {
    if (!ticket) return;
    if (approveDialog.mode === 'custom' && !approveDialog.customRole) return;
    const nextOwnerRole = approveDialog.mode === 'custom'
      ? approveDialog.customRole
      : approveDialog.defaultRole;
    const options = nextOwnerRole ? { nextOwnerRole } : {};
    finalApprove(ticket.id, role, options);
    setDecisionFeedback(isApproverRole ? 'Approved' : 'Completed');
    closeApproveDialog();
  }

  function confirmRejectAction() {
    if (!ticket) return;
    if (rejectDialog.mode === 'custom' && !rejectDialog.customRole) return;
    const nextOwnerRole = rejectDialog.mode === 'custom'
      ? rejectDialog.customRole
      : rejectDialog.defaultRole;
    const options = nextOwnerRole ? { nextOwnerRole } : {};
    sendBack(ticket.id, role, options);
    setDecisionFeedback('Sent back');
    closeRejectDialog();
  }

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
          <p>Ticket <Link className="header-ticket-link" to={`/tickets/${ticket.id}`}>{ticket.id}</Link> · Stage {ticket.stageGate} · Owner {ticket.currentOwnerRole}</p>
        </div>
      </div>

      <div className="grid-2 review-layout">
        <article className="card">
          <h3>Ticket Details</h3>
          <article className="file-panel">
            <h4>Attached File</h4>
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
            <li><span>Title</span><small>{ticket.title}</small></li>
            <li><span>Project</span><small>{ticket.project}</small></li>
            <li><span>Work Package</span><small>{ticket.workPackage || 'N/A'}</small></li>
            <li><span>Originator</span><small>{ticket.originator || 'N/A'}</small></li>
            <li><span>Discipline</span><small>{ticket.discipline || 'N/A'}</small></li>
            <li><span>Area</span><small>{ticket.area || 'N/A'}</small></li>
            <li><span>Building ID</span><small>{ticket.buildingId || 'N/A'}</small></li>
            <li><span>Level and Location</span><small>{ticket.levelAndLocation || 'N/A'}</small></li>
            <li><span>File Type</span><small>{ticket.metadataFileType || 'N/A'}</small></li>
          </ul>
        </article>

        <article className="card">
          <h3>Decision</h3>
          <ul className="compact-list">
            <li><span>Created By</span><small>{ticket.createdByRole}</small></li>
            <li><span>Review By</span><small>{ticket.reviewByRole}</small></li>
            <li><span>Status</span><small>{formatStatusLabel(ticket.status)}</small></li>
          </ul>
          <label className="field comments-field">
            <span>Comments</span>
            <textarea rows="9" placeholder="Add clear review comments" />
          </label>
          <div className="inline-actions">
            {decisionFeedback ? (
              <p className={`decision-feedback ${decisionFeedback === 'Sent back' ? 'decision-feedback-danger' : 'decision-feedback-success'}`}>
                <span className="decision-feedback-icon" aria-hidden="true">
                  {decisionFeedback === 'Sent back' ? '✖' : '✓'}
                </span>
                <span>{decisionFeedback}</span>
              </p>
            ) : canTakeDecision ? (
              <>
                <button type="button" className="btn" onClick={() => openApproveDialog(isApproverRole ? 'Approve' : 'Complete Review')}>
                  {isApproverRole ? 'Approve' : 'Complete Review'}
                </button>
                <button type="button" className="btn btn-danger" onClick={() => openRejectDialog(isApproverRole ? 'Reject' : 'Send Back')}>
                  {isApproverRole ? 'Reject' : 'Send Back'}
                </button>
              </>
            ) : null}
          </div>
        </article>
      </div>

      {approveDialog.open ? (
        <div className="dialog-backdrop" onClick={closeApproveDialog}>
          <div className="dialog-card" onClick={(event) => event.stopPropagation()}>
            <h3>{approveDialog.actionLabel} Ticket</h3>
            {isConsultantApprover ? (
              <p>This action will complete final approval for this ticket.</p>
            ) : (
              <>
                <p>Choose how to route this ticket after confirmation.</p>
                <label className="dialog-radio">
                  <input
                    type="radio"
                    name="role-routing"
                    checked={approveDialog.mode === 'default'}
                    onChange={() => setApproveDialog((prev) => ({ ...prev, mode: 'default' }))}
                  />
                  <span>Send to default role: <strong>{approveDialog.defaultRole || 'N/A'}</strong></span>
                </label>
                <label className="dialog-radio">
                  <input
                    type="radio"
                    name="role-routing"
                    checked={approveDialog.mode === 'custom'}
                    onChange={() => setApproveDialog((prev) => ({ ...prev, mode: 'custom' }))}
                  />
                  <span>Send to a different role</span>
                </label>
                {approveDialog.mode === 'custom' ? (
                  <label className="field">
                    <span>Route To</span>
                    <select
                      value={approveDialog.customRole}
                      onChange={(event) => setApproveDialog((prev) => ({ ...prev, customRole: event.target.value }))}
                    >
                      <option value="">Select role</option>
                      {approveRoleOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                ) : null}
              </>
            )}
            <div className="dialog-actions">
              <button type="button" className="btn btn-secondary" onClick={closeApproveDialog}>Cancel</button>
              <button
                type="button"
                className="btn"
                onClick={confirmApproveAction}
                disabled={!isConsultantApprover && approveDialog.mode === 'custom' && !approveDialog.customRole}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {rejectDialog.open ? (
        <div className="dialog-backdrop" onClick={closeRejectDialog}>
          <div className="dialog-card" onClick={(event) => event.stopPropagation()}>
            <h3>{rejectDialog.actionLabel} Ticket</h3>
            <p>Choose how to route this ticket after confirmation.</p>
            <label className="dialog-radio">
              <input
                type="radio"
                name="reject-role-routing"
                checked={rejectDialog.mode === 'default'}
                onChange={() => setRejectDialog((prev) => ({ ...prev, mode: 'default' }))}
              />
              <span>Send to default role: <strong>{rejectDialog.defaultRole || 'N/A'}</strong></span>
            </label>
            <label className="dialog-radio">
              <input
                type="radio"
                name="reject-role-routing"
                checked={rejectDialog.mode === 'custom'}
                onChange={() => setRejectDialog((prev) => ({ ...prev, mode: 'custom' }))}
              />
              <span>Send to a different role</span>
            </label>
            {rejectDialog.mode === 'custom' ? (
              <label className="field">
                <span>Route To</span>
                <select
                  value={rejectDialog.customRole}
                  onChange={(event) => setRejectDialog((prev) => ({ ...prev, customRole: event.target.value }))}
                >
                  <option value="">Select role</option>
                  {rejectRoleOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ) : null}
            <div className="dialog-actions">
              <button type="button" className="btn btn-secondary" onClick={closeRejectDialog}>Cancel</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmRejectAction}
                disabled={rejectDialog.mode === 'custom' && !rejectDialog.customRole}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default ReviewScreenPage;
