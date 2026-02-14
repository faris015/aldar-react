function ActivityTimeline({ events }) {
  return (
    <ol className="activity-timeline">
      {events.map((event) => (
        <li key={`${event.time}-${event.text}`}>
          <span className="timeline-dot" aria-hidden="true" />
          <div>
            <strong>{event.time}</strong>
            <p>{event.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default ActivityTimeline;
