export const roleMenus = {
  'Client': ['tickets', 'workflow'],
  Developer: ['tickets', 'workflow'],
  'Designer': ['tickets', 'workflow'],
  'Contractor': ['tickets', 'workflow'],
};

export const authorityOrder = [
  'Client',
  'Developer',
  'Designer',
  'Contractor',
];

export const ticketTypes = [
  'Shop Drawing Submission',
  'RFI',
  'NCR',
  'Document Submission',
  'Drawing Revision',
  'Site Issue',
  'Inspection Request',
  'Material Submittal',
  'Transmittal',
];

export const statusFlow = [
  'Draft',
  'Submitted',
  'Under Review',
  'Approved',
  'Rejected',
  'Published',
  'Closed',
  'Archived',
];

export const stageGates = ['WIP', 'Shared', 'Published', 'Archive'];

export const roleCapabilityMatrix = {
  'Client': {
    create: true,
    upload: true,
    review: true,
    approve: true,
    sendBack: true,
    publish: true,
    close: true,
  },
  Developer: {
    create: true,
    upload: true,
    review: true,
    approve: true,
    sendBack: true,
    publish: true,
    close: true,
  },
  'Designer': {
    create: true,
    upload: true,
    review: true,
    approve: true,
    sendBack: true,
    publish: true,
    close: true,
  },
  'Contractor': {
    create: true,
    upload: true,
    review: false,
    approve: false,
    sendBack: true,
    publish: false,
    close: false,
  },
};

export const tickets = [
  {
    id: 'TKT-901',
    type: 'Shop Drawing Submission',
    title: 'HVAC shop drawing package - Block A',
    project: 'Project A',
    createdByRole: 'Contractor',
    reviewByRole: 'Designer',
    approveByRole: 'Client',
    closeByRole: 'Designer',
    priority: 'High',
    lifecycleStatus: 'Submitted',
    stageGate: 'WIP',
    status: 'Submitted to Designer',
    currentOwnerRole: 'Designer',
    dueDate: '2026-02-15',
    linkedDocument: 'DOC-MEP-088',
    internalTicket: false,
    history: [],
  },
  {
    id: 'TKT-902',
    type: 'RFI',
    title: 'Clarification on fire damper access panel size',
    project: 'Project B',
    createdByRole: 'Contractor',
    reviewByRole: 'Designer',
    approveByRole: 'Developer',
    closeByRole: 'Designer',
    priority: 'Medium',
    lifecycleStatus: 'Under Review',
    stageGate: 'Shared',
    status: 'Sent to Developer',
    currentOwnerRole: 'Developer',
    dueDate: '2026-02-16',
    linkedDocument: 'DOC-ARC-014',
    internalTicket: false,
    history: [],
  },
  {
    id: 'TKT-903',
    type: 'Drawing Revision',
    title: 'Podium facade louver redesign',
    project: 'Project C',
    createdByRole: 'Designer',
    reviewByRole: 'Developer',
    approveByRole: 'Client',
    closeByRole: 'Developer',
    priority: 'High',
    lifecycleStatus: 'Approved',
    stageGate: 'Shared',
    status: 'Waiting Client Final Approval',
    currentOwnerRole: 'Client',
    dueDate: '2026-02-17',
    linkedDocument: 'DOC-ARC-014',
    internalTicket: false,
    history: [],
  },
  {
    id: 'TKT-904',
    type: 'Inspection Request',
    title: 'Site inspection pending for podium slab',
    project: 'Project A',
    createdByRole: 'Contractor',
    reviewByRole: 'Designer',
    approveByRole: 'Developer',
    closeByRole: 'Developer',
    priority: 'Medium',
    lifecycleStatus: 'Rejected',
    stageGate: 'WIP',
    status: 'Sent Back to Contractor',
    currentOwnerRole: 'Contractor',
    dueDate: '2026-02-20',
    linkedDocument: 'DOC-STR-001',
    internalTicket: true,
    history: [],
  },
];

