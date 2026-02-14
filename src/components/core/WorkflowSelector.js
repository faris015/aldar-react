function WorkflowSelector({ states }) {
  return (
    <div className="workflow-selector">
      <label>
        From Stage Gate
        <select>
          {states.map((state) => (
            <option key={`from-${state}`}>{state}</option>
          ))}
        </select>
      </label>
      <label>
        To Stage Gate
        <select>
          {states.map((state) => (
            <option key={`to-${state}`}>{state}</option>
          ))}
        </select>
      </label>
      <label>
        Approver Role
        <select>
          <option>Client</option>
          <option>Developer</option>
          <option>Designer</option>
          <option>Contractor</option>
        </select>
      </label>
      <label>
        Approval Level
        <select>
          <option>L1</option>
          <option>L2</option>
          <option>L3</option>
        </select>
      </label>
      <label>
        Role Action
        <select>
          <option>Review</option>
          <option>Approve</option>
          <option>Send Back</option>
        </select>
      </label>
      <label>
        SLA Hours
        <input type="number" defaultValue="24" />
      </label>
    </div>
  );
}

export default WorkflowSelector;
