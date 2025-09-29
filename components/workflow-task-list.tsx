"use client"

import { useState } from "react"
import { useMyDepartmentTasks, useUpdateTaskStatus, useAssignTask, useCompleteTask, useRejectTask } from "@/hooks/use-workflow-tasks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle, FileText, Users, Calendar } from "lucide-react"
import { format } from "date-fns"

interface WorkflowTaskListProps {
  page?: number
  limit?: number
  status?: string
  priority?: string
  showActions?: boolean
}

export function WorkflowTaskList({ 
  page = 1, 
  limit = 10, 
  status, 
  priority, 
  showActions = true 
}: WorkflowTaskListProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  
  const { data: tasksData, isLoading, error } = useMyDepartmentTasks(page, limit, { status, priority })
  const updateStatusMutation = useUpdateTaskStatus()
  const assignTaskMutation = useAssignTask()
  const completeTaskMutation = useCompleteTask()
  const rejectTaskMutation = useRejectTask()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
      case 'URGENT':
        return 'bg-red-100 text-red-700'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-700'
      case 'LOW':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700'
      case 'OVERDUE':
        return 'bg-red-100 text-red-700'
      case 'REJECTED':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'REVIEW':
        return <FileText className="h-4 w-4" />
      case 'APPROVAL':
        return <CheckCircle className="h-4 w-4" />
      case 'INSPECTION':
        return <Users className="h-4 w-4" />
      case 'PAYMENT':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleTaskAction = async (taskId: string, action: string) => {
    try {
      switch (action) {
        case 'complete':
          await completeTaskMutation.mutateAsync({ id: taskId, notes: 'Task completed' })
          break
        case 'reject':
          await rejectTaskMutation.mutateAsync({ id: taskId, reason: 'Task rejected' })
          break
        case 'start':
          await updateStatusMutation.mutateAsync({ id: taskId, status: 'IN_PROGRESS' })
          break
      }
      setSelectedTaskId(null)
    } catch (error) {
      console.error('Error performing task action:', error)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Loading tasks...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600">Failed to load tasks</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const tasks = tasksData?.data || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Workflow Tasks ({tasks.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {tasks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No tasks found
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 bg-blue-100 rounded">
                        {getTaskIcon(task.task.type)}
                      </div>
                      <h4 className="font-medium text-gray-900">{task.task.name}</h4>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.task.status)}>
                        {task.task.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{task.task.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {format(new Date(task.task.dueDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{task.task.data.departmentName}</span>
                      </div>
                      <span>Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  
                  {showActions && (
                    <div className="flex items-center gap-2 ml-4">
                      {task.task.status === 'PENDING' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTaskAction(task.id, 'start')}
                          disabled={updateStatusMutation.isPending}
                        >
                          Start
                        </Button>
                      )}
                      
                      {task.task.status === 'IN_PROGRESS' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTaskAction(task.id, 'complete')}
                            disabled={completeTaskMutation.isPending}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTaskAction(task.id, 'reject')}
                            disabled={rejectTaskMutation.isPending}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
