function VersionList({ versions = [], showActions = true }) {
  return (
    <div className="version-list">
      {versions.map((version) => (
        <article key={version.number} className="version-card">
          <h4>{version.number}</h4>
          <p>Uploaded: {version.date}</p>
          <p>By: {version.by}</p>
          <p>Status: {version.status}</p>
          {showActions ? (
            <div className="inline-actions">
              <button type="button" className="btn btn-tonal">View version</button>
              <button type="button" className="btn btn-tonal">Compare version</button>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export default VersionList;
