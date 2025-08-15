"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  Users,
  AlertTriangle,
  FileText,
  ArrowLeft,
  Download,
  Calendar,
  Clock,
  User,
  Star,
  Share,
  MoreHorizontal
} from "lucide-react"
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { GoInfo } from 'react-icons/go'
import { BsBuildings } from 'react-icons/bs'
import { allActionsData } from "@/lib/mockdata"

interface ActionsCardProps {
  selectedItemId: string | null
  setSelectedItemId: (id: string | null) => void
}

const ActionsCard = ({ selectedItemId, setSelectedItemId }: ActionsCardProps) => {
  const [viewAllActionsOpen, setViewAllActionsOpen] = useState(false)
  const [selectedActionForDetails, setSelectedActionForDetails] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [comment, setComment] = useState("")

  const handleItemAction = (action: string, itemId: string) => {
    console.log(`${action} action for item ${itemId}`)
    setSelectedItemId(null)
    
    if (action === 'details') {
      setSelectedActionForDetails(itemId)
      setViewAllActionsOpen(true)
    }
  }

  const handleActionDecision = (decision: string, actionId: string) => {
    console.log(`${decision} decision for action ${actionId}`)
    if (comment.trim()) {
      console.log(`Comment: ${comment}`)
    }
    setSelectedActionForDetails(null)
    setViewAllActionsOpen(false)
    setComment("")
  }

  return (
    <>
      <Card className="rounded-[20px] shadow-lg border-0 bg-white">
        <CardHeader className="pb-1 cursor-pointer" onClick={() => {
          setSelectedActionForDetails(null)
          setViewAllActionsOpen(true)
        }}>
          <CardTitle className="text-[#202020]">Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {/* Actions Content - List of actions requiring approval/votes (limited to 2) */}
          <div className="space-y-3">
            {[
              {
                id: 'action-1',
                title: 'Sugar Import Allocation Approval',
                description: 'Approve allocation of 50,000 MT sugar imports to Tropical Confectioners Limited',
                type: 'approval',
                timestamp: '2 hours ago',
                iconColor: 'text-blue-600',
                iconBg: 'bg-blue-100',
                hoverBg: 'hover:bg-blue-50'
              },
              {
                id: 'action-2', 
                title: 'Cane Pricing Committee Vote',
                description: 'Vote on proposed cane pricing structure for 2024/25 season',
                type: 'vote',
                timestamp: '4 hours ago',
                iconColor: 'text-green-600',
                iconBg: 'bg-green-100',
                hoverBg: 'hover:bg-green-50'
              }
            ].map((item) => (
              <div 
                key={item.id} 
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${item.hoverBg} hover:shadow-md`}
                onClick={(e: React.MouseEvent) => {
                  // Only trigger if not clicking on the ellipsis button
                  if (!(e.target as HTMLElement).closest('.ellipsis-menu')) {
                    setSelectedActionForDetails(item.id)
                    setViewAllActionsOpen(true)
                  }
                }}
              >
                {/* Icon */}
                <div className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {item.type === 'approval' ? (
                    <CheckCircle className={`h-4 w-4 ${item.iconColor}`} />
                  ) : (
                    <Users className={`h-4 w-4 ${item.iconColor}`} />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#202020] mb-1">{item.title}</h4>
                      <p className="text-xs text-[#6B6B6B] mb-1">{item.description}</p>
                      <p className="text-xs text-[#9CA3AF]">{item.timestamp}</p>
                    </div>
                    
                    {/* Options Menu */}
                    <div className="relative ellipsis-menu">
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation() // Prevent triggering the card click
                          setSelectedItemId(selectedItemId === item.id ? null : item.id)
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <HiEllipsisHorizontal className="h-4 w-4 text-gray-400" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {selectedItemId === item.id && (
                        <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-10 w-40">
                          <div className="py-1">
                            {item.type === 'approval' ? (
                              <>
                                <button
                                  onClick={() => handleItemAction('approve', item.id)}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-green-50 text-green-700"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleItemAction('reject', item.id)}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-red-50 text-red-700"
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                  Reject
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleItemAction('vote-yes', item.id)}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-green-50 text-green-700"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                  Vote Yes
                                </button>
                                <button
                                  onClick={() => handleItemAction('vote-no', item.id)}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-red-50 text-red-700"
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                  Vote No
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleItemAction('details', item.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-left hover:bg-gray-50"
                            >
                              <FileText className="h-3 w-3" />
                              View Details
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View All Actions Modal */}
      <Dialog open={viewAllActionsOpen} onOpenChange={() => {
        setViewAllActionsOpen(false)
        setSelectedActionForDetails(null)
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {selectedActionForDetails ? 'Action Details' : 'Actions'}
          </DialogTitle>
          {(() => {
            if (selectedActionForDetails) {
              // First check inline actions data, then fallback to allActionsData
              const inlineActions = [
                {
                  id: 'action-1',
                  title: 'Sugar Import Allocation Approval',
                  description: 'Approve allocation of 50,000 MT sugar imports to Mumias Sugar Company',
                  type: 'approval',
                  timestamp: '2 hours ago',
                  iconColor: 'text-blue-600',
                  iconBg: 'bg-blue-100',
                  hoverBg: 'hover:bg-blue-50'
                },
                {
                  id: 'action-2', 
                  title: 'Cane Pricing Committee Vote',
                  description: 'Vote on proposed cane pricing structure for 2024/25 season',
                  type: 'vote',
                  timestamp: '4 hours ago',
                  iconColor: 'text-green-600',
                  iconBg: 'bg-green-100',
                  hoverBg: 'hover:bg-green-50'
                }
              ]
              
              const action = inlineActions.find(a => a.id === selectedActionForDetails) || 
                           allActionsData.find(a => a.id === selectedActionForDetails)
              
              if (action) {
                return (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b bg-white">
                      <div className="flex items-center gap-3 mb-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedActionForDetails(null)}
                          className="shrink-0"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-12 h-12 ${action.iconBg} rounded-lg flex items-center justify-center`}>
                            {action.type === 'approval' ? (
                              <CheckCircle className={`h-6 w-6 ${action.iconColor}`} />
                            ) : (
                              <Users className={`h-6 w-6 ${action.iconColor}`} />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h1 className="text-xl font-semibold text-gray-900">{action.title}</h1>
                              <Badge className="bg-red-500/10 text-red-700 border border-red-200/30 backdrop-blur-sm">
                                High
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <BsBuildings className="h-4 w-4" />
                              <span>{action.type === 'vote' ? 'Kenya Sugar Board - Policy Committee' : 'Tropical Confectioners Limited'}</span>
                            </div>
                          </div>
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
                        </div>
                      </div>

                      {/* Tabs */}
                      <div className="mt-6">
                        <div className="flex border-b border-gray-200">
                          <button
                            onClick={() => setActiveTab("overview")}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                              activeTab === "overview"
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            Overview
                          </button>
                          <button
                            onClick={() => setActiveTab("documents")}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                              activeTab === "documents"
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            Documents
                          </button>
                          <button
                            onClick={() => setActiveTab("activities")}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                              activeTab === "activities"
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            History
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                      {activeTab === "overview" && (
                        <div className="flex-1 overflow-y-auto p-6">
                          <div className="space-y-6">
                            {/* Summary */}
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 mb-3">Summary</h3>
                              <p className="text-gray-700 leading-relaxed">
                                {action.description} {action.type === 'vote' 
                                  ? 'This committee vote requires your participation to establish the new pricing framework. Your vote will contribute to determining the sugar cane pricing structure for the upcoming harvest season.'
                                  : 'This proposal requires your review and approval to proceed with the sugar import allocation. The allocation will help stabilize local sugar prices and ensure adequate supply for the domestic market during the upcoming season.'
                                }
                              </p>
                            </div>

                            {/* Key Details - Different for votes vs approvals */}
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 mb-3">Key Details</h3>
                              {action.type === 'vote' ? (
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Meeting Date:</span>
                                      <span className="text-sm font-medium">August 20, 2025</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Meeting Duration:</span>
                                      <span className="text-sm font-medium">2 hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Meeting Type:</span>
                                      <span className="text-sm font-medium">Committee Vote</span>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Members Present:</span>
                                      <span className="text-sm font-medium">8 of 10</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Members Absent:</span>
                                      <span className="text-sm font-medium">2</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Quorum Status:</span>
                                      <span className="text-sm font-medium text-green-600">Met</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Quantity Requested:</span>
                                      <span className="text-sm font-medium">50,000 MT</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Quantity Approved:</span>
                                      <span className="text-sm font-medium">45,000 MT</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Source Country:</span>
                                      <span className="text-sm font-medium">Brazil</span>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Delivery Timeline:</span>
                                      <span className="text-sm font-medium">Q4 2025</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Port of Entry:</span>
                                      <span className="text-sm font-medium">Mombasa</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-500">Compliance Status:</span>
                                      <span className="text-sm font-medium text-green-600">Verified</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Status Information */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="text-center">
                                  <div className="text-xs text-gray-500 uppercase tracking-wide">CREATE DATE</div>
                                  <div className="text-sm font-medium text-gray-900 mt-1">15 Sep, 2021</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs text-gray-500 uppercase tracking-wide">DUE DATE</div>
                                  <div className="text-sm font-medium text-gray-900 mt-1">29 Dec, 2021</div>
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

                      {activeTab === "documents" && (
                        <div className="flex-1 overflow-y-auto p-6">
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
                                        <div className="text-sm font-medium">Meeting Minutes</div>
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
                                        <div className="text-sm font-medium">Sugar Act 2024</div>
                                        <div className="text-xs text-gray-500">PDF File • 3.2MB</div>
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
                                        <div className="text-sm font-medium">Financial Impact Assessment</div>
                                        <div className="text-xs text-gray-500">XLSX File • 892KB</div>
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
                                        <div className="text-sm font-medium">Pricing Proposal Framework</div>
                                        <div className="text-xs text-gray-500">PDF File • 1.5MB</div>
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
                                        <div className="text-sm font-medium">Import License Application</div>
                                        <div className="text-xs text-gray-500">PDF File • 2.4MB</div>
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
                                        <div className="text-sm font-medium">Financial Impact Assessment</div>
                                        <div className="text-xs text-gray-500">XLS File • 892KB</div>
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
                                        <div className="text-sm font-medium">Compliance Documentation</div>
                                        <div className="text-xs text-gray-500">ZIP File • 5.7MB</div>
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
                                        <div className="text-sm font-medium">Legal Agreement Draft</div>
                                        <div className="text-xs text-gray-500">DOC File • 1.8MB</div>
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
                                        <div className="text-sm font-medium">Budget Breakdown</div>
                                        <div className="text-xs text-gray-500">CSV File • 45KB</div>
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
                                        <div className="text-sm font-medium">Market Analysis Report</div>
                                        <div className="text-xs text-gray-500">PDF File • 1.2MB</div>
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

                      {activeTab === "activities" && (
                        <div className="h-[350px] overflow-y-auto scrollbar-hide p-6">
                          <div className="space-y-8">
                            {action.type === 'vote' ? (
                              // Voting History
                              <>
                                {/* Q4 - 2024 */}
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Committee Activities</h3>
                                  
                                  {/* Previous Vote Sessions */}
                                  <div className="mb-6">
                                    <div className="flex items-start gap-3 mb-4">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-sm font-medium text-gray-900">Previous Pricing Committee Vote</span>
                                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Passed</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">
                                          Committee voted on wholesale sugar pricing for Q4 2024. Motion passed with 6 out of 7 votes.
                                        </p>
                                        
                                        {/* Voting Results */}
                                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                          <div className="text-xs font-medium text-gray-700 mb-2">Vote Results:</div>
                                          <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex justify-between">
                                              <span>Yes:</span>
                                              <span className="text-green-600 font-medium">6 votes</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>No:</span>
                                              <span className="text-red-600 font-medium">1 vote</span>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <span className="text-xs text-gray-500">November 15, 2024</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Committee Formation */}
                                  <div className="mb-6">
                                    <div className="flex items-start gap-3">
                                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-sm font-medium text-gray-900">Committee Members Appointed</span>
                                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                          Pricing Committee officially formed with 7 members from various stakeholder organizations.
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
                                                MW
                                              </div>
                                              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                                PK
                                              </div>
                                              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                                +3
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <span className="text-xs text-gray-500">October 8, 2024</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Policy Framework */}
                                  <div className="mb-6">
                                    <div className="flex items-start gap-3">
                                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-sm font-medium text-gray-900">Pricing Framework Review</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                          Comprehensive review of current sugar pricing mechanisms initiated. Framework updates proposed.
                                        </p>
                                        <div className="text-xs text-gray-500 space-y-1">
                                          <div>Review Period: Aug - Sep 2024</div>
                                          <div>Stakeholder Consultations: 12</div>
                                          <div>Market Impact Assessment: Completed</div>
                                        </div>
                                        <span className="text-xs text-gray-500">September 20, 2024</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              // Approval History
                              <>
                                {/* Q4 - 2024 */}
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Q4 - 2024</h3>
                                  
                                  {/* Import Allocation Committee Meeting */}
                                  <div className="mb-6">
                                    <div className="flex items-start gap-3 mb-4">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-sm font-medium text-gray-900">Import Allocation Committee Meeting</span>
                                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Completed</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">
                                          Committee reviewed Tropical Confectioners Limited's request for 15,000 MT brown sugar import allocation. 
                                          Discussion covered market demand, company capacity, and compliance history.
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
                                                MW
                                              </div>
                                              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                                PK
                                              </div>
                                              <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                                +2
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* Voting Results */}
                                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                          <div className="text-xs font-medium text-gray-700 mb-2">Committee Votes:</div>
                                          <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex justify-between">
                                              <span>Approve:</span>
                                              <span className="text-green-600 font-medium">5 votes</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Reject:</span>
                                              <span className="text-red-600 font-medium">1 vote</span>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <span className="text-xs text-gray-500">December 8, 2024</span>
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
                                          Tropical Confectioners Limited submitted application for 15,000 MT brown sugar import allocation for Q1 2025.
                                        </p>
                                        <div className="text-xs text-gray-500 space-y-1">
                                          <div>Requested Quantity: 15,000 MT</div>
                                          <div>Source: Thailand</div>
                                          <div>Estimated Value: KES 750M</div>
                                        </div>
                                        <span className="text-xs text-gray-500">November 22, 2024</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Utilization Report */}
                                  <div className="mb-6">
                                    <div className="flex items-start gap-3">
                                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-sm font-medium text-gray-900">Import Utilization Report</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                          Previous allocation of 12,000 MT (Q3 2024) fully utilized. Strong sales performance recorded.
                                        </p>
                                        <div className="text-xs text-gray-500 space-y-1">
                                          <div>Allocated: 12,000 MT</div>
                                          <div>Utilized: 12,000 MT (100%)</div>
                                          <div>Sales Period: Aug - Oct 2024</div>
                                        </div>
                                        <span className="text-xs text-gray-500">October 30, 2024</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Comments Section & Action Buttons */}
                    <div className="border-t bg-gray-50 p-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-900 mb-2 block">
                            Leave a Comment
                          </label>
                          <Textarea
                            placeholder="Enter your comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="flex justify-end gap-3">
                          {action.type === 'vote' ? (
                            // Vote buttons
                            <>
                              <Button 
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleActionDecision('vote_no', action.id)}
                              >
                                Vote No
                              </Button>
                              <Button 
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleActionDecision('vote_yes', action.id)}
                              >
                                Vote Yes
                              </Button>
                            </>
                          ) : (
                            // Approval buttons
                            <>
                              <Button 
                                variant="outline"
                                className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                                onClick={() => handleActionDecision('defer', action.id)}
                              >
                                Defer
                              </Button>
                              <Button 
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleActionDecision('reject', action.id)}
                              >
                                Reject
                              </Button>
                              <Button 
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleActionDecision('approve', action.id)}
                              >
                                Approve
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                )
              }
            }

            // List view
            return (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Actions</h2>
                      <p className="text-sm text-gray-500 mt-1">{allActionsData.length} actions requiring attention</p>
                    </div>
                    <div className="group relative">
                      <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        List of actions requiring approval or voting decisions
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {allActionsData.map((action) => (
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
                                  action.type === 'approval' ? 'bg-blue-50/80 text-blue-700 border-gray-300' :
                                  'bg-green-50/80 text-green-700 border-gray-300'
                                }`}>
                                  {action.type === 'approval' ? 'Approval' : 'Vote'}
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
            )
          })()}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ActionsCard
