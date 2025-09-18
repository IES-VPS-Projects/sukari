"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { allAIInsightsData } from "@/lib/mockdata"
import { AIInsightsModal } from "@/components/modals/ai-insights-modal"

interface AIInsightsCardProps {
  triggerNewActivity?: boolean
  setTriggerNewActivity?: (value: boolean) => void
}

export default function AIInsightsCard({ 
  triggerNewActivity, 
  setTriggerNewActivity 
}: AIInsightsCardProps) {
  const [viewAllAIInsightsOpen, setViewAllAIInsightsOpen] = useState(false)
  const [selectedAIInsightForDetails, setSelectedAIInsightForDetails] = useState<string | null>(null)

  // Helper function to get indicator color based on insight
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

  return (
    <>
      <Card className="rounded-[20px] shadow-lg border-0 bg-white">
        <CardHeader className="pb-1">
          <CardTitle className="text-[#202020] cursor-pointer" onClick={() => {
            setSelectedAIInsightForDetails(null)
            setViewAllAIInsightsOpen(true)
          }}>
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-4 overflow-hidden">
          {/* Scrollable insights list - showing all insights */}
          <div className="space-y-3 max-h-64 overflow-y-auto overflow-x-hidden scrollbar-hover pr-1">
            {allAIInsightsData.map((insight) => (
              <div 
                key={insight.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md transform-gpu ${getHoverBg(insight.id, insight.title)}`}
                style={{
                  transform: 'scale(1)',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.01)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('button')) {
                    setSelectedAIInsightForDetails(insight.id)
                    setViewAllAIInsightsOpen(true)
                  }
                }}
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getInsightColor(insight.id, insight.title)}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-[#202020] truncate">{insight.title}</p>
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <p className="text-xs text-[#6B6B6B] line-clamp-2 flex-1">{insight.description}</p>
                    <p className="text-xs text-[#9CA3AF] whitespace-nowrap">{insight.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Modal */}
      <AIInsightsModal 
        open={viewAllAIInsightsOpen}
        onOpenChange={setViewAllAIInsightsOpen}
        selectedAIInsightForDetails={selectedAIInsightForDetails}
        setSelectedAIInsightForDetails={setSelectedAIInsightForDetails}
        setTriggerNewActivity={setTriggerNewActivity}
      />
    </>
  )
}
