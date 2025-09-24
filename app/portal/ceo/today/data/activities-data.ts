// Types
export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  dueDate: string;
  status: string;
  statusColor: string;
  priority: string;
  priorityColor: string;
  assignee: string;
  location: string;
  type: string;
  iconColor: string;
  iconBg: string;
  hoverBg: string;
  details?: string;
  stakeholders?: string[];
  relatedDocuments?: string[];
  progressUpdate?: string;
  completionEstimate?: string;
  notes?: string;
}

// Activities data for card and modal
export const activitiesData: ActivityItem[] = [
  {
    id: 'activity-1',
    title: 'Compliance Review Due',
    description: 'Annual compliance review for Mumias Mill operations',
    timestamp: 'Tomorrow',
    dueDate: 'Tomorrow',
    status: 'pending',
    statusColor: 'bg-orange-50 text-orange-700',
    priority: 'high',
    priorityColor: 'bg-red-50 text-red-700',
    assignee: 'Quality Team',
    location: 'Mumias Mill',
    type: 'compliance',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    hoverBg: 'hover:bg-orange-50',
    details: 'Annual compliance review to ensure Mumias Mill operations meet all regulatory requirements and industry standards. The review covers safety protocols, environmental compliance, quality control measures, and operational efficiency metrics.',
    stakeholders: ['Quality Assurance Team', 'Regulatory Affairs', 'Mill Operations Management'],
    relatedDocuments: ['Compliance Checklist', 'Previous Year Audit Report', 'Regulatory Framework Document'],
    progressUpdate: 'Preliminary documentation review completed (40%)',
    completionEstimate: '8 hours',
    notes: 'Focus areas include waste management improvements and emissions control upgrades made since last review.'
  },
  {
    id: 'activity-2',
    title: 'Site Visit Scheduled',
    description: 'Scheduled site visit to Chemelil Sugar Mill',
    timestamp: 'Friday',
    dueDate: 'Friday',
    status: 'scheduled',
    statusColor: 'bg-blue-50 text-blue-700',
    priority: 'medium',
    priorityColor: 'bg-yellow-50 text-yellow-700',
    assignee: 'Field Operations',
    location: 'Chemelil Sugar Mill',
    type: 'visit',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50',
    details: 'Scheduled inspection of recent equipment upgrades at Chemelil Sugar Mill. The visit will include tour of the processing facilities, meeting with technical staff, and review of production metrics following the installation of new crushing equipment.',
    stakeholders: ['Field Operations Team', 'Chemelil Management', 'Equipment Suppliers'],
    relatedDocuments: ['Equipment Specification Sheet', 'Installation Report', 'Performance Metrics'],
    progressUpdate: 'Visit confirmed with mill management',
    completionEstimate: '4 hours',
    notes: 'Transportation arrangements confirmed. Technical team will join for equipment performance assessment.'
  },
  {
    id: 'activity-3',
    title: 'License Renewal Reminder',
    description: 'License renewal for Nzoia Sugar Co. operations',
    timestamp: 'Next Week',
    dueDate: 'Next Week',
    status: 'pending',
    statusColor: 'bg-purple-50 text-purple-700',
    priority: 'medium',
    priorityColor: 'bg-yellow-50 text-yellow-700',
    assignee: 'Legal Team',
    location: 'Nzoia Sugar Co.',
    type: 'renewal',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    hoverBg: 'hover:bg-purple-50',
    details: 'Annual operational license renewal for Nzoia Sugar Company. Requires submission of updated compliance documentation, financial statements, and operational metrics to regulatory authorities.',
    stakeholders: ['Legal Department', 'Nzoia Management', 'Regulatory Affairs'],
    relatedDocuments: ['Current License Document', 'Renewal Application Form', 'Compliance Status Report'],
    progressUpdate: 'Documentation compilation in progress (65%)',
    completionEstimate: '3 days',
    notes: 'Previous year audit findings need to be addressed in renewal application. Environmental compliance section requires additional documentation.'
  },
  {
    id: 'activity-4',
    title: 'Equipment Maintenance',
    description: 'Scheduled maintenance for production equipment',
    timestamp: 'Next Monday',
    dueDate: 'Next Monday',
    status: 'scheduled',
    statusColor: 'bg-green-50 text-green-700',
    priority: 'high',
    priorityColor: 'bg-red-50 text-red-700',
    assignee: 'Maintenance Team',
    location: 'Main Production Line',
    type: 'maintenance',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50',
    details: 'Quarterly preventive maintenance for main production line equipment. Includes inspection, calibration, parts replacement, and performance testing to ensure optimal operation for the upcoming harvest season.',
    stakeholders: ['Maintenance Department', 'Production Supervisors', 'Technical Specialists'],
    relatedDocuments: ['Maintenance Schedule', 'Equipment Manuals', 'Parts Inventory List'],
    progressUpdate: 'Parts procurement completed, scheduling confirmed',
    completionEstimate: '12 hours',
    notes: 'Production will be temporarily halted. Maintenance team will work in shifts to minimize downtime. Backup systems will be activated during critical phases.'
  },
  {
    id: 'activity-5',
    title: 'Stakeholder Meeting',
    description: 'Quarterly meeting with farmer representatives',
    timestamp: 'Next Thursday',
    dueDate: 'Next Thursday',
    status: 'scheduled',
    statusColor: 'bg-blue-50 text-blue-700',
    priority: 'medium',
    priorityColor: 'bg-yellow-50 text-yellow-700',
    assignee: 'Community Relations',
    location: 'Community Center',
    type: 'meeting',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50',
    details: 'Quarterly engagement with farmer representatives to discuss cane pricing, payment schedules, and upcoming harvest planning. The meeting will also address concerns raised in previous forums and present updates on improvement initiatives.',
    stakeholders: ['Community Relations Team', 'Farmer Representatives', 'Finance Department'],
    relatedDocuments: ['Meeting Agenda', 'Previous Meeting Minutes', 'Farmer Feedback Report'],
    progressUpdate: 'Agenda finalized, invitations sent',
    completionEstimate: '3 hours',
    notes: 'Presentation on new digital payment system to be included. Refreshments arranged. Translation services confirmed.'
  }
];