"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface ScheduleVisitModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultLocation?: string
}

export function ScheduleVisitModal({ open, onOpenChange, defaultLocation }: ScheduleVisitModalProps) {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    title: "",
    location: defaultLocation || "",
    time: "",
    duration: "2",
    attendees: "",
    purpose: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - integrate with calendar
    console.log("Scheduling visit:", { ...formData, date })
    onOpenChange(false)
    // Reset form
    setFormData({
      title: "",
      location: "",
      time: "",
      duration: "2",
      attendees: "",
      purpose: "",
      notes: "",
    })
    setDate(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Site Visit</DialogTitle>
          <DialogDescription>Plan and schedule a visit to a mill or facility</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Visit Title</Label>
              <Input
                id="title"
                placeholder="e.g., Mumias Mill Inspection"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumias">Mumias Sugar Mill</SelectItem>
                  <SelectItem value="chemelil">Chemelil Sugar Mill</SelectItem>
                  <SelectItem value="nzoia">Nzoia Sugar Mill</SelectItem>
                  <SelectItem value="muhoroni">Muhoroni Sugar Mill</SelectItem>
                  <SelectItem value="sony">Sony Sugar Mill</SelectItem>
                  <SelectItem value="other">Other Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours)</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="8">Full day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">Attendees</Label>
            <Input
              id="attendees"
              placeholder="Enter email addresses separated by commas"
              value={formData.attendees}
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of Visit</Label>
            <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inspection">Routine Inspection</SelectItem>
                <SelectItem value="compliance">Compliance Review</SelectItem>
                <SelectItem value="maintenance">Maintenance Check</SelectItem>
                <SelectItem value="meeting">Stakeholder Meeting</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information or requirements..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Schedule Visit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
