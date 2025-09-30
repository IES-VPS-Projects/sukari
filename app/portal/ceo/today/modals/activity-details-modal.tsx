"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Flag,
  Paperclip,
  Plus,
  Send,
  Search
} from "lucide-react"
import { BiCategory } from "react-icons/bi"
import { useState } from "react"
import { activitiesData, ActivityItem } from "../data/activities-data"

interface ActivityDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activityId: string | null
}

export function ActivityDetailsModal({ open, onOpenChange, activityId }: ActivityDetailProps) {
  const activity = activitiesData.find(a => a.id === activityId)

  if (!activity) return null
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [description, setDescription] = useState(activity.details || activity.description)
  const [comment, setComment] = useState("")
  const [searchCategory, setSearchCategory] = useState("")
  const [showSubtaskInput, setShowSubtaskInput] = useState(false)
  const [newSubtaskText, setNewSubtaskText] = useState("")
  const [showAddAssignee, setShowAddAssignee] = useState(false)
  const [newAssigneeName, setNewAssigneeName] = useState("")
  const [editingStartDate, setEditingStartDate] = useState(false)
  const [editingDueDate, setEditingDueDate] = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  const [location, setLocation] = useState(activity.location)

  // Initialize assignees from activity data
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const [assignees, setAssignees] = useState([
    { id: 1, name: activity.assignee, initials: getInitials(activity.assignee) }
  ])

  // Generate dynamic dates based on timestamp
  const getActivityDates = (timeString: string) => {
    const today = new Date()
    if (timeString === "Tomorrow") {
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      return {
        start: `${tomorrow.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - 08:00AM`,
        due: `${tomorrow.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - 17:00PM`
      }
    } else if (timeString === "Friday") {
      const friday = new Date(today)
      const daysUntilFriday = (5 - today.getDay() + 7) % 7
      friday.setDate(today.getDate() + daysUntilFriday)
      return {
        start: `${friday.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - 09:00AM`,
        due: `${friday.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - 16:00PM`
      }
    } else if (timeString === "Next Week") {
      const nextWeek = new Date(today)
      nextWeek.setDate(today.getDate() + 7)
      return {
        start: `${nextWeek.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - 07:00AM`,
        due: `${nextWeek.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - 18:00PM`
      }
    }
    return {
      start: "17 Mar - 09:00AM",
      due: "20 Mar - 09:00AM"
    }
  }

  const activityDates = getActivityDates(activity.timestamp)
  const [startDate, setStartDate] = useState(activityDates.start)
  const [dueDate, setDueDate] = useState(activityDates.due)
  const [comments, setComments] = useState<Array<{id: number, text: string, user: string, initials: string}>>([])
  const [commentIdCounter, setCommentIdCounter] = useState(1)

  // Generate dynamic subtasks
  const getActivitySubtasks = () => {
    if (activity.type === "compliance") {
      return [
        { id: 1, text: "Review documentation completeness", completed: false },
        { id: 2, text: "Conduct on-site inspection", completed: false }
      ]
    } else if (activity.type === "visit") {
      return [
        { id: 1, text: "Prepare site visit checklist", completed: false },
        { id: 2, text: "Coordinate with mill management", completed: false }
      ]
    } else if (activity.type === "renewal") {
      return [
        { id: 1, text: "Compile renewal documentation", completed: false },
        { id: 2, text: "Submit application to authorities", completed: false }
      ]
    } else if (activity.type === "maintenance") {
      return [
        { id: 1, text: "Equipment inspection", completed: false },
        { id: 2, text: "Parts replacement and calibration", completed: false }
      ]
    }
    return [
      { id: 1, text: "Prepare meeting materials", completed: false },
      { id: 2, text: "Send invitations to participants", completed: false }
    ]
  }

  const categories = ["Operations", "Compliance", "Maintenance", "Management", "Field Visit"]
  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(searchCategory.toLowerCase())
  )

  const [subtasks, setSubtasks] = useState(getActivitySubtasks())

  const handleSubtaskToggle = (id: number) => {
    setSubtasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleAddSubtask = () => {
    if (newSubtaskText.trim()) {
      const newSubtask = {
        id: Math.max(...subtasks.map(s => s.id), 0) + 1,
        text: newSubtaskText.trim(),
        completed: false
      }
      setSubtasks(prev => [...prev, newSubtask])
      setNewSubtaskText("")
      setShowSubtaskInput(false)
    }
  }

  const handleSubtaskKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSubtask()
    }
    if (e.key === 'Escape') {
      setShowSubtaskInput(false)
      setNewSubtaskText("")
    }
  }

  const handleSendComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: commentIdCounter,
        text: comment.trim(),
        user: "Current User",
        initials: "CU"
      }
      setComments(prev => [...prev, newComment])
      setComment("")
      setCommentIdCounter(prev => prev + 1)
    }
  }

  const handleCommentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendComment()
    }
  }

  const handleAddAssignee = () => {
    if (newAssigneeName.trim()) {
      const initials = newAssigneeName.trim().split(' ').map(n => n[0]).join('').toUpperCase()
      const newAssignee = {
        id: Math.max(...assignees.map(a => a.id), 0) + 1,
        name: newAssigneeName.trim(),
        initials: initials
      }
      setAssignees(prev => [...prev, newAssignee])
      setNewAssigneeName("")
      setShowAddAssignee(false)
    }
  }

  const handleAssigneeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddAssignee()
    }
    if (e.key === 'Escape') {
      setShowAddAssignee(false)
      setNewAssigneeName("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl h-[95vh] max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Header with pale gray background */}
        <div className="bg-gray-50 p-6 pb-2 border-b border-gray-200 shadow-sm">
          <DialogHeader className="pb-2">
            <div className="flex items-center justify-between mb-4">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Activity Details
              </DialogTitle>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                {activity.title}
              </h2>
              <div className="flex items-center gap-3">
                <div className={`px-2 py-0 ${activity.priorityColor} border ${activity.priority === 'high' ? 'border-red-200' : 'border-yellow-200'} rounded-full shadow-sm flex items-center h-6`}>
                  <span className="text-xs font-medium">{activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${activity.status === 'pending' ? 'bg-amber-500' : activity.status === 'scheduled' ? 'bg-blue-500' : 'bg-green-500'} rounded-full`}></div>
                  <span className={`text-sm ${activity.status === 'pending' ? 'text-amber-600' : activity.status === 'scheduled' ? 'text-blue-600' : 'text-green-600'}`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Task Information */}
            <div className="space-y-4">
              {/* Assignee */}
              <div>
                <div className="flex items-center gap-3 pb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm text-gray-600">Assignee</Label>
                  <div className="flex items-center gap-2 ml-[78px]">
                    {assignees.map((assignee) => (
                      <div
                        key={assignee.id}
                        className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-50 group"
                      >
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{assignee.name}</span>
                      </div>
                    ))}
                    {showAddAssignee ? (
                      <Input
                        placeholder="Enter assignee name..."
                        value={newAssigneeName}
                        onChange={(e) => setNewAssigneeName(e.target.value)}
                        onKeyDown={handleAssigneeKeyPress}
                        onBlur={() => setShowAddAssignee(false)}
                        className="text-sm h-8 w-40"
                        autoFocus
                      />
                    ) : (
                      <button
                        onClick={() => setShowAddAssignee(true)}
                        className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600"
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
              </div>

              {/* Start Date */}
              <div>
                <div className="flex items-center gap-3 pb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm text-gray-600">Start Date</Label>
                  {editingStartDate ? (
                    <Input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      onBlur={() => setEditingStartDate(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditingStartDate(false)}
                      className="text-sm h-8 w-48 ml-[78px]"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="text-sm cursor-pointer hover:bg-gray-50 px-2 py-1 rounded ml-[78px]"
                      onClick={() => setEditingStartDate(true)}
                    >
                      {startDate}
                    </span>
                  )}
                </div>
                <div className="border-b border-gray-200"></div>
              </div>

              {/* Due Date */}
              <div>
                <div className="flex items-center gap-3 pb-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm text-gray-600">Due Date</Label>
                  {editingDueDate ? (
                    <Input
                      type="text"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      onBlur={() => setEditingDueDate(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditingDueDate(false)}
                      className="text-sm h-8 w-48 ml-[82px]"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="text-sm cursor-pointer hover:bg-gray-50 px-2 py-1 rounded ml-[82px]"
                      onClick={() => setEditingDueDate(true)}
                    >
                      {dueDate}
                    </span>
                  )}
                </div>
                <div className="border-b border-gray-200"></div>
              </div>

              {/* Category */}
              <div>
                <div className="flex items-center gap-3 pb-2">
                  <BiCategory className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm text-gray-600">Category</Label>
                  <div className="ml-[84px] relative">
                    <Button
                      variant="ghost"
                      className="text-blue-600 text-sm p-0 h-auto"
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Category
                    </Button>
                    {showCategoryDropdown && (
                      <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-48 z-10">
                        <div className="mb-2">
                          <p className="text-sm font-medium mb-2">Select Category</p>
                          <div className="relative">
                            <Search className="h-3 w-3 absolute left-2 top-2.5 text-gray-400" />
                            <Input
                              placeholder="Search"
                              className="pl-7 h-8 text-xs"
                              value={searchCategory}
                              onChange={(e) => setSearchCategory(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          {filteredCategories.map((category) => (
                            <button
                              key={category}
                              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                              onClick={() => {
                                setSelectedCategory(category)
                                setShowCategoryDropdown(false)
                              }}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <Label className="text-sm text-gray-600">Location</Label>
                {editingLocation ? (
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onBlur={() => setEditingLocation(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingLocation(false)}
                    className="text-sm h-8 w-48 ml-[84px]"
                    autoFocus
                  />
                ) : (
                  <span
                    className="text-sm cursor-pointer hover:bg-gray-50 px-2 py-1 rounded ml-[84px]"
                    onClick={() => setEditingLocation(true)}
                  >
                    {location}
                  </span>
                )}
              </div>
            </div>
            <div className="border-b border-gray-200"></div>

            {/* Description and Attachments */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Description</Label>
                <Input
                  placeholder="Add a description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                variant="outline"
                className="border border-blue-300 text-blue-600 hover:bg-blue-50/70 hover:backdrop-blur-sm hover:border-blue-400 rounded-lg px-4 py-2 text-sm transition-all"
              >
                <Paperclip className="h-4 w-4 mr-2 text-blue-600" />
                Attach
              </Button>
            </div>
            <div className="border-b border-gray-200"></div>

            {/* Subtasks */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Subtask</h3>
              <div className="space-y-2">
                {subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-3">
                    <Checkbox
                      checked={subtask.completed}
                      onCheckedChange={() => handleSubtaskToggle(subtask.id)}
                    />
                    <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                      {subtask.text}
                    </span>
                  </div>
                ))}
              </div>
              {showSubtaskInput ? (
                <Input
                  placeholder="Enter new subtask..."
                  value={newSubtaskText}
                  onChange={(e) => setNewSubtaskText(e.target.value)}
                  onKeyDown={handleSubtaskKeyPress}
                  autoFocus
                  className="text-sm"
                />
              ) : (
                <Button
                  variant="ghost"
                  className="text-blue-600 p-0 h-auto"
                  onClick={() => setShowSubtaskInput(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subtask
                </Button>
              )}
            </div>
            <div className="border-b border-gray-200"></div>

            {/* Comments */}
            <div className="space-y-4">
              {/* Display existing comments */}
              {comments.length > 0 && (
                <div className="space-y-3">
                  {comments.map((commentItem) => (
                    <div key={commentItem.id} className="flex justify-end">
                      <div className="flex items-start gap-2 max-w-xs">
                        <div className="bg-blue-500 text-white p-2 rounded-lg rounded-tr-none">
                          <p className="text-sm">{commentItem.text}</p>
                        </div>
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-gray-500 text-white text-xs">
                            {commentItem.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment input */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1 h-8 w-8 p-0 text-blue-600 hover:text-blue-700 z-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Add Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={handleCommentKeyPress}
                  className="pl-10 pr-10"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
                  onClick={handleSendComment}
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Mark As Completed Button */}
            <div className="flex justify-end pt-4">
              <Button className="bg-black hover:bg-gray-800 text-white">
                Mark As Completed
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}