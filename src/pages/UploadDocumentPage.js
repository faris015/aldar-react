import FileUploader from '../components/core/FileUploader';

function UploadDocumentPage() {
  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Upload Document</h2>
        <p>Choose location, add file details, and save.</p>
      </div>

      <article className="card">
        <h3>File Upload</h3>
        <FileUploader />
      </article>

      <article className="card">
        <h3>Metadata</h3>
        <div className="form-grid">
          <label className="field">
            <span>Project</span>
            <select><option>Aldar Marina District</option><option>Yas Gate Towers</option></select>
          </label>
          <label className="field">
            <span>Folder</span>
            <select><option>Architecture / Facade</option><option>Structural / Foundations</option></select>
          </label>
          <label className="field">
            <span>Discipline</span>
            <select><option>Architecture</option><option>Structural</option><option>MEP</option></select>
          </label>
          <label className="field">
            <span>Document Title</span>
            <input placeholder="Enter title" />
          </label>
          <label className="field">
            <span>Stage Gate</span>
            <select><option>WIP</option><option>Shared</option><option>Published</option><option>Archive</option></select>
          </label>
          <label className="field">
            <span>Revision Number</span>
            <input placeholder="A" />
          </label>
          <label className="field">
            <span>Document Date</span>
            <input type="date" defaultValue="2026-02-14" />
          </label>
        </div>

        <div className="inline-actions">
          <button type="button" className="btn">Save</button>
          <button type="button" className="btn btn-secondary">Submit for Review</button>
        </div>
      </article>
    </section>
  );
}

export default UploadDocumentPage;
