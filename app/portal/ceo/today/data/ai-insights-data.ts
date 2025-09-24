// Types
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
  analysis?: string;
  recommendedAction?: string;
  dataSource?: string;
  trendsIdentified?: string[];
  confidenceScore?: number;
  relatedInsights?: string[];
}

// AI Insights data for card and modal
export const aiInsightsData: AIInsightItem[] = [
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
    hoverBg: 'hover:bg-blue-50',
    analysis: 'Analysis of production metrics from Mumias region shows a consistent 15% decline over the past 3 months, deviating significantly from historical patterns and current targets. This trend contrasts with other regions which have maintained or increased productivity levels during the same period.',
    recommendedAction: 'Schedule an executive visit to Mumias within the next 7 days. Meet with local management, inspect production facilities, and engage with farmer representatives to identify root causes and implement immediate corrective measures.',
    dataSource: 'Production Reports Q2-Q3 2025, Mill Efficiency Metrics, Farmer Delivery Records',
    trendsIdentified: ['15% decline in production volume', '22% increase in processing downtime', '8% reduction in cane quality metrics'],
    confidenceScore: 92,
    relatedInsights: ['Equipment Maintenance Alert', 'Farmer Engagement Opportunity']
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
    hoverBg: 'hover:bg-yellow-50',
    analysis: 'Compliance violations have increased by 25% this quarter, primarily in operational licensing and environmental standards. Most violations relate to requirements introduced in the Sugar Act 2024 that are not yet fully integrated into organizational policies and procedures.',
    recommendedAction: 'Initiate comprehensive policy review with Legal and Compliance teams to align internal frameworks with Sugar Act 2024 requirements. Prioritize sections on environmental compliance, quality standards, and operational licensing.',
    dataSource: 'Compliance Violation Reports, Regulatory Notices, Legal Department Bulletins',
    trendsIdentified: ['25% increase in overall violations', '42% of violations related to new regulatory requirements', '18% recurring violations in environmental compliance'],
    confidenceScore: 95,
    relatedInsights: ['Regulatory Change Management', 'Staff Training Opportunity']
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
    hoverBg: 'hover:bg-green-50',
    analysis: 'Meteorological forecasts indicate a 60% probability of below-average rainfall in the Western region during the next growing season. Historical data shows this pattern typically leads to a 15-20% reduction in cane yield if preventive measures are not implemented.',
    recommendedAction: 'Develop and communicate drought mitigation strategies to farmers in the Western region. Consider increased water reservoir capacity, drought-resistant crop varieties, and adjusted planting schedules.',
    dataSource: 'Kenya Meteorological Department Forecasts, Historical Yield Data, Climate Trend Analysis',
    trendsIdentified: ['60% probability of below-average rainfall', 'Potential 15-20% reduction in crop yields', 'Similar pattern observed in 2022 with 18% yield impact'],
    confidenceScore: 85,
    relatedInsights: ['Irrigation Infrastructure Investment', 'Crop Diversification Strategy']
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
    hoverBg: 'hover:bg-purple-50',
    analysis: 'Predictive modeling based on current climate patterns suggests a potential 20% reduction in sugar cane yields in the Rift Valley region over the next growing season. Financial impact analysis indicates this could result in approximately KSh 450 million in lost revenue for farmers and processors.',
    recommendedAction: 'Review and potentially adjust subsidy allocation framework to provide targeted support to Rift Valley producers. Consider implementing temporary relief measures including input subsidies and technical assistance programs.',
    dataSource: 'Climate Prediction Models, Historical Yield Impact Data, Financial Risk Assessment',
    trendsIdentified: ['Projected 20% yield reduction', 'Estimated KSh 450 million revenue impact', 'Similar patterns previously addressed with 15% subsidy increase'],
    confidenceScore: 78,
    relatedInsights: ['Financial Risk Mitigation', 'Farmer Support Program Enhancement']
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
    hoverBg: 'hover:bg-blue-100',
    analysis: "Market analysis indicates a 15% growth opportunity in EU sugar export markets due to reduced production in Eastern Europe and favorable trade terms under recent agreements. Kenya's current compliance with EU standards positions the industry to capitalize on this opportunity within the next 3-6 months.",
    recommendedAction: 'Verify compliance status with EU import regulations for all major producers. Engage with Trade Ministry to secure increased export quotas and explore expedited certification processes for qualified producers.',
    dataSource: 'EU Market Analysis Reports, Trade Agreement Terms, Compliance Certification Records',
    trendsIdentified: ['15% growth in EU import demand', '8% price premium for compliant suppliers', '3-6 month window of opportunity before market normalization'],
    confidenceScore: 88,
    relatedInsights: ['Export Certification Fast-tracking', 'Production Quality Enhancement']
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
    hoverBg: 'hover:bg-orange-50',
    analysis: 'Levy collection in the Nyanza region is tracking 12% below Q3 targets, with the gap widening monthly. Analysis of production versus reported figures suggests potential underreporting rather than reduced production. If the trend continues, it could result in approximately KSh 800 million in uncollected revenue by year-end.',
    recommendedAction: 'Escalate audit activities in the Nyanza region with focus on production verification and levy compliance. Consider implementing enhanced monitoring systems and potential penalties for non-compliance.',
    dataSource: 'Levy Collection Reports, Production Verification Data, Financial Projections',
    trendsIdentified: ['12% shortfall in levy collection', 'Growing monthly gap in reported vs. verified production', 'Projected KSh 800 million annual revenue impact'],
    confidenceScore: 90,
    relatedInsights: ['Revenue Protection Measures', 'Compliance Enforcement Strategy']
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
    hoverBg: 'hover:bg-red-50',
    analysis: 'Supply chain monitoring has identified that 8% of processed sugar batches from Rift Valley facilities lack complete traceability documentation. This represents a significant increase from the historical average of 2% and poses compliance risks under the Sugar Act 2024 traceability requirements.',
    recommendedAction: 'Initiate comprehensive review of batch tagging and documentation processes at Rift Valley facilities. Implement immediate corrective measures for existing inventory and consider disciplinary action for repeated non-compliance.',
    dataSource: 'Supply Chain Traceability Reports, Batch Certification Records, Compliance Requirements',
    trendsIdentified: ['8% untraced batches vs 2% historical average', '15% of affected batches from a single processor', 'Correlation with recent staff changes in quality control'],
    confidenceScore: 93,
    relatedInsights: ['Quality Control Process Review', 'Staff Training Needs']
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
    hoverBg: 'hover:bg-teal-50',
    analysis: 'Stakeholder satisfaction surveys indicate an 85% positive rating for community relations initiatives in Western Kenya, representing a 12% improvement over the previous year. Success factors include regular engagement forums, transparent communication, and responsive issue resolution.',
    recommendedAction: 'Maintain current outreach programs in Western Kenya and consider expanding the successful model to the Nyanza region where satisfaction rates remain at 62%. Prioritize transparency and regular engagement in the expansion strategy.',
    dataSource: 'Stakeholder Satisfaction Surveys, Community Feedback Reports, Engagement Metrics',
    trendsIdentified: ['85% satisfaction in Western Kenya', '12% year-over-year improvement', '62% satisfaction in Nyanza region'],
    confidenceScore: 89,
    relatedInsights: ['Community Program Expansion', 'Stakeholder Communication Strategy']
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
    hoverBg: 'hover:bg-green-100',
    analysis: 'Sustainability metrics show a 22% reduction in carbon footprint across operations this quarter, primarily driven by energy efficiency improvements and renewable energy adoption. This progress puts the organization on track to meet or exceed the 2025 sustainability goals ahead of schedule.',
    recommendedAction: 'Continue current sustainability initiatives with focus on maintaining momentum. Consider highlighting achievements in stakeholder communications and exploring potential for carbon credit opportunities.',
    dataSource: 'Environmental Impact Reports, Energy Consumption Data, Sustainability Goal Tracking',
    trendsIdentified: ['22% carbon footprint reduction', '35% increase in renewable energy usage', '18% reduction in water consumption'],
    confidenceScore: 91,
    relatedInsights: ['Carbon Credit Opportunity', 'Sustainability Certification Advancement']
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
    hoverBg: 'hover:bg-indigo-50',
    analysis: 'Global market analysis indicates an expected 18% increase in sugar prices during Q4 2025, driven by supply constraints in Brazil and India combined with increased demand in Asian markets. This presents a significant opportunity for strategic export positioning.',
    recommendedAction: 'Develop strategic export positioning plan focusing on high-value markets. Consider temporarily increasing inventory positions to capitalize on expected price increases and engage with Trade Ministry on potential quota adjustments.',
    dataSource: 'Global Commodity Price Forecasts, Supply Chain Analysis, International Trade Reports',
    trendsIdentified: ['Projected 18% price increase in Q4', '25% supply reduction from major producers', '12% demand increase in key Asian markets'],
    confidenceScore: 82,
    relatedInsights: ['Export Strategy Refinement', 'Inventory Management Optimization']
  }
];