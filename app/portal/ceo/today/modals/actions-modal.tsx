"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  Star, 
  Share, 
  MoreHorizontal, 
  FileText, 
  Download 
} from "lucide-react"
import { BsBuildings } from "react-icons/bs"
import { GoInfo } from "react-icons/go"
import { X } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { actionsData } from "../data/actions-data"
import { MillRegistrationForm } from "../components/MillRegistrationForm"

interface Action {
  id: string
  title: string
  description: string
  type: 'approval' | 'vote'
  timestamp: string
  iconColor: string
  iconBg: string
  hoverBg: string
  priority?: string
  status?: string
}

interface ActionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedActionId?: string | null
}

export function ActionsModal({ open, onOpenChange, selectedActionId }: ActionsModalProps) {
  const [selectedActionForDetails, setSelectedActionForDetails] = useState<string | null>(selectedActionId || null)
  const [actionActiveTab, setActionActiveTab] = useState("overview")
  const [comment, setComment] = useState("")
  const isMobile = useIsMobile()
  
  const handleActionDecision = (decision: string, actionId: string) => {
    console.log(`${decision} action ${actionId} with comment: ${comment}`)
    // Handle the decision logic here
    onOpenChange(false)
  }
  
  if (!selectedActionForDetails) {
    // List view
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`${isMobile ? 'max-w-full h-screen max-h-screen m-0 rounded-none overflow-hidden' : 'max-w-4xl max-h-[90vh]'} p-0 [&>button]:hidden`}>
          <DialogTitle className="sr-only">Actions</DialogTitle>
          <div className={`flex flex-col h-full ${isMobile ? 'overflow-hidden' : ''}`}>
            <div className={`${isMobile ? 'p-4 flex-shrink-0' : 'p-6'} bg-gray-50`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-gray-900`}>Actions</h2>
                  <p className="text-sm text-gray-500 mt-1">{actionsData.length} actions requiring attention</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="group relative">
                    <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                    <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      List of sugar industry actions requiring board decisions
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpenChange(false)}
                    className="shrink-0 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className={`flex-1 ${isMobile ? 'overflow-y-auto overflow-x-hidden px-4 py-4' : 'overflow-y-auto p-6'}`}>
              <div className="space-y-3">
                {actionsData.map((action) => (
                  <div 
                    key={action.id}
                    className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                    onClick={() => setSelectedActionForDetails(action.id)}
                  >
                    {/* Icon */}
                    <div className={`w-8 h-8 ${action.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {action.type === 'approval' ? (
                        <CheckCircle className={`h-4 w-4 ${action.iconColor}`} />
                      ) : (
                        <Users className={`h-4 w-4 ${action.iconColor}`} />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-[#202020] truncate">{action.title}</h4>
                            <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${
                              action.id === 'action-1' ? 'bg-orange-50/80 text-orange-700 border-gray-300' :
                              action.type === 'approval' ? 'bg-blue-50/80 text-blue-700 border-gray-300' :
                              'bg-green-50/80 text-green-700 border-gray-300'
                            }`}>
                              {action.id === 'action-1' ? 'Review' : action.type === 'approval' ? 'Approval' : 'Vote'}
                            </div>
                          </div>
                          <p className="text-xs text-[#6B6B6B] mb-1">{action.description}</p>
                          <p className="text-xs text-[#9CA3AF]">{action.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Details view - Get action details
  const action = actionsData.find(a => a.id === selectedActionForDetails)
  
  if (!action) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'max-w-full h-screen max-h-screen m-0 rounded-none' : 'max-w-4xl max-h-[90vh]'} flex flex-col p-0 [&>button]:hidden`}>
        <DialogTitle className="sr-only">Action Details</DialogTitle>
        <div className={`flex flex-col h-full min-h-0`}> 
          {/* Header */}
          <div className={`${isMobile ? 'p-4' : 'p-6'} ${action.id === 'action-1' ? 'bg-orange-50' : 'bg-gray-50'} flex-shrink-0`}>
            <div className="flex items-center gap-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedActionForDetails(null)}
                className="shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} ${action.iconBg} rounded-lg flex items-center justify-center`}>
                  {action.type === 'approval' ? (
                    <CheckCircle className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} ${action.iconColor}`} />
                  ) : (
                    <Users className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} ${action.iconColor}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-gray-900 truncate`}>{action.title}</h1>
                    <Badge className={`${action.id === 'action-1' ? 'bg-orange-500/10 text-orange-700 border border-orange-200/30' : 'bg-red-500/10 text-red-700 border border-red-200/30'} backdrop-blur-sm shrink-0`} style={action.id === 'action-1' ? { backgroundColor: '#f97316', color: 'white' } : {}}>
                      {action.id === 'action-1' ? 'Review' : 'High'}
                    </Badge>
                  </div>
                  {action.id === 'action-1' ? (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BsBuildings className="h-4 w-4 shrink-0" />
                      <span className="truncate">Mumias Sugar Mills Ltd</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BsBuildings className="h-4 w-4 shrink-0" />
                      <span className="truncate">{action.type === 'vote' ? 'Kenya Sugar Board - Policy Committee' : 'Sugar Industry Regulatory Division'}</span>
                    </div>
                  )}
                </div>
                {!isMobile && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs - Only show for non-mill registration actions */}
            {action.id !== 'action-1' && (
              <div className={`${isMobile ? 'mt-4' : 'mt-6'}`}>
                <div className="flex border-b border-gray-200 overflow-x-auto">
                  <button
                    onClick={() => setActionActiveTab("overview")}
                    className={`${isMobile ? 'px-3 py-2' : 'px-4 py-2'} text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      actionActiveTab === "overview"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActionActiveTab("documents")}
                    className={`${isMobile ? 'px-3 py-2' : 'px-4 py-2'} text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      actionActiveTab === "documents"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Documents
                  </button>
                  <button
                    onClick={() => setActionActiveTab("activities")}
                    className={`${isMobile ? 'px-3 py-2' : 'px-4 py-2'} text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      actionActiveTab === "activities"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    History
                  </button>
                </div>
              </div>
            )}
          </div>

            {/* Horizontal line for mill registration */}
            {action.id === 'action-1' && (
              <div className="h-px bg-gray-300" />
            )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {/* Mill Registration Form or Tab Content */}
            {action.id === 'action-1' ? (
              // Mill Registration Application Form - Always shown, no tabs
              <div className={`${isMobile ? 'px-4 py-4' : 'p-6'}`}>
                <MillRegistrationForm
                  onAssignFieldCoordinator={(coordinatorId, notes) => {
                    console.log(`Assigning coordinator ${coordinatorId} with notes: ${notes}`)
                    // Handle field coordinator assignment
                    onOpenChange(false)
                  }}
                  onDeny={(reason) => {
                    console.log(`Denying mill registration: ${reason}`)
                    // Handle denial
                    onOpenChange(false)
                  }}
                />
              </div>
            ) : (
              // Tab-based content for other actions
              <>
                {actionActiveTab === "overview" && (
                  <div className={`flex-1 ${isMobile ? 'overflow-y-auto overflow-x-hidden px-4 py-4' : 'overflow-y-auto p-6'}`}>
                    // Default action view
                    <div className="space-y-6">
                    {/* Summary */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Summary</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {action.description} {action.type === 'vote'
                          ? 'This board committee vote requires your participation to establish the new sugar industry framework. Your vote will contribute to determining the policy structure for the upcoming implementation period.'
                          : 'This proposal requires your review and approval to proceed with the sugar industry regulation. The approval will enhance sector oversight and ensure adequate regulatory coverage for the region during the upcoming operational period.'
                        }
                      </p>
                    </div>

                  {/* Key Details - Different for votes vs approvals */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Key Details</h3>
                    {action.type === 'vote' ? (
                      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Meeting Date:</span>
                            <span className="text-sm font-medium">February 15, 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Meeting Duration:</span>
                            <span className="text-sm font-medium">2.5 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Meeting Type:</span>
                            <span className="text-sm font-medium">Board Committee Vote</span>
                          </div>
                        </div>
                        {!isMobile && (
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Members Present:</span>
                              <span className="text-sm font-medium">9 of 12</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Members Absent:</span>
                              <span className="text-sm font-medium">3</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Quorum Status:</span>
                              <span className="text-sm font-medium text-green-600">Met</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Sugar Volume Requested:</span>
                            <span className="text-sm font-medium">50,000 MT</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Allocated Volume:</span>
                            <span className="text-sm font-medium">45,000 MT</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Beneficiary Company:</span>
                            <span className="text-sm font-medium">Mumias Sugar Co.</span>
                          </div>
                        </div>
                        {!isMobile && (
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Allocation Period:</span>
                              <span className="text-sm font-medium">6 months</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Mill Status:</span>
                              <span className="text-sm font-medium">Operational</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Compliance Status:</span>
                              <span className="text-sm font-medium text-green-600">Good Standing</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Status Information */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">CREATE DATE</div>
                        <div className="text-sm font-medium text-gray-900 mt-1">20 Feb, 2025</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">DUE DATE</div>
                        <div className="text-sm font-medium text-gray-900 mt-1">05 Mar, 2025</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">PRIORITY</div>
                        <div className="mt-1">
                          <Badge className="bg-red-500 text-white">High</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                )}

                {actionActiveTab === "documents" && (
              <div className={`flex-1 ${isMobile ? 'overflow-y-auto overflow-x-hidden px-4 py-4' : 'overflow-y-auto p-6'}`}>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Resources</h3>
                  
                  {/* Documents List - Different for votes vs approvals */}
                  <div className="space-y-3">
                    {action.type === 'vote' ? (
                      <>
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Cane Pricing Committee Minutes</div>
                              <div className="text-xs text-gray-500">DOC File • 1.8MB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Sugar Act 2022</div>
                              <div className="text-xs text-gray-500">PDF File • 3.5MB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Market Impact Assessment</div>
                              <div className="text-xs text-gray-500">XLSX File • 950KB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Pricing Framework Proposal</div>
                              <div className="text-xs text-gray-500">PDF File • 2.2MB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Import Allocation Request</div>
                              <div className="text-xs text-gray-500">PDF File • 2.8MB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Supply Chain Assessment</div>
                              <div className="text-xs text-gray-500">XLS File • 1.2MB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Financial Impact Analysis</div>
                              <div className="text-xs text-gray-500">ZIP File • 6.1MB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Regulatory Compliance Report</div>
                              <div className="text-xs text-gray-500">DOC File • 1.9MB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Import Quota Calculations</div>
                              <div className="text-xs text-gray-500">CSV File • 234KB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                              <FileText className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">Market Intelligence Brief</div>
                              <div className="text-xs text-gray-500">PDF File • 4.1MB</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

                {actionActiveTab === "activities" && (
              <div className={`${isMobile ? 'flex-1 overflow-y-auto overflow-x-hidden px-4 py-4' : 'h-[350px] overflow-y-auto scrollbar-hide p-6'}`}>
                <div className="space-y-8">
                  {action.type === 'vote' ? (
                    // Voting History for Sugar Industry
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Board Activities</h3>
                        
                        {/* Previous Vote Sessions */}
                        <div className="mb-6">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-900">Previous Cane Pricing Review</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Approved</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Board committee reviewed regional cane pricing framework. Proposal approved with 8 out of 9 votes.
                              </p>
                              
                              {/* Voting Results */}
                              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <div className="text-xs font-medium text-gray-700 mb-2">Vote Results:</div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="flex justify-between">
                                    <span>Approve:</span>
                                    <span className="text-green-600 font-medium">8 votes</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Reject:</span>
                                    <span className="text-red-600 font-medium">1 vote</span>
                                  </div>
                                </div>
                              </div>
                              
                              <span className="text-xs text-gray-500">January 18, 2025</span>
                            </div>
                          </div>
                        </div>

                        {/* Committee Formation */}
                        <div className="mb-6">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-900">Pricing Committee Formed</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Policy Committee officially established with 9 senior officials from KSB departments.
                              </p>
                              
                              {/* Committee Members */}
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs text-gray-500">Committee Members:</span>
                                <div className="flex items-center">
                                  <div className="flex -space-x-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      JM
                                    </div>
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      SK
                                    </div>
                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      PW
                                    </div>
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      EM
                                    </div>
                                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      +5
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <span className="text-xs text-gray-500">December 10, 2024</span>
                            </div>
                          </div>
                        </div>

                        {/* Strategic Framework */}
                        <div className="mb-6">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-900">Policy Framework Review</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Comprehensive review of current sugar industry policies initiated. Strategic updates proposed for market regulation.
                              </p>
                              <div className="text-xs text-gray-500 space-y-1">
                                <div>Review Period: Nov - Dec 2024</div>
                                <div>Stakeholder Consultations: 12</div>
                                <div>Industry Impact Assessment: Completed</div>
                              </div>
                              <span className="text-xs text-gray-500">November 22, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Approval History for Sugar Industry
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Q1 - 2025</h3>
                        
                        {/* Import Committee Meeting */}
                        <div className="mb-6">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-900">Import Allocation Committee</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Completed</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Board reviewed Mumias Sugar Company's import request for 50,000 MT allocation. 
                                Discussion covered market demand, local production capacity, and regulatory compliance.
                              </p>
                              
                              {/* Meeting Attendees */}
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs text-gray-500">Meeting Attendees:</span>
                                <div className="flex items-center">
                                  <div className="flex -space-x-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      JM
                                    </div>
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      SK
                                    </div>
                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      PW
                                    </div>
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      EM
                                    </div>
                                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                      +4
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Board Decision */}
                              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <div className="text-xs font-medium text-gray-700 mb-2">Board Decision:</div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="flex justify-between">
                                    <span>Approve:</span>
                                    <span className="text-green-600 font-medium">7 votes</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Defer:</span>
                                    <span className="text-orange-600 font-medium">1 vote</span>
                                  </div>
                                </div>
                              </div>
                              
                              <span className="text-xs text-gray-500">February 8, 2025</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Previous Import Request */}
                        <div className="mb-6">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-900">Import Request Submitted</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">New</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Mumias Sugar Company submitted import allocation request for Q1 2025 operations.
                              </p>
                              <div className="text-xs text-gray-500 space-y-1">
                                <div>Requested Volume: 50,000 MT</div>
                                <div>Supply Period: 6 months</div>
                                <div>Estimated Value: KES 4.2B</div>
                              </div>
                              <span className="text-xs text-gray-500">February 1, 2025</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Compliance Assessment */}
                        <div className="mb-6">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-gray-900">Company Compliance Review</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Previous compliance assessment (Q4 2024) showed 95% regulatory adherence. Good standing maintained.
                              </p>
                              <div className="text-xs text-gray-500 space-y-1">
                                <div>Compliance Score: 95%</div>
                                <div>License Status: Valid</div>
                                <div>Last Inspection: December 2024</div>
                              </div>
                              <span className="text-xs text-gray-500">January 15, 2025</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

                {/* Comments Section & Action Buttons - Only for non-mill registration actions */}
                {action.id !== 'action-1' && (
                  <div className={`border-t bg-gray-50 flex-shrink-0 ${isMobile ? 'p-4' : 'p-6'}`}>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-900 mb-2 block">
                          Leave a Comment
                        </label>
                        <Textarea
                          placeholder="Enter your decision rationale..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={3}
                          className={`w-full ${isMobile ? 'text-sm' : ''}`}
                        />
                      </div>

                      <div className={`flex ${isMobile ? 'flex-col gap-2' : 'justify-end'} gap-3`}>
                        {action.type === 'vote' ? (
                          // Board vote buttons
                          <>
                            <Button
                              variant="outline"
                              className={`text-red-600 border-red-200 hover:bg-red-50 ${isMobile ? 'w-full' : ''}`}
                              onClick={() => handleActionDecision('reject', action.id)}
                            >
                              Vote No
                            </Button>
                            <Button
                              className={`bg-green-600 hover:bg-green-700 text-white ${isMobile ? 'w-full' : ''}`}
                              onClick={() => handleActionDecision('approve', action.id)}
                            >
                              Vote Yes
                            </Button>
                          </>
                        ) : (
                          // Approval buttons
                          <>
                            <Button
                              variant="outline"
                              className={`text-yellow-600 border-yellow-200 hover:bg-yellow-50 ${isMobile ? 'w-full' : ''}`}
                              onClick={() => handleActionDecision('defer', action.id)}
                            >
                              Defer
                            </Button>
                            <Button
                              variant="outline"
                              className={`text-red-600 border-red-200 hover:bg-red-50 ${isMobile ? 'w-full' : ''}`}
                              onClick={() => handleActionDecision('reject', action.id)}
                            >
                              Reject
                            </Button>
                            <Button
                              className={`bg-green-600 hover:bg-green-700 text-white ${isMobile ? 'w-full' : ''}`}
                              onClick={() => handleActionDecision('approve', action.id)}
                            >
                              Approve
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}