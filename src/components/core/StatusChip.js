import formatStatusLabel from '../../utils/formatStatusLabel';

function StatusChip({ status }) {
  const tone = {
    INITIATED: 'info',
    INTERNALLY_REVIEWED: 'warning',
    ISSUED_FOR_SHARED: 'warning',
    QA_APPROVED: 'success',
    RECOMMENDED_FOR_APPROVAL: 'warning',
    APPROVED: 'success',
    REJECTED_INTERNALLY: 'danger',
    QA_REJECTED: 'danger',
    RECOMMENDED_REJECTED: 'danger',
    REJECTED: 'danger',
  }[status] || 'info';

  return <span className={`chip chip-${tone}`}>{formatStatusLabel(status)}</span>;
}

export default StatusChip;
