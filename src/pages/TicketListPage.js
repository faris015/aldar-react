import { useNavigate } from 'react-router-dom';
import PriorityChip from '../components/core/PriorityChip';
import StatusChip from '../components/core/StatusChip';
import TicketCard from '../components/core/TicketCard';
import { tickets } from '../data/mockData';

function TicketListPage() {
  const navigate = useNavigate();

  return (
    <section className="screen">
      <div className="screen-header">
        <h1>Tickets</h1>
        <button type="button" className="btn" onClick={() => navigate('/tickets/new')}>Create Ticket</button>
      </div>

      <div className="card filters-panel">
        <input type="search" placeholder="Search tickets" />
        <select><option>Status</option><option>Open</option><option>Review</option></select>
        <select><option>Priority</option><option>High</option><option>Medium</option></select>
        <select><option>Discipline</option><option>Architecture</option><option>MEP</option></select>
        <select><option>Assigned To</option><option>M. Khan</option><option>S. Roy</option></select>
        <input type="text" placeholder="Date range" />
      </div>

      <div className="desktop-table card">
        <table>
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>Title</th>
              <th>Project</th>
              <th>Discipline</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th>SLA Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.project}</td>
                <td>{ticket.discipline}</td>
                <td><StatusChip status={ticket.status} /></td>
                <td><PriorityChip priority={ticket.priority} /></td>
                <td>{ticket.assignedTo}</td>
                <td>{ticket.slaStatus}</td>
                <td>{ticket.lastUpdated}</td>
                <td>
                  <button type="button" className="link-btn" onClick={() => navigate(`/tickets/${ticket.id}`)}>View</button>
                  <button type="button" className="link-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-ticket-list">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} onClick={() => navigate(`/tickets/${ticket.id}`)} />
        ))}
      </div>
    </section>
  );
}

export default TicketListPage;
