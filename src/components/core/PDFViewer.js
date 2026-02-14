function PDFViewer({ title = 'Embedded PDF Viewer Placeholder' }) {
  return (
    <section className="pdf-viewer">
      <div className="pdf-toolbar">
        <button type="button">-</button>
        <span>100%</span>
        <button type="button">+</button>
        <button type="button">Prev</button>
        <button type="button">Next</button>
        <button type="button">Full Screen</button>
      </div>
      <div className="pdf-canvas-placeholder">{title}</div>
      <div className="cad-coming-soon">CAD Viewer (Coming Soon)</div>
    </section>
  );
}

export default PDFViewer;
