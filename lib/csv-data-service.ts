"use client"

// Interface definitions
export interface SucroseDataPoint {
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

export interface ProductionDataPoint {
  month: string;
  year: number;
  factory: string;
  ksbReturns: number;
  kraReturns: number;
  target: number;
}

// CSV parsing utility function
function parseCSV(csvText: string): string[][] {
  const lines = csvText.trim().split('\n');
  return lines.map(line => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
}

// Parse CTU Sucrose Content CSV
export async function parseSucroseContentCSV(): Promise<SucroseDataPoint[]> {
  try {
    const response = await fetch('/ctu_sucrose_content_data_2017_2024.csv');
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Skip header row
    const dataRows = rows.slice(1);
    
    return dataRows.map(row => ({
      month: row[0],
      year: parseInt(row[1]),
      butali: parseFloat(row[2]),
      chemelil: parseFloat(row[3]),
      muhoroni: parseFloat(row[4]),
      kibos: parseFloat(row[5]),
      westKenya: parseFloat(row[6]),
      nzoia: parseFloat(row[7]),
      kwale: parseFloat(row[8]),
      combined: parseFloat(row[9])
    }));
  } catch (error) {
    console.error('Error parsing sucrose content CSV:', error);
    return [];
  }
}

// Parse Production CSV
export async function parseProductionCSV(): Promise<ProductionDataPoint[]> {
  try {
    const response = await fetch('/production_data_2017_2024_filled.csv');
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // Skip header row
    const dataRows = rows.slice(1);
    
    return dataRows.map(row => ({
      month: row[0],
      year: parseInt(row[1]),
      factory: row[2].toLowerCase(), // Normalize factory names to lowercase
      ksbReturns: parseFloat(row[3]),
      kraReturns: parseFloat(row[4]),
      target: parseFloat(row[5])
    }));
  } catch (error) {
    console.error('Error parsing production CSV:', error);
    return [];
  }
}

// Combined data loading function
export async function loadChartData(): Promise<{
  sucroseData: SucroseDataPoint[];
  productionData: ProductionDataPoint[];
}> {
  const [sucroseData, productionData] = await Promise.all([
    parseSucroseContentCSV(),
    parseProductionCSV()
  ]);
  
  return {
    sucroseData,
    productionData
  };
}
