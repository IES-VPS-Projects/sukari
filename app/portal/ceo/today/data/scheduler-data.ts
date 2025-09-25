// Types
export interface SchedulerItem {
  id: string;
  type: 'visit' | 'meeting';
  title: string;
  location?: string;
  purpose?: string;
  date?: Date | null;
  time?: string;
  duration?: string;
  attendees?: string;
  notes?: string;
  suggestedLocations?: string[];
  suggestedTitles?: string[];
}

// Scheduler data for schedule modals
export const schedulerData: {
  suggestedVisitLocations: string[];
  suggestedMeetingTitles: string[];
  suggestedMeetingLocations: string[];
  suggestedAttendees: string[];
  suggestedPurposes: string[];
} = {
  suggestedVisitLocations: [
    "Mumias Sugar Factory",
    "Butali Sugar Mills",
    "Chemelil Sugar Company",
    "Nzoia Sugar Company",
    "Sony Sugar Factory",
    "West Kenya Sugar Company",
    "Kibos Sugar and Allied Industries",
    "Muhoroni Sugar Factory",
    "Sukari Industries",
    "Transmara Sugar Company",
    "South Nyanza Sugar Company",
    "Kwale International Sugar Company",
    "Western Region Outgrower Farms",
    "Nyanza Region Outgrower Farms",
    "Rift Valley Research Station",
    "Kenya Sugar Research Foundation",
    "Port of Mombasa Sugar Terminal",
    "KSB Regional Office - Western",
    "KSB Regional Office - Nyanza",
    "KSB Regional Office - Coast"
  ],
  
  suggestedMeetingTitles: [
    "Weekly Executive Committee",
    "Quarterly Board Meeting",
    "Stakeholder Engagement Session",
    "Farmer Representatives Forum",
    "Policy Implementation Review",
    "Strategic Planning Session",
    "Crisis Management Committee",
    "Mill Operators Conference",
    "Regulatory Compliance Review",
    "Import-Export Strategy Meeting",
    "Industry Innovation Forum",
    "Quality Standards Committee",
    "Financial Performance Review",
    "Sustainability Working Group",
    "HR Strategy Session",
    "Public Relations Committee",
    "Digital Transformation Team",
    "Supply Chain Optimization",
    "Market Development Committee",
    "Research & Development Update"
  ],
  
  suggestedMeetingLocations: [
    "KSB Headquarters - Conference Room A",
    "KSB Headquarters - Executive Boardroom",
    "KSB Headquarters - Strategy Room",
    "KSB Western Regional Office",
    "KSB Nyanza Regional Office",
    "Virtual Meeting (Teams)",
    "Virtual Meeting (Zoom)",
    "Sarova Stanley Hotel - Nairobi",
    "Serena Hotel - Nairobi",
    "Intercontinental Hotel - Nairobi",
    "Acacia Premier Hotel - Kisumu",
    "Boma Inn - Eldoret",
    "Golf Hotel - Kakamega",
    "Ministry of Agriculture Conference Center",
    "Kenya Association of Manufacturers Offices",
    "Community Center - Mumias",
    "Community Center - Chemelil",
    "Farmers Training Center - Nzoia",
    "Agricultural Society of Kenya Grounds",
    "Kenya Institute of Management"
  ],
  
  suggestedAttendees: [
    "Executive Committee",
    "Board Members",
    "Department Heads",
    "Regional Managers",
    "Farmer Representatives",
    "Mill Operators",
    "Government Officials",
    "Ministry Representatives",
    "Industry Stakeholders",
    "Financial Institutions",
    "Research Partners",
    "Technology Providers",
    "Logistics Partners",
    "Quality Assurance Team",
    "Regulatory Bodies",
    "International Consultants",
    "Industry Associations",
    "Community Leaders",
    "Trade Partners",
    "Media Representatives"
  ],
  
  suggestedPurposes: [
    "Performance Review",
    "Strategic Planning",
    "Operational Assessment",
    "Quality Inspection",
    "Stakeholder Engagement",
    "Issue Resolution",
    "Innovation Showcase",
    "Efficiency Evaluation",
    "Employee Engagement",
    "Community Relations",
    "Regulatory Compliance",
    "Infrastructure Assessment",
    "Technology Evaluation",
    "Investment Planning",
    "Crisis Management",
    "Policy Implementation",
    "Improvement Initiatives",
    "Market Development",
    "Partnership Building",
    "Knowledge Sharing"
  ]
};