"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, ArrowLeft, X } from "lucide-react"
import { GoInfo } from 'react-icons/go'
import { allAIInsightsData } from "@/lib/mockdata"

interface AIInsightsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedAIInsightForDetails: string | null
  setSelectedAIInsightForDetails: (id: string | null) => void
  setTriggerNewActivity?: (trigger: boolean) => void
}

export function AIInsightsModal({ 
  open, 
  onOpenChange, 
  selectedAIInsightForDetails, 
  setSelectedAIInsightForDetails,
  setTriggerNewActivity 
}: AIInsightsModalProps) {

  const handleClose = () => {
    setSelectedAIInsightForDetails(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">
          {selectedAIInsightForDetails ? 'AI Insight Details' : 'AI Insights'}
        </DialogTitle>
        {(() => {
          if (selectedAIInsightForDetails) {
            const insight = allAIInsightsData.find(i => i.id === selectedAIInsightForDetails)
            if (insight) {
              return (
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b bg-gray-50">
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
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">
                            {insight.id === 'insight-1' ? 'Productivity' : 
                             insight.id === 'insight-2' ? 'Compliance' : 
                             insight.id === 'insight-3' ? 'Weather' : insight.title}
                          </h2>
                          <p className="text-sm text-gray-500">{insight.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 bg-white">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">AI Analysis</h3>
                        <p className="text-gray-700">{insight.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                        <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                          {insight.id === 'insight-1' ? 'Productivity' : 
                           insight.id === 'insight-2' ? 'Compliance' : 
                           insight.id === 'insight-3' ? 'Weather' : 'Analysis'}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Generated Time</h3>
                        <p className="text-gray-700">{insight.timestamp}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>Review insight analysis and assess relevance</li>
                          <li>Coordinate with relevant teams for implementation</li>
                          <li>Monitor metrics for improvement</li>
                          <li>Update stakeholders on progress</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t bg-gray-50 flex justify-end">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        console.log('Take Action', insight.id)
                        setSelectedAIInsightForDetails(null)
                        onOpenChange(false)
                        if (setTriggerNewActivity) {
                          setTriggerNewActivity(true)
                        }
                      }}
                    >
                      Take Action
                    </Button>
                  </div>
                </div>
              )
            }
          }

          // List view
          return (
            <div className="flex flex-col h-full min-h-0">
              <div className="p-6 border-b bg-gray-50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
                    <p className="text-sm text-gray-500 mt-1">{allAIInsightsData.length} insights available</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="group relative">
                      <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        AI-generated insights and recommendations
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClose}
                      className="shrink-0 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-white min-h-0">
                <div className="space-y-3">
                  {allAIInsightsData.map((insight) => {
                    // Define color mapping based on insight type
                    const getInsightColor = (id: string, title: string) => {
                      if (id === 'insight-1' || title === 'Productivity') return 'bg-blue-500' // Blue for action-oriented travel
                      if (id === 'insight-2' || title === 'Compliance') return 'bg-yellow-500' // Yellow for governance urgency
                      if (id === 'insight-3' || title === 'Weather') return 'bg-green-400' // Light Green for environmental readiness
                      if (title === 'Predictive Risk Forecast') return 'bg-purple-500' // Purple for cautionary projections
                      if (title === 'Opportunity Alert') return 'bg-blue-800' // Dark Blue for growth potentials
                      if (title === 'Financial Insight') return 'bg-orange-500' // Orange for fiscal optimization
                      if (title === 'Traceability Gap Detection') return 'bg-red-500' // Red for supply chain vulnerabilities
                      if (title === 'Stakeholder Engagement Update') return 'bg-teal-500' // Teal for inclusivity metrics
                      if (title === 'Sustainability Metric') return 'bg-green-800' // Dark Green for long-term resilience
                      if (title === 'Market Trend Analysis') return 'bg-indigo-500' // Indigo for external intelligence
                      return 'bg-gray-500' // Default
                    }

                    // Define hover background colors that match the indicator colors
                    const getHoverBg = (id: string, title: string) => {
                      if (id === 'insight-1' || title === 'Productivity') return 'hover:bg-blue-50' // Blue hover
                      if (id === 'insight-2' || title === 'Compliance') return 'hover:bg-yellow-50' // Yellow hover
                      if (id === 'insight-3' || title === 'Weather') return 'hover:bg-green-50' // Light Green hover
                      if (title === 'Predictive Risk Forecast') return 'hover:bg-purple-50' // Purple hover
                      if (title === 'Opportunity Alert') return 'hover:bg-blue-100' // Dark Blue hover
                      if (title === 'Financial Insight') return 'hover:bg-orange-50' // Orange hover
                      if (title === 'Traceability Gap Detection') return 'hover:bg-red-50' // Red hover
                      if (title === 'Stakeholder Engagement Update') return 'hover:bg-teal-50' // Teal hover
                      if (title === 'Sustainability Metric') return 'hover:bg-green-100' // Dark Green hover
                      if (title === 'Market Trend Analysis') return 'hover:bg-indigo-50' // Indigo hover
                      return 'hover:bg-gray-50' // Default
                    }

                    return (
                      <div 
                        key={insight.id}
                        className={`flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer ${getHoverBg(insight.id, insight.title)}`}
                        onClick={() => setSelectedAIInsightForDetails(insight.id)}
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getInsightColor(insight.id, insight.title)}`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{insight.title}</h4>
                              </div>
                              <div className="flex items-end justify-between gap-2">
                                <p className="text-xs text-[#6B6B6B] line-clamp-2 flex-1">{insight.description}</p>
                                <p className="text-xs text-[#9CA3AF] whitespace-nowrap">{insight.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })()}
      </DialogContent>
    </Dialog>
  )
}
