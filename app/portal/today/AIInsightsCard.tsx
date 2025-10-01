"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, ArrowLeft, X } from "lucide-react"
import { GoInfo } from 'react-icons/go'
import { judicialAIInsights } from "@/lib/judicial-mockdata"

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
    if (id === 'insight-1' || title === 'Case Backlog Alert') return 'bg-blue-500'
    if (id === 'insight-2' || title === 'Judgment Patterns') return 'bg-yellow-500'
    if (id === 'insight-3' || title === 'Legal Research') return 'bg-green-400'
    if (title === 'Case Timeline Analysis') return 'bg-purple-500'
    if (title === 'Procedural Recommendation') return 'bg-blue-800'
    if (title === 'Sentencing Analysis') return 'bg-orange-500'
    if (title === 'Citation Opportunity') return 'bg-red-500'
    if (title === 'Witness Pattern Detection') return 'bg-teal-500'
    if (title === 'Electronic Filing Alert') return 'bg-green-800'
    if (title === 'Legal Trend Analysis') return 'bg-indigo-500'
    return 'bg-gray-500'
  }

  // Helper function to get hover background color
  const getHoverBg = (id: string, title: string) => {
    if (id === 'insight-1' || title === 'Case Backlog Alert') return 'hover:bg-blue-50'
    if (id === 'insight-2' || title === 'Judgment Patterns') return 'hover:bg-yellow-50'
    if (id === 'insight-3' || title === 'Legal Research') return 'hover:bg-green-50'
    if (title === 'Case Timeline Analysis') return 'hover:bg-purple-50'
    if (title === 'Procedural Recommendation') return 'hover:bg-blue-100'
    if (title === 'Sentencing Analysis') return 'hover:bg-orange-50'
    if (title === 'Citation Opportunity') return 'hover:bg-red-50'
    if (title === 'Witness Pattern Detection') return 'hover:bg-teal-50'
    if (title === 'Electronic Filing Alert') return 'hover:bg-green-100'
    if (title === 'Legal Trend Analysis') return 'hover:bg-indigo-50'
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
            {judicialAIInsights.map((insight) => (
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
      <Dialog open={viewAllAIInsightsOpen} onOpenChange={setViewAllAIInsightsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {selectedAIInsightForDetails ? 'AI Insight Details' : 'AI Insights'}
          </DialogTitle>
          {(() => {
            if (selectedAIInsightForDetails) {
              const insight = judicialAIInsights.find(i => i.id === selectedAIInsightForDetails)
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
                                {insight.title}
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
                            {insight.category}
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
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Case Management System</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Court Records</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Historical Patterns</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Legal Precedents</span>
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
                      <p className="text-sm text-gray-500 mt-1">{judicialAIInsights.length} insights available</p>
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
                        onClick={() => {
                          setSelectedAIInsightForDetails(null)
                          setViewAllAIInsightsOpen(false)
                        }}
                        className="shrink-0 h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 min-h-0">
                  <div className="space-y-3">
                    {judicialAIInsights.map((insight) => {
                      // Define color mapping based on insight type
                      const getInsightColor = (id: string, title: string) => {
                        if (id === 'insight-1' || title === 'Case Backlog Alert') return 'bg-blue-500'
                        if (id === 'insight-2' || title === 'Judgment Patterns') return 'bg-yellow-500'
                        if (id === 'insight-3' || title === 'Legal Research') return 'bg-green-400'
                        if (title === 'Case Timeline Analysis') return 'bg-purple-500'
                        if (title === 'Procedural Recommendation') return 'bg-blue-800'
                        if (title === 'Sentencing Analysis') return 'bg-orange-500'
                        if (title === 'Citation Opportunity') return 'bg-red-500'
                        if (title === 'Witness Pattern Detection') return 'bg-teal-500'
                        if (title === 'Electronic Filing Alert') return 'bg-green-800'
                        if (title === 'Legal Trend Analysis') return 'bg-indigo-500'
                        return 'bg-gray-500'
                      }

                      // Define hover background colors that match the indicator colors
                      const getHoverBg = (id: string, title: string) => {
                        if (id === 'insight-1' || title === 'Case Backlog Alert') return 'hover:bg-blue-50'
                        if (id === 'insight-2' || title === 'Judgment Patterns') return 'hover:bg-yellow-50'
                        if (id === 'insight-3' || title === 'Legal Research') return 'hover:bg-green-50'
                        if (title === 'Case Timeline Analysis') return 'hover:bg-purple-50'
                        if (title === 'Procedural Recommendation') return 'hover:bg-blue-100'
                        if (title === 'Sentencing Analysis') return 'hover:bg-orange-50'
                        if (title === 'Citation Opportunity') return 'hover:bg-red-50'
                        if (title === 'Witness Pattern Detection') return 'hover:bg-teal-50'
                        if (title === 'Electronic Filing Alert') return 'hover:bg-green-100'
                        if (title === 'Legal Trend Analysis') return 'hover:bg-indigo-50'
                        return 'hover:bg-gray-50'
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
    </>
  )
}
