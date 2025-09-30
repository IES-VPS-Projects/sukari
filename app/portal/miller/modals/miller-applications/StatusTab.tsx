"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, CheckCircle2, Circle, Clock, AlertCircle, ClipboardList, Eye, CheckCircle } from "lucide-react"
import { applicationStages, existingApplications } from './constants'
import { getStatusColor } from './utils'
import { SubmittedApplication } from './types'

interface StatusTabProps {
  submittedApplications: SubmittedApplication[]
}

export function StatusTab({ submittedApplications }: StatusTabProps) {
  const [selectedApplication, setSelectedApplication] = useState<SubmittedApplication | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'in-review':
        return <AlertCircle className="h-4 w-4 text-blue-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  if (selectedApplication) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setSelectedApplication(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Button>

          <Badge className={getStatusColor(selectedApplication.status)}>
            {selectedApplication.status}
          </Badge>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-green-800 mb-2">{selectedApplication.title}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-green-700">
            <span>ID: {selectedApplication.id}</span>
            <span className="hidden sm:inline">•</span>
            <span>Type: {selectedApplication.type}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Application Details</h4>
            <div className="bg-white border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Applicant:</span>
                <span className="font-medium">{selectedApplication.applicant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-medium">{selectedApplication.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Submission Date:</span>
                <span className="font-medium">{selectedApplication.submitDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Stage:</span>
                <span className="font-medium">{selectedApplication.stage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{selectedApplication.quantity}</span>
              </div>

              {selectedApplication.completionDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Date:</span>
                  <span className="font-medium">{selectedApplication.completionDate}</span>
                </div>
              )}

              {selectedApplication.expectedCompletion && !selectedApplication.completionDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Completion:</span>
                  <span className="font-medium">{selectedApplication.expectedCompletion}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Additional Information</h4>
            <div className="bg-white border rounded-lg p-4">
              <h5 className="font-medium mb-2">Notes</h5>
              <p className="text-gray-700">{selectedApplication.notes}</p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h5 className="font-medium mb-2">Documents</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Application Form {selectedApplication.id}.pdf</span>
                </div>
                {selectedApplication.status === "Under Review" && (
                  <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span>Supporting Documents.pdf</span>
                  </div>
                )}
                {selectedApplication.status === "Approved" && (
                  <div className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span>Approval Certificate.pdf</span>
                  </div>
                )}
              </div>
            </div>

            {selectedApplication.status === "Under Review" && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Under Review</p>
                    <p className="text-sm text-blue-700">
                      Your application is being reviewed. You will be notified once the review is complete.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Application Progress Tracking */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Application Progress Tracker
          </h4>

          {/* Progress Timeline */}
          <div className="relative bg-white border rounded-lg p-6">
            {/* Progress Line */}
            <div className="absolute top-12 left-8 right-8 h-0.5 bg-gray-200"></div>

            {/* Stages */}
            <div className="relative flex justify-between">
              {applicationStages.map((stage, index) => {
                // Mock stage status based on application status
                const getStageStatus = (stageId: string) => {
                  const stageOrder = ["submission", "review", "inspection", "evaluation", "approval", "issuance"]
                  const currentStage = selectedApplication.stage?.toLowerCase() || "submission"
                  const currentIndex = stageOrder.indexOf(currentStage)
                  const stageIndex = stageOrder.indexOf(stageId)

                  if (selectedApplication.status === "Approved") {
                    return "completed"
                  } else if (stageIndex < currentIndex) {
                    return "completed"
                  } else if (stageIndex === currentIndex) {
                    return "current"
                  } else {
                    return "pending"
                  }
                }

                const status = getStageStatus(stage.id)

                return (
                  <div key={stage.id} className="flex flex-col items-center text-center w-1/6">
                    <div className={`z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      status === "completed" ? "bg-green-500 border-green-500" :
                      status === "current" ? "bg-blue-500 border-blue-500" :
                      "bg-white border-gray-300"
                    }`}>
                      {status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      ) : status === "current" ? (
                        <Circle className="h-5 w-5 text-white fill-current" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className={`text-xs font-medium ${
                        status === "completed" ? "text-green-700" :
                        status === "current" ? "text-blue-700" :
                        "text-gray-500"
                      }`}>
                        {stage.name}
                      </p>
                      <p className="text-xs text-gray-500 hidden md:block">{stage.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Status</h3>
      <div className="space-y-3">
        {[...submittedApplications, ...existingApplications].map((app) => (
          <div key={app.id} className="p-4 border rounded-lg space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{app.type}</h4>
                <p className="text-sm text-gray-600">ID: {app.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(app.status)}>
                  {app.status}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedApplication(app)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Submit Date:</span>
                <p className="font-medium">{app.submitDate ? new Date(app.submitDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              {app.completionDate && (
                <div>
                  <span className="text-gray-600">Completion Date:</span>
                  <p className="font-medium">{new Date(app.completionDate).toLocaleDateString()}</p>
                </div>
              )}
              {app.quantity && (
                <div>
                  <span className="text-gray-600">Quantity:</span>
                  <p className="font-medium">{app.quantity}</p>
                </div>
              )}
              {app.company && (
                <div>
                  <span className="text-gray-600">Company:</span>
                  <p className="font-medium">{app.company}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}