export const roleMenus = {
  'Internal Team Reviewer': ['tickets', 'workflow'],
  'Internal Team Approver': ['tickets', 'workflow'],
  'Consultant QA Team': ['tickets', 'workflow'],
  'Consultant Reviewer': ['tickets', 'workflow'],
  'Consultant Approver': ['tickets', 'workflow'],
  'Contractor': ['tickets', 'workflow'],
};

export const authorityOrder = [
  'Consultant Approver',
  'Consultant Reviewer',
  'Consultant QA Team',
  'Internal Team Approver',
  'Internal Team Reviewer',
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

export const ticketCreationMetadata = {
  projects: ['Project Name (PRJXX)'],
  workPackages: [
    'All Packages (ZZ)',
    'Building Works (BW)',
    'Commercial (CM)',
    'Early Works (EW)',
    'Infrastructure (IN)',
    'Public Realm (PR)',
  ],
  originators: [
    'Cost Consultant 01 (CC01)',
    'Lead Design Consultant 01 (LDC01)',
    'Lead Design Consultant 02 (LDC02)',
    'Lead Design Consultant 03 (LDC03)',
    'Lead Design Consultant 04 (LDC04)',
    'Lead Design Consultant 05 (LDC05)',
    'Project Management Consultant (PMC)',
  ],
  areas: ['All Areas (ZZ)'],
  buildingIds: [
    'All (ZZ)',
    'Building 01 (B1)',
  ],
  levelAndLocations: [
    'No Level Applicable (XX)',
    'Multiple Levels (ZZ)',
    'Mezzanine Floor (MZ)',
    'Ground Dloor (00)',
    'First Floor (01)',
  ],
  fileTypes: [
    'Affection Plan (AP)',
    'Agenda (AG)',
    'Agreement (AT)',
    'Audit Report (AR)',
    'Bill of Quantities (BQ)',
    'Bond (BD)',
  ],
  disciplines: [
    'Acoustic (AE)',
    'Administration (AD)',
    'Air-Conditioning (AC)',
    'Aircraft Warning System (AW)',
    'Architectural (AR)',
    'Audio Visual (AV)',
  ],
  numberHint: '5 digit number (manual input)',
};

export const statusFlow = [
  'INITIATED',
  'INTERNALLY_REVIEWED',
  'INTERNALLY_APPROVED',
  'QA_APPROVED',
  'RECOMMENDED_FOR_APPROVAL',
  'APPROVED',
];

export const stageGates = ['WIP', 'Shared', 'Published'];

export const roleCapabilityMatrix = {
  'Internal Team Reviewer': {
    create: false,
    upload: true,
    review: true,
    approve: false,
    sendBack: true,
    publish: false,
    close: false,
  },
  'Internal Team Approver': {
    create: false,
    upload: true,
    review: false,
    approve: true,
    sendBack: true,
    publish: false,
    close: false,
  },
  'Consultant QA Team': {
    create: false,
    upload: true,
    review: true,
    approve: false,
    sendBack: true,
    publish: false,
    close: false,
  },
  'Consultant Reviewer': {
    create: false,
    upload: true,
    review: true,
    approve: false,
    sendBack: true,
    publish: false,
    close: false,
  },
  'Consultant Approver': {
    create: false,
    upload: true,
    review: false,
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
    id: 'TKT-00950',
    type: 'Shop Drawing Submission',
    title: 'Podium slab reinforcement submission',
    project: 'Project Name (PRJXX)',
    workPackage: 'Early Works (EW)',
    originator: 'Project Management Consultant (PMC)',
    area: 'All Areas (ZZ)',
    buildingId: 'Building 01 (B1)',
    levelAndLocation: 'Ground Dloor (00)',
    metadataFileType: 'Agenda (AG)',
    discipline: 'Administration (AD)',
    fileName: 'Podium_Rebar_Agenda.pdf',
    fileData: '',
    fileType: 'application/pdf',
    createdByRole: 'Contractor',
    reviewByRole: 'Internal Team Reviewer',
    approveByRole: 'Consultant Approver',
    closeByRole: 'Consultant Approver',
    priority: 'High',
    lifecycleStatus: 'INITIATED',
    stageGate: 'WIP',
    status: 'INITIATED',
    currentOwnerRole: 'Internal Team Reviewer',
    dueDate: '2026-02-15',
    linkedDocument: 'DOC-MEP-088',
    internalTicket: true,
    history: [],
  },
];

export const reviewTasks = [
  {
    id: 'RVW-1203',
    ticketId: 'TKT-00950',
    title: 'Structural package technical review',
    createdBy: 'Contractor',
    reviewer: 'Internal Team Reviewer',
    approver: 'Consultant Approver',
    status: 'INITIATED',
    stageGate: 'WIP',
    dueDate: '2026-02-15',
  },
  {
    id: 'RVW-1204',
    ticketId: 'TKT-902',
    title: 'RFI response validation',
    createdBy: 'Contractor',
    reviewer: 'Internal Team Approver',
    approver: 'Consultant QA Team',
    status: 'INTERNALLY_REVIEWED',
    stageGate: 'WIP',
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
    raisedBy: 'Consultant QA Team',
    assignedTo: 'Contractor',
    status: 'Open',
    dueDate: '2026-02-18',
  },
  {
    id: 'NC-302',
    document: 'DOC-MEP-088',
    raisedBy: 'Internal Team Approver',
    assignedTo: 'Contractor',
    status: 'In Progress',
    dueDate: '2026-02-19',
  },
];

export const transmittals = [
  {
    id: 'TRN-432',
    title: 'Package 4 IFC Issue',
    sender: 'Internal Team Approver',
    recipient: 'Contractor',
    status: 'Acknowledged',
    date: '2026-02-12',
  },
  {
    id: 'TRN-433',
    title: 'MEP Coordination Update',
    sender: 'Consultant Reviewer',
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
  { name: 'Faris Ahmed', email: 'faris@aldar.demo', role: 'Internal Team Approver', level: 'L3', permission: 'Approve', status: 'Active' },
  { name: 'Maya Khan', email: 'maya@aldar.demo', role: 'Consultant QA Team', level: 'L2', permission: 'Review', status: 'Active' },
  { name: 'Lina Saleh', email: 'lina@aldar.demo', role: 'Consultant Approver', level: 'L3', permission: 'Approve', status: 'Active' },
  { name: 'Rashed Ali', email: 'rashed@aldar.demo', role: 'Contractor', level: 'L1', permission: 'View', status: 'Active' },
];

export const roles = [
  { role: 'Contractor', create: 'Yes', review: 'No', approve: 'No', sendBack: 'No', publish: 'No', close: 'No', users: 22 },
  { role: 'Internal Team Reviewer', create: 'No', review: 'Yes', approve: 'No', sendBack: 'Yes', publish: 'No', close: 'No', users: 11 },
  { role: 'Internal Team Approver', create: 'No', review: 'No', approve: 'Yes', sendBack: 'Yes', publish: 'No', close: 'No', users: 7 },
  { role: 'Consultant QA Team', create: 'No', review: 'Yes', approve: 'No', sendBack: 'Yes', publish: 'No', close: 'No', users: 6 },
  { role: 'Consultant Reviewer', create: 'No', review: 'Yes', approve: 'No', sendBack: 'Yes', publish: 'No', close: 'No', users: 4 },
  { role: 'Consultant Approver', create: 'No', review: 'No', approve: 'Yes', sendBack: 'Yes', publish: 'Yes', close: 'Yes', users: 3 },
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
    user: 'Internal Team Reviewer',
    action: 'REVIEW_TICKET',
    entity: 'TKT-901',
    details: 'Reviewed and approved with comments',
    beforeValue: 'INITIATED',
    afterValue: 'INTERNALLY_REVIEWED',
  },
  {
    id: 'AUD-8003',
    timestamp: '2026-02-14 10:02:09',
    user: 'Consultant Approver',
    action: 'PUBLISH_DOCUMENT',
    entity: 'TKT-901',
    details: 'Final approval completed, moved to published',
    beforeValue: 'RECOMMENDED_FOR_APPROVAL',
    afterValue: 'APPROVED',
  },
];

export const dashboardStats = [
  { label: 'Initiated', value: 24 },
  { label: 'In Internal Review', value: 7 },
  { label: 'QA Approved', value: 12 },
  { label: 'Final Approved', value: 9 },
];

export const demoJourneySteps = [
  'Contractor uploads document and submits as INITIATED.',
  'Internal Team Reviewer approves to INTERNALLY_REVIEWED or rejects internally.',
  'Internal Team Approver issues as INTERNALLY_APPROVED or rejects internally.',
  'Consultant QA and Consultant Reviewer complete QA and recommendation stages.',
  'Consultant Approver issues APPROVED or REJECTED final decision.',
  'Any rejection returns to Contractor for revision and resubmission to INITIATED.',
];

[
  tickets,
  reviewTasks,
  documents,
  documentVersions,
  documentActivity,
  qualityIssues,
  transmittals,
  integrations,
  archivedProjects,
  adminUsers,
  roles,
  auditLogs,
  dashboardStats,
  demoJourneySteps,
].forEach((dataset) => dataset.splice(1));

export const documentOptions = documents.map((doc) => ({
  value: doc.id,
  label: `${doc.id} - ${doc.title}`,
}));

export function getRoleCapability(role) {
  return roleCapabilityMatrix[role] || roleCapabilityMatrix['Contractor'];
}

export function canRoleApproveTicket(role, ticket) {
  if (!getRoleCapability(role).approve) return false;
  if (role === 'Contractor' || role === ticket.createdByRole) return false;
  const roleRank = authorityOrder.indexOf(role);
  const creatorRank = authorityOrder.indexOf(ticket.createdByRole);
  if (roleRank === -1 || creatorRank === -1) return false;
  return roleRank < creatorRank;
}

export function canRoleSendBackTicket(role, ticket) {
  if (role === 'Contractor') return ticket.internalTicket;
  return getRoleCapability(role).sendBack;
}
