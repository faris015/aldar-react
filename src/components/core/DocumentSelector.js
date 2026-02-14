function DocumentSelector({ label = 'Documents', options = [], selected = '', revisionLabel = 'Revision' }) {
  return (
    <div className="grid-2">
      <label className="field">
        <span>{label}</span>
        <select defaultValue={selected}>
          <option value="">Select document</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>{revisionLabel}</span>
        <select defaultValue="">
          <option value="">Select revision</option>
          <option value="a">Rev A</option>
          <option value="b">Rev B</option>
          <option value="c">Rev C</option>
        </select>
      </label>
    </div>
  );
}

export default DocumentSelector;
