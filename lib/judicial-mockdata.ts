// Judiciary-specific mock data for components

export interface AIInsightItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: string;
  confidence: string;
  impact: string;
  priority: string;
  iconColor: string;
  iconBg: string;
  hoverBg: string;
}

export interface JudicialMeetingItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  date: string;
  time: string;
  status: string;
  location: string;
  type: string;
  typeColor: string;
  attendees: number;
  iconColor: string;
  iconBg: string;
  hoverBg: string;
}

export interface JudicialActivityItem {
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
}

export interface JudicialActionItem {
  id: string;
  title: string;
  description: string;
  type: string;
  timestamp: string;
  iconColor: string;
  iconBg: string;
  hoverBg: string;
}

export const judicialMeetings: JudicialMeetingItem[] = [
  {
    id: 'meeting-1',
    title: 'Judges Conference',
    description: 'Quarterly meeting of all High Court judges to discuss policy and administration',
    timestamp: 'Today, 2:00 PM',
    date: 'Today',
    time: '2:00 PM',
    status: 'scheduled',
    location: 'Supreme Court, Conference Room A',
    type: 'Judicial Conference',
    typeColor: 'bg-blue-50 text-blue-700',
    attendees: 15,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    id: 'meeting-2',
    title: 'Case Management Meeting',
    description: 'Weekly meeting to review case allocation and scheduling',
    timestamp: 'Tomorrow, 10:00 AM',
    date: 'Tomorrow',
    time: '10:00 AM',
    status: 'scheduled',
    location: 'Chambers, Floor 3',
    type: 'Administrative',
    typeColor: 'bg-green-50 text-green-700',
    attendees: 6,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50'
  },
  {
    id: 'meeting-3',
    title: 'Pre-Trial Conference',
    description: 'Pre-trial conference for Commercial Case #378/2025',
    timestamp: 'Friday, 9:30 AM',
    date: 'Friday',
    time: '9:30 AM',
    status: 'scheduled',
    location: 'Courtroom 2B',
    type: 'Case Conference',
    typeColor: 'bg-yellow-50 text-yellow-700',
    attendees: 8,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
    hoverBg: 'hover:bg-yellow-50'
  },
  {
    id: 'meeting-4',
    title: 'Judicial Ethics Training',
    description: 'Mandatory annual ethics training for all judges',
    timestamp: 'Monday, 10:00 AM',
    date: 'Monday',
    time: '10:00 AM',
    status: 'scheduled',
    location: 'Judicial Training Institute',
    type: 'Training',
    typeColor: 'bg-purple-50 text-purple-700',
    attendees: 25,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    hoverBg: 'hover:bg-purple-50'
  }
];

export const judicialActions: JudicialActionItem[] = [
  {
    id: 'action-1',
    title: 'Bail Application Approval',
    description: 'Review and approve bail application for Criminal Case #45/2025',
    type: 'approval',
    timestamp: '2 hours ago',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    id: 'action-2', 
    title: 'Court Schedule Confirmation',
    description: 'Confirm proposed hearing schedule for August 2025',
    type: 'approval',
    timestamp: '4 hours ago',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    id: 'action-3',
    title: 'Judicial Committee Vote',
    description: 'Vote on new procedural guidelines for commercial cases',
    type: 'vote',
    timestamp: '1 day ago',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50'
  },
  {
    id: 'action-4',
    title: 'Conference Attendance',
    description: 'Confirm attendance for annual Judicial Conference in September',
    type: 'vote',
    timestamp: '2 days ago',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50'
  },
  {
    id: 'action-5',
    title: 'Law Clerk Application',
    description: 'Review application for new law clerk position',
    type: 'approval',
    timestamp: '3 days ago',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    id: 'action-6',
    title: 'Budget Allocation Vote',
    description: 'Vote on resource allocation for digital court systems',
    type: 'vote',
    timestamp: '4 days ago',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50'
  }
];

export const judicialActivities: JudicialActivityItem[] = [
  {
    id: 'activity-1',
    title: 'Draft Judgment',
    description: 'Complete draft judgment for Civil Case #782/2025',
    timestamp: 'Tomorrow',
    dueDate: 'Tomorrow',
    status: 'pending',
    statusColor: 'bg-orange-50 text-orange-700',
    priority: 'high',
    priorityColor: 'bg-red-50 text-red-700',
    assignee: 'Self',
    location: 'Chambers',
    type: 'judgment',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    hoverBg: 'hover:bg-orange-50'
  },
  {
    id: 'activity-2',
    title: 'Legal Research',
    description: 'Research precedents for Commercial Case #378/2025 regarding contract termination',
    timestamp: 'Friday',
    dueDate: 'Friday',
    status: 'scheduled',
    statusColor: 'bg-blue-50 text-blue-700',
    priority: 'medium',
    priorityColor: 'bg-yellow-50 text-yellow-700',
    assignee: 'Law Clerk',
    location: 'Law Library',
    type: 'research',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    id: 'activity-3',
    title: 'Case File Review',
    description: 'Review evidence submissions in Criminal Case #493/2025',
    timestamp: 'Next Week',
    dueDate: 'Next Week',
    status: 'pending',
    statusColor: 'bg-purple-50 text-purple-700',
    priority: 'medium',
    priorityColor: 'bg-yellow-50 text-yellow-700',
    assignee: 'Self',
    location: 'Chambers',
    type: 'review',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    hoverBg: 'hover:bg-purple-50'
  },
  {
    id: 'activity-4',
    title: 'Judicial Ethics Training',
    description: 'Mandatory annual ethics training for all judges',
    timestamp: 'Next Monday',
    dueDate: 'Next Monday',
    status: 'scheduled',
    statusColor: 'bg-green-50 text-green-700',
    priority: 'medium',
    priorityColor: 'bg-yellow-50 text-yellow-700',
    assignee: 'Judicial Training Institute',
    location: 'Training Center',
    type: 'training',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50'
  }
];

