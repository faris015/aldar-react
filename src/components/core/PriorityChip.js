function PriorityChip({ priority }) {
  const tone = {
    High: 'danger',
    Medium: 'warning',
    Low: 'success',
  }[priority] || 'info';

  return <span className={`chip chip-${tone}`}>{priority}</span>;
}

export default PriorityChip;
