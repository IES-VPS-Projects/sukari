"use client"

import { useState, useEffect } from "react"
import { 
  FileCheck, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Upload, 
  Workflow
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useLicenses, useLicenseStats } from "@/hooks/use-licenses"
import { License } from "@/lib/api-client"
import { FormBuilderModal } from "@/components/modals/form-builder-modal"
import { WorkflowTemplatesModal } from "@/components/modals/workflow-templates-modal"
import { LicensesModal } from "@/components/modals/licenses-modal"
import { LicenseFormStatus } from "@/components/license-form-status"

const licenseTypes = [
  { value: "MILLERS", label: "Sugar Millers License" },
  { value: "FOOD_PROCESSING", label: "Food Processing License" },
  { value: "INDUSTRIAL", label: "Industrial License" },
  { value: "EXPORT", label: "Export License" },
  { value: "WAREHOUSE", label: "Warehouse License" },
  { value: "QUALITY_ASSURANCE", label: "Quality Assurance License" },
  { value: "WHITE_SUGAR", label: "White Sugar Production License" },
  { value: "PROCESSING", label: "Sugar Processing License" }
]

const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "PENDING", label: "Pending" },
  { value: "EXPIRED", label: "Expired" },
  { value: "SUSPENDED", label: "Suspended" }
]