export const judicialAIInsights: AIInsightItem[] = [
  {
    id: 'insight-1',
    title: 'Case Backlog Alert',
    description: 'Your docket shows a 15% increase in pending civil cases this month – Consider rescheduling to prioritize older cases.',
    timestamp: '2 hours ago',
    category: 'case management',
    confidence: 'high',
    impact: 'high',
    priority: 'high',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    id: 'insight-2',
    title: 'Judgment Patterns',
    description: 'Pattern detected: 25% of recent appeal cases cite insufficient evidence assessment – Consider more detailed evidence evaluation in written opinions.',
    timestamp: '4 hours ago',
    category: 'judicial decisions',
    confidence: 'high',
    impact: 'high',
    priority: 'high',
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
    hoverBg: 'hover:bg-yellow-50'
  },
  {
    id: 'insight-3',
    title: 'Legal Research',
    description: 'New Supreme Court precedent in Constitutional Case #372/2025 may affect 8 cases on your current docket – Review implications for pending judgments.',
    timestamp: '6 hours ago',
    category: 'precedent analysis',
    confidence: 'high',
    impact: 'medium',
    priority: 'medium',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50'
  },
  {
    id: 'insight-4',
    title: 'Case Timeline Analysis',
    description: 'Your civil cases are averaging 12 days longer resolution time than court average – Consider process optimization for pre-trial conferences.',
    timestamp: '8 hours ago',
    category: 'efficiency',
    confidence: 'medium',
    impact: 'high',
    priority: 'high',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    hoverBg: 'hover:bg-purple-50'
  },
  {
    id: 'insight-5',
    title: 'Procedural Recommendation',
    description: 'Alternative Dispute Resolution has shown 78% success rate in similar family cases – Consider referral for 5 current family matters on your docket.',
    timestamp: '12 hours ago',
    category: 'case resolution',
    confidence: 'high',
    impact: 'high',
    priority: 'medium',
    iconColor: 'text-blue-800',
    iconBg: 'bg-blue-200',
    hoverBg: 'hover:bg-blue-100'
  },
  {
    id: 'insight-6',
    title: 'Sentencing Analysis',
    description: 'Your recent criminal sentencing shows 8% variance from national guidelines – Review for consistency in similar upcoming cases.',
    timestamp: '1 day ago',
    category: 'sentencing',
    confidence: 'high',
    impact: 'high',
    priority: 'high',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    hoverBg: 'hover:bg-orange-50'
  },
  {
    id: 'insight-7',
    title: 'Citation Opportunity',
    description: 'Your recent judgment in Smith v. State has been cited by 3 other courts – Similar reasoning may apply to Jones case scheduled next week.',
    timestamp: '1 day ago',
    category: 'legal impact',
    confidence: 'high',
    impact: 'high',
    priority: 'medium',
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    hoverBg: 'hover:bg-red-50'
  },
  {
    id: 'insight-8',
    title: 'Witness Pattern Detection',
    description: 'Expert witness Dr. James has appeared in 85% of medical malpractice cases in your court – Consider potential bias assessment in upcoming Johnson case.',
    timestamp: '2 days ago',
    category: 'witness analysis',
    confidence: 'medium',
    impact: 'medium',
    priority: 'low',
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-100',
    hoverBg: 'hover:bg-teal-50'
  },
  {
    id: 'insight-9',
    title: 'Electronic Filing Alert',
    description: 'Electronic filing errors have increased 22% in your court this month – Consider requesting additional training for legal assistants.',
    timestamp: '2 days ago',
    category: 'court administration',
    confidence: 'high',
    impact: 'medium',
    priority: 'low',
    iconColor: 'text-green-800',
    iconBg: 'bg-green-200',
    hoverBg: 'hover:bg-green-100'
  },
  {
    id: 'insight-10',
    title: 'Legal Trend Analysis',
    description: 'Land dispute cases have increased 18% in your jurisdiction – Strategic planning for resource allocation recommended.',
    timestamp: '3 days ago',
    category: 'caseload trends',
    confidence: 'medium',
    impact: 'high',
    priority: 'medium',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    hoverBg: 'hover:bg-indigo-50'
  }
];
