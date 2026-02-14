import DocumentSelector from '../components/core/DocumentSelector';
import { documentOptions } from '../data/demoData';

function QualityCreatePage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Create Quality Issue</h2>
        <p>Create an issue and assign it.</p>
      </div>

      <article className="card">
        <div className="form-grid">
          <DocumentSelector options={documentOptions} selected={documentOptions[0].value} revisionLabel="Linked Revision" />
          <label className="field">
            <span>Assign To</span>
            <select><option>M. Khan</option><option>A. Mathew</option><option>N. Ibrahim</option></select>
          </label>
          <label className="field full-width">
            <span>Issue Description</span>
            <textarea rows="6" placeholder="Describe the issue clearly" />
          </label>
          <label className="field">
            <span>Due Date</span>
            <input type="date" defaultValue="2026-02-19" />
          </label>
        </div>

        <div className="inline-actions">
          <button type="button" className="btn">Save Issue</button>
        </div>
      </article>
    </section>
  );
}

export default QualityCreatePage;
