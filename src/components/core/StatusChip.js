function StatusChip({ status }) {
  const tone = {
    Open: 'info',
    Review: 'warning',
    Approved: 'success',
    Closed: 'muted',
    Breached: 'danger',
    Draft: 'muted',
  }[status] || 'info';

  return <span className={`chip chip-${tone}`}>{status}</span>;
}

export default StatusChip;
