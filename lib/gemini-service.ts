import { config } from './config';
import { processedCasesData } from '@/app/portal/ai/mockdata';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

type DataInjectionResult = { context: string; matched: boolean };

function getCaseTypes() {
  return Array.from(new Set(processedCasesData.map(d => d.caseType)));
}
function getCourts() {
  return Array.from(new Set(processedCasesData.map(d => d.court)));
}
function extractYearFromText(text: string): number | undefined {
  const match = text.match(/\b(20\d{2})\b/);
  return match ? parseInt(match[1], 10) : undefined;
}
function extractNFromText(text: string): number | undefined {
  const match = text.match(/\b(last|past)?\s*(\d+)\s*(years?|months?|days?|weeks?)\b/);
  return match ? parseInt(match[2], 10) : undefined;
}
function extractCaseTypeFromText(text: string): string | undefined {
  const caseTypes = getCaseTypes();
  return caseTypes.find(t => text.toLowerCase().includes(t.toLowerCase()));
}
function extractCourtFromText(text: string): string | undefined {
  const courts = getCourts();
  return courts.find(c => text.toLowerCase().includes(c.toLowerCase()));
}
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// --- Table Generators (Handlers) ---
function getCasesByCourt() {
  const courts = getCourts();
  let table = 'Court | Total Cases | Resolved Cases | Pending Cases\n--- | --- | --- | ---\n';
  courts.forEach(court => {
    const courtData = processedCasesData.filter(d => d.court === court);
    const totalCases = courtData.reduce((sum, d) => sum + d.totalCases, 0);
    const resolvedCases = courtData.reduce((sum, d) => sum + d.resolvedCases, 0);
    const pendingCases = courtData.reduce((sum, d) => sum + d.pendingCases, 0);
    table += `${court} | ${totalCases.toLocaleString()} | ${resolvedCases.toLocaleString()} | ${pendingCases.toLocaleString()}\n`;
  });
  return table;
}

function getCasesByCaseType() {
  const caseTypes = getCaseTypes();
  let table = 'Case Type | Total Cases | Resolved Cases | Pending Cases\n--- | --- | --- | ---\n';
  caseTypes.forEach(caseType => {
    const caseData = processedCasesData.filter(d => d.caseType === caseType);
    const totalCases = caseData.reduce((sum, d) => sum + d.totalCases, 0);
    const resolvedCases = caseData.reduce((sum, d) => sum + d.resolvedCases, 0);
    const pendingCases = caseData.reduce((sum, d) => sum + d.pendingCases, 0);
    table += `${caseType} | ${totalCases.toLocaleString()} | ${resolvedCases.toLocaleString()} | ${pendingCases.toLocaleString()}\n`;
  });
  return table;
}

function getResolutionTimesByCaseType() {
  const caseTypes = getCaseTypes();
  let table = 'Case Type | Average Resolution Time (days)\n--- | ---\n';
  caseTypes.forEach(caseType => {
    const caseData = processedCasesData.filter(d => d.caseType === caseType);
    const avgTime = caseData.reduce((sum, d) => sum + d.averageResolutionTime, 0) / caseData.length;
    table += `${caseType} | ${avgTime.toFixed(0)}\n`;
  });
  return table;
}

function getPriorityCasesByCourt() {
  const courts = getCourts();
  let table = 'Court | Priority Cases | Total Pending Cases | Priority %\n--- | --- | --- | ---\n';
  courts.forEach(court => {
    const courtData = processedCasesData.filter(d => d.court === court);
    const priorityCases = courtData.reduce((sum, d) => sum + d.priorityCases, 0);
    const pendingCases = courtData.reduce((sum, d) => sum + d.pendingCases, 0);
    const priorityPercent = pendingCases > 0 ? (priorityCases / pendingCases * 100).toFixed(1) : '0.0';
    table += `${court} | ${priorityCases.toLocaleString()} | ${pendingCases.toLocaleString()} | ${priorityPercent}%\n`;
  });
  return table;
}

