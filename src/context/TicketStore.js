import { createContext, useContext, useEffect, useState } from 'react';
import { tickets as seedTickets } from '../data/demoData';

const STORAGE_KEY = 'aldar_ticket_demo_v3';
const REJECTION_STATUSES = ['REJECTED_INTERNALLY', 'QA_REJECTED', 'RECOMMENDED_REJECTED', 'REJECTED'];
const REMOVED_SEED_TICKET_IDS = new Set(['TKT-902', 'TKT-903', 'TKT-904']);

const TicketStoreContext = createContext(null);

function nowStamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

function normalizeTicket(ticket) {
  const fallbackCreatedDate = ticket.createdDate
    || ticket.dueDate
    || nowStamp().slice(0, 10);
  const fallbackCreatedAt = ticket.createdAt || `${fallbackCreatedDate} 09:00:00`;

  return {
    ...ticket,
    createdDate: fallbackCreatedDate,
    createdAt: fallbackCreatedAt,
    description: ticket.description || '',
    discipline: ticket.discipline || 'Architectural',
    fileName: ticket.fileName || '',
    fileData: ticket.fileData || '',
    fileType: ticket.fileType || '',
    currentOwnerRole: ticket.currentOwnerRole || ticket.reviewByRole,
    history: Array.isArray(ticket.history) ? ticket.history : [],
  };
}

function loadInitialTickets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedTickets.map(normalizeTicket);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedTickets.map(normalizeTicket);
    return parsed
      .filter((ticket) => !REMOVED_SEED_TICKET_IDS.has(ticket.id))
      .map(normalizeTicket);
  } catch (error) {
    return seedTickets.map(normalizeTicket);
  }
}

function addHistory(ticket, role, action, note) {
  return {
    ...ticket,
    history: [
      {
        time: nowStamp(),
        role,
        action,
        note,
      },
      ...ticket.history,
    ],
  };
}

function getStageGate(status) {
  if (status === 'APPROVED') return 'Published';
  if (['INTERNALLY_APPROVED', 'ISSUED_FOR_SHARED', 'QA_APPROVED', 'RECOMMENDED_FOR_APPROVAL'].includes(status)) return 'Shared';
  return 'WIP';
}

function getApproveTransition(ticket, role) {
  if (role === 'Internal Team Reviewer') {
    return {
      status: 'INTERNALLY_REVIEWED',
      owner: 'Internal Team Approver',
      action: 'Internal Review Approved',
      note: 'Internal review approved and routed to Internal Team Approver.',
    };
  }
  if (role === 'Internal Team Approver') {
    return {
      status: 'INTERNALLY_APPROVED',
      owner: 'Consultant QA Team',
      action: 'Approve and Issue as Shared',
      note: 'Internal approval complete and document issued for consultant QA.',
    };
  }
  if (role === 'Consultant QA Team') {
    return {
      status: 'QA_APPROVED',
      owner: 'Consultant Reviewer',
      action: 'QA Approved',
      note: 'Consultant QA approved and routed to Consultant Reviewer.',
    };
  }
  if (role === 'Consultant Reviewer') {
    return {
      status: 'RECOMMENDED_FOR_APPROVAL',
      owner: 'Consultant Approver',
      action: 'Recommend for Approval',
      note: 'Consultant reviewer recommended approval.',
    };
  }
  if (role === 'Consultant Approver') {
    return {
      status: 'APPROVED',
      owner: 'Consultant Approver',
      action: 'Approved',
      note: 'Consultant final approval completed.',
    };
  }
  return null;
}

function getRejectTransition(ticket, role) {
  if (role === 'Internal Team Reviewer') {
    return {
      status: 'REJECTED_INTERNALLY',
      action: 'Internal Review Rejected',
      note: 'Rejected internally and returned to Contractor.',
    };
  }
  if (role === 'Internal Team Approver') {
    return {
      status: 'REJECTED_INTERNALLY',
      action: 'Reject Internally',
      note: 'Rejected internally by approver and returned to Contractor.',
    };
  }
  if (role === 'Consultant QA Team') {
    return {
      status: 'QA_REJECTED',
      action: 'QA Rejected',
      note: 'Rejected by Consultant QA and returned to Contractor.',
    };
  }
  if (role === 'Consultant Reviewer') {
    return {
      status: 'RECOMMENDED_REJECTED',
      action: 'Recommend Rejected',
      note: 'Consultant reviewer recommended rejection and returned to Contractor.',
    };
  }
  if (role === 'Consultant Approver') {
    return {
      status: 'REJECTED',
      action: 'Rejected',
      note: 'Rejected by Consultant Approver and returned to Contractor.',
    };
  }
  return null;
}

