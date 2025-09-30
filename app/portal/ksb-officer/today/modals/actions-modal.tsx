"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GoInfo } from "react-icons/go"
import { X } from "lucide-react"
import { useState, useMemo } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { allActionsData } from "@/lib/mockdata"
import { useMyDepartmentTasks, useUpdateTaskStatus, useCompleteTask, useRejectTask } from "@/hooks/use-workflow-tasks"
import { WorkflowTask } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, SortAsc, SortDesc, CheckSquare, Square, CheckCircle, Users } from "lucide-react"
import { TaskHistory } from "@/components/task-history"
import { ActionDetailsModal } from "@/components/modals/action-details-modal"

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

interface ActionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedActionId?: string | null
  workflowTasks?: WorkflowTask[]
}

export function ActionsModal({ open, onOpenChange, selectedActionId, workflowTasks }: ActionsModalProps) {
  const [selectedActionForDetails, setSelectedActionForDetails] = useState<string | null>(selectedActionId || null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)
  const isMobile = useIsMobile()
  const { toast } = useToast()
  
  // Fetch workflow tasks if not provided
  const { data: tasksData, isLoading: tasksLoading } = useMyDepartmentTasks(1, 50)
  const updateStatusMutation = useUpdateTaskStatus()
  const completeTaskMutation = useCompleteTask()
  const rejectTaskMutation = useRejectTask()
  
  // Use provided tasks or fetch from API
  const tasks = workflowTasks || tasksData?.data || []
  
  // Transform workflow tasks to display format
  const transformedTasks = tasks.map((task) => ({
    id: task.id,
    title: task.task.name,
    description: task.task.description,
    type: task.task.type === 'REVIEW' ? 'approval' : 'vote',
    timestamp: new Date(task.createdAt).toLocaleDateString(),
    iconColor: task.task.type === 'REVIEW' ? 'text-blue-600' : 'text-green-600',
    iconBg: task.task.type === 'REVIEW' ? 'bg-blue-100' : 'bg-green-100',
    hoverBg: task.task.type === 'REVIEW' ? 'hover:bg-blue-50' : 'hover:bg-green-50',
    priority: task.priority,
    status: task.status,
    dueDate: task.task.dueDate,
    departmentName: task.task.data.departmentName,
    // Store original task data for actions
    originalTask: task
  }))
  
  // Use transformed tasks if available, otherwise fall back to mock data
  const baseTasks = transformedTasks.length > 0 ? transformedTasks : allActionsData
  
  // Filter and sort tasks
  const displayTasks = useMemo(() => {
    let filtered = baseTasks.filter(task => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!task.title.toLowerCase().includes(query) && 
            !task.description.toLowerCase().includes(query)) {
          return false
        }
      }
      
      // Status filter
      if (statusFilter !== "all") {
        if ('originalTask' in task && task.originalTask) {
          if (task.originalTask.task.status !== statusFilter) {
            return false
          }
        } else {
          // For mock data, skip status filtering
          return true
        }
      }
      
      // Priority filter
      if (priorityFilter !== "all") {
        if ('priority' in task && task.priority) {
          if (task.priority !== priorityFilter) {
            return false
          }
        } else {
          // For mock data, skip priority filtering
          return true
        }
      }
      
      return true
    })
    
    // Sort tasks
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case "title":
          aValue = a.title
          bValue = b.title
          break
        case "priority":
          aValue = ('priority' in a && a.priority) ? a.priority : "LOW"
          bValue = ('priority' in b && b.priority) ? b.priority : "LOW"
          // Custom priority order
          const priorityOrder = { "URGENT": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1 }
          aValue = priorityOrder[aValue as keyof typeof priorityOrder] || 0
          bValue = priorityOrder[bValue as keyof typeof priorityOrder] || 0
          break
        case "dueDate":
          aValue = ('dueDate' in a && a.dueDate) ? new Date(a.dueDate) : new Date()
          bValue = ('dueDate' in b && b.dueDate) ? new Date(b.dueDate) : new Date()
          break
        case "createdAt":
        default:
          aValue = ('originalTask' in a && a.originalTask) ? new Date(a.originalTask.createdAt) : new Date(a.timestamp)
          bValue = ('originalTask' in b && b.originalTask) ? new Date(b.originalTask.createdAt) : new Date(b.timestamp)
          break
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
    
    return filtered
  }, [baseTasks, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder])
  
  const handleActionDecision = async (decision: string, actionId: string) => {
    

    try {
      // Find the original task data
      const displayTask = displayTasks.find(t => t.id === actionId)
      const originalTask = displayTask && 'originalTask' in displayTask ? displayTask.originalTask : null
      
      if (originalTask) {
        // Handle real workflow task actions
        switch (decision) {
          case 'onComplete':
            await completeTaskMutation.mutateAsync({ 
              id: originalTask.id, 
              notes: 'Task approved' 
            })
            toast({
              title: "Task Completed",
              description: `Task "${displayTask?.title || 'Unknown'}" has been completed successfully.`,
              variant: "default",
            })
            break
          case 'onReject':
            await rejectTaskMutation.mutateAsync({ 
              id: originalTask.id, 
              reason: 'Task rejected' 
            })
            toast({
              title: "Task Rejected",
              description: `Task "${displayTask?.title || 'Unknown'}" has been rejected.`,
              variant: "destructive",
            })
            break
          case 'start':
            await updateStatusMutation.mutateAsync({ 
              id: originalTask.id, 
              status: 'IN_PROGRESS',
              notes: 'Task started' 
            })
            toast({
              title: "Task Started",
              description: `Task "${displayTask?.title || 'Unknown'}" has been started.`,
              variant: "default",
            })
            break
        }
      } else {
        // Handle mock data actions (fallback)
        console.log(`${decision} action ${actionId}`)
        toast({
          title: "Action Performed",
          description: `${decision} action completed for task.`,
          variant: "default",
        })
      }
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error performing task action:', error)
      toast({
        title: "Error",
        description: "Failed to perform task action. Please try again.",
        variant: "destructive",
      })
    }
  }
  
  // Bulk action handlers
  const handleSelectTask = (taskId: string, checked: boolean) => {
    const newSelected = new Set(selectedTasks)
    if (checked) {
      newSelected.add(taskId)
    } else {
      newSelected.delete(taskId)
    }
    setSelectedTasks(newSelected)
    setShowBulkActions(newSelected.size > 0)
  }
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allTaskIds = new Set(displayTasks.map(task => task.id))
      setSelectedTasks(allTaskIds)
      setShowBulkActions(true)
    } else {
      setSelectedTasks(new Set())
      setShowBulkActions(false)
    }
  }
  
  const handleBulkAction = async (action: string) => {
    if (selectedTasks.size === 0) return
    
    try {
      const selectedTaskIds = Array.from(selectedTasks)
      const tasksToProcess = displayTasks.filter(task => selectedTaskIds.includes(task.id))
      
      for (const task of tasksToProcess) {
        const originalTask = 'originalTask' in task ? task.originalTask : null
        if (originalTask) {
          switch (action) {
            case 'start':
              await updateStatusMutation.mutateAsync({ 
                id: originalTask.id, 
                status: 'IN_PROGRESS',
                notes: 'Bulk action: Task started' 
              })
              break
            case 'complete':
              await completeTaskMutation.mutateAsync({ 
                id: originalTask.id, 
                notes: 'Bulk action: Task completed' 
              })
              break
            case 'reject':
              await rejectTaskMutation.mutateAsync({ 
                id: originalTask.id, 
                reason: 'Bulk action: Task rejected' 
              })
              break
          }
        }
      }
      
      toast({
        title: "Bulk Action Completed",
        description: `${action} action performed on ${selectedTasks.size} tasks.`,
        variant: "default",
      })
      
      setSelectedTasks(new Set())
      setShowBulkActions(false)
    } catch (error) {
      console.error('Error performing bulk action:', error)
      toast({
        title: "Error",
        description: "Failed to perform bulk action. Please try again.",
        variant: "destructive",
      })
    }
  }
  
  if (!selectedActionForDetails) {
    // List view
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`${isMobile ? 'max-w-full h-screen max-h-screen m-0 rounded-none overflow-scroll' : 'max-w-4xl max-h-[90vh]'} overflow-y-scroll p-0 [&>button]:hidden scrollbar-thin modal-scroll`}>
          <DialogTitle className="sr-only">Actions</DialogTitle>
          <div className={`flex flex-col h-full ${isMobile ? 'overflow-hidden' : ''}`}>
            <div className={`${isMobile ? 'p-4 flex-shrink-0' : 'p-6'} bg-gray-50`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-gray-900`}>Actions</h2>
                  <p className="text-sm text-gray-500 mt-1">{displayTasks.length} actions requiring attention</p>
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
              
              {/* Filters and Search */}
              <div className={`space-y-3 ${isMobile ? '' : 'flex items-center gap-4'}`}>
                {/* Search */}
                <div className={`relative ${isMobile ? 'w-full' : 'flex-1'}`}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 ${isMobile ? 'w-full' : ''}`}
                  />
            </div>
            
                {/* Filters */}
                <div className={`flex items-center gap-2 ${isMobile ? 'flex-wrap' : ''}`}>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className={`w-[140px] ${isMobile ? 'flex-1' : ''}`}>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className={`w-[140px] ${isMobile ? 'flex-1' : ''}`}>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className={`w-[140px] ${isMobile ? 'flex-1' : ''}`}>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="createdAt">Created Date</SelectItem>
                      <SelectItem value="dueDate">Due Date</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="shrink-0"
                  >
                    {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              {/* Bulk Actions Bar */}
              {showBulkActions && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-blue-900">
                        {selectedTasks.size} task{selectedTasks.size !== 1 ? 's' : ''} selected
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction('start')}
                        disabled={updateStatusMutation.isPending}
                      >
                        Start All
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction('complete')}
                        disabled={completeTaskMutation.isPending}
                      >
                        Complete All
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBulkAction('reject')}
                        disabled={rejectTaskMutation.isPending}
                      >
                        Reject All
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedTasks(new Set())
                          setShowBulkActions(false)
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className={`flex-1 ${isMobile ? 'overflow-y-auto overflow-x-hidden px-4 py-4' : 'overflow-y-auto p-6'} scrollbar-thin modal-scroll`}>
              {tasksLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-sm text-gray-600">Loading tasks...</span>
                </div>
              ) : (
              <div className="space-y-3">
                 
                  {displayTasks.map((action) => (
                  <div 
                    key={action.id}
                    className="flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                  >
                    {/* Checkbox */}
                   
                    {/* Task Content */}
                    <div 
                      className="flex-1 cursor-pointer"
                    onClick={() => setSelectedActionForDetails(action.id)}
                  >
                      <div className="flex items-start gap-3">
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
                                {'priority' in action && action.priority && (
                                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    action.priority === 'HIGH' || action.priority === 'URGENT' 
                                      ? 'bg-red-100 text-red-700' 
                                      : action.priority === 'MEDIUM'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {action.priority}
                                  </div>
                                )}
                          </div>
                          <p className="text-xs text-[#6B6B6B] mb-1">{action.description}</p>
                              <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                                <span>{action.timestamp}</span>
                                {'dueDate' in action && action.dueDate && (
                                  <>
                                    <span>•</span>
                                    <span>Due: {new Date(action.dueDate).toLocaleDateString()}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Details view - Get action details
  const action = displayTasks.find(a => a.id === selectedActionForDetails)
  
  if (!action) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'max-w-full h-screen max-h-screen m-0 rounded-none overflow-hidden' : 'max-w-4xl max-h-[90vh]'} overflow-y-scroll p-0 [&>button]:hidden scrollbar-thin modal-scroll`}>
        <DialogTitle className="sr-only">Action Details</DialogTitle>
        <ActionDetailsModal 
          action={action}
          onClose={() => setSelectedActionForDetails(null)}
          onActionDecision={handleActionDecision}
        />
      </DialogContent>
    </Dialog>
  )
}