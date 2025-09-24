// Types
export interface MarketInsight {
  productName: string;
  price: number;
  currency: string;
  priceUnit: string;
  weeklyChangePercent: number;
  weeklyChangeDirection: 'up' | 'down';
  importVolume: number;
  exportVolume: number;
  volumeUnit: string;
  trends?: string[];
  forecast?: string;
  historicalData?: {
    period: string;
    price: number;
  }[];
  comparisonData?: {
    region: string;
    price: number;
  }[];
}

// Market insights data for card
export const marketInsightsData: MarketInsight[] = [
  {
    productName: "Sugarcane",
    price: 4500,
    currency: "KSh",
    priceUnit: "per tonne",
    weeklyChangePercent: 5,
    weeklyChangeDirection: 'up',
    importVolume: 1000,
    exportVolume: 200,
    volumeUnit: "tonnes",
    trends: [
      "5% increase driven by seasonal demand",
      "Western region showing highest price point at KSh 4,650",
      "Quality premium increasing for high-sucrose content"
    ],
    forecast: "Expected to stabilize around KSh 4,600 for the next 4-6 weeks before seasonal adjustment",
    historicalData: [
      { period: "1 month ago", price: 4300 },
      { period: "3 months ago", price: 4150 },
      { period: "6 months ago", price: 4050 },
      { period: "1 year ago", price: 3900 }
    ],
    comparisonData: [
      { region: "Western Kenya", price: 4650 },
      { region: "Nyanza", price: 4550 },
      { region: "Rift Valley", price: 4450 },
      { region: "Coast", price: 4350 }
    ]
  },
  {
    productName: "Sugar",
    price: 85,
    currency: "KSh",
    priceUnit: "per kg",
    weeklyChangePercent: 2,
    weeklyChangeDirection: 'down',
    importVolume: 2450,
    exportVolume: 890,
    volumeUnit: "tonnes",
    trends: [
      "2% decrease due to increased import volumes",
      "Premium grades maintaining price stability",
      "Retail margins compressing in competitive urban markets"
    ],
    forecast: "Expected continued downward pressure of 1-3% over next 30 days as import shipments arrive",
    historicalData: [
      { period: "1 month ago", price: 87 },
      { period: "3 months ago", price: 89 },
      { period: "6 months ago", price: 82 },
      { period: "1 year ago", price: 78 }
    ],
    comparisonData: [
      { region: "Urban Retail", price: 88 },
      { region: "Rural Retail", price: 92 },
      { region: "Wholesale", price: 81 },
      { region: "Export Markets", price: 76 }
    ]
  },
  {
    productName: "Molasses",
    price: 15000,
    currency: "KSh",
    priceUnit: "per tonne",
    weeklyChangePercent: 3,
    weeklyChangeDirection: 'up',
    importVolume: 500,
    exportVolume: 300,
    volumeUnit: "tonnes",
    trends: [
      "3% increase driven by growing demand from ethanol producers",
      "Quality differentials widening between producers",
      "Transport costs significantly impacting regional price variations"
    ],
    forecast: "Projected continued upward trend of 4-6% over next quarter due to expanding ethanol and animal feed markets",
    historicalData: [
      { period: "1 month ago", price: 14500 },
      { period: "3 months ago", price: 14200 },
      { period: "6 months ago", price: 13800 },
      { period: "1 year ago", price: 13000 }
    ],
    comparisonData: [
      { region: "Direct from Mill", price: 15000 },
      { region: "Distributor", price: 16200 },
      { region: "Export", price: 14300 },
      { region: "Import", price: 16500 }
    ]
  },
  {
    productName: "Fertilizer",
    price: 2500,
    currency: "KSh",
    priceUnit: "per 50 kg bag",
    weeklyChangePercent: 1,
    weeklyChangeDirection: 'down',
    importVolume: 1200,
    exportVolume: 100,
    volumeUnit: "tonnes",
    trends: [
      "1% decrease following government subsidy program implementation",
      "Phosphate-based formulations showing larger price decreases",
      "Bulk purchase discounts increasing for farmer cooperatives"
    ],
    forecast: "Expected stable prices with potential 2-3% further reduction as subsidy program expands in Q4 2025",
    historicalData: [
      { period: "1 month ago", price: 2525 },
      { period: "3 months ago", price: 2700 },
      { period: "6 months ago", price: 2850 },
      { period: "1 year ago", price: 3100 }
    ],
    comparisonData: [
      { region: "Subsidized Program", price: 2200 },
      { region: "Retail Outlets", price: 2500 },
      { region: "Bulk Purchase", price: 2350 },
      { region: "Direct Import", price: 2450 }
    ]
  }
];