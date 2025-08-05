import { config } from './config';
import { processedCropsData } from '@/app/portal/ai/mockdata';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

type DataInjectionResult = { context: string; matched: boolean };

function getLatestYear() {
  return Math.max(...processedCropsData.map(d => d.year));
}
function getAllYears() {
  return Array.from(new Set(processedCropsData.map(d => d.year))).sort();
}
function extractYearFromText(text: string): number | undefined {
  const match = text.match(/\b(20\d{2})\b/);
  return match ? parseInt(match[1], 10) : undefined;
}
function extractNFromText(text: string): number | undefined {
  const match = text.match(/\b(last|past)?\s*(\d+)\s*(years?|months?|quarters?)\b/);
  return match ? parseInt(match[2], 10) : undefined;
}
function extractMonthFromText(text: string): string | undefined {
  const months = [
    'january','february','march','april','may','june','july','august','september','october','november','december'
  ];
  return months.find(m => text.toLowerCase().includes(m));
}
function extractRegionFromText(text: string): string | undefined {
  const regions = Array.from(new Set(processedCropsData.map(d => d.region)));
  return regions.find(r => text.toLowerCase().includes(r.toLowerCase()));
}
function extractFactoryFromText(text: string): string | undefined {
  const factories = Array.from(new Set(processedCropsData.map(d => d.sourceFactory)));
  return factories.find(f => text.toLowerCase().includes(f.toLowerCase()));
}
function extractVarietyFromText(text: string): string | undefined {
  const varieties = Array.from(new Set(processedCropsData.map(d => d.variety)));
  return varieties.find(v => text.toLowerCase().includes(v.toLowerCase()));
}
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// --- Table Generators (Handlers) ---
function getRegionalProductionTable(year: number) {
  const regions = Array.from(new Set(processedCropsData.map(d => d.region))).filter(r => r !== 'National');
  let table = 'Region | Production (tonnes)\n--- | ---\n';
  regions.forEach(region => {
    const total = processedCropsData
      .filter(d => d.region === region && d.year === year && d.element === 'Production Quantity')
      .reduce((sum, d) => sum + d.value, 0);
    table += `${region} | ${Math.round(total).toLocaleString()}\n`;
  });
  return table;
}
function getFactoryProductionTable(year: number, month?: string) {
  const factories = Array.from(new Set(processedCropsData.map(d => d.sourceFactory)));
  let table = 'Factory | Production (tonnes)\n--- | ---\n';
  factories.forEach(factory => {
    const total = processedCropsData
      .filter(d => d.sourceFactory === factory && d.year === year && (!month || d.month.toLowerCase() === month.toLowerCase()) && d.element === 'Production Quantity')
      .reduce((sum, d) => sum + d.value, 0);
    table += `${factory} | ${Math.round(total).toLocaleString()}\n`;
  });
  return table;
}
function getNationalProductionTrends(n: number) {
  const years = getAllYears().slice(-n);
  let table = 'Year | Production (tonnes)\n--- | ---\n';
  years.forEach(year => {
    const total = processedCropsData
      .filter(d => d.region === 'National' && d.year === year && d.element === 'Production Quantity')
      .reduce((sum, d) => sum + d.value, 0);
    table += `${year} | ${Math.round(total).toLocaleString()}\n`;
  });
  return table;
}
function getAverageCropYieldByRegion(year: number) {
  const regions = Array.from(new Set(processedCropsData.map(d => d.region))).filter(r => r !== 'National');
  let table = 'Region | Avg Crop Yield (tonnes/ha)\n--- | ---\n';
  regions.forEach(region => {
    const yields = processedCropsData
      .filter(d => d.region === region && d.year === year && d.element === 'Crop Yield')
      .map(d => d.value);
    const avg = yields.length ? (yields.reduce((a, b) => a + b, 0) / yields.length) : 0;
    table += `${region} | ${avg.toFixed(2)}\n`;
  });
  return table;
}
function getCaneDeliveries(region: string, year: number, month: string) {
  const total = processedCropsData
    .filter(d => d.region === region && d.year === year && d.month.toLowerCase() === month.toLowerCase() && d.element === 'Cane Deliveries')
    .reduce((sum, d) => sum + d.value, 0);
  return `Cane deliveries in ${region} for ${capitalize(month)} ${year}: ${Math.round(total).toLocaleString()} tonnes.`;
}
function getProductionValueByVariety(year: number) {
  const varieties = Array.from(new Set(processedCropsData.map(d => d.variety)));
  let table = 'Variety | Production Value (KSh million)\n--- | ---\n';
  varieties.forEach(variety => {
    const total = processedCropsData
      .filter(d => d.variety === variety && d.year === year && d.element === 'Production Value')
      .reduce((sum, d) => sum + d.value, 0);
    table += `${variety} | ${total.toFixed(2)}\n`;
  });
  return table;
}
function getSugarPricesOverYears() {
  // If you have sugarPrices in your mockdata, import and use it here
  try {
    const { sugarPrices } = require('@/app/portal/ai/mockdata');
    let table = 'Year | Sugar Price (KSh/tonne)\n--- | ---\n';
    Object.entries(sugarPrices).forEach(([year, price]) => {
      table += `${year} | ${price}\n`;
    });
    return table;
  } catch {
    return 'Sugar price data not available.';
  }
}
// ... Add more handler functions for the rest of your queries ...

