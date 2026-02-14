import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { transmittals } from '../data/demoData';

function TransmittalDetailPage() {
  const { transmittalId } = useParams();
  const item = useMemo(
    () => transmittals.find((row) => row.id === transmittalId) || transmittals[0],
    [transmittalId]
  );

  return (
    <section className="screen">
      <div className="screen-header">
        <h2>Transmittal Detail</h2>
        <p>{item.id} · {item.title}</p>
      </div>

      <article className="card">
        <p><strong>Sender:</strong> {item.sender}</p>
        <p><strong>Recipient:</strong> {item.recipient}</p>
        <p><strong>Status:</strong> {item.status}</p>
        <p><strong>Date:</strong> {item.date}</p>

        <h3>Documents Sent</h3>
        <ul className="compact-list">
          <li><span>DOC-ARC-014 Rev C</span><small>IFC drawing</small></li>
          <li><span>DOC-MEP-088 Rev B</span><small>Coordination update</small></li>
        </ul>

        <h3>Acknowledgment</h3>
        <p>Recipient has acknowledged receipt.</p>
      </article>
    </section>
  );
}

export default TransmittalDetailPage;