function getCaseStatusTrends() {
  const caseTypes = getCaseTypes();
  let table = 'Case Type | Trend | Change %\n--- | --- | ---\n';
  caseTypes.forEach(caseType => {
    const caseData = processedCasesData.filter(d => d.caseType === caseType);
    const trend = caseData[0]?.caseStatus.trend || 'stable';
    const changePercent = caseData[0]?.caseStatus.changePercent || 0;
    table += `${caseType} | ${capitalize(trend)} | ${changePercent}%\n`;
  });
  return table;
}

function getCaseSpecificDetails(caseType: string) {
  const caseData = processedCasesData.find(d => d.caseType.toLowerCase() === caseType.toLowerCase());
  if (!caseData) return `No data available for ${caseType} cases.`;
  
  return `
### ${caseData.caseType} Case Details (${caseData.court})

- Total Cases: ${caseData.totalCases.toLocaleString()}
- Resolved Cases: ${caseData.resolvedCases.toLocaleString()} (${(caseData.resolvedCases/caseData.totalCases*100).toFixed(1)}%)
- Pending Cases: ${caseData.pendingCases.toLocaleString()}
- Priority Cases: ${caseData.priorityCases.toLocaleString()}
- Average Resolution Time: ${caseData.averageResolutionTime} days
- Trend: ${capitalize(caseData.caseStatus.trend)} (${caseData.caseStatus.changePercent}%)

**Key Challenges:**
${caseData.challenges.map(c => `- ${c}`).join('\n')}

**Recommendations:**
${caseData.recommendations.map(r => `- ${r}`).join('\n')}
`;
}
// ... Add more handler functions for the rest of your queries ...

function getDataInjectionForQuery(userMsg: string): DataInjectionResult {
  userMsg = userMsg.toLowerCase();

  // 1. Compare cases by court
  if (userMsg.includes("compare cases by court") || userMsg.includes("case distribution by court")) {
    return {
      context: `\n\n### Cases by Court\n${getCasesByCourt()}`,
      matched: true
    };
  }
  // 2. Show cases by type
  if (userMsg.includes("cases by type") || userMsg.includes("case types") || userMsg.includes("types of cases")) {
    return {
      context: `\n\n### Cases by Type\n${getCasesByCaseType()}`,
      matched: true
    };
  }
  // 3. What are the average resolution times?
  if (userMsg.includes("resolution time") || userMsg.includes("case duration") || userMsg.includes("how long")) {
    return {
      context: `\n\n### Average Resolution Times by Case Type\n${getResolutionTimesByCaseType()}`,
      matched: true
    };
  }
  // 4. What are the priority cases?
  if (userMsg.includes("priority cases") || userMsg.includes("urgent cases") || userMsg.includes("high priority")) {
    return {
      context: `\n\n### Priority Cases by Court\n${getPriorityCasesByCourt()}`,
      matched: true
    };
  }
  // 5. Show case trends
  if (userMsg.includes("case trends") || userMsg.includes("caseload trends") || userMsg.includes("trend")) {
    return {
      context: `\n\n### Case Status Trends\n${getCaseStatusTrends()}`,
      matched: true
    };
  }
  // 6. Get specific case type details
  const caseType = extractCaseTypeFromText(userMsg);
  if (caseType && (userMsg.includes("details") || userMsg.includes("information") || userMsg.includes("about"))) {
    return {
      context: `\n\n${getCaseSpecificDetails(caseType)}`,
      matched: true
    };
  }
  
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
    const judicialDataContext = 'You have access to the Judiciary Case Management database.';
    const systemPrompt = `You are Judicial-AI, an advanced AI assistant for the Judiciary of Kenya.\n${judicialDataContext}\n${dataContext}\nYou help judges with legal research, case analysis, and procedural guidance. Always provide balanced, impartial information based on legal precedents and statutes.`;
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