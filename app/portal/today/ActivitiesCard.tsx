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
  ChevronDown,
  ArrowLeft,
  Clock,
  MapPin,
  User
} from "lucide-react"
import { LuSquarePen } from 'react-icons/lu'
import { GoInfo } from 'react-icons/go'
import { allActivitiesData } from "@/lib/mockdata"

interface ActivitiesCardProps {
  className?: string
  triggerNewActivity?: boolean
  setTriggerNewActivity?: (value: boolean) => void
}

const ActivitiesCard = ({ className, triggerNewActivity, setTriggerNewActivity }: ActivitiesCardProps) => {
  // Modal states
  const [newActivityOpen, setNewActivityOpen] = useState(false)
  const [activityDropdownOpen, setActivityDropdownOpen] = useState(false)
  const [viewAllActivitiesOpen, setViewAllActivitiesOpen] = useState(false)
  const [selectedActivityForDetails, setSelectedActivityForDetails] = useState<string | null>(null)

  // Form state
  const [activityForm, setActivityForm] = useState({
    title: '',
    type: '',
    datetime: '',
    location: '',
    assignedTo: '',
    description: ''
  })

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activityDropdownOpen) {
        setActivityDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activityDropdownOpen])

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
      datetime: '',
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
            <div className="relative">
              <div className="flex">
                <Button 
                  size="sm" 
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-l-lg flex items-center gap-2 shadow-sm border-r-0"
                  onClick={() => setNewActivityOpen(true)}
                >
                  <LuSquarePen className="h-4 w-4" />
                  New
                </Button>
                <Button 
                  size="sm" 
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-2 py-1 rounded-r-lg flex items-center shadow-sm"
                  onClick={() => setActivityDropdownOpen(!activityDropdownOpen)}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
              
              {/* Dropdown Menu */}
              {activityDropdownOpen && (
                <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg z-20 w-48">
                  <div className="py-1">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b">Activity Types</div>
                    <button
                      onClick={() => {
                        setActivityForm({...activityForm, title: 'Field Inspection', type: 'inspection'})
                        setNewActivityOpen(true)
                        setActivityDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Field Inspection
                    </button>
                    <button
                      onClick={() => {
                        setActivityForm({...activityForm, title: 'Compliance Review', type: 'compliance'})
                        setNewActivityOpen(true)
                        setActivityDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Compliance Review
                    </button>
                    <button
                      onClick={() => {
                        setActivityForm({...activityForm, title: 'Training Session', type: 'training'})
                        setNewActivityOpen(true)
                        setActivityDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <Users className="h-4 w-4" />
                      Training Session
                    </button>
                    <button
                      onClick={() => {
                        setActivityForm({...activityForm, title: 'Quality Audit', type: 'audit'})
                        setNewActivityOpen(true)
                        setActivityDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <FileText className="h-4 w-4" />
                      Quality Audit
                    </button>
                    <button
                      onClick={() => {
                        setActivityForm({...activityForm, title: 'Equipment Maintenance', type: 'maintenance'})
                        setNewActivityOpen(true)
                        setActivityDropdownOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <TrendingUp className="h-4 w-4" />
                      Equipment Maintenance
                    </button>
                    
                    <div className="border-t">
                      <button
                        onClick={() => {
                          setNewActivityOpen(true)
                          setActivityDropdownOpen(false)
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50"
                      >
                        <FileText className="h-4 w-4" />
                        View all templates
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <div 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 hover:shadow-md cursor-pointer transition-all duration-200"
            onClick={() => {
              setSelectedActivityForDetails('activity-1')
              setViewAllActivitiesOpen(true)
            }}
          >
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#202020]">Compliance Review Due</p>
              <p className="text-xs text-[#6B6B6B]">Mumias Mill - Tomorrow</p>
            </div>
          </div>
          <div 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 hover:shadow-md cursor-pointer transition-all duration-200"
            onClick={() => {
              setSelectedActivityForDetails('activity-2')
              setViewAllActivitiesOpen(true)
            }}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#202020]">Site Visit Scheduled</p>
              <p className="text-xs text-[#6B6B6B]">Chemelil Sugar Mill - Friday</p>
            </div>
          </div>
          <div 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 hover:shadow-md cursor-pointer transition-all duration-200"
            onClick={() => {
              setSelectedActivityForDetails('activity-3')
              setViewAllActivitiesOpen(true)
            }}
          >
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#202020]">License Renewal Reminder</p>
              <p className="text-xs text-[#6B6B6B]">Nzoia Sugar Co. - Next Week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Activity Modal */}
      <Dialog open={newActivityOpen} onOpenChange={setNewActivityOpen}>
        <DialogContent className="max-w-md">
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
            <div>
              <Label htmlFor="activity-type">Activity Type</Label>
              <Select value={activityForm.type} onValueChange={(value) => setActivityForm({...activityForm, type: value})}>
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
              <Label htmlFor="activity-datetime">Date & Time</Label>
              <Input
                id="activity-datetime"
                type="datetime-local"
                value={activityForm.datetime}
                onChange={(e) => setActivityForm({...activityForm, datetime: e.target.value})}
              />
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
              <Button onClick={handleCreateActivity}>
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
              const activity = allActivitiesData.find(a => a.id === selectedActivityForDetails)
              
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
                              <span className="text-sm line-through text-gray-500">Prepare inspection documentation</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm line-through text-gray-500">Schedule site visit</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                              <span className="text-sm">Conduct compliance assessment</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                              <span className="text-sm">Submit compliance report</span>
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
                      <p className="text-sm text-gray-500 mt-1">{allActivitiesData.length} activities requiring attention</p>
                    </div>
                    <div className="group relative">
                      <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                      <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        Tasks and activities needing completion
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-3">
                    {allActivitiesData.map((activity) => (
                      <div 
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
                        onClick={() => setSelectedActivityForDetails(activity.id)}
                      >
                        {/* Icon */}
                        <div className={`w-8 h-8 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <AlertTriangle className={`h-4 w-4 ${activity.iconColor}`} />
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

export default ActivitiesCard
