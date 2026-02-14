export const user = {
  name: 'Faris Ahmed',
  email: 'faris@aldar.demo',
  role: 'Project Engineer',
  avatar: 'FA',
};

export const kpis = [
  { label: 'My Open Tickets', value: 14, tone: 'primary' },
  { label: 'Pending Approvals', value: 6, tone: 'warning' },
  { label: 'SLA Breached', value: 2, tone: 'danger' },
  { label: 'Closed Tickets', value: 39, tone: 'success' },
];

export const tickets = [
  {
    id: 'TCK-2401',
    title: 'Facade drawing mismatch at Podium A',
    project: 'Aldar Plaza',
    discipline: 'Architecture',
    status: 'Open',
    priority: 'High',
    assignedTo: 'M. Khan',
    slaStatus: 'Due in 6h',
    lastUpdated: '2h ago',
  },
  {
    id: 'TCK-2402',
    title: 'HVAC clash with electrical tray',
    project: 'Aldar Tower 2',
    discipline: 'MEP',
    status: 'Review',
    priority: 'Medium',
    assignedTo: 'S. Roy',
    slaStatus: 'Due in 1d',
    lastUpdated: '30m ago',
  },
  {
    id: 'TCK-2403',
    title: 'Missing fire rating annotation',
    project: 'Waterfront Villas',
    discipline: 'Fire & Life Safety',
    status: 'Approved',
    priority: 'Low',
    assignedTo: 'R. Patel',
    slaStatus: 'On track',
    lastUpdated: 'Yesterday',
  },
];

export const activities = [
  { id: 1, ticket: 'TCK-2401', action: 'Status changed to Open', time: '10:32 AM', status: 'Open' },
  { id: 2, ticket: 'TCK-2402', action: 'Revision v3 uploaded', time: '9:15 AM', status: 'Review' },
  { id: 3, ticket: 'TCK-2398', action: 'SLA breached warning', time: 'Yesterday', status: 'Breached' },
];

export const attachments = [
  { version: 'v1', uploadedBy: 'Faris Ahmed', date: 'Jan 21, 2026', file: 'Facade_Layout.pdf' },
  { version: 'v2', uploadedBy: 'M. Khan', date: 'Jan 24, 2026', file: 'Facade_Layout_RevA.pdf' },
  { version: 'v3', uploadedBy: 'S. Roy', date: 'Feb 02, 2026', file: 'Facade_Layout_RevB.pdf' },
];

export const timelineEvents = [
  { time: 'Jan 21, 2026', text: 'Ticket created by Faris Ahmed' },
  { time: 'Jan 22, 2026', text: 'Assigned to M. Khan' },
  { time: 'Jan 23, 2026', text: 'Status changed Draft -> Open' },
  { time: 'Jan 24, 2026', text: 'File upload v2' },
  { time: 'Feb 05, 2026', text: 'SLA breach warning generated' },
];

export const folderTree = [
  {
    id: 'root-1',
    name: 'Aldar Plaza',
    children: [
      { id: 'f-11', name: 'Architecture', children: [{ id: 'f-111', name: 'Facade' }] },
      { id: 'f-12', name: 'MEP', children: [{ id: 'f-121', name: 'HVAC' }, { id: 'f-122', name: 'Electrical' }] },
    ],
  },
  {
    id: 'root-2',
    name: 'Waterfront Villas',
    children: [{ id: 'f-21', name: 'Site Layout' }],
  },
];

export const workflowStates = ['Draft', 'Open', 'Review', 'Approved', 'Closed'];

export const workflowList = [
  { id: 'wf-1', name: 'Standard Construction Workflow' },
  { id: 'wf-2', name: 'RFI Escalation Workflow' },
];

export const users = [
  { name: 'Faris Ahmed', email: 'faris@aldar.demo', role: 'Project Engineer', status: 'Active', lastLogin: 'Today 10:22' },
  { name: 'Maya Khan', email: 'maya@aldar.demo', role: 'Reviewer', status: 'Active', lastLogin: 'Today 09:54' },
  { name: 'Sanjay Roy', email: 'sanjay@aldar.demo', role: 'Admin', status: 'Active', lastLogin: 'Yesterday 17:10' },
];

export const notifications = [
  { id: 1, title: 'Ticket assigned', message: 'TCK-2401 assigned to you', time: '5m ago', ticketId: 'TCK-2401' },
  { id: 2, title: 'SLA breach', message: 'TCK-2398 is overdue', time: '20m ago', ticketId: 'TCK-2398' },
  { id: 3, title: 'Status change', message: 'TCK-2402 moved to Review', time: '1h ago', ticketId: 'TCK-2402' },
];
