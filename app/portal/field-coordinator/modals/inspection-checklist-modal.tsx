"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, CheckCircle, AlertTriangle, Camera } from "lucide-react"
import { InspectionAssignment } from "../data/inspections-data"

interface InspectionChecklistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  assignment: InspectionAssignment | null
  onSubmitReport: (report: InspectionReport) => void
}

interface ChecklistItem {
  id: string
  item: string
  completed: boolean
  notes: string
  images: File[]
}

interface InspectionReport {
  assignmentId: string
  checklistItems: ChecklistItem[]
  overallRecommendation: string
  additionalNotes: string
  inspectorName: string
  completedDate: string
}

export function InspectionChecklistModal({
  open,
  onOpenChange,
  assignment,
  onSubmitReport
}: InspectionChecklistModalProps) {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([])
  const [overallRecommendation, setOverallRecommendation] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [inspectorName, setInspectorName] = useState("Sarah Wanjiku") // Default field coordinator name

  // Initialize checklist items when assignment changes
  useState(() => {
    if (assignment?.checklist) {
      const items: ChecklistItem[] = assignment.checklist.map((item, index) => ({
        id: `item-${index}`,
        item,
        completed: false,
        notes: "",
        images: []
      }))
      setChecklistItems(items)
    }
  }, [assignment])

  const handleChecklistItemChange = (itemId: string, field: keyof ChecklistItem, value: any) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, [field]: value }
          : item
      )
    )
  }

  const handleImageUpload = (itemId: string, files: FileList | null) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files)
      setChecklistItems(prev =>
        prev.map(item =>
          item.id === itemId
            ? { ...item, images: [...item.images, ...newImages] }
            : item
        )
      )
    }
  }

  const removeImage = (itemId: string, imageIndex: number) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, images: item.images.filter((_, index) => index !== imageIndex) }
          : item
      )
    )
  }

  const handleSubmit = () => {
    if (!assignment) return

    const report: InspectionReport = {
      assignmentId: assignment.id,
      checklistItems,
      overallRecommendation,
      additionalNotes,
      inspectorName,
      completedDate: new Date().toISOString()
    }

    onSubmitReport(report)
    onOpenChange(false)
  }

  const completedItems = checklistItems.filter(item => item.completed).length
  const totalItems = checklistItems.length
  const allItemsCompleted = completedItems === totalItems && totalItems > 0

  if (!assignment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mill Inspection Checklist</DialogTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{assignment.businessName}</span>
            <Badge variant="outline">{assignment.businessId}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Progress Indicator */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Inspection Progress</span>
              <span className="text-sm text-gray-600">{completedItems} of {totalItems} items completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalItems > 0 ? (completedItems / totalItems) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Inspection Requirements</h3>
            {checklistItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={(checked) =>
                      handleChecklistItemChange(item.id, 'completed', checked)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-medium ${item.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                        {item.item}
                      </span>
                      {item.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Inspection Notes</Label>
                      <Textarea
                        placeholder="Add notes about this inspection item..."
                        value={item.notes}
                        onChange={(e) =>
                          handleChecklistItemChange(item.id, 'notes', e.target.value)
                        }
                        className="min-h-20"
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Evidence Photos</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(item.id, e.target.files)}
                          className="hidden"
                          id={`file-upload-${item.id}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`file-upload-${item.id}`)?.click()}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Add Photos
                        </Button>
                      </div>

                      {item.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {item.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Evidence ${index + 1}`}
                                className="w-full h-20 object-cover rounded border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(item.id, index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Recommendation */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold">Inspector Details</h3>

            <div className="space-y-2">
              <Label>Inspector Name</Label>
              <Input
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                placeholder="Enter inspector name"
              />
            </div>

            <div className="space-y-2">
              <Label>Overall Recommendation</Label>
              <Textarea
                value={overallRecommendation}
                onChange={(e) => setOverallRecommendation(e.target.value)}
                placeholder="Provide your overall recommendation based on the inspection findings..."
                className="min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any additional observations or comments..."
                className="min-h-20"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center border-t pt-6">
            <div className="flex items-center gap-2">
              {allItemsCompleted ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">All inspection items completed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">{totalItems - completedItems} items remaining</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!allItemsCompleted || !overallRecommendation.trim() || !inspectorName.trim()}
              >
                Submit Inspection Report
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}