"use client"

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
import { useMemo, useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useUpdateTaskStatus, useCompleteTask, useRejectTask, useAssignTask } from "@/hooks/use-workflow-tasks"
import { useDepartmentUsers } from "@/hooks/use-ksb-users"
import { useCurrentUser } from "@/hooks/use-auth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { TaskHistory } from "@/components/task-history"
import LicenseApplicationData from "./license-application-data"

interface Action {
  id: string
  title: string
  description: string
  type: 'approval' | 'vote' | string
  timestamp: string
  iconColor: string
  iconBg: string
  hoverBg: string
  priority?: string
  status?: string
  dueDate?: string
  departmentName?: string
  originalTask?: any
}

interface ActionDetailsModalProps {
  action: Action
  onClose: () => void
  onActionDecision: (decision: string, actionId: string) => void
}

export function ActionDetailsModal({ action, onClose, onActionDecision }: ActionDetailsModalProps) {
  const [actionActiveTab, setActionActiveTab] = useState("overview")
  const [comment, setComment] = useState("")
  const [selectedAssignee, setSelectedAssignee] = useState("")
  const isMobile = useIsMobile()
  const { toast } = useToast()
  
  const updateStatusMutation = useUpdateTaskStatus()
  const completeTaskMutation = useCompleteTask()
  const rejectTaskMutation = useRejectTask()
  const assignTaskMutation = useAssignTask()
  const currentUserQuery = useCurrentUser()

  // Derive workflow task and department for HOD assignment
  const originalTask: any | null = useMemo(() => ('originalTask' in action ? (action as any).originalTask : null), [action])
  const departmentId: string | undefined = useMemo(() => originalTask?.departmentId || originalTask?.task?.departmentId, [originalTask])
  const { data: deptUsers, isLoading: deptUsersLoading } = useDepartmentUsers(departmentId)

  // Pre-fill assignee with current task assignee when present
  const currentAssigneeId: string | undefined = useMemo(() => originalTask?.task?.assignedTo, [originalTask])
  useEffect(() => {
    if (currentAssigneeId) {
      setSelectedAssignee(currentAssigneeId)
    }
  }, [currentAssigneeId])

  const handleActionDecision = (decision: string, actionId: string) => {
    onActionDecision(decision, actionId)
  }

  return (
    <div className={`flex flex-col h-full ${isMobile ? 'overflow-hidden' : ''}`}>
      {/* Header */}
      <div className={`${isMobile ? 'p-4 flex-shrink-0' : 'p-6'} bg-gray-50`}>
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
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
                <Badge className={`shrink-0 ${
                  'priority' in action && action.priority 
                    ? (action.priority === 'HIGH' || action.priority === 'URGENT' 
                        ? 'bg-red-500/10 text-red-700 border border-red-200/30' 
                        : action.priority === 'MEDIUM'
                        ? 'bg-yellow-500/10 text-yellow-700 border border-yellow-200/30'
                        : 'bg-gray-500/10 text-gray-700 border border-gray-200/30')
                    : 'bg-red-500/10 text-red-700 border border-red-200/30'
                } backdrop-blur-sm`}>
                  {'priority' in action && action.priority ? action.priority : 'High'}
                </Badge>
              </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                <BsBuildings className="h-4 w-4 shrink-0" />
                <span className="truncate">
                  {'departmentName' in action && action.departmentName 
                    ? action.departmentName 
                    : (action.type === 'vote' ? 'Kenya Sugar Board - Policy Committee' : 'Sugar Industry Regulatory Division')
                  }
                </span>
              </div>
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

        {/* Tabs */}
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
      </div>

      {/* Content */}
      <div className={`flex-1 ${isMobile ? 'overflow-hidden flex flex-col min-h-0' : 'overflow-hidden flex flex-col'}`}>
        {actionActiveTab === "overview" && (
          <div className={`flex-1 ${isMobile ? 'overflow-y-auto overflow-x-hidden px-4 py-4' : 'overflow-y-auto p-6'} scrollbar-thin modal-scroll`}>
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Summary</h3>
                <p className="text-gray-700 leading-relaxed">
                    {(() => {
                      // Get the original task data if available
                      const originalTask = 'originalTask' in action ? action.originalTask : null
                      if (originalTask) {
                        return originalTask.task.description
                      }
                      // Fallback to display task description
                      return action.description
                    })()}
                </p>
              </div>

              {/* Key Details - Show real workflow task data */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Key Details</h3>
                {(() => {
                  const originalTask = 'originalTask' in action ? action.originalTask : null
                  if (originalTask) {
                    // Show real workflow task data
                    return (
                      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Task Type:</span>
                            <span className="text-sm font-medium">{originalTask.task.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Current Status:</span>
                            <span className="text-sm font-medium">{originalTask.task.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Department:</span>
                            <span className="text-sm font-medium">{originalTask.task.data.departmentName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Assignment Method:</span>
                            <span className="text-sm font-medium">{originalTask.task.data.assignmentMethod}</span>
                          </div>
                        </div>
                        {!isMobile && (
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Instance ID:</span>
                              <span className="text-xs font-medium font-mono">{originalTask.task.instanceId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Step ID:</span>
                              <span className="text-xs font-medium font-mono">{originalTask.task.stepId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Workflow Template:</span>
                              <span className="text-sm font-medium">{originalTask.task.step.instance.template.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">License Type:</span>
                              <span className="text-sm font-medium">{originalTask.task.step.instance.template.licenseType}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  } else {
                    // Fallback to mock data for non-workflow tasks
                    return action.type === 'vote' ? (
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
                    )
                  }
                })()}
              </div>

              {/* Application Data - Show real application data if available */}
              {(() => {
                const originalTask = 'originalTask' in action ? action.originalTask : null
                if (originalTask && originalTask.task.step.instance.data.applicationData) {
                  return (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Application Data </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-3'}`}>
                          {Object.entries(originalTask.task.step.instance.data.applicationData).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-sm text-gray-500">{key}:</span>
                              <span className="text-sm font-medium">{String(value)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">License Application ID:</span>
                            <span className="text-sm font-medium">{originalTask.task.step.instance.licenseApplicationId}</span>
                          </div>
                        </div>
                      </div>
                      <LicenseApplicationData 
                        licenseApplicationId={originalTask.task.step.instance.licenseApplicationId}
                        conditions={originalTask.task.step.data.conditions}
                      />
 
                       
                    </div>
                  )
                }
                return null
              })()}

              {/* Status Information */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">CREATE DATE</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">
                      {'originalTask' in action && action.originalTask 
                        ? new Date(action.originalTask.createdAt).toLocaleDateString()
                        : '20 Feb, 2025'
                      }
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">DUE DATE</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">
                      {'dueDate' in action && action.dueDate 
                        ? new Date(action.dueDate).toLocaleDateString()
                        : '05 Mar, 2025'
                      }
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">PRIORITY</div>
                    <div className="mt-1">
                      <Badge className={`${
                        'priority' in action && action.priority 
                          ? (action.priority === 'HIGH' || action.priority === 'URGENT' 
                              ? 'bg-red-500 text-white' 
                              : action.priority === 'MEDIUM'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-gray-500 text-white')
                          : 'bg-red-500 text-white'
                      }`}>
                        {'priority' in action && action.priority ? action.priority : 'High'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {actionActiveTab === "documents" && (
          <div className={`flex-1 ${isMobile ? 'overflow-y-auto overflow-x-hidden px-4 py-4' : 'overflow-y-auto p-6'} scrollbar-thin modal-scroll`}>
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
          <div className={`${isMobile ? 'flex-1 overflow-y-auto overflow-x-hidden px-4 py-4' : 'h-[350px] overflow-y-auto p-6'} scrollbar-thin modal-scroll`}>
            <TaskHistory 
              taskId={action.id}
              className="border-0 shadow-none"
              events={(() => {
                // Generate real task history from workflow task data if available
                const originalTask = 'originalTask' in action ? action.originalTask : null
                if (originalTask) {
                  const events: any[] = [
                    {
                      id: "1",
                      type: "created",
                      timestamp: originalTask.createdAt,
                      userId: "system",
                      userName: "System",
                      description: "Task created and assigned to department",
                      metadata: {
                        toStatus: "PENDING"
                      }
                    }
                  ]
                  
                  if (originalTask.task.startedAt) {
                    events.push({
                      id: "2",
                      type: "started",
                      timestamp: originalTask.task.startedAt,
                      userId: "user",
                      userName: "User",
                      description: "Task started",
                      metadata: {
                        fromStatus: "PENDING",
                        toStatus: "IN_PROGRESS"
                      }
                    })
                  }
                  
                  if (originalTask.task.completedAt) {
                    events.push({
                      id: "3",
                      type: "completed",
                      timestamp: originalTask.task.completedAt,
                      userId: "user",
                      userName: "User",
                      description: "Task completed",
                      metadata: {
                        fromStatus: "IN_PROGRESS",
                        toStatus: "COMPLETED"
                      }
                    })
                  }
                  
                  return events
                }
                return undefined // Use default mock data
              })()}
            />
          </div>
        )}

        {/* Comments Section & Action Buttons */}
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
              {(() => {
                // Check if this is a real workflow task
                const originalTask = 'originalTask' in action ? action.originalTask : null
                const taskStatus = originalTask?.task?.status
                
                if (originalTask && taskStatus) {
                  // Show buttons based on actual task status
                  if (taskStatus === 'PENDING') {
                    return (
                      <div className={`flex ${isMobile ? 'flex-col gap-2 w-full' : 'items-center gap-3'}`}>
                        <div className={`${isMobile ? 'w-full' : 'w-72'}`}>
                         
                          <Select
                            value={selectedAssignee}
                            onValueChange={setSelectedAssignee}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select user to assign" />
                            </SelectTrigger>
                            <SelectContent>
                              {deptUsersLoading && (
                                <div className="px-2 py-1 text-sm text-gray-500">Loading...</div>
                              )}
                              {Array.isArray(deptUsers) && deptUsers.map((u: any) => (
                                <SelectItem key={u.id} value={u.id}>
                                  {(u.name || u.surname) ? `${u.name ?? ''} ${u.surname ?? ''}`.trim() : (u.email || u.employeeId || u.id)}
                                  {u.email ? ` (${u.email})` : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {(() => {
                          if (!currentAssigneeId) return null
                          const assigneeUser = Array.isArray(deptUsers) ? deptUsers.find((u: any) => u.id === currentAssigneeId) : undefined
                          const displayName = assigneeUser ? ((assigneeUser.name || assigneeUser.surname) ? `${assigneeUser.name ?? ''} ${assigneeUser.surname ?? ''}`.trim() : (assigneeUser.email || assigneeUser.employeeId || assigneeUser.id)) : currentAssigneeId
                          return (
                            <div className="text-xs text-gray-500">
                              Currently assigned to: <span className="font-medium text-gray-700">{displayName}</span>
                            </div>
                          )
                        })()}

                        {/* {
                          JSON.stringify(originalTask.task)
                        } */}
                     
                        <Button
                          className={`${isMobile ? 'w-full' : ''}`}
                          onClick={async () => {
                            try {
                              const assignedBy = (currentUserQuery.data as any)?.data?.id
                              if (!selectedAssignee) {
                                toast({ title: 'Select a user', description: 'Please choose a user to assign.', variant: 'destructive' })
                                return
                              }
                              if (currentAssigneeId && selectedAssignee === currentAssigneeId) {
                                toast({ title: 'No change', description: 'Task is already assigned to this user.' })
                                return
                              }
                              await assignTaskMutation.mutateAsync({ id: originalTask.task.id, assignedTo: selectedAssignee, assignedBy, notes: comment })
                              toast({ title: 'Task Assigned', description: 'The task has been assigned successfully.' })
                              onClose()
                            } catch (e) {
                              toast({ title: 'Assignment failed', description: 'Could not assign task.', variant: 'destructive' })
                            }
                          }}
                          disabled={assignTaskMutation.isPending || !selectedAssignee}
                        >
                          Assign
                        </Button>
                      </div>
                    )
                  } else if (taskStatus === 'IN_PROGRESS') {
                    return (
                      <>
                        <Button 
                          variant="outline"
                          className={`text-red-600 border-red-200 hover:bg-red-50 ${isMobile ? 'w-full' : ''}`}
                          onClick={() => handleActionDecision('reject', action.id)}
                          disabled={rejectTaskMutation.isPending}
                        >
                          Reject
                        </Button>
                        <Button 
                          className={`bg-green-600 hover:bg-green-700 text-white ${isMobile ? 'w-full' : ''}`}
                          onClick={() => handleActionDecision('approve', action.id)}
                          disabled={completeTaskMutation.isPending}
                        >
                          Complete
                        </Button>
                      </>
                    )
                  } else {
                    return (
                      <div className="text-sm text-gray-500">
                        Task is {taskStatus.toLowerCase()}
                      </div>
                    )
                  }
                } else {
                  // Fallback to original mock data buttons
                  return action.type === 'vote' ? (
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
                  )
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
