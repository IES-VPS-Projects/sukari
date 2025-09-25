// Types
export interface ActionItem {
  id: string;
  title: string;
  description: string;
  type: 'approval' | 'vote';
  timestamp: string;
  iconColor: string;
  iconBg: string;
  hoverBg: string;
  priority?: string;
  status?: string;
  deadline?: string;
  requestedBy?: string;
  details?: string;
  requiredAction?: string;
  relatedDocuments?: string[];
  stakeholders?: string[];
}

// Actions data for card and modal
export const actionsData: ActionItem[] = [
  {
    id: 'action-1',
    title: 'Sugar Import Allocation Approval',
    description: 'Approve allocation of 50,000 MT sugar imports to Mumias Sugar Company',
    type: 'approval',
    timestamp: '2 hours ago',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50',
    priority: 'high',
    status: 'pending',
    deadline: 'Tomorrow, 5:00 PM',
    requestedBy: 'Operations Department',
    details: 'Request to approve the allocation of 50,000 MT sugar imports to Mumias Sugar Company to meet local demand gap for Q3 2025. The request follows the board resolution of July 15, 2025, and aligns with the import substitution policy framework.',
    requiredAction: 'Review attached documentation and approve or deny the request',
    relatedDocuments: ['Import Request Form #IMR-2025-089', 'Market Demand Analysis Q3 2025', 'Board Resolution #BR-2025-107'],
    stakeholders: ['Mumias Sugar Company', 'Kenya Revenue Authority', 'Ministry of Agriculture']
  },
  {
    id: 'action-2', 
    title: 'Cane Pricing Committee Vote',
    description: 'Vote on proposed cane pricing structure for 2024/25 season',
    type: 'vote',
    timestamp: '4 hours ago',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50',
    priority: 'medium',
    status: 'pending',
    deadline: 'Friday, 12:00 PM',
    requestedBy: 'Cane Pricing Committee',
    details: 'The Cane Pricing Committee has proposed a new pricing structure for the 2024/25 season with a 5% increase in base price and additional quality incentives. This vote requires executive input before implementation.',
    requiredAction: 'Review proposal and cast vote (approve/reject/abstain)',
    relatedDocuments: ['Cane Pricing Proposal 2024/25', 'Market Analysis Report', 'Farmer Input Summary'],
    stakeholders: ['Cane Pricing Committee', 'Farmer Representatives', 'Mill Operators']
  },
  {
    id: 'action-3',
    title: 'Mill Operations License Approval',
    description: 'Approve renewal of operational license for Nzoia Sugar Factory',
    type: 'approval',
    timestamp: '1 day ago',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50',
    priority: 'high',
    status: 'pending',
    deadline: 'Wednesday, 3:00 PM',
    requestedBy: 'Licensing Department',
    details: 'Annual operational license renewal for Nzoia Sugar Factory. All inspection requirements have been met and compliance documentation is attached for review.',
    requiredAction: 'Review compliance documentation and approve renewal',
    relatedDocuments: ['Inspection Report #IR-2025-042', 'Compliance Certificate', 'Previous License #OP-2024-NSF'],
    stakeholders: ['Nzoia Sugar Factory Management', 'Regulatory Compliance Team']
  },
  {
    id: 'action-4',
    title: 'Budget Allocation Vote',
    description: 'Vote on FY 2025 budget allocation for infrastructure development',
    type: 'vote',
    timestamp: '2 days ago',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50',
    priority: 'medium',
    status: 'pending',
    deadline: 'Friday, 4:00 PM',
    requestedBy: 'Finance Department',
    details: 'Proposed budget allocation of KSh 250 million for infrastructure development across major sugar mills in the 2025 fiscal year. The proposal details specific allocations by region and project type.',
    requiredAction: 'Review budget proposal and cast vote',
    relatedDocuments: ['FY 2025 Budget Proposal', 'Infrastructure Development Plan', 'Financial Impact Assessment'],
    stakeholders: ['Finance Department', 'Infrastructure Planning Team', 'Regional Mill Managers']
  },
  {
    id: 'action-5',
    title: 'Export Quota Approval',
    description: 'Approve sugar export quota increase for Q3 2025',
    type: 'approval',
    timestamp: '3 days ago',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50',
    priority: 'medium',
    status: 'pending',
    deadline: 'Monday, 10:00 AM',
    requestedBy: 'Trade Department',
    details: 'Proposal to increase the sugar export quota by 15% for Q3 2025 based on production surplus and favorable international market conditions. The increase would primarily benefit Western region producers.',
    requiredAction: 'Review trade analysis and approve or deny quota increase',
    relatedDocuments: ['Export Market Analysis', 'Production Surplus Report', 'Trade Balance Projection'],
    stakeholders: ['Trade Department', 'Export Council', 'Western Region Producers']
  }
];