// Types
export interface MeetingItem {
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
  agenda?: string[];
  participants?: string[];
  notes?: string;
  documents?: string[];
  previousMeetingOutcomes?: string;
}

// Meetings data for card and modal
export const meetingsData: MeetingItem[] = [
  {
    id: 'meeting-1',
    title: 'Board Meeting',
    description: 'Quarterly board meeting to discuss strategic decisions',
    timestamp: 'Today, 2:00 PM',
    date: 'Today',
    time: '2:00 PM',
    status: 'scheduled',
    location: 'Conference Room A',
    type: 'Board Meeting',
    typeColor: 'bg-yellow-50 text-yellow-700',
    attendees: 8,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
    hoverBg: 'hover:bg-yellow-50',
    agenda: [
      'Approval of previous meeting minutes',
      'Q3 2025 financial performance review',
      'Strategic initiatives progress update',
      'Capital expenditure proposals',
      'Regulatory compliance report',
      'Market expansion opportunities',
      'AOB'
    ],
    participants: [
      'Board Chairperson',
      'CEO',
      'CFO',
      'Board Members (5)',
      'Company Secretary'
    ],
    notes: 'Pre-reading materials have been distributed via secure board portal. Financial statements require review before the meeting. A 30-minute executive session is scheduled at the end.',
    documents: [
      'Q3 2025 Financial Statements',
      'Strategic Initiatives Dashboard',
      'Compliance Report',
      'Capital Expenditure Proposals'
    ],
    previousMeetingOutcomes: 'Approved Q2 financial statements, authorized market research for Eastern Africa expansion, deferred decision on new production line investment pending additional data.'
  },
  {
    id: 'meeting-2',
    title: 'Farmer Representatives',
    description: 'Weekly meeting with farmer representatives',
    timestamp: 'Tomorrow, 10:00 AM',
    date: 'Tomorrow',
    time: '10:00 AM',
    status: 'scheduled',
    location: 'Community Center',
    type: 'Stakeholder Meeting',
    typeColor: 'bg-blue-50 text-blue-700',
    attendees: 15,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50',
    agenda: [
      'Cane price adjustment proposals',
      'Harvesting schedule coordination',
      'Transport logistics improvements',
      'Payment process update',
      'Farmer support programs',
      'Open forum'
    ],
    participants: [
      'CEO',
      'Field Operations Manager',
      'Farmer Relations Officer',
      'Western Region Representatives (4)',
      'Nyanza Region Representatives (5)',
      'Rift Valley Representatives (3)',
      'Finance Manager'
    ],
    notes: 'Translation services will be available. Meeting expected to focus heavily on the new digital payment system rollout and addressing concerns about harvest scheduling conflicts.',
    documents: [
      'Proposed Cane Price Structure',
      'Harvest Schedule Q4 2025',
      'Digital Payment System Guide',
      'Transport Route Optimization Plan'
    ],
    previousMeetingOutcomes: 'Resolved payment delay issues for Western region farmers, agreed on pilot program for new cane variety in selected areas, established task force to address transport bottlenecks.'
  },
  {
    id: 'meeting-3',
    title: 'Mill Operators Review',
    description: 'Weekly review meeting with mill operators',
    timestamp: 'Friday, 3:00 PM',
    date: 'Friday',
    time: '3:00 PM',
    status: 'scheduled',
    location: 'Operations Center',
    type: 'Operations Review',
    typeColor: 'bg-green-50 text-green-700',
    attendees: 12,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50',
    agenda: [
      'Production KPI review',
      'Equipment performance assessment',
      'Maintenance schedule update',
      'Efficiency improvement initiatives',
      'Quality control metrics',
      'Health & safety report'
    ],
    participants: [
      'Operations Director',
      'Mill Managers (5)',
      'Technical Specialist',
      'Quality Control Manager',
      'Maintenance Supervisor',
      'Health & Safety Officer',
      'Production Planner',
      'CEO (as observer)'
    ],
    notes: 'Focus will be on addressing the 8% efficiency drop at Mumias facility and reviewing successful optimization measures at Chemelil for potential implementation across other sites.',
    documents: [
      'Weekly Production Report',
      'Equipment Performance Dashboard',
      'Maintenance Schedule Update',
      'Quality Control Metrics',
      'Incident Report Summary'
    ],
    previousMeetingOutcomes: 'Identified cause of efficiency issues at Mumias (faulty crusher bearings), approved expedited maintenance for Chemelil boiler system, implemented revised quality sampling protocol across all sites.'
  },
  {
    id: 'meeting-4',
    title: 'Quality Assurance Meeting',
    description: 'Monthly quality review and compliance discussion',
    timestamp: 'Monday, 10:00 AM',
    date: 'Monday',
    time: '10:00 AM',
    status: 'scheduled',
    location: 'Quality Lab',
    type: 'Quality Review',
    typeColor: 'bg-blue-50 text-blue-700',
    attendees: 6,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50',
    agenda: [
      'Monthly quality metrics review',
      'Compliance with new KEBS standards',
      'Laboratory equipment calibration status',
      'Quality control process improvements',
      'Customer quality feedback',
      'Upcoming regulatory changes'
    ],
    participants: [
      'Quality Assurance Manager',
      'Laboratory Supervisor',
      'Compliance Officer',
      'Production Representative',
      'R&D Manager',
      'External Standards Consultant'
    ],
    notes: 'Meeting will include demonstration of new NIR testing equipment and discussion of implementation timeline for the updated sugar fortification requirements.',
    documents: [
      'Monthly Quality Report',
      'KEBS Compliance Gap Analysis',
      'Equipment Calibration Schedule',
      'Customer Quality Feedback Summary',
      'Fortification Implementation Plan'
    ],
    previousMeetingOutcomes: 'Approved purchase of new testing equipment, resolved color consistency issues in premium grade products, established cross-functional team to prepare for new fortification standards.'
  },
  {
    id: 'meeting-5',
    title: 'Executive Committee',
    description: 'Weekly executive team coordination meeting',
    timestamp: 'Wednesday, 9:00 AM',
    date: 'Wednesday',
    time: '9:00 AM',
    status: 'scheduled',
    location: 'Executive Boardroom',
    type: 'Executive Meeting',
    typeColor: 'bg-purple-50 text-purple-700',
    attendees: 7,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    hoverBg: 'hover:bg-purple-50',
    agenda: [
      'Department updates and cross-functional coordination',
      'Strategic initiatives progress tracking',
      'Critical issue resolution',
      'Upcoming external engagements',
      'Resource allocation decisions',
      'Risk management review'
    ],
    participants: [
      'CEO',
      'CFO',
      'COO',
      'HR Director',
      'Legal Counsel',
      'Marketing Director',
      'Strategy Director'
    ],
    notes: 'Focus this week will be on addressing production shortfalls in Mumias region and finalizing the approach for the upcoming Board presentation on capital expenditure proposals.',
    documents: [
      'Weekly KPI Dashboard',
      'Strategic Initiatives Tracker',
      'Risk Register Update',
      'Resource Allocation Requests',
      'External Engagement Calendar'
    ],
    previousMeetingOutcomes: 'Approved temporary resource reallocation to address Western region transport issues, deferred marketing campaign launch pending product availability confirmation, established task force to address compliance matters at Nzoia facility.'
  }
];