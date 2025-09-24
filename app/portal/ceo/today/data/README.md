# CEO Today Data Structure

This folder contains structured data for all the cards and modals in the CEO Today page. The data is organized to make debugging and maintenance easier.

## Data Files Structure

Each file contains data for a specific card or modal:

- **alerts-data.ts**: Contains alert items for the Alerts card and modal
- **actions-data.ts**: Contains action items for the Actions card and modal
- **activities-data.ts**: Contains activity items for the Activities card and modal
- **ai-insights-data.ts**: Contains AI insight items for the AI Insights card and modal
- **industry-news-data.ts**: Contains news items for the Industry News card and modal
- **meetings-data.ts**: Contains meeting items for the Meetings card and modal
- **market-insights-data.ts**: Contains market insight data for the Market Insights card
- **briefing-data.ts**: Contains transcript data and metadata for the audio briefing card
- **scheduler-data.ts**: Contains suggestions and options for the schedule meeting and visit modals
- **index.ts**: Exports all data from the above files for easy importing

## How To Use

Import the data directly from the data folder:

```tsx
import { alertsData, detailedAlertsData } from "../data/alerts-data";
```

Or import from the index file to get all data:

```tsx
import { 
  alertsData, 
  actionsData, 
  activitiesData,
  aiInsightsData,
  industryNewsData,
  meetingsData,
  marketInsightsData,
  briefingData,
  briefingMetadata,
  schedulerData
} from "../data";
```

## Data Types

Each data file exports TypeScript interfaces that define the structure of the data:

- `AlertItem`
- `ActionItem`
- `ActivityItem`
- `AIInsightItem`
- `NewsItem`
- `MeetingItem`
- `MarketInsight`
- `TranscriptSegment`
- `SchedulerItem`

## Modifying Data

When updating the data:

1. Maintain the structure defined by the interfaces
2. Keep consistent formatting for timestamps, labels, etc.
3. Update the index.ts file if adding new data files
4. Make sure all required fields are populated

## Debugging Tips

If you encounter issues with data display:

1. Check the console for any errors
2. Verify the data structure matches the expected interface
3. Ensure all required fields are present
4. Check for any null values that might be causing rendering issues
5. Verify color values are correctly formatted (e.g., `bg-red-500`)