"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActivitiesModal } from "../modals/activities-modal"
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  FileText,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  User,
  Shield,
  Award
} from "lucide-react"
import { LuSquarePen } from 'react-icons/lu'
import { activitiesData } from "../data/activities-data"
import { ActivityDetailsModal } from "../modals/activity-details-modal"

interface ActivitiesCardProps {
  className?: string
  triggerNewActivity?: boolean
  setTriggerNewActivity?: (value: boolean) => void
}

const ActivitiesCard = ({ className, triggerNewActivity, setTriggerNewActivity }: ActivitiesCardProps) => {
  // Modal states
  const [newActivityOpen, setNewActivityOpen] = useState(false)
  const [viewAllActivitiesOpen, setViewAllActivitiesOpen] = useState(false)
  const [activityDetailsOpen, setActivityDetailsOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)

  const handleActivityClick = (activityId: string) => {
    const activity = activitiesData.find(a => a.id === activityId)
    if (activity) {
      setSelectedActivity(activity)
      setActivityDetailsOpen(true)
    }
  }

  // Form state
  const [activityForm, setActivityForm] = useState({
    title: '',
    type: '',
    priority: 'medium',
    startDate: '',
    endDate: '',
    location: '',
    assignedTo: '',
    description: ''
  })

  // Handle trigger from parent component (AI Insights/Alerts)
  useEffect(() => {
    if (triggerNewActivity && setTriggerNewActivity) {
      setNewActivityOpen(true)
      setTriggerNewActivity(false)
    }
  }, [triggerNewActivity, setTriggerNewActivity])

  const handleCreateActivity = () => {
    console.log('Creating activity:', activityForm)
    setActivityForm({
      title: '',
      type: '',
      priority: 'medium',
      startDate: '',
      endDate: '',
      location: '',
      assignedTo: '',
      description: ''
    })
    setNewActivityOpen(false)
  }

  return (
    <>
      <Card className={`rounded-[20px] shadow-lg border-0 bg-white ${className}`}>
        <CardHeader className="pb-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#202020] cursor-pointer" onClick={() => {
              setViewAllActivitiesOpen(true)
            }}>Activities</CardTitle>
            <Button 
              size="sm" 
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-lg flex items-center gap-2 shadow-sm"
              onClick={() => setNewActivityOpen(true)}
            >
              <LuSquarePen className="h-4 w-4" />
              New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-3 py-2">
          {/* Scrollable activities list - showing 3 activities */}
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hover">
            {activitiesData.map((activity) => {
              // Get icon component and styling based on activity type
              const getActivityIconAndStyle = (type: string) => {
                switch (type) {
                  case 'compliance': 
                    return { 
                      icon: Shield, 
                      iconColor: 'text-orange-600', 
                      iconBg: 'bg-orange-100',
                      hoverBg: 'hover:bg-orange-50'
                    }
                  case 'visit': 
                    return { 
                      icon: MapPin, 
                      iconColor: 'text-blue-600', 
                      iconBg: 'bg-blue-100',
                      hoverBg: 'hover:bg-blue-50'
                    }
                  case 'renewal': 
                    return { 
                      icon: Award, 
                      iconColor: 'text-purple-600', 
                      iconBg: 'bg-purple-100',
                      hoverBg: 'hover:bg-purple-50'
                    }
                  case 'training': 
                    return { 
                      icon: Users, 
                      iconColor: 'text-green-600', 
                      iconBg: 'bg-green-100',
                      hoverBg: 'hover:bg-green-50'
                    }
                  case 'quality': 
                    return { 
                      icon: FileText, 
                      iconColor: 'text-indigo-600', 
                      iconBg: 'bg-indigo-100',
                      hoverBg: 'hover:bg-indigo-50'
                    }
                  case 'monitoring': 
                    return { 
                      icon: TrendingUp, 
                      iconColor: 'text-teal-600', 
                      iconBg: 'bg-teal-100',
                      hoverBg: 'hover:bg-teal-50'
                    }
                  case 'maintenance':
                    return { 
                      icon: CheckCircle, 
                      iconColor: 'text-green-600', 
                      iconBg: 'bg-green-100',
                      hoverBg: 'hover:bg-green-50'
                    }
                  default: 
                    return { 
                      icon: CheckCircle, 
                      iconColor: 'text-gray-600', 
                      iconBg: 'bg-gray-100',
                      hoverBg: 'hover:bg-gray-50'
                    }
                }
              }

              const { icon: IconComponent, iconColor, iconBg, hoverBg } = getActivityIconAndStyle(activity.type)

              return (
                <div 
                  key={activity.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 hover-shadow-border ${hoverBg}`}
                  onClick={() => handleActivityClick(activity.id)}
                >
                  <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`h-4 w-4 ${iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#202020] truncate">{activity.title}</p>
                    <p className="text-xs text-[#6B6B6B]">{activity.dueDate}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* New Activity Modal */}
      <Dialog open={newActivityOpen} onOpenChange={setNewActivityOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Activity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="activity-title">Activity Title</Label>
              <Input
                id="activity-title"
                value={activityForm.title}
                onChange={(e) => setActivityForm({...activityForm, title: e.target.value})}
                placeholder="Enter activity title"
              />
            </div>
            
            {/* Activity Type and Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select 
                  value={activityForm.type} 
                  onValueChange={(value) => {
                    // Auto-populate title when a template type is selected
                    let title = activityForm.title;
                    if (value === 'inspection') title = 'Field Inspection';
                    else if (value === 'compliance') title = 'Compliance Review';
                    else if (value === 'training') title = 'Training Session';
                    else if (value === 'audit') title = 'Quality Audit';
                    else if (value === 'maintenance') title = 'Equipment Maintenance';
                    
                    setActivityForm({...activityForm, type: value, title});
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inspection">Field Inspection</SelectItem>
                    <SelectItem value="compliance">Compliance Review</SelectItem>
                    <SelectItem value="training">Training Session</SelectItem>
                    <SelectItem value="audit">Quality Audit</SelectItem>
                    <SelectItem value="maintenance">Equipment Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="activity-priority">Priority</Label>
                <Select
                  value={activityForm.priority}
                  onValueChange={(value) => setActivityForm({...activityForm, priority: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Start Date and End Date Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="activity-start-date">Start Date</Label>
                <Input
                  id="activity-start-date"
                  type="datetime-local"
                  value={activityForm.startDate}
                  onChange={(e) => setActivityForm({...activityForm, startDate: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="activity-end-date">End Date</Label>
                <Input
                  id="activity-end-date"
                  type="datetime-local"
                  value={activityForm.endDate}
                  onChange={(e) => setActivityForm({...activityForm, endDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="activity-location">Location</Label>
              <Input
                id="activity-location"
                value={activityForm.location}
                onChange={(e) => setActivityForm({...activityForm, location: e.target.value})}
                placeholder="Enter location"
              />
            </div>
            <div>
              <Label htmlFor="activity-assigned">Assigned To</Label>
              <Input
                id="activity-assigned"
                value={activityForm.assignedTo}
                onChange={(e) => setActivityForm({...activityForm, assignedTo: e.target.value})}
                placeholder="Enter assignee name or email"
              />
            </div>
            <div>
              <Label htmlFor="activity-description">Description</Label>
              <Textarea
                id="activity-description"
                value={activityForm.description}
                onChange={(e) => setActivityForm({...activityForm, description: e.target.value})}
                placeholder="Enter activity description"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewActivityOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateActivity} className="bg-green-600 hover:bg-green-700">
                Create Activity
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Activities Modal */}
      <ActivitiesModal 
        open={viewAllActivitiesOpen}
        onOpenChange={setViewAllActivitiesOpen}
      />

      {/* Activity Details Modal */}
      <ActivityDetailsModal 
        open={activityDetailsOpen} 
        onOpenChange={setActivityDetailsOpen} 
        activity={selectedActivity} 
      />
    </>
  )
}

export default ActivitiesCard
