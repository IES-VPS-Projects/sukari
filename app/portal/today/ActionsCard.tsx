"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { CheckCircle, Users, MoreHorizontal, AlertTriangle, FileText } from "lucide-react"
import React from "react"

// KSB Actions data customized for sugar industry operations
const actionsData = [
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
  },
  {
    id: 'action-3',
    title: 'Mill Operations License Approval',
    description: 'Approve renewal of operational license for Nzoia Sugar Factory',
    type: 'approval', 
    timestamp: '1 day ago',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    id: 'action-4',
    title: 'Budget Allocation Vote',
    description: 'Vote on FY 2025 budget allocation for infrastructure development',
    type: 'vote',
    timestamp: '2 days ago',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50'
  },
  {
    id: 'action-5',
    title: 'Export Quota Approval',
    description: 'Approve sugar export quota increase for Q3 2025',
    type: 'approval',
    timestamp: '3 days ago',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    hoverBg: 'hover:bg-blue-50'
  },
  {
    id: 'action-6',
    title: 'Farmer Support Program Vote',
    description: 'Vote on enhanced farmer support and training program funding',
    type: 'vote',
    timestamp: '4 days ago',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    hoverBg: 'hover:bg-green-50'
  }
]

interface ActionsCardProps {
  selectedActionId?: string | null,
  setSelectedActionId?: (id: string | null) => void,
  setViewAllActionsOpen?: (open: boolean) => void,
  setSelectedActionForDetails?: (id: string | null) => void,
  className?: string
}

const ActionsCard: React.FC<ActionsCardProps> = ({
  selectedActionId,
  setSelectedActionId,
  setViewAllActionsOpen,
  setSelectedActionForDetails,
  className = ""
}) => {
  const handleItemAction = (action: string, itemId: string) => {
    console.log(`${action} action for item ${itemId}`)
    if (setSelectedActionId) {
      setSelectedActionId(null)
    }
    if (action === 'details') {
      if (setSelectedActionForDetails) setSelectedActionForDetails(itemId)
      if (setViewAllActionsOpen) setViewAllActionsOpen(true)
    }
  }

  return (
    <div className={`md:col-span-1 lg:col-span-1 ${className}`}>
      <Card className="rounded-[20px] shadow-lg border-0 bg-white">
        <CardHeader className="pb-1 cursor-pointer" onClick={() => {
          if (setSelectedActionForDetails) setSelectedActionForDetails(null)
          if (setViewAllActionsOpen) setViewAllActionsOpen(true)
        }}>
          <CardTitle className="text-foreground text-lg font-semibold font-poppins">Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex flex-col">
          <div 
            className="space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400" 
            style={{ maxHeight: '160px' }}
          >
            {actionsData.slice(0, 2).map((item) => (
              <div 
                key={item.id} 
                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                onClick={(e: React.MouseEvent) => {
                  if (!(e.target as HTMLElement).closest('.ellipsis-menu')) {
                    if (setSelectedActionForDetails) setSelectedActionForDetails(item.id)
                    if (setViewAllActionsOpen) setViewAllActionsOpen(true)
                  }
                }}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.type === 'approval' ? (
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Users className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground mb-1 truncate">{item.title}</h4>
                      <div className="flex items-end justify-between gap-2">
                        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{item.description}</p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{item.timestamp}</p>
                      </div>
                    </div>
                    <div className="relative ellipsis-menu">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                            }}
                          >
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {item.type === 'approval' ? (
                            <>
                              <DropdownMenuItem onClick={() => handleItemAction('approve', item.id)}>
                                <CheckCircle className="h-3 w-3 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleItemAction('reject', item.id)}>
                                <AlertTriangle className="h-3 w-3 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem onClick={() => handleItemAction('vote-yes', item.id)}>
                                <CheckCircle className="h-3 w-3 mr-2" />
                                Vote Yes
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleItemAction('vote-no', item.id)}>
                                <AlertTriangle className="h-3 w-3 mr-2" />
                                Vote No
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleItemAction('details', item.id)}>
                            <FileText className="h-3 w-3 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ActionsCard
