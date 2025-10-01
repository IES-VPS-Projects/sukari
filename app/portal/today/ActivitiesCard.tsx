"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  FileText,
  Users,
  TrendingUp,
  ArrowLeft,
  Clock,
  MapPin,
  User,
  X,
  Shield,
  Award
} from "lucide-react"
import { LuSquarePen, LuTriangleAlert, LuCalendar } from 'react-icons/lu'
import { GoInfo } from 'react-icons/go'
import { judicialActivities } from "@/lib/judicial-mockdata"
import { ActivityDetailsModal } from "@/components/modals/activity-details-modal"

interface ActivitiesCardProps {
  className?: string
  triggerNewActivity?: boolean
  setTriggerNewActivity?: (value: boolean) => void
}

const ActivitiesCard = ({ className, triggerNewActivity, setTriggerNewActivity }: ActivitiesCardProps) => {
  // Modal states
  const [newActivityOpen, setNewActivityOpen] = useState(false)
  const [viewAllActivitiesOpen, setViewAllActivitiesOpen] = useState(false)
  const [selectedActivityForDetails, setSelectedActivityForDetails] = useState<string | null>(null)
  const [activityDetailsOpen, setActivityDetailsOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)

  const handleActivityClick = (activityId: string) => {
    const activity = judicialActivities.find(a => a.id === activityId)
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
              setSelectedActivityForDetails(null)
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
            {judicialActivities.slice(0, 3).map((activity) => {
              // Get icon component and styling based on activity type
              const getActivityIconAndStyle = (type: string) => {
                switch (type) {
                  case 'judgment': 
                    return { 
                      icon: FileText, 
                      iconColor: 'text-orange-600', 
                      iconBg: 'bg-orange-100',
                      hoverBg: 'hover:bg-orange-50'
                    }
                  case 'research': 
                    return { 
                      icon: TrendingUp, 
                      iconColor: 'text-blue-600', 
                      iconBg: 'bg-blue-100',
                      hoverBg: 'hover:bg-blue-50'
                    }
                  case 'review': 
                    return { 
                      icon: CheckCircle, 
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
                  case 'hearing': 
                    return { 
                      icon: Calendar, 
                      iconColor: 'text-indigo-600', 
                      iconBg: 'bg-indigo-100',
                      hoverBg: 'hover:bg-indigo-50'
                    }
                  case 'legal': 
                    return { 
                      icon: Shield, 
                      iconColor: 'text-teal-600', 
                      iconBg: 'bg-teal-100',
                      hoverBg: 'hover:bg-teal-50'
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
                    if (value === 'judgment') title = 'Draft Judgment';
                    else if (value === 'research') title = 'Legal Research';
                    else if (value === 'review') title = 'Case File Review';
                    else if (value === 'hearing') title = 'Hearing Preparation';
                    else if (value === 'training') title = 'Judicial Ethics Training';
                    
                    setActivityForm({...activityForm, type: value, title});
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="judgment">Draft Judgment</SelectItem>
                    <SelectItem value="research">Legal Research</SelectItem>
                    <SelectItem value="review">Case File Review</SelectItem>
                    <SelectItem value="hearing">Hearing Preparation</SelectItem>
                    <SelectItem value="training">Judicial Ethics Training</SelectItem>
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
      <Dialog open={viewAllActivitiesOpen} onOpenChange={setViewAllActivitiesOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {selectedActivityForDetails ? 'Activity Details' : 'Activities'}
          </DialogTitle>
          {(() => {
            if (selectedActivityForDetails) {
              const activity = judicialActivities.find(a => a.id === selectedActivityForDetails)
              
              if (activity) {
                return (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b bg-white">
                      <div className="flex items-center gap-3 mb-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedActivityForDetails(null)}
                          className="shrink-0"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-12 h-12 ${activity.iconBg} rounded-lg flex items-center justify-center`}>
                            <AlertTriangle className={`h-6 w-6 ${activity.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <h1 className="text-xl font-semibold text-gray-900">{activity.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{activity.dueDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{activity.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{activity.assignee || 'Unassigned'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button size="sm" onClick={() => {
                              setSelectedActivityForDetails(null)
                              setViewAllActivitiesOpen(false)
                            }}>
                              Mark Complete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Activity Details</h3>
                          <p className="text-gray-700">{activity.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Checklist</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm line-through text-gray-500">Review case documents</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm line-through text-gray-500">Research relevant precedents</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                              <span className="text-sm">Prepare draft judgment</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                              <span className="text-sm">Review and finalize judgment</span>
                            </div>
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
                      <h2 className="text-xl font-semibold text-gray-900">Activities</h2>
                      <p className="text-sm text-gray-500 mt-1">{judicialActivities.length} activities requiring attention</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="group relative">
                        <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                        <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                          Tasks and activities needing completion
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedActivityForDetails(null)
                          setViewAllActivitiesOpen(false)
                        }}
                        className="shrink-0 h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {judicialActivities.map((activity) => {
                      // Get icon component and styling based on activity type (same as main card)
                      const getActivityIconAndStyle = (type: string) => {
                        switch (type) {
                          case 'judgment': 
                            return { 
                              icon: FileText, 
                              iconColor: 'text-orange-600', 
                              iconBg: 'bg-orange-100',
                              hoverBg: 'hover:bg-orange-50'
                            }
                          case 'research': 
                            return { 
                              icon: TrendingUp, 
                              iconColor: 'text-blue-600', 
                              iconBg: 'bg-blue-100',
                              hoverBg: 'hover:bg-blue-50'
                            }
                          case 'review': 
                            return { 
                              icon: CheckCircle, 
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
                          case 'hearing': 
                            return { 
                              icon: Calendar, 
                              iconColor: 'text-indigo-600', 
                              iconBg: 'bg-indigo-100',
                              hoverBg: 'hover:bg-indigo-50'
                            }
                          case 'legal': 
                            return { 
                              icon: Shield, 
                              iconColor: 'text-teal-600', 
                              iconBg: 'bg-teal-100',
                              hoverBg: 'hover:bg-teal-50'
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

                      const { icon: IconComponent, iconColor, iconBg } = getActivityIconAndStyle(activity.type)

                      return (
                        <div 
                          key={activity.id}
                          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                          onClick={() => handleActivityClick(activity.id)}
                        >
                          {/* Icon */}
                          <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className={`h-4 w-4 ${iconColor}`} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-[#202020] truncate">{activity.title}</h4>
                                <p className="text-xs text-[#6B6B6B] mb-1">{activity.description}</p>
                                <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                                  <span>{activity.dueDate}</span>
                                  <span>•</span>
                                  <span>{activity.location}</span>
                                  <span>•</span>
                                  <span>{activity.assignee || 'Unassigned'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })()}
        </DialogContent>
      </Dialog>

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
