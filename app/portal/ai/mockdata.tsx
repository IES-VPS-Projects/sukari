// mockdata.tsx
export interface PrimaryCropData {
    year: number;
    month: string;
    region: string;
    item: string;
    element: string;
    value: number;
    variety: string;
  }
  
  export interface ProcessedCropData {
    year: number;
    month: string;
    region: string;
    item: string;
    element: string;
    value: number;
    sourceFactory: string;
  }
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const regions = [
    'National', 'West Pokot', 'Vihiga', 'Siaya', 'Nyamira', 'Kisii', 'Migori', 'Kisumu',
    'Kericho', 'Kajiado', 'Narok', 'Nakuru', 'Laikipia', 'Baringo', 'Nandi',
    'Uasin Gishu', 'Trans-Nzoia', 'Samburu', 'Kakamega'
  ];
  
  const factories = [
    'Chemelil', 'Busia', 'Butali', 'Kibos', 'Kwale', 'Muhoroni', 'Mumias', 'Nzoia',
    'Olepito', 'Soin', 'South-Kenya', 'Sukari', 'Transmara', 'West-Kenya'
  ];
  
  const varieties = ['CO 421', 'CO 617', 'N14', 'KENTAN', 'Eldoret 1'];
  
  const elementsPrimary = ['Cane Deliveries', 'Crop Area', 'Crop Yield', 'Production Quantity', 'Production Value'];
  const elementsProcessed = ['Production Quantity', 'Production Value', 'Crop Area', 'Crop Yield'];
  
  // Price trends (KSh/tonne)
  const canePrices: { [year: number]: number } = {
    2019: 4200, 2020: 4350, 2021: 4500, 2022: 4650, 2023: 4900, 2024: 5200
  };
  const sugarPrices: { [year: number]: number } = {
    2019: 110000, 2020: 120000, 2021: 130000, 2022: 140000, 2023: 145000, 2024: 150000
  };
  
  // Seasonal factors (higher in April–November, lower in December–March)
  const seasonalFactors: { [month: string]: number } = {
    January: 0.4, February: 0.3, March: 0.5, April: 0.8, May: 0.9, June: 1.0,
    July: 1.0, August: 0.9, September: 0.8, October: 0.7, November: 0.7, December: 0.4
  };
  
  // Generate synthetic data
  const generatePrimaryData = (): PrimaryCropData[] => {
    const data: PrimaryCropData[] = [];
    for (let year = 2019; year <= 2024; year++) {
      for (const month of months) {
        for (const region of regions) {
          for (const factory of factories) {
            if (region === 'National') {
              // National aggregates
              const baseCaneDeliveries = Math.floor(Math.random() * (80000 - 50000 + 1) + 50000); // 50,000–80,000 tonnes/month
              const caneDeliveries = Math.floor(baseCaneDeliveries * seasonalFactors[month]);
              const cropArea = Math.floor(Math.random() * (20000 - 15000 + 1) + 15000); // 15,000–20,000 ha
              const cropYield = Number((Math.random() * (100 - 50) + 50).toFixed(2)); // 50–100 tonnes/ha
              const prodQuantity = caneDeliveries; // Equal to deliveries
              const prodValue = Number(((caneDeliveries * canePrices[year]) / 1e6).toFixed(2)); // KSh million
              data.push(
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Cane Deliveries', value: caneDeliveries, variety: '-' },
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Crop Area', value: cropArea, variety: '-' },
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Crop Yield', value: cropYield, variety: '-' },
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Production Quantity', value: prodQuantity, variety: '-' },
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Production Value', value: prodValue, variety: '-' }
              );
            } else if (['Kakamega', 'Kisumu', 'Busia', 'Migori', 'Siaya', 'Kericho', 'Nandi', 'Uasin Gishu', 'Trans-Nzoia', 'Kisii', 'Nyamira', 'Narok', 'Kwale'].includes(region)) {
              // Region-specific
              const baseCaneDeliveries = Math.floor(Math.random() * (15000 - 5000 + 1) + 5000); // 5,000–15,000 tonnes/month
              const caneDeliveries = Math.floor(baseCaneDeliveries * seasonalFactors[month]);
              const cropArea = Math.floor(Math.random() * (1000 - 100 + 1) + 100); // 100–1,000 ha
              const cropYield = Number((['Kakamega', 'Kisumu', 'Trans-Nzoia'].includes(region)
                ? Math.random() * (100 - 60) + 60
                : Math.random() * (80 - 30) + 30).toFixed(2)); // 60–100 or 30–80 tonnes/ha
              const prodQuantity = caneDeliveries;
              const prodValue = Number(((caneDeliveries * canePrices[year]) / 1e6).toFixed(2));
              const variety = varieties[Math.floor(Math.random() * varieties.length)];
              data.push(
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Cane Deliveries', value: caneDeliveries, variety },
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Crop Area', value: cropArea, variety },
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Crop Yield', value: cropYield, variety },
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Production Quantity', value: prodQuantity, variety },
                { year, month, region, item: `${factory} Cane Deliveries`, element: 'Production Value', value: prodValue, variety }
              );
            }
          }
        }
      }
    }
    return data;
  };
  
  const generateProcessedData = (): ProcessedCropData[] => {
    const data: ProcessedCropData[] = [];
    for (let year = 2019; year <= 2024; year++) {
      for (const month of months) {
        for (const region of regions) {
          for (const factory of factories) {
            if (region === 'National') {
              const baseProdQuantity = Math.floor(Math.random() * (8000 - 4000 + 1) + 4000); // 4,000–8,000 tonnes/month
              const prodQuantity = Math.floor(baseProdQuantity * seasonalFactors[month]);
              const prodValue = Number(((prodQuantity * sugarPrices[year]) / 1e6).toFixed(2)); // KSh million
              const cropArea = Math.floor(Math.random() * (20000 - 15000 + 1) + 15000);
              const cropYield = Number((Math.random() * (10 - 5) + 5).toFixed(2)); // 5–10 tonnes/ha
              data.push(
                { year, month, region, item: 'Sugar', element: 'Production Quantity', value: prodQuantity, sourceFactory: factory },
                { year, month, region, item: 'Sugar', element: 'Production Value', value: prodValue, sourceFactory: factory },
                { year, month, region, item: 'Sugar', element: 'Crop Area', value: cropArea, sourceFactory: factory },
                { year, month, region, item: 'Sugar', element: 'Crop Yield', value: cropYield, sourceFactory: factory }
              );
            } else if (['Kakamega', 'Kisumu', 'Busia', 'Migori', 'Siaya', 'Kericho', 'Nandi', 'Uasin Gishu', 'Trans-Nzoia', 'Kisii', 'Nyamira', 'Narok', 'Kwale'].includes(region)) {
              const baseProdQuantity = Math.floor(Math.random() * (2000 - 500 + 1) + 500); // 500–2,000 tonnes/month
              const prodQuantity = Math.floor(baseProdQuantity * seasonalFactors[month]);
              const prodValue = Number(((prodQuantity * sugarPrices[year]) / 1e6).toFixed(2));
              const cropArea = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
              const cropYield = Number((['Kakamega', 'Kisumu', 'Trans-Nzoia'].includes(region)
                ? Math.random() * (10 - 6) + 6
                : Math.random() * (8 - 3) + 3).toFixed(2)); // 6–10 or 3–8 tonnes/ha
              data.push(
                { year, month, region, item: 'Sugar', element: 'Production Quantity', value: prodQuantity, sourceFactory: factory },
                { year, month, region, item: 'Sugar', element: 'Production Value', value: prodValue, sourceFactory: factory },
                { year, month, region, item: 'Sugar', element: 'Crop Area', value: cropArea, sourceFactory: factory },
                { year, month, region, item: 'Sugar', element: 'Crop Yield', value: cropYield, sourceFactory: factory }
              );
            }
          }
        }
      }
    }
    return data;
  };
  
  export const primaryCropsData: PrimaryCropData[] = generatePrimaryData();
  export const processedCropsData: ProcessedCropData[] = generateProcessedData();