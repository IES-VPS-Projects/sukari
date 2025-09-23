"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { allAIInsightsData } from "@/lib/mockdata"
import { 
  BarChart4, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  X, 
  Download, 
  Share, 
  BookmarkPlus,
  LineChart,
  Clock,
  Info,
  Zap,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  MoreHorizontal
} from "lucide-react"
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { TbSpeakerphone, TbReportAnalytics } from 'react-icons/tb'
import { GrDocumentPerformance } from 'react-icons/gr'
import { HiSparkles } from 'react-icons/hi2'

// Extend the AIInsightItem type with the properties used in this component
interface ExtendedAIInsightItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: string;
  confidence: string;
  impact: string;
  priority: string;
  iconColor: string;
  iconBg: string;
  hoverBg: string;
  type: string;
  date: string;
  time?: string;
}

interface AIInsightsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedAIInsightForDetails: string | null
  setSelectedAIInsightForDetails: (id: string | null) => void
  setTriggerNewActivity?: (value: boolean) => void
}

export function AIInsightsModal({ 
  open, 
  onOpenChange, 
  selectedAIInsightForDetails,
  setSelectedAIInsightForDetails,
  setTriggerNewActivity 
}: AIInsightsModalProps) {
  // Get selected insight data
  const selectedInsight = selectedAIInsightForDetails 
    ? allAIInsightsData.find(insight => insight.id === selectedAIInsightForDetails) 
    : null;

  // Cast AIInsightItems to ExtendedAIInsightItem to access the extended properties
  const extendedInsights = allAIInsightsData as unknown as ExtendedAIInsightItem[];
  const extendedSelectedInsight = selectedInsight as unknown as ExtendedAIInsightItem | null;

  // Helper function to safely capitalize the first letter of a string
  const capitalizeFirstLetter = (text: string | undefined | null): string => {
    if (!text) return 'Unknown';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Helper function to get icon based on insight type
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'risk':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'opportunity':
        return <Lightbulb className="h-5 w-5 text-green-500" />;
      case 'anomaly':
        return <Info className="h-5 w-5 text-red-500" />;
      case 'trend':
        return <LineChart className="h-5 w-5 text-purple-500" />;
      case 'projection':
        return <BarChart4 className="h-5 w-5 text-indigo-500" />;
      case 'recommendation':
        return <TbSpeakerphone className="h-5 w-5 text-orange-500" />;
      case 'report':
        return <HiOutlineDocumentReport className="h-5 w-5 text-cyan-500" />;
      default:
        return <HiSparkles className="h-5 w-5 text-gray-500" />;
    }
  }

  // Helper function to get color based on insight type
  const getInsightColor = (id: string, title: string) => {
    if (id === 'insight-1' || title === 'Productivity') return 'bg-blue-500'
    if (id === 'insight-2' || title === 'Compliance') return 'bg-yellow-500'
    if (id === 'insight-3' || title === 'Weather') return 'bg-green-400'
    if (title === 'Predictive Risk Forecast') return 'bg-purple-500'
    if (title === 'Opportunity Alert') return 'bg-blue-800'
    if (title === 'Financial Insight') return 'bg-orange-500'
    if (title === 'Traceability Gap Detection') return 'bg-red-500'
    if (title === 'Stakeholder Engagement Update') return 'bg-teal-500'
    if (title === 'Sustainability Metric') return 'bg-green-800'
    if (title === 'Market Trend Analysis') return 'bg-indigo-500'
    return 'bg-gray-500'
  }

  // Helper function to get background color
  const getInsightBgColor = (id: string, title: string) => {
    if (id === 'insight-1' || title === 'Productivity') return 'bg-blue-50'
    if (id === 'insight-2' || title === 'Compliance') return 'bg-yellow-50'
    if (id === 'insight-3' || title === 'Weather') return 'bg-green-50'
    if (title === 'Predictive Risk Forecast') return 'bg-purple-50'
    if (title === 'Opportunity Alert') return 'bg-blue-50'
    if (title === 'Financial Insight') return 'bg-orange-50'
    if (title === 'Traceability Gap Detection') return 'bg-red-50'
    if (title === 'Stakeholder Engagement Update') return 'bg-teal-50'
    if (title === 'Sustainability Metric') return 'bg-green-50'
    if (title === 'Market Trend Analysis') return 'bg-indigo-50'
    return 'bg-gray-50'
  }

  // Helper function to get hover background color
  const getHoverBg = (id: string, title: string) => {
    if (id === 'insight-1' || title === 'Productivity') return 'hover:bg-blue-50'
    if (id === 'insight-2' || title === 'Compliance') return 'hover:bg-yellow-50'
    if (id === 'insight-3' || title === 'Weather') return 'hover:bg-green-50'
    if (title === 'Predictive Risk Forecast') return 'hover:bg-purple-50'
    if (title === 'Opportunity Alert') return 'hover:bg-blue-100'
    if (title === 'Financial Insight') return 'hover:bg-orange-50'
    if (title === 'Traceability Gap Detection') return 'hover:bg-red-50'
    if (title === 'Stakeholder Engagement Update') return 'hover:bg-teal-50'
    if (title === 'Sustainability Metric') return 'hover:bg-green-100'
    if (title === 'Market Trend Analysis') return 'hover:bg-indigo-50'
    return 'hover:bg-gray-50'
  }

  // Sample insight detail content
  const getInsightContent = (insight: any) => {
    if (!insight || !insight.title) {
      return (
        <div className="p-4 text-center text-gray-500">
          No insight data available or insight is missing title
        </div>
      );
    }
    
    if (insight.title === 'Productivity Increase at Chemelil Mill') {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Executive Summary</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Analysis of Chemelil Sugar Mill's operations over the past 30 days shows a significant productivity increase of 28.4% compared to the previous quarter. This improvement exceeds industry benchmarks and positions Chemelil as the fastest-growing mill in the region.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
              <Zap className="h-4 w-4" />
              Key Performance Indicators
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Tons Processed per Day</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">3,245 tons</span>
                  <Badge className="bg-green-100 text-green-800">+32%</Badge>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>Factory Time Efficiency</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">87.3%</span>
                  <Badge className="bg-green-100 text-green-800">+11.5%</Badge>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>Extraction Rate</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">93.5%</span>
                  <Badge className="bg-green-100 text-green-800">+5.8%</Badge>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>Downtime Incidents</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">4 incidents</span>
                  <Badge className="bg-green-100 text-green-800">-65%</Badge>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Causal Analysis</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Our AI analysis has identified several key factors contributing to this productivity improvement:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
              <li><span className="font-medium">Equipment Maintenance Upgrades:</span> The implementation of the preventative maintenance program has reduced mechanical failures by 65%.</li>
              <li><span className="font-medium">Process Optimization:</span> Adjustments to extraction settings have increased sugar recovery rates by 3.2 percentage points.</li>
              <li><span className="font-medium">Staff Training:</span> Completion of technical skills development program for 87% of operational staff has improved operational efficiency.</li>
              <li><span className="font-medium">Quality Cane Supply:</span> Better coordination with outgrowers has led to 22% improvement in cane quality metrics.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Expand Preventative Maintenance Program
                </h4>
                <p className="text-xs text-gray-600 pl-3">
                  Roll out the successful maintenance protocols to other mills in the network to achieve similar reductions in downtime.
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Document Process Improvements
                </h4>
                <p className="text-xs text-gray-600 pl-3">
                  Create a standardized playbook of the process optimizations implemented at Chemelil for knowledge sharing.
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Incentivize Performance
                </h4>
                <p className="text-xs text-gray-600 pl-3">
                  Implement performance-based incentives for staff and management based on the KPIs that have shown improvement.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Last updated: August 15, 2025
            </div>
            <div className="flex items-center gap-2">
              <TbReportAnalytics className="h-4 w-4" />
              Data sources: Mill operations database, SCADA system, outgrower records
            </div>
          </div>
        </div>
      )
    }
    
    // Default content if specific content not found
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {insight.description}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Key Insights</h3>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Performance Metrics
              </h4>
              <p className="text-xs text-gray-600 pl-3">
                Analysis shows notable changes in key operational metrics compared to previous periods.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Trend Identification
              </h4>
              <p className="text-xs text-gray-600 pl-3">
                Emerging patterns indicate opportunities for optimization in several areas.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Predictive Analysis
              </h4>
              <p className="text-xs text-gray-600 pl-3">
                Forecast models suggest potential developments requiring strategic planning.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
          <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
            <li><span className="font-medium">Strategic Adjustment:</span> Consider realigning resources based on identified patterns.</li>
            <li><span className="font-medium">Process Optimization:</span> Implement specific improvements to address efficiency gaps.</li>
            <li><span className="font-medium">Monitoring Enhancement:</span> Increase tracking frequency for key metrics showing variability.</li>
            <li><span className="font-medium">Stakeholder Engagement:</span> Communicate findings to relevant teams for coordinated response.</li>
          </ul>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Generated: August 15, 2025
          </div>
          <div className="flex items-center gap-2">
            <TbReportAnalytics className="h-4 w-4" />
            Data sources: Multiple integrated systems
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden [&>button]:hidden">
        <DialogTitle className="sr-only">AI Insights</DialogTitle>
        
        {/* For selected insight details view */}
        {extendedSelectedInsight ? (
          <div className="flex flex-col h-full">
            <div className={`p-6 ${extendedSelectedInsight.id && extendedSelectedInsight.title ? 
              getInsightBgColor(extendedSelectedInsight.id, extendedSelectedInsight.title) : 
              'bg-gray-50'} border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => onOpenChange(false)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Close
                  </Button>
                  <h2 className="text-lg font-semibold text-gray-900">AI Insight</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white`}>
                    {extendedSelectedInsight.type ? getInsightIcon(extendedSelectedInsight.type) : getInsightIcon('default')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {extendedSelectedInsight.title || 'Untitled Insight'}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {extendedSelectedInsight.date || 'No date'}
                      </span>
                      <span>•</span>
                      <Badge 
                        variant="outline" 
                        className="border-gray-300"
                      >
                        {extendedSelectedInsight.type ? 
                          capitalizeFirstLetter(extendedSelectedInsight.type) : 
                          'Unknown'}
                      </Badge>
                      <span>•</span>
                      <Badge 
                        className={`${
                          !extendedSelectedInsight.confidence ? 'bg-gray-100 text-gray-800' :
                          extendedSelectedInsight.confidence === 'High' 
                            ? 'bg-green-100 text-green-800' 
                            : extendedSelectedInsight.confidence === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {extendedSelectedInsight.confidence || 'Unknown'} confidence
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-6">
              {extendedSelectedInsight ? getInsightContent(extendedSelectedInsight) : 
                <div className="p-4 text-center text-gray-500">No insight data available</div>
              }
              
              <Separator className="my-6" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Was this insight helpful?</span>
                  <Button variant="outline" size="sm" className="h-8">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Yes
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    No
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Related Data
                </Button>
              </div>
            </ScrollArea>
          </div>
        ) : (
          // List of all insights
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <HiSparkles className="h-5 w-5 text-amber-500" />
                    AI Insights
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    AI-generated insights and recommendations from your data
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpenChange(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="flex-1 flex flex-col">
              <div className="border-b px-6">
                <TabsList className="border-b-0 p-0 h-12">
                  <TabsTrigger value="all" className="flex gap-2 py-3 px-4 border-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none">
                    <span>All Insights</span>
                    <Badge className="ml-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {allAIInsightsData.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="flex gap-2 py-3 px-4 border-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none">
                    <span>Performance</span>
                    <Badge className="ml-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {extendedInsights.filter(i => i.type === 'performance').length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="opportunities" className="flex gap-2 py-3 px-4 border-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none">
                    <span>Opportunities</span>
                    <Badge className="ml-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {extendedInsights.filter(i => i.type === 'opportunity').length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="risks" className="flex gap-2 py-3 px-4 border-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none">
                    <span>Risks</span>
                    <Badge className="ml-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {extendedInsights.filter(i => i.type === 'risk').length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <ScrollArea className="flex-1">
                <TabsContent value="all" className="p-0 m-0">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {extendedInsights.map((insight) => (
                      <div 
                        key={insight.id}
                        className={`flex flex-col gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${getHoverBg(insight.id, insight.title)} hover:shadow-md`}
                        onClick={() => onOpenChange(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white border`}>
                            {getInsightIcon(insight.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{insight.title}</h4>
                                <p className="text-xs text-[#6B6B6B] mb-1 line-clamp-2">{insight.description}</p>
                                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                  <span>{insight.date}</span>
                                  <span>•</span>
                                  <Badge 
                                    className={`text-xs whitespace-nowrap ${
                                      insight.confidence === 'High' 
                                        ? 'bg-green-100 text-green-800' 
                                        : insight.confidence === 'Medium'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {insight.confidence}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-11">
                          <Badge 
                            variant="outline" 
                            className="border-gray-300 text-xs"
                          >
                            {insight.type ? 
                              capitalizeFirstLetter(insight.type) : 
                              'Unknown'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="p-0 m-0">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {extendedInsights
                      .filter(i => i.type === 'performance')
                      .map((insight) => (
                      <div 
                        key={insight.id}
                        className={`flex flex-col gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${getHoverBg(insight.id, insight.title)} hover:shadow-md`}
                        onClick={() => onOpenChange(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white border`}>
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{insight.title}</h4>
                                <p className="text-xs text-[#6B6B6B] mb-1 line-clamp-2">{insight.description}</p>
                                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                  <span>{insight.date}</span>
                                  <span>•</span>
                                  <Badge 
                                    className={`text-xs whitespace-nowrap ${
                                      insight.confidence === 'High' 
                                        ? 'bg-green-100 text-green-800' 
                                        : insight.confidence === 'Medium'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {insight.confidence}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-11">
                          <Badge 
                            variant="outline" 
                            className="border-gray-300 text-xs"
                          >
                            Performance
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="opportunities" className="p-0 m-0">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {extendedInsights
                      .filter(i => i.type === 'opportunity')
                      .map((insight) => (
                      <div 
                        key={insight.id}
                        className={`flex flex-col gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${getHoverBg(insight.id, insight.title)} hover:shadow-md`}
                        onClick={() => onOpenChange(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white border`}>
                            <Lightbulb className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{insight.title}</h4>
                                <p className="text-xs text-[#6B6B6B] mb-1 line-clamp-2">{insight.description}</p>
                                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                  <span>{insight.date}</span>
                                  <span>•</span>
                                  <Badge 
                                    className={`text-xs whitespace-nowrap ${
                                      insight.confidence === 'High' 
                                        ? 'bg-green-100 text-green-800' 
                                        : insight.confidence === 'Medium'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {insight.confidence}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-11">
                          <Badge 
                            variant="outline" 
                            className="border-gray-300 text-xs"
                          >
                            Opportunity
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="risks" className="p-0 m-0">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {extendedInsights
                      .filter(i => i.type === 'risk')
                      .map((insight) => (
                      <div 
                        key={insight.id}
                        className={`flex flex-col gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${getHoverBg(insight.id, insight.title)} hover:shadow-md`}
                        onClick={() => onOpenChange(false)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white border`}>
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{insight.title}</h4>
                                <p className="text-xs text-[#6B6B6B] mb-1 line-clamp-2">{insight.description}</p>
                                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                  <span>{insight.date}</span>
                                  <span>•</span>
                                  <Badge 
                                    className={`text-xs whitespace-nowrap ${
                                      insight.confidence === 'High' 
                                        ? 'bg-green-100 text-green-800' 
                                        : insight.confidence === 'Medium'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {insight.confidence}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-11">
                          <Badge 
                            variant="outline" 
                            className="border-gray-300 text-xs"
                          >
                            Risk
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}