export const reviewTasks = [
  {
    id: 'RVW-1203',
    ticketId: 'TKT-901',
    title: 'Shop drawing technical review',
    createdBy: 'Contractor',
    reviewer: 'Designer',
    approver: 'Client',
    status: 'Under Review',
    stageGate: 'WIP',
    dueDate: '2026-02-15',
  },
  {
    id: 'RVW-1204',
    ticketId: 'TKT-902',
    title: 'RFI response validation',
    createdBy: 'Contractor',
    reviewer: 'Designer',
    approver: 'Developer',
    status: 'Submitted',
    stageGate: 'Shared',
    dueDate: '2026-02-16',
  },
];

export const documents = [
  {
    id: 'DOC-STR-001',
    title: 'Foundation General Arrangement',
    project: 'Project A',
    folder: 'Structural / Foundations',
    discipline: 'Structural',
    revision: 'A',
    status: 'WIP',
    uploadedBy: 'H. Saleh',
    date: '2026-02-10',
  },
  {
    id: 'DOC-ARC-014',
    title: 'Podium Facade Elevations',
    project: 'Project B',
    folder: 'Architecture / Facade',
    discipline: 'Architecture',
    revision: 'C',
    status: 'Published',
    uploadedBy: 'M. Khan',
    date: '2026-02-07',
  },
  {
    id: 'DOC-MEP-088',
    title: 'Level 3 HVAC Routing',
    project: 'Project C',
    folder: 'MEP / HVAC',
    discipline: 'MEP',
    revision: 'B',
    status: 'Shared',
    uploadedBy: 'S. Roy',
    date: '2026-02-11',
  },
];

export const documentVersions = [
  { number: 'Rev A', date: '2026-01-28', by: 'H. Saleh', status: 'WIP' },
  { number: 'Rev B', date: '2026-02-04', by: 'N. Ibrahim', status: 'Shared' },
  { number: 'Rev C', date: '2026-02-10', by: 'M. Khan', status: 'Published' },
];

export const documentActivity = [
  { time: '2026-01-28 09:34', text: 'Document created in WIP by H. Saleh' },
  { time: '2026-02-04 14:22', text: 'Rev B uploaded and shared internally' },
  { time: '2026-02-10 11:07', text: 'Rev C approved and published' },
  { time: '2026-02-12 08:59', text: 'External transmittal TRN-432 sent' },
];

export const qualityIssues = [
  {
    id: 'NC-301',
    document: 'DOC-ARC-014',
    raisedBy: 'Designer',
    assignedTo: 'Contractor',
    status: 'Open',
    dueDate: '2026-02-18',
  },
  {
    id: 'NC-302',
    document: 'DOC-MEP-088',
    raisedBy: 'Developer',
    assignedTo: 'Contractor',
    status: 'In Progress',
    dueDate: '2026-02-19',
  },
];

export const transmittals = [
  {
    id: 'TRN-432',
    title: 'Package 4 IFC Issue',
    sender: 'Developer',
    recipient: 'Contractor',
    status: 'Acknowledged',
    date: '2026-02-12',
  },
  {
    id: 'TRN-433',
    title: 'MEP Coordination Update',
    sender: 'Designer',
    recipient: 'Contractor',
    status: 'Sent',
    date: '2026-02-13',
  },
];

export const integrations = [
  { name: 'BIM 360 Connector', lastSync: '2026-02-14 09:10', status: 'Healthy', result: '42 objects updated' },
  { name: 'Primavera P6', lastSync: '2026-02-14 08:45', status: 'Warning', result: '2 mapping conflicts' },
  { name: 'ERP SAP Link', lastSync: '2026-02-14 08:15', status: 'Healthy', result: 'No errors' },
  { name: 'CAFM Asset Bridge', lastSync: '2026-02-14 07:59', status: 'Healthy', result: '18 assets exported' },
];

