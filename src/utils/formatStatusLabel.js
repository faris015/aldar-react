function formatStatusLabel(status) {
  return String(status || '').replace(/_/g, ' ');
}

export default formatStatusLabel;
