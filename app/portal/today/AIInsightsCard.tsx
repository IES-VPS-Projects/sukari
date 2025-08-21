"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { GoInfo } from 'react-icons/go'
import { allAIInsightsData } from "@/lib/mockdata"

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

  return (
    <>
      <Card className="rounded-[20px] shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#202020] cursor-pointer" onClick={() => {
            setSelectedAIInsightForDetails(null)
            setViewAllAIInsightsOpen(true)
          }}>
            AI Insights
          </CardTitle>
          <CardDescription className="text-[#6B6B6B]">
            Intelligent insights based on current data patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest('button')) {
                setSelectedAIInsightForDetails('insight-1')
                setViewAllAIInsightsOpen(true)
              }
            }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#202020]">Productivity</p>
              <p className="text-xs text-[#6B6B6B]">
                Consider visiting Mumias region – 15% production drop – Requires executive attention for on-site assessments.
              </p>
            </div>
          </div>

          <div 
            className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest('button')) {
                setSelectedAIInsightForDetails('insight-2')
                setViewAllAIInsightsOpen(true)
              }
            }}
          >
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#202020]">Compliance</p>
              <p className="text-xs text-[#6B6B6B]">Recommended policy review – 25% increase in compliance violations this quarter – Update frameworks to align with Sugar Act 2024.</p>
            </div>
          </div>

          <div 
            className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest('button')) {
                setSelectedAIInsightForDetails('insight-3')
                setViewAllAIInsightsOpen(true)
              }
            }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#202020]">Weather</p>
              <p className="text-xs text-[#6B6B6B]">Weather alert preparation – Prepare drought mitigation for Western region based on upcoming forecasts.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Modal */}
      <Dialog open={viewAllAIInsightsOpen} onOpenChange={setViewAllAIInsightsOpen}>
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
                          <div className="capitalize text-gray-700">
                            {insight.id === 'insight-1' ? 'Travel' : 
                             insight.id === 'insight-2' ? 'Governance' : 
                             insight.id === 'insight-3' ? 'Environment' : insight.category}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Confidence Level</h3>
                          <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                            high confidence
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Impact Assessment</h3>
                          <div className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700">
                            high impact
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 shrink-0"></div>
                              <span className="text-gray-700">Review detailed analytics and data patterns</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 shrink-0"></div>
                              <span className="text-gray-700">Validate AI recommendations with domain experts</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 shrink-0"></div>
                              <span className="text-gray-700">Implement suggested improvements where applicable</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 shrink-0"></div>
                              <span className="text-gray-700">Monitor outcomes and update models accordingly</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Data Sources</h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Production Data</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Environmental Sensors</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Historical Patterns</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Market Analysis</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          console.log('Dismiss Insight', insight.id)
                          setSelectedAIInsightForDetails(null)
                          setViewAllAIInsightsOpen(false)
                        }}
                      >
                        Dismiss
                      </Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          console.log('Take Action', insight.id)
                          setSelectedAIInsightForDetails(null)
                          setViewAllAIInsightsOpen(false)
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
                <div className="p-6 border-b bg-white flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
                      <p className="text-sm text-gray-500 mt-1">{allAIInsightsData.length} insights available</p>
                    </div>
                    <div className="group relative">
                      <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        AI-generated insights and recommendations
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 min-h-0">
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
                          className={`flex items-start gap-3 p-4 bg-white rounded-lg border shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer ${getHoverBg(insight.id, insight.title)}`}
                          onClick={() => setSelectedAIInsightForDetails(insight.id)}
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getInsightColor(insight.id, insight.title)}`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm font-medium text-[#202020] truncate">{insight.title}</h4>
                                </div>
                                <p className="text-xs text-[#6B6B6B] mb-1">{insight.description}</p>
                                <div className="flex items-center gap-4">
                                  <p className="text-xs text-[#9CA3AF]">{insight.timestamp}</p>
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
    </>
  )
}
