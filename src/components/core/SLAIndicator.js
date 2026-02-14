function SLAIndicator({ text = 'Due in 6h', breached = false }) {
  return <span className={`sla-indicator ${breached ? 'sla-danger' : 'sla-ok'}`}>{text}</span>;
}

export default SLAIndicator;
