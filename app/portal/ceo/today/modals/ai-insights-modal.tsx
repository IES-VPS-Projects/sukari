"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, X } from "lucide-react"
import { GoInfo } from "react-icons/go"
import { aiInsightsData } from "../data/ai-insights-data"

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
  const selectedInsight = selectedAIInsightForDetails
    ? aiInsightsData.find(i => i.id === selectedAIInsightForDetails)
    : null

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

  const handleTakeAction = () => {
    if (setTriggerNewActivity) {
      setTriggerNewActivity(true)
    }
    setSelectedAIInsightForDetails(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[90vh] flex flex-col p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">
          {selectedInsight ? 'AI Insight Details' : 'AI Insights'}
        </DialogTitle>

        {selectedInsight ? (
          // Details view
          <div className="flex flex-col h-full">
            <div className={`p-6 border-b ${
              selectedInsight.id === 'insight-1' || selectedInsight.title === 'Productivity' ? 'bg-blue-50' :
              selectedInsight.id === 'insight-2' || selectedInsight.title === 'Compliance' ? 'bg-yellow-50' :
              selectedInsight.id === 'insight-3' || selectedInsight.title === 'Weather' ? 'bg-green-50' :
              selectedInsight.title === 'Predictive Risk Forecast' ? 'bg-purple-50' :
              selectedInsight.title === 'Opportunity Alert' ? 'bg-blue-100' :
              selectedInsight.title === 'Financial Insight' ? 'bg-orange-50' :
              selectedInsight.title === 'Traceability Gap Detection' ? 'bg-red-50' :
              selectedInsight.title === 'Stakeholder Engagement Update' ? 'bg-teal-50' :
              selectedInsight.title === 'Sustainability Metric' ? 'bg-green-100' :
              selectedInsight.title === 'Market Trend Analysis' ? 'bg-indigo-50' :
              'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedAIInsightForDetails(null)}
                  className="shrink-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${getInsightColor(selectedInsight.id, selectedInsight.title).replace('bg-', 'bg-').replace('-500', '-100').replace('-400', '-100').replace('-800', '-100')} rounded-lg flex items-center justify-center`}>
                    <CheckCircle className={`h-5 w-5 ${getInsightColor(selectedInsight.id, selectedInsight.title).replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedInsight.title}
                    </h2>
                    <p className="text-sm text-gray-500">{selectedInsight.timestamp}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">AI Analysis</h3>
                  <p className="text-gray-700">
                    {selectedInsight.analysis || selectedInsight.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                  <div className="capitalize text-gray-700">
                    {selectedInsight.category}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Confidence Level</h3>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    selectedInsight.confidence === 'high' ? 'bg-green-50 text-green-700' :
                    selectedInsight.confidence === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {selectedInsight.confidence} confidence
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Impact Assessment</h3>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    selectedInsight.impact === 'high' ? 'bg-red-50 text-red-700' :
                    selectedInsight.impact === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {selectedInsight.impact} impact
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 shrink-0"></div>
                      <span className="text-gray-700">
                        {selectedInsight.recommendedAction || 'Review detailed operational analytics and deployment patterns'}
                      </span>
                    </li>
                    {selectedInsight.trendsIdentified && selectedInsight.trendsIdentified.map((trend, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 shrink-0"></div>
                        <span className="text-gray-700">{trend}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 shrink-0"></div>
                      <span className="text-gray-700">Monitor outcomes and update operational models accordingly</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Data Sources</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInsight.dataSource ? (
                      selectedInsight.dataSource.split(',').map((source, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {source.trim()}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Operational Data</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Production Reports</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Historical Patterns</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Industry Analysis</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedAIInsightForDetails(null)
                  onOpenChange(false)
                }}
              >
                Dismiss
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleTakeAction}
              >
                Take Action
              </Button>
            </div>
          </div>
        ) : (
          // List view
          <div className="flex flex-col h-full min-h-0">
            <div className="p-6 bg-gray-50 relative flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
                  <p className="text-sm text-gray-500 mt-1">{aiInsightsData.length} insights requiring attention</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="group relative">
                    <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                    <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      AI-generated insights and recommendations for KSB operations
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedAIInsightForDetails(null)
                      onOpenChange(false)
                    }}
                    className="shrink-0 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {/* Horizontal divider line at bottom edge of header */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 min-h-0">
              <div className="space-y-3">
                {aiInsightsData.map((insight) => (
                  <div
                    key={insight.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${getHoverBg(insight.id, insight.title)}`}
                    onClick={() => setSelectedAIInsightForDetails(insight.id)}
                  >
                    {/* Icon */}
                    <div className={`w-8 h-8 ${getInsightColor(insight.id, insight.title).replace('bg-', 'bg-').replace('-500', '-100').replace('-400', '-100').replace('-800', '-100')} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <CheckCircle className={`h-4 w-4 ${getInsightColor(insight.id, insight.title).replace('bg-', 'text-')}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-[#202020] truncate">{insight.title}</h4>
                            <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                              insight.confidence === 'high' ? 'bg-green-50/80 text-green-700 border-gray-300' :
                              insight.confidence === 'medium' ? 'bg-yellow-50/80 text-yellow-700 border-gray-300' :
                              'bg-blue-50/80 text-blue-700 border-gray-300'
                            }`}>
                              {insight.confidence}
                            </div>
                          </div>
                          <p className="text-xs text-[#6B6B6B] mb-1">{insight.description}</p>
                          <p className="text-xs text-[#9CA3AF]">{insight.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}