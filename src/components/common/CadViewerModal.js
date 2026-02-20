import AutodeskDwgViewer from '../core/AutodeskDwgViewer';

function CadViewerModal({ open, onClose, urn, title = 'CAD Viewer' }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-card modal-card-wide" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" className="btn btn-secondary btn-small" onClick={onClose}>Close</button>
        </div>
        <AutodeskDwgViewer urn={urn} title={title} />
      </div>
    </div>
  );
}

export default CadViewerModal;
