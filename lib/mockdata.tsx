// lib/mockdata.tsx - Centralized mock data for the application

// TypeScript interfaces for better type safety
export interface SucroseData {
  month: string;
  year: number;
  butali: number;
  chemelil: number;
  muhoroni: number;
  kibos: number;
  westKenya: number;
  nzoia: number;
  kwale: number;
  combined: number;
}

export interface ProductionData {
  month: string;
  year: number;
  factory: string;
  ksbReturns: number;
  kraReturns: number;
  target: number;
}

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
  priority: string;
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
      title: 'Productivity',
      description: 'Consider visiting Mumias region – 15% production drop – Requires executive attention for on-site assessments.',
      timestamp: '2 hours ago',
      category: 'travel',
      confidence: 'high',
      impact: 'high',
      priority: 'high',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      hoverBg: 'hover:bg-blue-50'
    },
    {
      id: 'insight-2',
      title: 'Compliance',
      description: 'Recommended policy review – 25% increase in compliance violations this quarter – Update frameworks to align with Sugar Act 2024.',
      timestamp: '4 hours ago',
      category: 'governance',
      confidence: 'high',
      impact: 'high',
      priority: 'high',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      hoverBg: 'hover:bg-yellow-50'
    },
    {
      id: 'insight-3',
      title: 'Weather',
      description: 'Weather alert preparation – Prepare drought mitigation for Western region based on upcoming forecasts.',
      timestamp: '6 hours ago',
      category: 'environmental',
      confidence: 'high',
      impact: 'medium',
      priority: 'medium',
      iconColor: 'text-green-400',
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
      priority: 'high',
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
      priority: 'medium',
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
      priority: 'high',
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
      priority: 'high',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      hoverBg: 'hover:bg-red-50'
    },
    {
      id: 'insight-8',
      title: 'Stakeholder Engagement Update',
      description: 'Community Relations: 85% satisfaction rate in Western Kenya – Maintain outreach programs and expand to Nyanza region.',
      timestamp: '2 days ago',
      category: 'inclusivity',
      confidence: 'high',
      impact: 'medium',
      priority: 'low',
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-100',
      hoverBg: 'hover:bg-teal-50'
    },
    {
      id: 'insight-9',
      title: 'Sustainability Metric',
      description: 'Carbon Footprint: 22% reduction achieved this quarter – On track for 2025 sustainability goals. Continue current initiatives.',
      timestamp: '2 days ago',
      category: 'sustainability',
      confidence: 'high',
      impact: 'medium',
      priority: 'low',
      iconColor: 'text-green-800',
      iconBg: 'bg-green-200',
      hoverBg: 'hover:bg-green-100'
    },
    {
      id: 'insight-10',
      title: 'Market Trend Analysis',
      description: 'Global Sugar Prices: 18% increase expected in Q4 – Strategic positioning for export markets recommended.',
      timestamp: '3 days ago',
      category: 'market intelligence',
      confidence: 'medium',
      impact: 'high',
      priority: 'medium',
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      hoverBg: 'hover:bg-indigo-50'
    }
  ] as AIInsightItem[],

  // All alerts data for modals
  allAlertsData: [
    {
      id: 'alert-1',
      title: 'Equipment Maintenance Required',
      description: 'Mill #3 efficiency dropped by 12% in the last 24 hours. Immediate attention required.',
      timestamp: '2 hours ago',
      label: 'Critical',
      labelColor: 'bg-red-500',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      area: 'Performance'
    },
    {
      id: 'alert-2', 
      title: 'Compliance Issue Detected',
      description: 'Environmental standards review required for West Zone operations.',
      timestamp: '4 hours ago',
      label: 'Warning',
      labelColor: 'bg-orange-500',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      area: 'Compliance'
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
      area: 'Compliance'
    },
    {
      id: 'alert-4',
      title: 'Disbursement Approval',
      description: 'Farmer payment disbursement requires executive approval for Western region.',
      timestamp: '1 day ago',
      label: 'High',
      labelColor: 'bg-red-500',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      area: 'Payments'
    },
    {
      id: 'alert-5',
      title: 'Weather Alert',
      description: 'Heavy rainfall expected in the next 24 hours. Potential impact on cane transportation.',
      timestamp: '3 hours ago',
      label: 'Warning',
      labelColor: 'bg-orange-500',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      area: 'Weather'
    },
    {
      id: 'alert-6',
      title: 'System Performance Alert',
      description: 'Processing system efficiency below optimal levels. Monitoring required.',
      timestamp: '5 hours ago',
      label: 'Medium',
      labelColor: 'bg-yellow-500',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      area: 'Performance'
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

// CTU Sucrose Content Data (extracted from CSV and processed)
export const sucroseContentData: SucroseData[] = [
  // 2024 Data
  { month: "Jan", year: 2024, butali: 13.45, chemelil: 14.12, muhoroni: 12.89, kibos: 12.67, westKenya: 13.78, nzoia: 12.34, kwale: 14.56, combined: 13.40 },
  { month: "Feb", year: 2024, butali: 14.23, chemelil: 15.67, muhoroni: 13.45, kibos: 13.12, westKenya: 14.89, nzoia: 13.78, kwale: 15.23, combined: 14.34 },
  { month: "Mar", year: 2024, butali: 15.12, chemelil: 16.34, muhoroni: 14.67, kibos: 14.23, westKenya: 15.45, nzoia: 14.56, kwale: 16.12, combined: 15.21 },
  { month: "Apr", year: 2024, butali: 14.89, chemelil: 15.78, muhoroni: 14.34, kibos: 13.89, westKenya: 15.12, nzoia: 14.23, kwale: 15.67, combined: 14.84 },
  { month: "May", year: 2024, butali: 16.23, chemelil: 17.45, muhoroni: 15.78, kibos: 15.34, westKenya: 16.67, nzoia: 15.89, kwale: 17.12, combined: 16.35 },
  { month: "Jun", year: 2024, butali: 15.67, chemelil: 16.89, muhoroni: 15.23, kibos: 14.78, westKenya: 16.12, nzoia: 15.45, kwale: 16.78, combined: 15.84 },
  { month: "Jul", year: 2024, butali: 14.78, chemelil: 15.34, muhoroni: 14.56, kibos: 14.12, westKenya: 15.23, nzoia: 14.67, kwale: 15.89, combined: 14.94 },
  { month: "Aug", year: 2024, butali: 13.89, chemelil: 14.67, muhoroni: 13.78, kibos: 13.45, westKenya: 14.56, nzoia: 13.89, kwale: 15.12, combined: 14.19 },
  { month: "Sep", year: 2024, butali: 14.34, chemelil: 15.12, muhoroni: 14.23, kibos: 13.78, westKenya: 14.89, nzoia: 14.34, kwale: 15.56, combined: 14.61 },
  { month: "Oct", year: 2024, butali: 15.45, chemelil: 16.23, muhoroni: 15.12, kibos: 14.67, westKenya: 15.78, nzoia: 15.23, kwale: 16.34, combined: 15.55 },
  { month: "Nov", year: 2024, butali: 14.67, chemelil: 15.45, muhoroni: 14.34, kibos: 13.89, westKenya: 15.12, nzoia: 14.56, kwale: 15.78, combined: 14.83 },
  { month: "Dec", year: 2024, butali: 13.78, chemelil: 14.56, muhoroni: 13.67, kibos: 13.23, westKenya: 14.34, nzoia: 13.78, kwale: 14.89, combined: 14.04 },

  // 2023 Data
  { month: "Jan", year: 2023, butali: 13.12, chemelil: 13.78, muhoroni: 12.56, kibos: 12.34, westKenya: 13.45, nzoia: 12.12, kwale: 14.23, combined: 13.09 },
  { month: "Feb", year: 2023, butali: 14.56, chemelil: 15.23, muhoroni: 13.78, kibos: 13.45, westKenya: 14.67, nzoia: 13.89, kwale: 15.12, combined: 14.39 },
  { month: "Mar", year: 2023, butali: 15.34, chemelil: 16.12, muhoroni: 14.89, kibos: 14.56, westKenya: 15.78, nzoia: 14.67, kwale: 16.23, combined: 15.37 },
  { month: "Apr", year: 2023, butali: 14.23, chemelil: 15.67, muhoroni: 14.12, kibos: 13.67, westKenya: 14.89, nzoia: 14.23, kwale: 15.45, combined: 14.61 },
  { month: "May", year: 2023, butali: 16.78, chemelil: 17.23, muhoroni: 16.12, kibos: 15.67, westKenya: 16.89, nzoia: 16.23, kwale: 17.45, combined: 16.62 },
  { month: "Jun", year: 2023, butali: 15.23, chemelil: 16.45, muhoroni: 14.78, kibos: 14.34, westKenya: 15.67, nzoia: 15.12, kwale: 16.56, combined: 15.45 },
  { month: "Jul", year: 2023, butali: 14.67, chemelil: 15.12, muhoroni: 14.23, kibos: 13.89, westKenya: 14.78, nzoia: 14.34, kwale: 15.67, combined: 14.67 },
  { month: "Aug", year: 2023, butali: 13.56, chemelil: 14.23, muhoroni: 13.45, kibos: 13.12, westKenya: 14.12, nzoia: 13.56, kwale: 14.78, combined: 13.83 },
  { month: "Sep", year: 2023, butali: 14.12, chemelil: 14.89, muhoroni: 13.89, kibos: 13.45, westKenya: 14.56, nzoia: 14.12, kwale: 15.23, combined: 14.32 },
  { month: "Oct", year: 2023, butali: 15.67, chemelil: 16.34, muhoroni: 15.23, kibos: 14.78, westKenya: 15.89, nzoia: 15.34, kwale: 16.45, combined: 15.67 },
  { month: "Nov", year: 2023, butali: 14.34, chemelil: 15.12, muhoroni: 14.01, kibos: 13.56, westKenya: 14.78, nzoia: 14.23, kwale: 15.45, combined: 14.50 },
  { month: "Dec", year: 2023, butali: 13.45, chemelil: 14.12, muhoroni: 13.34, kibos: 12.89, westKenya: 13.89, nzoia: 13.45, kwale: 14.56, combined: 13.67 }
];

// Production Data (extracted from CSV and processed)
export const productionData: ProductionData[] = [
  // 2024 Butali Data
  { month: "Jan", year: 2024, factory: "butali", ksbReturns: 45.67, kraReturns: 52.34, target: 50.00 },
  { month: "Feb", year: 2024, factory: "butali", ksbReturns: 48.23, kraReturns: 55.12, target: 52.50 },
  { month: "Mar", year: 2024, factory: "butali", ksbReturns: 52.45, kraReturns: 58.67, target: 55.00 },
  { month: "Apr", year: 2024, factory: "butali", ksbReturns: 49.78, kraReturns: 56.23, target: 53.75 },
  { month: "May", year: 2024, factory: "butali", ksbReturns: 54.12, kraReturns: 61.45, target: 57.50 },
  { month: "Jun", year: 2024, factory: "butali", ksbReturns: 51.89, kraReturns: 58.34, target: 55.25 },
  { month: "Jul", year: 2024, factory: "butali", ksbReturns: 47.56, kraReturns: 54.78, target: 51.50 },
  { month: "Aug", year: 2024, factory: "butali", ksbReturns: 46.23, kraReturns: 53.12, target: 50.75 },
  { month: "Sep", year: 2024, factory: "butali", ksbReturns: 48.67, kraReturns: 55.89, target: 52.25 },
  { month: "Oct", year: 2024, factory: "butali", ksbReturns: 53.45, kraReturns: 60.12, target: 56.75 },
  { month: "Nov", year: 2024, factory: "butali", ksbReturns: 50.78, kraReturns: 57.34, target: 54.00 },
  { month: "Dec", year: 2024, factory: "butali", ksbReturns: 49.12, kraReturns: 55.67, target: 52.50 },

  // 2024 Chemelil Data
  { month: "Jan", year: 2024, factory: "chemelil", ksbReturns: 52.34, kraReturns: 58.67, target: 55.00 },
  { month: "Feb", year: 2024, factory: "chemelil", ksbReturns: 55.78, kraReturns: 62.34, target: 58.50 },
  { month: "Mar", year: 2024, factory: "chemelil", ksbReturns: 59.23, kraReturns: 66.12, target: 62.00 },
  { month: "Apr", year: 2024, factory: "chemelil", ksbReturns: 56.45, kraReturns: 63.78, target: 59.75 },
  { month: "May", year: 2024, factory: "chemelil", ksbReturns: 61.67, kraReturns: 68.23, target: 64.50 },
  { month: "Jun", year: 2024, factory: "chemelil", ksbReturns: 58.89, kraReturns: 65.45, target: 61.25 },
  { month: "Jul", year: 2024, factory: "chemelil", ksbReturns: 54.12, kraReturns: 61.34, target: 57.00 },
  { month: "Aug", year: 2024, factory: "chemelil", ksbReturns: 52.78, kraReturns: 59.67, target: 55.75 },
  { month: "Sep", year: 2024, factory: "chemelil", ksbReturns: 55.34, kraReturns: 62.78, target: 58.25 },
  { month: "Oct", year: 2024, factory: "chemelil", ksbReturns: 60.12, kraReturns: 67.45, target: 63.50 },
  { month: "Nov", year: 2024, factory: "chemelil", ksbReturns: 57.67, kraReturns: 64.89, target: 60.75 },
  { month: "Dec", year: 2024, factory: "chemelil", ksbReturns: 55.89, kraReturns: 62.34, target: 58.50 },

  // 2024 Muhoroni Data
  { month: "Jan", year: 2024, factory: "muhoroni", ksbReturns: 38.45, kraReturns: 44.12, target: 42.00 },
  { month: "Feb", year: 2024, factory: "muhoroni", ksbReturns: 41.23, kraReturns: 47.56, target: 45.25 },
  { month: "Mar", year: 2024, factory: "muhoroni", ksbReturns: 44.67, kraReturns: 50.89, target: 48.50 },
  { month: "Apr", year: 2024, factory: "muhoroni", ksbReturns: 42.78, kraReturns: 48.34, target: 46.75 },
  { month: "May", year: 2024, factory: "muhoroni", ksbReturns: 46.12, kraReturns: 52.45, target: 50.00 },
  { month: "Jun", year: 2024, factory: "muhoroni", ksbReturns: 43.89, kraReturns: 49.67, target: 47.25 },
  { month: "Jul", year: 2024, factory: "muhoroni", ksbReturns: 40.56, kraReturns: 46.23, target: 44.50 },
  { month: "Aug", year: 2024, factory: "muhoroni", ksbReturns: 39.34, kraReturns: 45.12, target: 43.00 },
  { month: "Sep", year: 2024, factory: "muhoroni", ksbReturns: 41.78, kraReturns: 47.89, target: 45.75 },
  { month: "Oct", year: 2024, factory: "muhoroni", ksbReturns: 45.23, kraReturns: 51.56, target: 49.25 },
  { month: "Nov", year: 2024, factory: "muhoroni", ksbReturns: 43.67, kraReturns: 49.34, target: 47.00 },
  { month: "Dec", year: 2024, factory: "muhoroni", ksbReturns: 42.12, kraReturns: 47.78, target: 45.50 },

  // 2023 Data for all three factories
  { month: "Jan", year: 2023, factory: "butali", ksbReturns: 43.21, kraReturns: 49.67, target: 47.50 },
  { month: "Feb", year: 2023, factory: "butali", ksbReturns: 45.78, kraReturns: 52.34, target: 50.00 },
  { month: "Mar", year: 2023, factory: "butali", ksbReturns: 49.45, kraReturns: 56.12, target: 52.50 },
  { month: "Apr", year: 2023, factory: "butali", ksbReturns: 47.23, kraReturns: 54.67, target: 51.25 },
  { month: "May", year: 2023, factory: "butali", ksbReturns: 51.89, kraReturns: 58.45, target: 55.00 },
  { month: "Jun", year: 2023, factory: "butali", ksbReturns: 49.12, kraReturns: 55.78, target: 52.75 },
  { month: "Jul", year: 2023, factory: "butali", ksbReturns: 45.67, kraReturns: 52.34, target: 49.50 },
  { month: "Aug", year: 2023, factory: "butali", ksbReturns: 44.34, kraReturns: 50.89, target: 48.25 },
  { month: "Sep", year: 2023, factory: "butali", ksbReturns: 46.78, kraReturns: 53.45, target: 50.75 },
  { month: "Oct", year: 2023, factory: "butali", ksbReturns: 50.23, kraReturns: 57.12, target: 54.00 },
  { month: "Nov", year: 2023, factory: "butali", ksbReturns: 48.56, kraReturns: 55.23, target: 52.25 },
  { month: "Dec", year: 2023, factory: "butali", ksbReturns: 46.89, kraReturns: 53.67, target: 50.50 },

  { month: "Jan", year: 2023, factory: "chemelil", ksbReturns: 49.78, kraReturns: 56.23, target: 53.00 },
  { month: "Feb", year: 2023, factory: "chemelil", ksbReturns: 53.45, kraReturns: 60.12, target: 56.75 },
  { month: "Mar", year: 2023, factory: "chemelil", ksbReturns: 57.23, kraReturns: 64.67, target: 60.50 },
  { month: "Apr", year: 2023, factory: "chemelil", ksbReturns: 54.89, kraReturns: 61.34, target: 58.25 },
  { month: "May", year: 2023, factory: "chemelil", ksbReturns: 59.12, kraReturns: 66.78, target: 62.50 },
  { month: "Jun", year: 2023, factory: "chemelil", ksbReturns: 56.67, kraReturns: 63.45, target: 60.00 },
  { month: "Jul", year: 2023, factory: "chemelil", ksbReturns: 52.34, kraReturns: 59.12, target: 55.75 },
  { month: "Aug", year: 2023, factory: "chemelil", ksbReturns: 50.78, kraReturns: 57.89, target: 54.25 },
  { month: "Sep", year: 2023, factory: "chemelil", ksbReturns: 53.56, kraReturns: 60.67, target: 57.00 },
  { month: "Oct", year: 2023, factory: "chemelil", ksbReturns: 58.23, kraReturns: 65.34, target: 61.75 },
  { month: "Nov", year: 2023, factory: "chemelil", ksbReturns: 55.89, kraReturns: 62.78, target: 59.25 },
  { month: "Dec", year: 2023, factory: "chemelil", ksbReturns: 54.12, kraReturns: 61.45, target: 57.50 },

  { month: "Jan", year: 2023, factory: "muhoroni", ksbReturns: 36.89, kraReturns: 42.34, target: 40.50 },
  { month: "Feb", year: 2023, factory: "muhoroni", ksbReturns: 39.45, kraReturns: 45.78, target: 43.25 },
  { month: "Mar", year: 2023, factory: "muhoroni", ksbReturns: 42.78, kraReturns: 48.67, target: 46.00 },
  { month: "Apr", year: 2023, factory: "muhoroni", ksbReturns: 40.23, kraReturns: 46.89, target: 44.50 },
  { month: "May", year: 2023, factory: "muhoroni", ksbReturns: 44.56, kraReturns: 50.23, target: 48.00 },
  { month: "Jun", year: 2023, factory: "muhoroni", ksbReturns: 41.67, kraReturns: 47.89, target: 45.25 },
  { month: "Jul", year: 2023, factory: "muhoroni", ksbReturns: 38.34, kraReturns: 44.78, target: 42.75 },
  { month: "Aug", year: 2023, factory: "muhoroni", ksbReturns: 37.12, kraReturns: 43.45, target: 41.50 },
  { month: "Sep", year: 2023, factory: "muhoroni", ksbReturns: 39.78, kraReturns: 45.67, target: 43.75 },
  { month: "Oct", year: 2023, factory: "muhoroni", ksbReturns: 43.23, kraReturns: 49.56, target: 47.25 },
  { month: "Nov", year: 2023, factory: "muhoroni", ksbReturns: 41.45, kraReturns: 47.89, target: 45.00 },
  { month: "Dec", year: 2023, factory: "muhoroni", ksbReturns: 39.89, kraReturns: 46.23, target: 43.50 }
];
