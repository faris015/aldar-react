import DocumentSelector from '../components/core/DocumentSelector';
import { documentOptions } from '../data/demoData';

function TransmittalCreatePage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Create Transmittal</h2>
        <p>Add recipients and documents, then send.</p>
      </div>

      <article className="card">
        <div className="form-grid">
          <label className="field">
            <span>Title</span>
            <input placeholder="Package 4 IFC Issue" />
          </label>
          <label className="field">
            <span>Recipient</span>
            <select><option>Main Contractor</option><option>MEP Subcontractor</option><option>Client PMO</option></select>
          </label>
          <label className="field full-width">
            <span>Message</span>
            <textarea rows="5" placeholder="Write a short message" />
          </label>
          <div className="full-width">
            <h3>Attach Documents</h3>
            <DocumentSelector options={documentOptions} selected={documentOptions[1].value} />
          </div>
        </div>

        <div className="inline-actions">
          <button type="button" className="btn">Send Transmittal</button>
        </div>
      </article>
    </section>
  );
}

export default TransmittalCreatePage;
