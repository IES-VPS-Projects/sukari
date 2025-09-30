// Types
export interface AlertItem {
  id: string;
  title: string;
  label: string;
  description: string;
  timestamp: string;
  labelColor: string;
  iconBg: string;
  iconColor: string;
  area?: string;
  category?: string;
  priority?: string;
  type?: string;
  status?: string;
  affectedFarms?: string[];
  message?: string;
}

// Alerts data for the alerts card and modal
export const alertsData: AlertItem[] = [
  {
    id: '1',
    title: 'Production Below Threshold',
    label: 'HIGH',
    description: 'Muhoroni sugar company production fell 25% below',
    timestamp: '11:32 PM • Muhoroni',
    labelColor: 'bg-red-500',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    category: 'Performance'
  },
  {
    id: '2',
    title: 'Compliance Issue Detected',
    label: 'MEDIUM',
    description: 'Nzoia Sugar Mill compliance violations reported',
    timestamp: '10:15 AM • Nzoia',
    labelColor: 'bg-orange-500',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    category: 'Compliance'
  },
  {
    id: '3',
    title: 'Locust Infestation',
    label: 'LOW',
    description: 'Minor pest activity detected in western region',
    timestamp: '9:30 AM • Butali',
    labelColor: 'bg-green-500',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    category: 'Disaster'
  },
  {
    id: '4',
    title: 'Equipment Maintenance Required',
    label: 'MEDIUM',
    description: 'Routine maintenance scheduled for sugar mill equipment',
    timestamp: '8:15 AM • Chemelil',
    category: 'Performance',
    labelColor: 'bg-orange-500',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }
];

// Detailed alerts data for modal
export const detailedAlertsData: AlertItem[] = [
  {
    id: 'alert-1',
    title: 'Production Below Threshold',
    message: 'Muhoroni sugar company production fell 25% below target',
    description: 'Muhoroni sugar company production fell 25% below the monthly target. Immediate attention required to identify and resolve bottlenecks in the production line. Initial investigation suggests equipment efficiency issues.',
    timestamp: '11:32 PM • Muhoroni',
    priority: 'high',
    type: 'production',
    status: 'active',
    affectedFarms: ['Muhoroni East', 'Muhoroni Central', 'Tinderet Outgrowers'],
    label: 'HIGH',
    labelColor: 'bg-red-500',
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    area: 'Performance'
  },
  {
    id: 'alert-2', 
    title: 'Compliance Issue Detected',
    description: 'Environmental standards review required for West Zone operations.',
    timestamp: '4 hours ago',
    label: 'MEDIUM',
    labelColor: 'bg-orange-500',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    area: 'Compliance',
    priority: 'medium',
    type: 'compliance',
    status: 'active',
    affectedFarms: ['West Kenya Estates', 'Nzoia Outgrowers']
  },
  {
    id: 'alert-3',
    title: 'Quality Control Notice',
    description: 'Sugar purity levels in Batch #247 below standard requirements.',
    timestamp: '6 hours ago',
    label: 'MEDIUM',
    labelColor: 'bg-orange-500',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    area: 'Compliance',
    priority: 'medium',
    type: 'quality',
    status: 'active',
    affectedFarms: ['Quality Processing Center']
  },
  {
    id: 'alert-4',
    title: 'Disbursement Approval',
    description: 'Farmer payment disbursement requires executive approval for Western region.',
    timestamp: '1 day ago',
    label: 'HIGH',
    labelColor: 'bg-red-500',
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    area: 'Payments',
    priority: 'high',
    type: 'financial',
    status: 'pending',
    affectedFarms: ['Western Region Farmers', 'Outgrower Association']
  },
  {
    id: 'alert-5',
    title: 'Weather Alert',
    description: 'Heavy rainfall expected in the next 24 hours. Potential impact on cane transportation.',
    timestamp: '3 hours ago',
    label: 'MEDIUM',
    labelColor: 'bg-orange-500',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    area: 'Weather',
    priority: 'medium',
    type: 'weather',
    status: 'active',
    affectedFarms: ['All Western Region', 'Transport Network']
  },
  {
    id: 'alert-6',
    title: 'System Performance Alert',
    description: 'Processing system efficiency below optimal levels. Monitoring required.',
    timestamp: '5 hours ago',
    label: 'MEDIUM',
    labelColor: 'bg-orange-500',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    area: 'Performance',
    priority: 'medium',
    type: 'system',
    status: 'active',
    affectedFarms: ['Central Processing']
  },
  {
    id: 'alert-7',
    title: 'Locust Infestation',
    message: 'Minor pest activity detected in western region',
    description: 'Minor pest activity detected in western region. Monitoring teams are assessing the situation and implementing standard control measures.',
    timestamp: '9:30 AM • Butali',
    label: 'LOW',
    labelColor: 'bg-green-500',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    area: 'Disaster',
    priority: 'low',
    type: 'pest',
    status: 'active',
    affectedFarms: ['Western Region Farms', 'Butali Outgrowers'],
    category: 'Production'
  },
  {
    id: 'alert-8',
    title: 'Equipment Maintenance Required',
    message: 'Routine maintenance scheduled for sugar mill equipment',
    description: 'Routine maintenance scheduled for sugar mill equipment at Chemelil factory. Operations team should coordinate downtime to minimize production impact.',
    timestamp: '8:15 AM • Chemelil',
    label: 'MEDIUM',
    labelColor: 'bg-orange-500',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    area: 'Performance',
    priority: 'medium',
    type: 'maintenance',
    status: 'active',
    affectedFarms: ['Chemelil Factory'],
    category: 'Production'
  }
];