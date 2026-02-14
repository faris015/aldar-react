import { createContext, useContext, useEffect, useState } from 'react';
import { tickets as seedTickets } from '../data/demoData';

const STORAGE_KEY = 'aldar_ticket_demo_v1';

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
    return parsed.map(normalizeTicket);
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

function lastSendBackBy(ticket) {
  return ticket.history.find((entry) => entry.action === 'Send Back')?.role || 'Designer';
}

function TicketStoreProvider({ children }) {
  const [tickets, setTickets] = useState(loadInitialTickets);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  function createTicket({ form, role, routeTo }) {
    const nextId = `TKT-${tickets.reduce((max, row) => {
      const n = Number(String(row.id || '').replace('TKT-', ''));
      return Number.isNaN(n) ? max : Math.max(max, n);
    }, 900) + 1}`;

    const reviewByRole = 'Designer';
    const approveByRole = routeTo === 'Developer' ? 'Developer' : 'Client';

    const created = {
      id: nextId,
      type: form.type,
      title: form.title,
      description: form.description,
      project: form.project,
      fileName: form.fileName || '',
      fileData: form.fileData || '',
      fileType: form.fileType || '',
      discipline: form.discipline,
      createdByRole: role,
      reviewByRole,
      approveByRole,
      closeByRole: 'Developer',
      priority: form.priority,
      lifecycleStatus: 'Submitted',
      stageGate: 'WIP',
      status: 'Submitted to Designer',
      currentOwnerRole: 'Designer',
      createdDate: nowStamp().slice(0, 10),
      createdAt: nowStamp(),
      dueDate: '2026-02-21',
      linkedDocument: 'DOC-MEP-088',
      internalTicket: role === 'Contractor',
      history: [
        {
          time: nowStamp(),
          role,
          action: 'Create Ticket',
          note: `Created and submitted to Designer. Requested route: ${routeTo}.`,
        },
      ],
    };

    setTickets((prev) => [created, ...prev]);
    return created.id;
  }

  function updateTicket(ticketId, updater) {
    setTickets((prev) => prev.map((ticket) => (ticket.id === ticketId ? updater(ticket) : ticket)));
  }

function reviewTicket(ticketId, role) {
    updateTicket(ticketId, (ticket) =>
      addHistory(
        {
          ...ticket,
          lifecycleStatus: 'Under Review',
          stageGate: 'Shared',
          status: `Reviewed by ${role}`,
        },
        role,
        'Review',
        'Ticket reviewed.'
      )
    );
  }

  function sendBack(ticketId, role) {
    updateTicket(ticketId, (ticket) =>
      addHistory(
        {
          ...ticket,
          lifecycleStatus: 'Rejected',
          stageGate: 'WIP',
          status: `Sent Back by ${role}`,
          currentOwnerRole: 'Contractor',
        },
        role,
        'Send Back',
        'Returned to Contractor for revision.'
      )
    );
  }

  function resubmit(ticketId, role, updates = {}) {
    updateTicket(ticketId, (ticket) =>
      addHistory(
        {
          ...ticket,
          ...updates,
          lifecycleStatus: 'Submitted',
          stageGate: 'WIP',
          status: `Updated and resubmitted to ${lastSendBackBy(ticket)}`,
          currentOwnerRole: lastSendBackBy(ticket),
        },
        role,
        'Update and Resubmit',
        `Contractor updated ticket and resubmitted to ${lastSendBackBy(ticket)}.`
      )
    );
  }

function approveAndSend(ticketId, role, targetRole) {
    updateTicket(ticketId, (ticket) => {
      const nextLifecycle = targetRole === 'Client' ? 'Approved' : 'Under Review';
      return addHistory(
        {
          ...ticket,
          lifecycleStatus: nextLifecycle,
          stageGate: 'Shared',
          status: `Approved by ${role} and sent to ${targetRole}`,
          currentOwnerRole: targetRole,
        },
        role,
        'Approve and Send',
        `Forwarded to ${targetRole}.`
      );
    });
  }

  function finalApprove(ticketId, role) {
    updateTicket(ticketId, (ticket) =>
      addHistory(
        {
          ...ticket,
          lifecycleStatus: 'Published',
          stageGate: 'Published',
          status: 'Final Approved by Client',
          currentOwnerRole: 'Client',
        },
        role,
        'Final Approve',
        'Client final approval completed.'
      )
    );
  }

  function resetDemo() {
    setTickets(seedTickets.map(normalizeTicket));
  }

  const value = {
    tickets,
    createTicket,
    reviewTicket,
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
