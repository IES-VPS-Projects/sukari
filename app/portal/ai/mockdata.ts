// AI portal mockdata - processed case data for AI chat functionality

export interface JudicialCaseData {
  id: string;
  caseType: string;
  court: string;
  totalCases: number;
  resolvedCases: number;
  averageResolutionTime: number; // in days
  pendingCases: number;
  priorityCases: number;
  timeUnit: string;
  caseStatus: {
    trend: 'increasing' | 'decreasing' | 'stable';
    changePercent: number;
  };
  challenges: string[];
  recommendations: string[];
}

export const processedCasesData: JudicialCaseData[] = [
  {
    id: "civil-001",
    caseType: "Civil",
    court: "High Court",
    totalCases: 1250,
    resolvedCases: 875,
    averageResolutionTime: 95,
    pendingCases: 375,
    priorityCases: 42,
    timeUnit: "days",
    caseStatus: {
      trend: 'decreasing',
      changePercent: 8
    },
    challenges: [
      "Complex documentary evidence",
      "Multiple parties involved",
      "Expert witness scheduling",
      "Procedural delays"
    ],
    recommendations: [
      "Implement case management conferences",
      "Utilize digital evidence management",
      "Set firm timelines for submissions",
      "Consider alternative dispute resolution"
    ]
  },
  {
    id: "criminal-002",
    caseType: "Criminal",
    court: "Magistrate Court",
    totalCases: 2100,
    resolvedCases: 1680,
    averageResolutionTime: 65,
    pendingCases: 420,
    priorityCases: 85,
    timeUnit: "days",
    caseStatus: {
      trend: 'decreasing',
      changePercent: 12
    },
    challenges: [
      "Witness availability",
      "Evidence processing backlogs",
      "Remand population concerns",
      "Investigation delays"
    ],
    recommendations: [
      "Implement witness protection measures",
      "Expedite bail hearings",
      "Coordinate with prosecution services",
      "Utilize plea bargaining where appropriate"
    ]
  },
  {
    id: "constitutional-003",
    caseType: "Constitutional",
    court: "Supreme Court",
    totalCases: 85,
    resolvedCases: 62,
    averageResolutionTime: 120,
    pendingCases: 23,
    priorityCases: 15,
    timeUnit: "days",
    caseStatus: {
      trend: 'stable',
      changePercent: 2
    },
    challenges: [
      "Complex legal interpretations",
      "Public interest considerations",
      "Amicus curiae management",
      "Precedent implications"
    ],
    recommendations: [
      "Establish research assistance teams",
      "Schedule regular bench conferences",
      "Implement structured deliberation processes",
      "Develop comprehensive judgment templates"
    ]
  },
  {
    id: "family-004",
    caseType: "Family",
    court: "Family Court",
    totalCases: 950,
    resolvedCases: 760,
    averageResolutionTime: 45,
    pendingCases: 190,
    priorityCases: 68,
    timeUnit: "days",
    caseStatus: {
      trend: 'decreasing',
      changePercent: 15
    },
    challenges: [
      "Child welfare considerations",
      "Emotional parties",
      "Property division complexities",
      "Enforcement of orders"
    ],
    recommendations: [
      "Utilize family counselors",
      "Implement child-friendly court procedures",
      "Expedite cases involving minors",
      "Consider mediation for appropriate cases"
    ]
  },
  {
    id: "commercial-005",
    caseType: "Commercial",
    court: "Commercial Court",
    totalCases: 520,
    resolvedCases: 338,
    averageResolutionTime: 110,
    pendingCases: 182,
    priorityCases: 25,
    timeUnit: "days",
    caseStatus: {
      trend: 'increasing',
      changePercent: 5
    },
    challenges: [
      "Complex financial evidence",
      "International jurisdiction issues",
      "Corporate disclosure compliance",
      "Technical expert testimony"
    ],
    recommendations: [
      "Implement specialized case tracks",
      "Utilize financial forensic experts",
      "Develop standardized disclosure protocols",
      "Consider court-appointed neutral experts"
    ]
  }
];

// Additional AI context data
export const aiChatContext = {
  knowledgeBase: {
    caseManagement: processedCasesData,
    legalInsights: {
      lastUpdated: new Date().toISOString(),
      dataSource: "Judiciary of Kenya Case Management System",
      confidence: 0.90
    },
    regulations: [
      "Constitution of Kenya 2010",
      "Civil Procedure Act",
      "Criminal Procedure Code",
      "Evidence Act",
      "Judicial Service Act"
    ]
  },
  systemPrompts: {
    legal: "You are an AI assistant specialized in Kenyan legal system, particularly case management and judicial procedures. Provide evidence-based advice using current case law and statutory guidelines.",
    procedural: "Analyze procedural requirements and provide recommendations based on current case status, court rules, and legal precedents.",
    research: "Help with legal research using case law, statutes, and judicial interpretations to support decision-making."
  }
};

export default {
  processedCasesData,
  aiChatContext
};