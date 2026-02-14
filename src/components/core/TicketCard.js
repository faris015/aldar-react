import PriorityChip from './PriorityChip';
import StatusChip from './StatusChip';

function TicketCard({ ticket, onClick }) {
  return (
    <article className="ticket-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="ticket-card-top">
        <strong>{ticket.id}</strong>
        <StatusChip status={ticket.status} />
      </div>
      <h3>{ticket.title}</h3>
      <p>{ticket.project}</p>
      <div className="ticket-card-meta">
        <PriorityChip priority={ticket.priority} />
        <span>{ticket.assignedTo}</span>
      </div>
    </article>
  );
}

export default TicketCard;
