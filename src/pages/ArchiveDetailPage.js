import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { archivedProjects } from '../data/demoData';

function ArchiveDetailPage() {
  const { projectId } = useParams();
  const item = useMemo(
    () => archivedProjects.find((row) => row.id === projectId) || archivedProjects[0],
    [projectId]
  );

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Archive Detail</h2>
        <p>{item.name}</p>
      </div>

      <article className="card">
        <div className="grid-3">
          <div>
            <h3>Documents</h3>
            <p>Final drawings and approvals.</p>
          </div>
          <div>
            <h3>Asset Data</h3>
            <p>Asset register and tags.</p>
          </div>
          <div>
            <h3>O&M Manuals</h3>
            <p>Manuals and warranties.</p>
          </div>
        </div>
        <button type="button" className="btn">Download Archive Package</button>
      </article>
    </section>
  );
}

export default ArchiveDetailPage;
