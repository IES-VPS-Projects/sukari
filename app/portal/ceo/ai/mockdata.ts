// AI portal mockdata - processed crops data for AI chat functionality

export interface ProcessedCropData {
  id: string;
  cropName: string;
  region: string;
  totalArea: number; // in hectares
  productivity: number; // tonnes per hectare
  currentPrice: number;
  currency: string;
  priceUnit: string;
  harvestSeason: string;
  marketTrends: {
    demand: 'high' | 'medium' | 'low';
    priceDirection: 'up' | 'down' | 'stable';
    changePercent: number;
  };
  challenges: string[];
  opportunities: string[];
  recommendations: string[];
}

export const processedCropsData: ProcessedCropData[] = [
  {
    id: "sugarcane-001",
    cropName: "Sugarcane",
    region: "Nyanza Province",
    totalArea: 45000,
    productivity: 75,
    currentPrice: 4500,
    currency: "KSh",
    priceUnit: "per tonne",
    harvestSeason: "July - September",
    marketTrends: {
      demand: 'high',
      priceDirection: 'up',
      changePercent: 5
    },
    challenges: [
      "Mill efficiency concerns",
      "Farmer payment delays in some regions",
      "Weather dependency",
      "Transportation costs"
    ],
    opportunities: [
      "66% production increase in reformed mills",
      "New leasing agreements improving operations",
      "Government support through Sugar Act 2024",
      "Export potential to EU markets"
    ],
    recommendations: [
      "Continue mill modernization programs",
      "Implement digital reporting systems",
      "Focus on timely farmer payments",
      "Explore value-added products like ethanol"
    ]
  },
  {
    id: "sugar-002",
    cropName: "Sugar (Refined)",
    region: "Western Kenya",
    totalArea: 0, // Processed product
    productivity: 0.12, // conversion ratio from sugarcane
    currentPrice: 85,
    currency: "KSh",
    priceUnit: "per kg",
    harvestSeason: "Year-round production",
    marketTrends: {
      demand: 'high',
      priceDirection: 'down',
      changePercent: 2
    },
    challenges: [
      "Import competition",
      "Quality standardization",
      "Storage and distribution",
      "Market price volatility"
    ],
    opportunities: [
      "Reduced import dependency target",
      "Regional export potential",
      "Value chain integration",
      "Quality premium markets"
    ],
    recommendations: [
      "Strengthen quality control systems",
      "Develop strategic reserves",
      "Improve packaging and branding",
      "Target premium market segments"
    ]
  },
  {
    id: "molasses-003",
    cropName: "Molasses",
    region: "Central Kenya",
    totalArea: 0, // By-product
    productivity: 0.04, // from sugar production
    currentPrice: 15000,
    currency: "KSh",
    priceUnit: "per tonne",
    harvestSeason: "Continuous with sugar production",
    marketTrends: {
      demand: 'medium',
      priceDirection: 'up',
      changePercent: 3
    },
    challenges: [
      "Limited local demand",
      "Storage infrastructure",
      "Quality consistency",
      "Transport logistics"
    ],
    opportunities: [
      "Ethanol production potential",
      "Animal feed industry growth",
      "Export markets in East Africa",
      "Industrial applications"
    ],
    recommendations: [
      "Develop ethanol production facilities",
      "Establish quality standards",
      "Create regional distribution network",
      "Research industrial applications"
    ]
  },
  {
    id: "maize-004",
    cropName: "Maize",
    region: "Rift Valley",
    totalArea: 120000,
    productivity: 28,
    currentPrice: 3500,
    currency: "KSh",
    priceUnit: "per 90kg bag",
    harvestSeason: "March - August",
    marketTrends: {
      demand: 'high',
      priceDirection: 'stable',
      changePercent: 0
    },
    challenges: [
      "Climate variability",
      "Post-harvest losses",
      "Market access for smallholders",
      "Pest and disease management"
    ],
    opportunities: [
      "Food security importance",
      "Value addition potential",
      "Regional export markets",
      "Technology adoption"
    ],
    recommendations: [
      "Promote drought-resistant varieties",
      "Improve storage facilities",
      "Strengthen farmer cooperatives",
      "Enhance extension services"
    ]
  },
  {
    id: "cotton-005",
    cropName: "Cotton",
    region: "Coast Province",
    totalArea: 15000,
    productivity: 12,
    currentPrice: 45,
    currency: "KSh",
    priceUnit: "per kg",
    harvestSeason: "December - March",
    marketTrends: {
      demand: 'medium',
      priceDirection: 'up',
      changePercent: 8
    },
    challenges: [
      "Limited ginning capacity",
      "Quality requirements",
      "Pest management costs",
      "Market access"
    ],
    opportunities: [
      "Textile industry revival",
      "Export potential",
      "Value chain development",
      "Government support programs"
    ],
    recommendations: [
      "Invest in ginning infrastructure",
      "Improve seed quality",
      "Develop farmer training programs",
      "Create textile industry linkages"
    ]
  }
];

// Additional AI context data
export const aiChatContext = {
  knowledgeBase: {
    cropProduction: processedCropsData,
    marketInsights: {
      lastUpdated: new Date().toISOString(),
      dataSource: "Kenya Sugar Board & Ministry of Agriculture",
      confidence: 0.85
    },
    regulations: [
      "Sugar Act 2024",
      "Crop Development Act",
      "Agricultural Finance Corporation Guidelines",
      "Export/Import Regulations"
    ]
  },
  systemPrompts: {
    agricultural: "You are an AI assistant specialized in Kenyan agriculture, particularly sugar production and crop management. Provide evidence-based advice using current market data and regulatory guidelines.",
    market: "Analyze market trends and provide recommendations based on current crop prices, demand patterns, and regional production data.",
    planning: "Help with agricultural planning decisions using productivity data, seasonal patterns, and market opportunities."
  }
};

export default {
  processedCropsData,
  aiChatContext
};
