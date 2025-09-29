"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, AlertTriangle, FileText } from "lucide-react"
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { allActionsData } from "@/lib/mockdata"
import { ActionsModal } from "./modals/actions-modal"
import React from "react"
import { useMyDepartmentTasks } from "@/hooks/use-workflow-tasks"

interface ActionsCardProps {
  selectedItemId: string | null
  setSelectedItemId: (id: string | null) => void
}

const ActionsCard = ({ selectedItemId, setSelectedItemId }: ActionsCardProps) => {
  const [viewAllActionsOpen, setViewAllActionsOpen] = useState(false)
  const [selectedActionForDetails, setSelectedActionForDetails] = useState<string | null>(null)

  // Fetch workflow tasks for the department
  const { data: workflowTasksData, isLoading: tasksLoading, error: tasksError } = useMyDepartmentTasks(1, 10)

  // Transform workflow tasks to match the expected format for display
  const workflowTasksForCard = workflowTasksData?.data?.map((task) => ({
    id: task.id,
    title: task.task.name,
    description: task.task.description,
    type: task.task.type === 'REVIEW' ? 'approval' : 'committee',
    timestamp: new Date(task.createdAt).toLocaleDateString(),
    iconBg: task.task.type === 'REVIEW' ? 'bg-blue-100' : 'bg-green-100',
    iconColor: task.task.type === 'REVIEW' ? 'text-blue-600' : 'text-green-600',
    hoverBg: task.task.type === 'REVIEW' ? 'hover:bg-blue-50' : 'hover:bg-green-50',
    priority: task.priority,
    status: task.status,
    dueDate: task.task.dueDate,
    departmentName: task.task.data.departmentName
  })) || []

  // Use workflow tasks if available, otherwise fall back to mock data
  const allActionsForCard = workflowTasksForCard.length > 0 ? workflowTasksForCard : allActionsData.map((action, index) => ({
    ...action,
    hoverBg: action.type === 'approval' ? 'hover:bg-blue-50' : 'hover:bg-green-50',
    priority: undefined,
    dueDate: undefined
  }))

  const handleItemAction = (action: string, itemId: string) => {
    console.log(`${action} action for item ${itemId}`)
    setSelectedItemId(null)
    
    if (action === 'details') {
      setSelectedActionForDetails(itemId)
      setViewAllActionsOpen(true)
    }
  }

  return (
    <>
      <Card className="rounded-[20px] shadow-lg border-0 bg-white">
        <CardHeader className="pb-1">
          <CardTitle 
            className="text-[#202020] cursor-pointer" 
            onClick={() => {
              setSelectedActionForDetails(null)
              setViewAllActionsOpen(true)
            }}
          >
            Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          {/* Loading State */}
          {tasksLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-gray-600">Loading tasks...</span>
            </div>
          )}

          {/* Error State */}
          {tasksError && (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-red-600">Failed to load tasks</p>
                <p className="text-xs text-gray-500 mt-1">Using sample data</p>
              </div>
            </div>
          )}

          {/* Actions Content - Show all items with hidden horizontal scrollbar */}
          {!tasksLoading && (
            <div 
              className="space-y-3 overflow-y-auto overflow-x-hidden scrollbar-hover group"
              style={{ maxHeight: '200px' }}
            >
            {allActionsForCard.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${item.hoverBg} hover:shadow-md transform hover:scale-[1.02]`}
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
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-[#202020]">{item.title}</h4>
                        {'priority' in item && item.priority && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            item.priority === 'HIGH' || item.priority === 'URGENT' 
                              ? 'bg-red-100 text-red-700' 
                              : item.priority === 'MEDIUM'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.priority}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6B6B6B] mb-1">{item.description}</p>
                      <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                        <span>{item.timestamp}</span>
                        {'dueDate' in item && item.dueDate && (
                          <>
                            <span>•</span>
                            <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
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
          )}
        </CardContent>
      </Card>

      {/* Actions Modal */}
      <ActionsModal
        open={viewAllActionsOpen}
        onOpenChange={(open) => {
          setViewAllActionsOpen(open)
          if (!open) {
            setSelectedActionForDetails(null)
          }
        }}
        selectedActionId={selectedActionForDetails}
        workflowTasks={workflowTasksData?.data}
      />
    </>
  )
}

export default ActionsCard
