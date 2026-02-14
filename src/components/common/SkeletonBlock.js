function SkeletonBlock() {
  return (
    <div className="skeleton-grid" aria-hidden="true">
      <div className="skeleton-card" />
      <div className="skeleton-card" />
      <div className="skeleton-card" />
    </div>
  );
}

export default SkeletonBlock;
