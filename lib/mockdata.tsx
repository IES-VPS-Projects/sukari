// lib/mockdata.tsx - Centralized mock data for the application

// TypeScript interfaces for better type safety
export interface ProductInsight {
  productName: string;
  price: number;
  currency: string;
  priceUnit: string;
  weeklyChangePercent: number;
  weeklyChangeDirection: 'up' | 'down';
  importVolume: number;
  exportVolume: number;
  volumeUnit: string;
}

export interface TranscriptSegment {
  time: number;
  text: string;
}

export interface AlertItem {
  id: string;
  title: string;
  label: string;
  description: string;
  timestamp: string;
  labelColor: string;
  iconBg: string;
  iconColor: string;
  area?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  label: string;
  description: string;
  timestamp: string;
  labelColor: string;
  iconBg: string;
  iconColor: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  type: 'approval' | 'vote';
  timestamp: string;
  iconColor: string;
  iconBg: string;
  hoverBg: string;
}

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
}

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
}

export interface AIInsightItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: string;
  confidence: string;
  impact: string;
  iconColor: string;
  iconBg: string;
  hoverBg: string;
}

// Today Page Mock Data
export const todayPageData = {
  // Market insights data
  marketData: [
    {
      productName: "Sugarcane",
      price: 4500,
      currency: "KSh",
      priceUnit: "per tonne",
      weeklyChangePercent: 5,
      weeklyChangeDirection: 'up' as const,
      importVolume: 1000,
      exportVolume: 200,
      volumeUnit: "tonnes"
    },
    {
      productName: "Sugar",
      price: 85,
      currency: "KSh",
      priceUnit: "per kg",
      weeklyChangePercent: 2,
      weeklyChangeDirection: 'down' as const,
      importVolume: 2450,
      exportVolume: 890,
      volumeUnit: "tonnes"
    },
    {
      productName: "Molasses",
      price: 15000,
      currency: "KSh",
      priceUnit: "per tonne",
      weeklyChangePercent: 3,
      weeklyChangeDirection: 'up' as const,
      importVolume: 500,
      exportVolume: 300,
      volumeUnit: "tonnes"
    },
    {
      productName: "Fertilizer",
      price: 2500,
      currency: "KSh",
      priceUnit: "per 50 kg bag",
      weeklyChangePercent: 1,
      weeklyChangeDirection: 'down' as const,
      importVolume: 1200,
      exportVolume: 100,
      volumeUnit: "tonnes"
    }
  ] as ProductInsight[],

  // Audio transcript data
  transcriptData: [
    { time: 0, text: "Overview: This briefing summarizes key developments in Kenya's sugar sector from July 26 to August 2, 2025, based on recent government announcements, market trends, and stakeholder reports." },
    { time: 10, text: "The sector shows signs of recovery amid ongoing reforms, with emphasis on production revival, pricing adjustments, and reduced import dependency. " },
    { time: 20, text: "No major disruptions reported this week, but focus remains on mill efficiencies and farmer payments. " },
    { time: 30, text: "Production and Milling Updates. Sugarcane deliveries and mill operations continue to improve under recent leasing agreements. Nzoia Sugar Company, leased to West Kenya Sugar Co. earlier in 2025, cleared KSh 1.5 billion in debt and disbursed Sh300M to farmers, contributing to a reported 66% production increase year-over-year." },
    { time: 40, text: "Chemelil Sugar Mill achieved timely farmer payments within one week, a shift from historical delays, supporting broader sector momentum toward self-sufficiency." },
    { time: 50, text: "Stakeholder sentiment is largely positive: 78% of farmers are optimistic, driven by a cane price hike to KSh5,750 per tonne and a KSh150 million bonus for Mumias farmers, a first for the sector. Mill operators are 85% positive, buoyed by reforms like the Sugar Act 2024. Field officers, at 92% positive, praise the new digital reporting system, with one Nyanza officer noting it \"has improved efficiency significantly.\" " },
    { time: 60, text: "Dealers remain 65% neutral, cautious about market stability due to import challenges." },
    { time: 70, text: "Two recent headlines highlight progress and challenges. In Kakamega, a new digital cane tracking system at Butali Sugar Mills has cut delivery delays by 30%, ensuring farmers are paid within seven days, a game-changer for local growers." },
    { time: 80, text: "Meanwhile, in Mumias, a 15% production drop has raised concerns, prompting a Kenya Sugar Board order to halt milling for three months from July 14, 2025, to address immature cane harvesting. " },         
    { time: 90, text: "This affects key mills like Mumias, Butali, and Nzoia, with a cane survey planned to stabilize supply." },    
    { time: 100, text: "That concludes today's briefing. Stay updated with the latest developments through your dashboard." },
    { time: 110, text: "Thank you for listening. Stay tuned for more updates on the sugar sector." }  
  ] as TranscriptSegment[],

  // Updates data for alerts and notifications
  updatesData: {
    alerts: [
      {
        id: '1',
        title: 'Production Below Threshold',
        label: 'HIGH',
        description: 'Muhoroni sugar company production fell 25% below',
        timestamp: '11:32 PM • Muhoroni',
        labelColor: 'bg-red-500',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600'
      },
      {
        id: '2',
        title: 'Compliance Issue Detected',
        label: 'MEDIUM',
        description: 'Nzoia Sugar Mill compliance violations reported',
        timestamp: '10:15 AM • Nzoia',
        labelColor: 'bg-orange-500',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600'
      },
      {
        id: '3',
        title: 'Locust Infestation',
        label: 'LOW',
        description: 'Minor pest activity detected in western region',
        timestamp: '9:30 AM • Butali',
        labelColor: 'bg-yellow-500',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600'
      }
    ] as AlertItem[],
    notifications: [
      {
        id: '4',
        title: 'New Policy Update',
        label: 'INFO',
        description: 'Sugar Act 2024 implementation guidelines released',
        timestamp: '2:45 PM • Kenya Sugar Board',
        labelColor: 'bg-blue-500',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600'
      },
      {
        id: '5',
        title: 'Payment Processed',
        label: 'SUCCESS',
        description: 'Farmer payments disbursed successfully',
        timestamp: '1:20 PM • Chemelil',
        labelColor: 'bg-green-500',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600'
      }
    ] as NotificationItem[]
  },

  // All actions data for modals
  allActionsData: [
    {
      id: 'action-1',
      title: 'Sugar Import Allocation Approval',
      description: 'Approve allocation of 50,000 MT sugar imports to Mumias Sugar Company',
      type: 'approval' as const,
      timestamp: '2 hours ago',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      hoverBg: 'hover:bg-blue-50'
    },
    {
      id: 'action-2', 
      title: 'Cane Pricing Committee Vote',
      description: 'Vote on proposed cane pricing structure for 2024/25 season',
      type: 'vote' as const,
      timestamp: '4 hours ago',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      hoverBg: 'hover:bg-green-50'
    },
    {
      id: 'action-3',
      title: 'Mill Operations License Approval',
      description: 'Approve renewal of operational license for Nzoia Sugar Factory',
      type: 'approval' as const, 
      timestamp: '1 day ago',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      hoverBg: 'hover:bg-blue-50'
    },
    {
      id: 'action-4',
      title: 'Budget Allocation Vote',
      description: 'Vote on FY 2025 budget allocation for infrastructure development',
      type: 'vote' as const,
      timestamp: '2 days ago',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      hoverBg: 'hover:bg-green-50'
    },
    {
      id: 'action-5',
      title: 'Export Quota Approval',
      description: 'Approve sugar export quota increase for Q3 2025',
      type: 'approval' as const,
      timestamp: '3 days ago',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      hoverBg: 'hover:bg-blue-50'
    }
  ] as ActionItem[],

  // All meetings data for modals
  allMeetingsData: [
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
      hoverBg: 'hover:bg-yellow-50'
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
      hoverBg: 'hover:bg-blue-50'
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
      hoverBg: 'hover:bg-green-50'
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
      hoverBg: 'hover:bg-blue-50'
    }
  ] as MeetingItem[],

  // All activities data for modals
  allActivitiesData: [
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
      hoverBg: 'hover:bg-orange-50'
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
      hoverBg: 'hover:bg-blue-50'
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
      hoverBg: 'hover:bg-purple-50'
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
      hoverBg: 'hover:bg-green-50'
    }
  ] as ActivityItem[],

  // All AI insights data for modals
  allAIInsightsData: [
    {
      id: 'insight-1',
      title: 'Regional Visit',
      description: 'Consider visiting Mumias region – 15% production drop – Requires executive attention for on-site assessments.',
      timestamp: '2 hours ago',
      category: 'travel',
      confidence: 'high',
      impact: 'high',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      hoverBg: 'hover:bg-blue-50'
    },
    {
      id: 'insight-2',
      title: 'Policy Review Alert',
      description: 'Recommended policy review – 25% increase in compliance violations this quarter – Update frameworks to align with Sugar Act 2024.',
      timestamp: '4 hours ago',
      category: 'governance',
      confidence: 'high',
      impact: 'high',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      hoverBg: 'hover:bg-yellow-50'
    },
    {
      id: 'insight-3',
      title: 'Weather Preparation Insight',
      description: 'Weather alert preparation – Prepare drought mitigation for Western region based on upcoming forecasts.',
      timestamp: '6 hours ago',
      category: 'environmental',
      confidence: 'medium',
      impact: 'medium',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      hoverBg: 'hover:bg-green-50'
    },
    {
      id: 'insight-4',
      title: 'Predictive Risk Forecast',
      description: 'Climate Forecast: 20% yield impact on sugar cane in Rift Valley – Recommend subsidy allocation review to preempt losses.',
      timestamp: '8 hours ago',
      category: 'forecast',
      confidence: 'medium',
      impact: 'high',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      hoverBg: 'hover:bg-purple-50'
    },
    {
      id: 'insight-5',
      title: 'Opportunity Alert',
      description: 'Export Potential: 15% growth in sugar to EU markets – Check compliance status for immediate capitalization.',
      timestamp: '12 hours ago',
      category: 'growth',
      confidence: 'high',
      impact: 'high',
      iconColor: 'text-blue-800',
      iconBg: 'bg-blue-200',
      hoverBg: 'hover:bg-blue-100'
    },
    {
      id: 'insight-6',
      title: 'Financial Insight',
      description: 'Levy Collection Trend: 12% below Q3 target in Nyanza – Recommend audit escalation to recover KSh 800M potential shortfall.',
      timestamp: '1 day ago',
      category: 'fiscal',
      confidence: 'high',
      impact: 'high',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      hoverBg: 'hover:bg-orange-50'
    },
    {
      id: 'insight-7',
      title: 'Traceability Gap Detection',
      description: 'Supply Chain Anomaly: 8% untraced batches in Rift Valley – Potential compliance breach; Initiate batch tagging review.',
      timestamp: '1 day ago',
      category: 'compliance',
      confidence: 'high',
      impact: 'high',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      hoverBg: 'hover:bg-red-50'
    }
  ] as AIInsightItem[],

  // All alerts data for modals
  allAlertsData: [
    {
      id: 'alert-1',
      title: 'System Performance Alert',
      description: 'Mill #3 efficiency dropped by 12% in the last 24 hours. Immediate attention required.',
      timestamp: '2 hours ago',
      label: 'Critical',
      labelColor: 'bg-red-500',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      area: 'Production Systems'
    },
    {
      id: 'alert-2', 
      title: 'Compliance Warning',
      description: 'Environmental standards review required for West Zone operations.',
      timestamp: '4 hours ago',
      label: 'Warning',
      labelColor: 'bg-orange-500',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      area: 'Environmental Compliance'
    },
    {
      id: 'alert-3',
      title: 'Quality Control Notice',
      description: 'Sugar purity levels in Batch #247 below standard requirements.',
      timestamp: '6 hours ago',
      label: 'Medium',
      labelColor: 'bg-yellow-500',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      area: 'Quality Assurance'
    },
    {
      id: 'alert-4',
      title: 'Maintenance Reminder',
      description: 'Scheduled maintenance for conveyor belt system due tomorrow.',
      timestamp: '1 day ago',
      label: 'Info',
      labelColor: 'bg-blue-500',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      area: 'Equipment Maintenance'
    }
  ] as AlertItem[],

  // Scheduler suggestions
  schedulerSuggestions: [
    'Quarterly board meeting',
    'Reminder to read Farmer Daily Article'
  ]
};

// Export individual data sets for easier access
export const {
  marketData,
  transcriptData,
  updatesData,
  allActionsData,
  allMeetingsData,
  allActivitiesData,
  allAIInsightsData,
  allAlertsData,
  schedulerSuggestions
} = todayPageData;
