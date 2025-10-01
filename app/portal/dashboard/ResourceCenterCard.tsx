"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, Users, TrendingUp, Clock } from "lucide-react"
import ResourceCenterModal from "@/components/modals/resource-center-modal"
import { resourceCenterData, getResourceCounts, getPopularResources, type ResourceDocument } from "@/lib/resource-data"

interface Resource {
  id: string
  title: string
  type: 'case-law' | 'legislation' | 'judgment' | 'report' | 'legal-research'
  author?: string
  readTime?: string
  savedDate: string
  category?: string
}

const ResourceCenterCard = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedResourceId, setSelectedResourceId] = useState<string | undefined>(undefined)

  // Use actual recent resources from hardcoded data (most recent 3)
  const recentResources: Resource[] = resourceCenterData
    .sort((a, b) => new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime())
    .slice(0, 3)
    .map(resource => ({
      id: resource.id,
      title: resource.title,
      type: resource.type,
      author: resource.author,
      readTime: resource.readTime,
      savedDate: resource.savedDate,
      category: resource.category
    }))

  // Generate real stats from hardcoded data
  const totalResources = resourceCenterData.length
  const resourceCounts = getResourceCounts()
  const popularResources = getPopularResources()
  
  const resourceStats = {
    totalSaved: totalResources,
    thisMonth: Math.floor(totalResources * 0.3), // Simulate 30% added this month
    categories: Object.keys(resourceCounts).length,
    unread: popularResources.length
  }

  const handleResourceClick = (resourceId: string) => {
    setSelectedResourceId(resourceId)
    setModalOpen(true)
  }

  const handleModalClose = (open: boolean) => {
    setModalOpen(open)
    if (!open) {
      setSelectedResourceId(undefined)
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'case-law': return <FileText className="h-4 w-4" />
      case 'report': return <TrendingUp className="h-4 w-4" />
      case 'judgment': return <Users className="h-4 w-4" />
      case 'legislation': return <FileText className="h-4 w-4" />
      case 'legal-research': return <BookOpen className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getResourceTypeLabel = (type: string) => {
    switch (type) {
      case 'case-law': return 'Case Law'
      case 'legal-research': return 'Legal Research'
      default: return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  return (
    <>
      <Card 
        className="rounded-[20px] shadow-lg border-0 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-200"
        onClick={() => setModalOpen(true)}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#202020]">
              Resource Center
            </CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {resourceStats.unread} new
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{resourceStats.totalSaved}</div>
              <p className="text-xs text-gray-600">Total Saved</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">{resourceStats.thisMonth}</div>
              <p className="text-xs text-gray-600">This Month</p>
            </div>
          </div>

          {/* Recent Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Recent Resource
            </h4>
            {recentResources.slice(0, 1).map((resource) => {
              // Find the full resource data to get the image
              const fullResource = resourceCenterData.find(r => r.id === resource.id)
              return (
                <div key={resource.id} className="space-y-3">
                  <div 
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleResourceClick(resource.id)
                    }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {fullResource?.image ? (
                          <img 
                            src={fullResource.image} 
                            alt={resource.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getResourceIcon(resource.type)
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-[#202020] font-medium truncate">
                          {resource.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getResourceTypeLabel(resource.type)}
                          </Badge>
                          {resource.readTime && (
                            <span className="text-xs text-gray-500">{resource.readTime}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <ResourceCenterModal
        open={modalOpen}
        onOpenChange={handleModalClose}
        recentResources={recentResources}
        resourceStats={resourceStats}
        initialResourceId={selectedResourceId}
      />
    </>
  )
}

export default ResourceCenterCard