function TicketStoreProvider({ children }) {
  const [tickets, setTickets] = useState(loadInitialTickets);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  function createTicket({ form, role }) {
    if (role !== 'Contractor') return '';

    const nextId = `TKT-${String(tickets.reduce((max, row) => {
      const n = Number(String(row.id || '').replace('TKT-', ''));
      return Number.isNaN(n) ? max : Math.max(max, n);
    }, 0) + 1).padStart(5, '0')}`;

    const reviewByRole = 'Internal Team Reviewer';
    const approveByRole = 'Consultant Approver';

    const created = {
      id: nextId,
      type: form.type,
      title: form.title,
      description: form.description || '',
      project: form.project,
      workPackage: form.workPackage || '',
      originator: form.originator || '',
      area: form.area || '',
      buildingId: form.buildingId || '',
      levelAndLocation: form.levelAndLocation || '',
      metadataFileType: form.metadataFileType || '',
      documentNumber: form.documentNumber || '',
      fileName: form.fileName || '',
      fileData: form.fileData || '',
      fileType: form.fileType || '',
      discipline: form.discipline,
      createdByRole: role,
      reviewByRole,
      approveByRole,
      closeByRole: 'Consultant Approver',
      priority: form.priority || 'High',
      lifecycleStatus: 'INITIATED',
      stageGate: 'WIP',
      status: 'INITIATED',
      currentOwnerRole: 'Internal Team Reviewer',
      createdDate: nowStamp().slice(0, 10),
      createdAt: nowStamp(),
      dueDate: '2026-02-21',
      linkedDocument: 'DOC-MEP-088',
      internalTicket: true,
      history: [
        {
          time: nowStamp(),
          role,
          action: 'Initiate Submission',
          note: 'Contractor uploaded document and submitted for internal review.',
        },
      ],
    };

    setTickets((prev) => [created, ...prev]);
    return created.id;
  }

  function updateTicket(ticketId, updater) {
    setTickets((prev) => prev.map((ticket) => (ticket.id === ticketId ? updater(ticket) : ticket)));
  }

  function sendBack(ticketId, role, options = {}) {
    updateTicket(ticketId, (ticket) => {
      if (ticket.currentOwnerRole !== role) return ticket;
      const transition = getRejectTransition(ticket, role);
      if (!transition) return ticket;
      const nextOwnerRole = options.nextOwnerRole || 'Contractor';
      const reroutedToWorkflowRole = nextOwnerRole !== 'Contractor';
      const note = reroutedToWorkflowRole
        ? `${transition.note} Routed to ${nextOwnerRole} for re-processing.`
        : transition.note;

      return addHistory(
        {
          ...ticket,
          lifecycleStatus: transition.status,
          stageGate: getStageGate(transition.status),
          status: transition.status,
          currentOwnerRole: nextOwnerRole,
        },
        role,
        transition.action,
        note
      );
    });
  }

  function resubmit(ticketId, role, updates = {}) {
    updateTicket(ticketId, (ticket) => {
      if (role !== 'Contractor' || ticket.currentOwnerRole !== 'Contractor' || !REJECTION_STATUSES.includes(ticket.status)) {
        return ticket;
      }

      return addHistory(
        {
          ...ticket,
          ...updates,
          lifecycleStatus: 'INITIATED',
          stageGate: 'WIP',
          status: 'INITIATED',
          currentOwnerRole: 'Internal Team Reviewer',
        },
        role,
        'Upload Revision and Resubmit',
        'Contractor uploaded revision and reset workflow to INITIATED.'
      );
    });
  }

  function approveAndSend(ticketId, role, options = {}) {
    updateTicket(ticketId, (ticket) => {
      if (ticket.currentOwnerRole !== role) return ticket;
      const transition = getApproveTransition(ticket, role);
      if (!transition) return ticket;
      const nextOwnerRole = options.nextOwnerRole || transition.owner;
      const note = options.nextOwnerRole && options.nextOwnerRole !== transition.owner
        ? `${transition.note} Reassigned to ${options.nextOwnerRole}.`
        : transition.note;

      return addHistory(
        {
          ...ticket,
          lifecycleStatus: transition.status,
          stageGate: getStageGate(transition.status),
          status: transition.status,
          currentOwnerRole: nextOwnerRole,
        },
        role,
        transition.action,
        note
      );
    });
  }

  function finalApprove(ticketId, role, options = {}) {
    approveAndSend(ticketId, role, options);
  }

  function resetDemo() {
    setTickets(seedTickets.map(normalizeTicket));
  }

  const value = {
    tickets,
    createTicket,
    sendBack,
    resubmit,
    approveAndSend,
    finalApprove,
    resetDemo,
  };

  return <TicketStoreContext.Provider value={value}>{children}</TicketStoreContext.Provider>;
}

function useTicketStore() {
  const context = useContext(TicketStoreContext);
  if (!context) throw new Error('useTicketStore must be used within TicketStoreProvider');
  return context;
}

export { TicketStoreProvider, useTicketStore };
