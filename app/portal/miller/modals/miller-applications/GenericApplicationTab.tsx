"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Send, CheckCircle, ChevronRight } from "lucide-react"
import { ApplicationType } from './types'
import { SharedProps } from './types'

interface GenericApplicationTabProps extends Pick<SharedProps, 'formData' | 'handleInputChange' | 'isDraftSaved' | 'isSubmitted' | 'handleSubmit' | 'handleSaveDraft' | 'expandedApplication' | 'setExpandedApplication'> {
  applications: ApplicationType[]
}

export function GenericApplicationTab({
  applications,
  formData,
  handleInputChange,
  isDraftSaved,
  isSubmitted,
  handleSubmit,
  handleSaveDraft,
  expandedApplication,
  setExpandedApplication
}: GenericApplicationTabProps) {
  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div key={application.id} className="border rounded-lg">
          <div
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpandedApplication(expandedApplication === application.id ? '' : application.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{application.name}</h4>
                <p className="text-sm text-gray-600">{application.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    expandedApplication === application.id ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {expandedApplication === application.id && (
            <div className="border-t p-4 bg-gray-50">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {application.fields.map((field) => (
                  <div key={field.name}>
                    <Label htmlFor={field.name}>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {field.type === 'select' ? (
                      <Select
                        value={formData[field.name as keyof typeof formData] || ''}
                        onValueChange={(value) => handleInputChange(field.name, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option: string) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'textarea' ? (
                      <Textarea
                        id={field.name}
                        value={formData[field.name as keyof typeof formData] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="min-h-[100px]"
                        required={field.required}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        value={formData[field.name as keyof typeof formData] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    {isDraftSaved ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Draft Saved
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Save Draft
                      </>
                    )}
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Submitted
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}