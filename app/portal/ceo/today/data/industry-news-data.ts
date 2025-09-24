// Types
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  content?: string;
  url?: string;
  category: string;
  categoryColor: string;
  imageUrl?: string;
  relevance?: string;
  impact?: string;
  relatedArticles?: {
    title: string;
    url: string;
  }[];
}

// Industry News data for card and modal
export const industryNewsData: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Government Announces New Sugar Import Regulations',
    source: 'Business Daily',
    date: 'Today',
    summary: 'The Ministry of Agriculture has announced new regulations for sugar imports, aimed at protecting local producers while ensuring market stability.',
    content: `The Ministry of Agriculture has announced significant changes to sugar import regulations, effective immediately. The new framework includes stricter quality controls, revised tariff structures, and quota allocations designed to balance the needs of local producers with market demand.

Key changes include a 15% increase in import duties for processed sugar, expanded quality certification requirements, and a new seasonal quota system that adjusts import allowances based on domestic production forecasts.

"These measures are designed to create a sustainable balance in our sugar market," stated Agriculture Minister Elizabeth Mwangi. "We aim to protect our local industry while ensuring consumers have access to affordable sugar products."

Industry analysts suggest the regulations could increase local sugar prices by 5-8% in the short term but stabilize the market in the longer term. The Kenya Sugar Board has expressed support for the measures, highlighting the potential for increased investment in local production capacity.

The regulations come after extensive consultation with stakeholders including producer associations, consumer groups, and industry representatives. Implementation will be phased over the next six months, with full enforcement expected by March 2026.`,
    category: 'Policy',
    categoryColor: 'bg-blue-100 text-blue-800',
    imageUrl: '/images/news/sugar-policy.jpg',
    relevance: 'High',
    impact: 'Significant',
    relatedArticles: [
      {
        title: 'Analysis: Impact of Import Regulations on Sugar Prices',
        url: 'https://businessdaily.co.ke/economy/analysis-impact-regulations-sugar'
      },
      {
        title: 'Sugar Producers Association Welcomes New Framework',
        url: 'https://nationmedia.com/business/sugar-producers-welcome-framework'
      }
    ]
  },
  {
    id: 'news-2',
    title: 'Mumias Sugar Announces Production Capacity Expansion',
    source: 'The Standard',
    date: 'Yesterday',
    summary: 'Mumias Sugar Company has announced plans to expand its production capacity by 30% following successful debt restructuring.',
    content: `Mumias Sugar Company has unveiled ambitious plans to expand its production capacity by 30% over the next 18 months. The announcement comes following the successful restructuring of the company's KSh 2.3 billion debt and the completion of critical maintenance work on its primary processing facility.

According to CEO James Muthaura, the expansion will include the installation of new crushing equipment, modernization of the processing plant, and implementation of energy efficiency measures. The investment, valued at approximately KSh 1.8 billion, is expected to increase daily crushing capacity from 8,000 to 10,400 tonnes.

"This expansion represents a turning point for Mumias Sugar," said Muthaura. "After years of challenges, we're now positioned for sustainable growth and increased market share."

The project is expected to create approximately 500 direct jobs and benefit over 10,000 outgrower farmers through increased demand for sugarcane. The company has secured financing through a consortium of local banks and development finance institutions.

Industry observers note that the expansion could significantly impact Kenya's sugar self-sufficiency targets. The Kenya Sugar Board has indicated that increased domestic production will be a key factor in reducing import dependency, which currently stands at approximately 35% of total consumption.

Construction is scheduled to begin in October 2025, with full operational capacity expected by early 2027.`,
    category: 'Industry',
    categoryColor: 'bg-green-100 text-green-800',
    imageUrl: '/images/news/mumias-sugar.jpg',
    relevance: 'High',
    impact: 'Positive',
    relatedArticles: [
      {
        title: 'Mumias Sugar Restructuring: A Case Study in Corporate Recovery',
        url: 'https://thestandard.co.ke/business/mumias-sugar-restructuring'
      },
      {
        title: 'How Expanded Production Will Affect Western Kenya Economy',
        url: 'https://businessdaily.co.ke/economy/western-kenya-sugar-economy'
      }
    ]
  },
  {
    id: 'news-3',
    title: 'Global Sugar Prices Expected to Rise Amid Supply Constraints',
    source: 'Reuters',
    date: '2 days ago',
    summary: 'Analysts predict a 15-20% increase in global sugar prices due to production shortfalls in Brazil and India.',
    content: `International sugar markets are bracing for significant price increases as production shortfalls in major exporting countries create supply constraints. Industry analysts predict prices could rise by 15-20% in the coming months, potentially impacting import costs for Kenyan sugar processors.

Brazil, the world's largest sugar producer, has reported a 12% reduction in expected output following adverse weather conditions affecting key growing regions. Similarly, India has announced a 9% decrease in production estimates due to reduced acreage and lower-than-expected yields.

"The combined effect of these shortfalls creates a significant supply gap in global markets," explained Maria Fernandez, commodities analyst at Goldman Sachs. "With global buffer stocks already at five-year lows, price pressure is inevitable."

For Kenya, which imports approximately 35% of its sugar requirements, the price increases could translate to higher consumer costs unless domestic production can be increased to offset import dependency. The Kenya Sugar Board has indicated it is monitoring the situation closely and considering temporary measures to mitigate consumer impact.

Some industry experts suggest the situation presents an opportunity for Kenyan producers to increase market share, particularly following recent investments in production efficiency and capacity expansion at several major mills.

The price increases are expected to begin manifesting in global markets within 6-8 weeks and could persist through much of 2026 unless production recovers more quickly than anticipated.`,
    category: 'Market',
    categoryColor: 'bg-purple-100 text-purple-800',
    imageUrl: '/images/news/global-sugar.jpg',
    relevance: 'Medium',
    impact: 'Significant',
    relatedArticles: [
      {
        title: 'How Global Sugar Shortages Will Affect African Economies',
        url: 'https://reuters.com/commodities/sugar-shortages-african-impact'
      },
      {
        title: 'Strategies for Managing Import Costs During Price Surges',
        url: 'https://businessdaily.co.ke/economy/import-cost-management-strategies'
      }
    ]
  },
  {
    id: 'news-4',
    title: 'New Sugar Fortification Standards Released',
    source: 'Kenya Bureau of Standards',
    date: '3 days ago',
    summary: 'KEBS has released updated fortification standards for refined sugar, focusing on micronutrient enhancement.',
    content: `The Kenya Bureau of Standards (KEBS) has released updated fortification standards for refined sugar sold in the domestic market. The new standards, which will become mandatory in January 2026, focus on enhanced micronutrient profiles including vitamin A, iron, and zinc.

According to KEBS Director Bernard Njiraini, the standards aim to address persistent micronutrient deficiencies in the population while utilizing sugar as an effective delivery vehicle due to its consistent consumption patterns.

"Sugar fortification represents a cost-effective approach to improving public health outcomes," stated Njiraini. "These standards have been developed based on extensive research and stakeholder consultation."

The implementation timeline gives producers approximately 15 months to adjust their processes and equipment. KEBS has indicated it will provide technical support to manufacturers during the transition period.

Initial industry response has been cautiously positive, with the Kenya Sugar Manufacturers Association acknowledging the public health benefits while expressing concerns about implementation costs. Early estimates suggest fortification will add approximately KSh 2-3 per kilogram to production costs.

The Ministry of Health has endorsed the standards, citing potential long-term healthcare savings and productivity benefits. Similar fortification programs in other countries have demonstrated significant public health improvements over 3-5 year implementation periods.

Consumer awareness campaigns about the benefits of fortified sugar are expected to begin in early 2026 to coincide with the market introduction of compliant products.`,
    category: 'Regulation',
    categoryColor: 'bg-yellow-100 text-yellow-800',
    imageUrl: '/images/news/sugar-standards.jpg',
    relevance: 'Medium',
    impact: 'Moderate',
    relatedArticles: [
      {
        title: 'The Public Health Impact of Food Fortification Programs',
        url: 'https://kebs.org/research/fortification-public-health-impact'
      },
      {
        title: 'Cost Analysis: Implementing New Sugar Fortification Standards',
        url: 'https://businessdaily.co.ke/industry/fortification-implementation-costs'
      }
    ]
  },
  {
    id: 'news-5',
    title: 'Innovative Cane Harvesting Technology Demonstrates 20% Yield Improvement',
    source: 'African Agritech Journal',
    date: '4 days ago',
    summary: 'Trials of new harvesting technology in Western Kenya show significant improvements in yield and sugar content.',
    content: `Field trials of innovative cane harvesting technology in Western Kenya have demonstrated a remarkable 20% improvement in effective yield through reduced wastage and improved sugar content preservation. The technology, developed through a partnership between the Kenya Agricultural Research Institute (KARI) and German agricultural equipment manufacturer Hawe, combines precision cutting mechanisms with immediate processing capabilities.

Unlike traditional harvesting methods that can result in significant sugar content deterioration between harvesting and processing, the new system minimizes this loss through integrated handling and rapid transport solutions. Trial data indicates that cane delivered to mills using the new system consistently shows 12-15% higher sucrose content compared to conventionally harvested cane.

"The results exceed our most optimistic projections," noted Dr. Joseph Kipkoech, lead researcher at KARI. "If implemented at scale, this technology could transform productivity across Kenya's sugar industry."

The system also demonstrates environmental benefits, including a 30% reduction in diesel consumption during harvesting operations and significantly reduced soil compaction compared to conventional equipment.

Four major sugar producers, including Mumias and Butali, have expressed interest in adopting the technology following the successful trials. Initial investment costs are substantial at approximately KSh 75-90 million per implementation, but analysis suggests a return on investment period of just 2.5 years based on yield improvements alone.

Wider adoption could begin as early as the 2026 harvest season, with potential for the technology to be manufactured locally under licensing agreements within 3-5 years.`,
    category: 'Technology',
    categoryColor: 'bg-indigo-100 text-indigo-800',
    imageUrl: '/images/news/harvesting-tech.jpg',
    relevance: 'High',
    impact: 'Positive',
    relatedArticles: [
      {
        title: 'How New Harvesting Technology Could Transform Sugar Economics',
        url: 'https://africanagritech.com/features/harvesting-technology-economics'
      },
      {
        title: 'The Environmental Benefits of Precision Agriculture in Sugar',
        url: 'https://kari.org/research/precision-agriculture-environmental-impact'
      }
    ]
  }
];