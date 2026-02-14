function Snackbar({ message, open, tone = 'info', onClose }) {
  if (!open) return null;

  return (
    <div className={`snackbar snackbar-${tone}`} role="status">
      <span>{message}</span>
      <button type="button" onClick={onClose}>Dismiss</button>
    </div>
  );
}

export default Snackbar;
