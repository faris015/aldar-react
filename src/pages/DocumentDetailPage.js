import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActivityTimeline from '../components/core/ActivityTimeline';
import VersionList from '../components/core/VersionList';
import PDFViewer from '../components/core/PDFViewer';
import { documents, documentActivity, documentVersions } from '../data/demoData';

function DocumentDetailPage() {
  const { docId } = useParams();
  const [activeTab, setActiveTab] = useState('details');

  const doc = useMemo(
    () => documents.find((item) => item.id === docId) || documents[0],
    [docId]
  );

  return (
    <section className="screen">
      <div className="screen-header">
        <div>
          <h2>Document Detail</h2>
          <p>{doc.id} · {doc.title}</p>
        </div>
      </div>

      <nav className="sub-nav">
        <button type="button" className={`sub-nav-link ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}>Details</button>
        <button type="button" className={`sub-nav-link ${activeTab === 'versions' ? 'active' : ''}`} onClick={() => setActiveTab('versions')}>Versions</button>
        <button type="button" className={`sub-nav-link ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>Activity</button>
      </nav>

      {activeTab === 'details' ? (
        <article className="card">
          <div className="grid-2">
            <div>
              <p><strong>Project:</strong> {doc.project}</p>
              <p><strong>Folder:</strong> {doc.folder}</p>
              <p><strong>Discipline:</strong> {doc.discipline}</p>
              <p><strong>Status:</strong> {doc.status}</p>
            </div>
            <div>
              <p><strong>Revision:</strong> {doc.revision}</p>
              <p><strong>Uploaded By:</strong> {doc.uploadedBy}</p>
              <p><strong>Date:</strong> {doc.date}</p>
            </div>
          </div>
          <PDFViewer title={`${doc.id} preview`} />
        </article>
      ) : null}

      {activeTab === 'versions' ? (
        <article className="card">
          <h3>Version History</h3>
          <VersionList versions={documentVersions} />
        </article>
      ) : null}

      {activeTab === 'activity' ? (
        <article className="card">
          <h3>Activity Timeline</h3>
          <ActivityTimeline events={documentActivity} />
        </article>
      ) : null}
    </section>
  );
}

export default DocumentDetailPage;
