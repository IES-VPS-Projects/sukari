// Types
export interface TranscriptSegment {
  time: number;
  text: string;
}

// Briefing data for audio briefing card
export const briefingData: TranscriptSegment[] = [
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
];

// Additional briefing metadata
export const briefingMetadata = {
  title: "Daily Sugar Sector Briefing",
  date: "August 3, 2025",
  duration: "2:15",
  narrator: "Sarah Kimani",
  sources: [
    "Kenya Sugar Board Weekly Report",
    "Ministry of Agriculture Press Statements",
    "Field Officer Reports",
    "Industry Stakeholder Surveys"
  ],
  keyHighlights: [
    "66% production increase at Nzoia Sugar",
    "Timely farmer payments at Chemelil",
    "78% positive farmer sentiment",
    "30% reduction in delivery delays at Butali",
    "15% production drop at Mumias",
    "3-month milling halt order for immature cane harvesting"
  ],
  relatedDocuments: [
    "Kenya Sugar Board Order #KSB-2025-078",
    "Stakeholder Sentiment Survey July 2025",
    "Digital Tracking System Implementation Report"
  ]
};