function getDataInjectionForQuery(userMsg: string): DataInjectionResult {
  userMsg = userMsg.toLowerCase();

  // 1. Compare sugar production by region for [year]
  if (userMsg.includes("compare sugar production by region")) {
    const year = extractYearFromText(userMsg) || getLatestYear();
    return {
      context: `\n\n### Regional Sugar Production Data for ${year}\n${getRegionalProductionTable(year)}`,
      matched: true
    };
  }
  // 2. Which factory had the highest production in [month] [year]?
  if (userMsg.includes("factory had the highest production")) {
    const year = extractYearFromText(userMsg) || getLatestYear();
    const month = extractMonthFromText(userMsg) || "January";
    return {
      context: `\n\n### Factory Production for ${capitalize(month)} ${year}\n${getFactoryProductionTable(year, month)}`,
      matched: true
    };
  }
  // 3. Show sugar production trends for the last [N] years
  if (userMsg.includes("production trends for the last")) {
    const n = extractNFromText(userMsg) || 5;
    return {
      context: `\n\n### National Sugar Production Trends for the Last ${n} Years\n${getNationalProductionTrends(n)}`,
      matched: true
    };
  }
  // 4. What is the average crop yield by region for [year]?
  if (userMsg.includes("average crop yield by region")) {
    const year = extractYearFromText(userMsg) || getLatestYear();
    return {
      context: `\n\n### Average Crop Yield by Region for ${year}\n${getAverageCropYieldByRegion(year)}`,
      matched: true
    };
  }
  // 5. List all factories and their production for [month] [year]
  if (userMsg.includes("factories and their production")) {
    const year = extractYearFromText(userMsg) || getLatestYear();
    const month = extractMonthFromText(userMsg) || "January";
    return {
      context: `\n\n### Factory Production for ${capitalize(month)} ${year}\n${getFactoryProductionTable(year, month)}`,
      matched: true
    };
  }
  // 6. What was the total cane deliveries in [region] in [month] [year]?
  if (userMsg.includes("total cane deliveries")) {
    const year = extractYearFromText(userMsg) || getLatestYear();
    const month = extractMonthFromText(userMsg) || "January";
    const region = extractRegionFromText(userMsg) || "National";
    return {
      context: `\n\n### Cane Deliveries\n${getCaneDeliveries(region, year, month)}`,
      matched: true
    };
  }
  // 7. Show production value by variety for [year]
  if (userMsg.includes("production value by variety")) {
    const year = extractYearFromText(userMsg) || getLatestYear();
    return {
      context: `\n\n### Production Value by Variety for ${year}\n${getProductionValueByVariety(year)}`,
      matched: true
    };
  }
  // 8. Give me a summary of sugar prices over the years
  if (userMsg.includes("sugar prices over the years")) {
    return {
      context: `\n\n### Sugar Prices Over the Years\n${getSugarPricesOverYears()}`,
      matched: true
    };
  }
  // ... Add more patterns for the rest of your queries ...
  return { context: "", matched: false };
}

export class GeminiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = config.gemini.apiKey;
    this.apiUrl = config.gemini.apiUrl;
  }

  async generateResponse(messages: ChatMessage[]): Promise<string> {
    const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || '';
    const { context: dataContext } = getDataInjectionForQuery(lastUserMsg);
    const ksbDataContext = 'You have access to the Kenya Sugar Board database.';
    const systemPrompt = `You are KSB-AI, an advanced AI assistant for the Kenya Sugar Board.\n${ksbDataContext}\n${dataContext}\n...rest of your prompt...`;
    try {
      const url = `${this.apiUrl}?key=${this.apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: systemPrompt }]
            },
            ...messages.map(msg => ({
              role: msg.role,
              parts: [{ text: msg.content }]
            }))
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Unexpected Gemini API response format:', data);
        throw new Error('Invalid response format from Gemini API');
      }
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to generate response from AI service');
    }
  }
}

export const geminiService = new GeminiService(); 