export default function LicenseManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false)
  const [isWorkflowTemplatesOpen, setIsWorkflowTemplatesOpen] = useState(false)
  const [isLicensesModalOpen, setIsLicensesModalOpen] = useState(false)

  // Fetch licenses data
  const { data: licensesData, isLoading: licensesLoading, error: licensesError } = useLicenses(1, 100)
  const licenseStats = useLicenseStats()

  const [filteredLicenses, setFilteredLicenses] = useState<License[]>([])

  // Filter licenses based on search and filters
  useEffect(() => {
    if (!licensesData?.data) return

    let filtered = licensesData.data

    if (searchQuery) {
      filtered = filtered.filter(license =>
        license.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        license.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        license.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        license.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(license => license.type === typeFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(license => license.status === statusFilter)
    }

    setFilteredLicenses(filtered)
  }, [licensesData, searchQuery, typeFilter, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "EXPIRED":
        return "bg-red-100 text-red-800"
      case "SUSPENDED":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "EXPIRED":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "SUSPENDED":
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
      default:
        return <FileCheck className="h-4 w-4 text-gray-600" />
    }
  }

  const handleLicenseAction = (action: string, licenseId: string) => {
    const license = licensesData?.data?.find(l => l.id === licenseId)
    if (!license) return

    switch (action) {
      case "view":
        setSelectedLicense(license)
        setIsViewDialogOpen(true)
        break
      case "edit":
        setSelectedLicense(license)
        setIsLicensesModalOpen(true)
        break
      case "createForm":
        setIsFormBuilderOpen(true)
        break
      case "createWorkflow":
        setIsWorkflowTemplatesOpen(true)
        break
      case "approve":
        // Handle license approval
        console.log("Approving license:", licenseId)
        break
      case "suspend":
        // Handle license suspension
        console.log("Suspending license:", licenseId)
        break
      case "renew":
        // Handle license renewal
        console.log("Renewing license:", licenseId)
        break
      case "delete":
        if (confirm("Are you sure you want to delete this license?")) {
          console.log("Deleting license:", licenseId)
        }
        break
    }
  }

  // Helper functions removed as they're no longer needed with the new data structure

  if (licensesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-2 text-green-600" />
          <p className="text-gray-600">Loading licenses...</p>
        </div>
      </div>
    )
  }

  if (licensesError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
          <p className="text-red-600">Error loading licenses</p>
          <p className="text-sm text-gray-500 mt-1">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">License Management</h1>
          <p className="text-gray-600 mt-1">Oversee all licenses, permits, and regulatory approvals</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setIsLicensesModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create License
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Licenses</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{licenseStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{licenseStats.active}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((licenseStats.active / licenseStats.total) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{licenseStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Licenses</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{licenseStats.expired}</div>
            <p className="text-xs text-muted-foreground">
              Need renewal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>License Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search licenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {licenseTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Licenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Licenses ({filteredLicenses.length})</CardTitle>
          <CardDescription>
            Manage all licenses, permits, and regulatory approvals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Issuing Authority</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Forms</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {getStatusIcon(license.status)}
                        </div>
                        <div>
                          <div className="font-medium">{license.name}</div>
                          <div className="text-sm text-gray-500">{license.description}</div>
                          <div className="text-sm text-gray-500">Validity: {license.validityPeriod} months</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{license.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(license.status)}>
                          {license.status}
                        </Badge>
                        {license.renewalRequired && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Renewal Required
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">KSh {typeof license.cost === 'string' ? parseInt(license.cost).toLocaleString() : license.cost.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{license.processingTime}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{license.issuingAuthority}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        {license.isDigital && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            Digital
                          </Badge>
                        )}
                        {license.onlineApplication && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs ml-1">
                            Online
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{license._count?.applications || 0}</div>
                        <div className="text-sm text-gray-500">Applications</div>
                        <div className="font-medium text-green-600">{license._count?.renewals || 0}</div>
                        <div className="text-sm text-gray-500">Renewals</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <LicenseFormStatus licenseId={license.id} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleLicenseAction("view", license.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleLicenseAction("edit", license.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit License
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleLicenseAction("createForm", license.id)}>
                             Create Form
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleLicenseAction("createWorkflow", license.id)}>
                            <Workflow className="h-4 w-4 mr-2" />
                            Create Workflow
                          </DropdownMenuItem>
                          {license.status === "PENDING" && (
                            <DropdownMenuItem onClick={() => handleLicenseAction("approve", license.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve License
                            </DropdownMenuItem>
                          )}
                          {license.status === "ACTIVE" && (
                            <DropdownMenuItem onClick={() => handleLicenseAction("suspend", license.id)}>
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Suspend License
                            </DropdownMenuItem>
                          )}
                          {license.renewalRequired && (
                            <DropdownMenuItem onClick={() => handleLicenseAction("renew", license.id)}>
                              <Clock className="h-4 w-4 mr-2" />
                              Renew License
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleLicenseAction("delete", license.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete License
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* License Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>License Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected license
            </DialogDescription>
          </DialogHeader>
          {selectedLicense && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">License ID</Label>
                  <p className="text-sm text-gray-600">{selectedLicense.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getStatusColor(selectedLicense.status)}>
                    {selectedLicense.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">License Name</Label>
                <p className="text-sm text-gray-600">{selectedLicense.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-gray-600">{selectedLicense.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <p className="text-sm text-gray-600">{selectedLicense.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <p className="text-sm text-gray-600">{selectedLicense.category}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Cost</Label>
                  <p className="text-sm text-gray-600">KSh {typeof selectedLicense.cost === 'string' ? parseInt(selectedLicense.cost).toLocaleString() : selectedLicense.cost.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Processing Time</Label>
                  <p className="text-sm text-gray-600">{selectedLicense.processingTime}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Validity Period</Label>
                  <p className="text-sm text-gray-600">{selectedLicense.validityPeriod} months</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Renewal Period</Label>
                  <p className="text-sm text-gray-600">{selectedLicense.renewalPeriod} months</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Issuing Authority</Label>
                <p className="text-sm text-gray-600">{selectedLicense.issuingAuthority}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Applications</Label>
                  <p className="text-sm text-gray-600">{selectedLicense._count?.applications || 0}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Renewals</Label>
                  <p className="text-sm text-gray-600">{selectedLicense._count?.renewals || 0}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Digital:</Label>
                  <Badge variant={selectedLicense.isDigital ? "default" : "secondary"}>
                    {selectedLicense.isDigital ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Online Application:</Label>
                  <Badge variant={selectedLicense.onlineApplication ? "default" : "secondary"}>
                    {selectedLicense.onlineApplication ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Label className="text-sm font-medium">Renewal Required:</Label>
                  <Badge variant={selectedLicense.renewalRequired ? "default" : "secondary"}>
                    {selectedLicense.renewalRequired ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Form Builder Modal */}
      <FormBuilderModal 
        open={isFormBuilderOpen} 
        onOpenChange={setIsFormBuilderOpen} 
      />
      
      {/* Workflow Templates Modal */}
      <WorkflowTemplatesModal 
        open={isWorkflowTemplatesOpen} 
        onOpenChange={setIsWorkflowTemplatesOpen} 
      />
      
      {/* Licenses Modal */}
      <LicensesModal 
        open={isLicensesModalOpen} 
        onOpenChange={setIsLicensesModalOpen}
        selectedLicense={selectedLicense}
      />
    </div>
  )
}
