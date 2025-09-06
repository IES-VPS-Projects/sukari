"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, AlertTriangle, FileText } from "lucide-react"
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { allActionsData } from "@/lib/mockdata"
import ActionsModal from "@/components/modals/actions-modal"
import React from "react"

interface ActionsCardProps {
  selectedItemId: string | null
  setSelectedItemId: (id: string | null) => void
}

const ActionsCard = ({ selectedItemId, setSelectedItemId }: ActionsCardProps) => {
  const [viewAllActionsOpen, setViewAllActionsOpen] = useState(false)
  const [selectedActionForDetails, setSelectedActionForDetails] = useState<string | null>(null)

  // Use all actions data for scrollable content (no need for inline actions since they're duplicates)
  const allActionsForCard = allActionsData.map((action, index) => ({
    ...action,
    hoverBg: action.type === 'approval' ? 'hover:bg-blue-50' : 'hover:bg-green-50'
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
          {/* Actions Content - Show only first 2 items with hidden scrollbar */}
          <div 
            className="space-y-3 overflow-y-auto scrollbar-none hover:scrollbar-thin hover:scrollbar-track-transparent hover:scrollbar-thumb-gray-300 group"
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

      {/* Actions Modal */}
      <ActionsModal
        isOpen={viewAllActionsOpen}
        onClose={() => {
          setViewAllActionsOpen(false)
          setSelectedActionForDetails(null)
        }}
        selectedActionForDetails={selectedActionForDetails}
        setSelectedActionForDetails={setSelectedActionForDetails}
      />
    </>
  )
}

export default ActionsCard