export const archivedProjects = [
  { id: 'ARC-1', name: 'Project A', archiveDate: '2026-01-20', status: 'Complete' },
  { id: 'ARC-2', name: 'Project B', archiveDate: '2026-02-05', status: 'In Validation' },
];

export const adminUsers = [
  { name: 'Faris Ahmed', email: 'faris@aldar.demo', role: 'Developer', level: 'L3', permission: 'Approve', status: 'Active' },
  { name: 'Maya Khan', email: 'maya@aldar.demo', role: 'Designer', level: 'L2', permission: 'Review', status: 'Active' },
  { name: 'Lina Saleh', email: 'lina@aldar.demo', role: 'Client', level: 'L3', permission: 'Approve', status: 'Active' },
  { name: 'Rashed Ali', email: 'rashed@aldar.demo', role: 'Contractor', level: 'L1', permission: 'View', status: 'Active' },
];

export const roles = [
  { role: 'Client', create: 'Yes', review: 'Yes', approve: 'Yes', sendBack: 'Yes', publish: 'Yes', close: 'Yes', users: 8 },
  { role: 'Developer', create: 'Yes', review: 'Yes', approve: 'Yes', sendBack: 'Yes', publish: 'Yes', close: 'Yes', users: 3 },
  { role: 'Designer', create: 'Yes', review: 'Yes', approve: 'Yes', sendBack: 'Yes', publish: 'Yes', close: 'Yes', users: 11 },
  { role: 'Contractor', create: 'Yes', review: 'No', approve: 'No', sendBack: 'Yes (Internal)', publish: 'No', close: 'No', users: 22 },
];

export const auditLogs = [
  {
    id: 'AUD-8001',
    timestamp: '2026-02-14 09:10:11',
    user: 'Contractor',
    action: 'CREATE_TICKET',
    entity: 'TKT-901',
    details: 'Shop drawing submitted',
    beforeValue: 'Draft',
    afterValue: 'Submitted',
  },
  {
    id: 'AUD-8002',
    timestamp: '2026-02-14 09:31:55',
    user: 'Designer',
    action: 'REVIEW_TICKET',
    entity: 'TKT-901',
    details: 'Reviewed and approved with comments',
    beforeValue: 'Submitted',
    afterValue: 'Approved',
  },
  {
    id: 'AUD-8003',
    timestamp: '2026-02-14 10:02:09',
    user: 'Client',
    action: 'PUBLISH_DOCUMENT',
    entity: 'TKT-901',
    details: 'Final approval completed, moved to published',
    beforeValue: 'Approved',
    afterValue: 'Published',
  },
];

export const dashboardStats = [
  { label: 'Open Tickets', value: 24 },
  { label: 'Under Review', value: 7 },
  { label: 'Published', value: 12 },
  { label: 'Closed Today', value: 9 },
];

export const demoJourneySteps = [
  'Contractor creates shop drawing ticket and submits (WIP).',
  'Designer reviews and approves or sends back.',
  'Developer performs compliance review when required.',
  'Client gives final approval and publishes.',
  'Contractor and Designer handle post-publish issues.',
  'Tickets are closed and archived with full audit trail.',
];

export const documentOptions = documents.map((doc) => ({
  value: doc.id,
  label: `${doc.id} - ${doc.title}`,
}));

export function getRoleCapability(role) {
  return roleCapabilityMatrix[role] || roleCapabilityMatrix['Client'];
}

export function canRoleApproveTicket(role, ticket) {
  if (!getRoleCapability(role).approve) return false;
  if (role === 'Contractor') return false;
  const roleRank = authorityOrder.indexOf(role);
  const creatorRank = authorityOrder.indexOf(ticket.createdByRole);
  if (roleRank === -1 || creatorRank === -1) return false;
  return roleRank < creatorRank;
}

export function canRoleSendBackTicket(role, ticket) {
  if (role === 'Contractor') return ticket.internalTicket;
  return getRoleCapability(role).sendBack;
}
