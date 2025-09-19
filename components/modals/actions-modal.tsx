"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Tractor, Users, FileText, Clock, CheckCircle, MapPin, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ActionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActionsModal({ open, onOpenChange }: ActionsModalProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Quick Actions
          </DialogTitle>
          <DialogDescription>
            Perform common tasks and actions
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="visits" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="visits">Schedule Visit</TabsTrigger>
            <TabsTrigger value="farms">Register Farm</TabsTrigger>
            <TabsTrigger value="farmers">Register Farmer</TabsTrigger>
            <TabsTrigger value="reports">Generate Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visits" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-blue-500" />
                Schedule New Field Visit
              </h3>
              
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="farm">Select Farm</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a farm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farm1">Green Valley Farm</SelectItem>
                        <SelectItem value="farm2">Sunrise Agriculture</SelectItem>
                        <SelectItem value="farm3">Golden Harvest</SelectItem>
                        <SelectItem value="farm4">Blue Ridge Farm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="visitType">Visit Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance">Compliance Check</SelectItem>
                        <SelectItem value="crop">Crop Assessment</SelectItem>
                        <SelectItem value="disease">Disease Monitoring</SelectItem>
                        <SelectItem value="general">General Inspection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input type="date" id="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input type="time" id="time" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Estimated Duration (hours)</Label>
                    <Input type="number" id="duration" placeholder="2" min="0.5" step="0.5" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter any additional notes or instructions for this visit" />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                  <Button>Schedule Visit</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="farms" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Tractor className="h-5 w-5 text-green-500" />
                Register New Farm
              </h3>
              
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input id="farmName" placeholder="Enter farm name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="farmer">Farm Owner</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a farmer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farmer1">Mary Johnson</SelectItem>
                        <SelectItem value="farmer2">David Smith</SelectItem>
                        <SelectItem value="farmer3">Sarah Wilson</SelectItem>
                        <SelectItem value="farmer4">Robert Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="County, Region" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="size">Size (acres)</Label>
                    <Input type="number" id="size" placeholder="Enter farm size" min="0" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Primary Crop</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="tea">Tea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coordinates">GPS Coordinates</Label>
                    <Input id="coordinates" placeholder="Latitude, Longitude" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Farm Description</Label>
                  <Textarea id="description" placeholder="Enter farm description and additional details" />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                  <Button>Register Farm</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="farmers" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-purple-500" />
                Register New Farmer
              </h3>
              
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="Enter email address" type="email" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nationalId">National ID</Label>
                    <Input id="nationalId" placeholder="Enter national ID number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="County, Region" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input type="date" id="dob" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="farmerNotes">Additional Information</Label>
                  <Textarea id="farmerNotes" placeholder="Enter any additional information about the farmer" />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                  <Button>Register Farmer</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-orange-500" />
                Generate New Report
              </h3>
              
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="reportType">Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance">Compliance Report</SelectItem>
                        <SelectItem value="field-visits">Field Visit Report</SelectItem>
                        <SelectItem value="crop-analysis">Crop Analysis Report</SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Timeframe</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="kisumu">Kisumu County</SelectItem>
                        <SelectItem value="kakamega">Kakamega County</SelectItem>
                        <SelectItem value="bungoma">Bungoma County</SelectItem>
                        <SelectItem value="siaya">Siaya County</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="format">Output Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reportNotes">Report Notes</Label>
                  <Textarea id="reportNotes" placeholder="Enter any additional notes or parameters for this report" />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                  <Button>Generate Report</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}