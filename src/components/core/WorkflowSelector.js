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
          <option>Contractor</option>
          <option>Internal Team Reviewer</option>
          <option>Internal Team Approver</option>
          <option>Consultant QA Team</option>
          <option>Consultant Reviewer</option>
          <option>Consultant Approver</option>
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
          <option>Initiate</option>
          <option>Review Approved</option>
          <option>Reject</option>
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
