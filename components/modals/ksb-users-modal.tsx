"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, Plus, Download, Loader2, X, ArrowLeft } from "lucide-react"
import { useDepartments, type Department, type CreateDepartmentRequest } from "@/hooks/use-departments"
import { useKsbUsers, type KsbUser, type CreateKsbUserData } from "@/hooks/use-ksb-users"
import { useState, useEffect } from "react"

// Define view types for the modal
type ModalView = 'main' | 'addDepartment' | 'addUser' | 'editUser' | 'viewOfficers' | 'editDepartment'


interface KsbUsersModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
}

export function KsbUsersModal({ open, onOpenChange }: KsbUsersModalProps) {
  const { 
    departments, 
    isLoading: departmentsLoading, 
    error: departmentsError, 
    pagination: departmentsPagination,
    createDepartment,
    updateDepartment,
    addUserToDepartment,
    removeUserFromDepartment,
    isCreating,
    isUpdating: isUpdatingDepartment,
    isAddingUser,
    isRemovingUser,
    createError,
    updateError: updateDepartmentError,
    addUserError,
    removeUserError
  } = useDepartments()
  const { 
    users, 
    isLoading: usersLoading, 
    error: usersError, 
    pagination: usersPagination,
    createKsbUser,
    updateKsbUser,
    isCreating: isCreatingUser,
    isUpdating: isUpdatingUser,
    createError: createUserError,
    updateError: updateUserError
  } = useKsbUsers()

  // State for modal views
  const [currentView, setCurrentView] = useState<ModalView>('main')
  const [newDepartment, setNewDepartment] = useState<CreateDepartmentRequest>({
    name: '',
    description: '',
    departmentCode: '',
    maxOfficers: 10,
    headOfDepartmentId: undefined
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newUser, setNewUser] = useState<CreateKsbUserData>({
    email: '',
    pin: '',
    role: 'KSB_FIELD_OFFICER',
    employeeId: '',
    departmentId: '',
    designation: '',
    phoneNumber: '',
    officeLocation: '',
    isKSBUser: true,
    isActive: true
  })
  const [isSubmittingUser, setIsSubmittingUser] = useState(false)
  const [editingUser, setEditingUser] = useState<KsbUser | null>(null)
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [isSubmittingDepartmentEdit, setIsSubmittingDepartmentEdit] = useState(false)
  const [selectedUserToAdd, setSelectedUserToAdd] = useState<string>('')
  const [isAddingUserToDept, setIsAddingUserToDept] = useState(false)
  const [isRemovingUserFromDept, setIsRemovingUserFromDept] = useState(false)

  // Helper functions
  const getUserStatusVariant = (user: KsbUser) => {
    if (user.isActive) return 'default'
    return 'destructive'
  }

  const getUserStatusClassName = (user: KsbUser) => {
    if (user.isActive) return 'bg-green-100 text-green-800'
    return 'bg-red-100 text-red-800'
  }

  const getUserStatusText = (user: KsbUser) => {
    return user.isActive ? 'Active' : 'Inactive'
  }

  const formatRole = (role: string) => {
    return role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getDepartmentStatusBadge = (department: Department) => {
    return department.isActive ? 'Active' : 'Inactive'
  }

  const getDepartmentStatusClassName = (department: Department) => {
    return department.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  // Handle creating a new department
  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newDepartment.name || !newDepartment.departmentCode) {
      alert('Name and Department Code are required')
      return
    }

    setIsSubmitting(true)
    createDepartment(newDepartment)
  }

  // Handle creating a new user
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newUser.email || !newUser.employeeId || !newUser.departmentId || !newUser.pin) {
      alert('Email, Employee ID, Department, and PIN are required')
      return
    }

    setIsSubmittingUser(true)
    createKsbUser(newUser)
  }

  // Handle editing a user
  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingUser) return

    if (!editingUser.email || !editingUser.employeeId || !editingUser.departmentId) {
      alert('Email, Employee ID, and Department are required')
      return
    }

    setIsSubmittingEdit(true)
    updateKsbUser({
      id: editingUser.id,
      email: editingUser.email,
      role: editingUser.role,
      employeeId: editingUser.employeeId,
      departmentId: editingUser.departmentId,
      designation: editingUser.designation,
      phoneNumber: editingUser.phoneNumber,
      officeLocation: editingUser.officeLocation,
      isKSBUser: editingUser.isKSBUser,
      isActive: editingUser.isActive
    })
  }

  // Handle successful department creation
  useEffect(() => {
    if (isSubmitting && !isCreating && !createError) {
      // Department was created successfully
      setNewDepartment({
        name: '',
        description: '',
        departmentCode: '',
        maxOfficers: 10,
        headOfDepartmentId: undefined
      })
      setCurrentView('main')
      setIsSubmitting(false)
    } else if (isSubmitting && !isCreating && createError) {
      // There was an error, reset submitting state
      setIsSubmitting(false)
    }
  }, [isSubmitting, isCreating, createError])

  // Handle successful user creation
  useEffect(() => {
    if (isSubmittingUser && !isCreatingUser && !createUserError) {
      // User was created successfully
      setNewUser({
        email: '',
        pin: '',
        role: 'KSB_FIELD_OFFICER',
        employeeId: '',
        departmentId: '',
        designation: '',
        phoneNumber: '',
        officeLocation: '',
        isKSBUser: true,
        isActive: true
      })
      setCurrentView('main')
      setIsSubmittingUser(false)
    } else if (isSubmittingUser && !isCreatingUser && createUserError) {
      // There was an error, reset submitting state
      setIsSubmittingUser(false)
    }
  }, [isSubmittingUser, isCreatingUser, createUserError])

  // Handle successful user update
  useEffect(() => {
    if (isSubmittingEdit && !isUpdatingUser && !updateUserError) {
      // User was updated successfully
      setEditingUser(null)
      setCurrentView('main')
      setIsSubmittingEdit(false)
    } else if (isSubmittingEdit && !isUpdatingUser && updateUserError) {
      // There was an error, reset submitting state
      setIsSubmittingEdit(false)
    }
  }, [isSubmittingEdit, isUpdatingUser, updateUserError])

  // Handle successful department update
  useEffect(() => {
    if (isSubmittingDepartmentEdit && !isUpdatingDepartment && !updateDepartmentError) {
      // Department was updated successfully
      setEditingDepartment(null)
      setCurrentView('main')
      setIsSubmittingDepartmentEdit(false)
    } else if (isSubmittingDepartmentEdit && !isUpdatingDepartment && updateDepartmentError) {
      // There was an error, reset submitting state
      setIsSubmittingDepartmentEdit(false)
    }
  }, [isSubmittingDepartmentEdit, isUpdatingDepartment, updateDepartmentError])

  // Handle successful user addition to department
  useEffect(() => {
    if (isAddingUserToDept && !isAddingUser && !addUserError) {
      // User was added successfully
      setSelectedUserToAdd('')
      setIsAddingUserToDept(false)
    } else if (isAddingUserToDept && !isAddingUser && addUserError) {
      // There was an error, reset submitting state
      setIsAddingUserToDept(false)
    }
  }, [isAddingUserToDept, isAddingUser, addUserError])

  // Handle successful user removal from department
  useEffect(() => {
    if (isRemovingUserFromDept && !isRemovingUser && !removeUserError) {
      // User was removed successfully
      setIsRemovingUserFromDept(false)
    } else if (isRemovingUserFromDept && !isRemovingUser && removeUserError) {
      // There was an error, reset submitting state
      setIsRemovingUserFromDept(false)
    }
  }, [isRemovingUserFromDept, isRemovingUser, removeUserError])

  // Start editing a user
  const handleStartEditUser = (user: KsbUser) => {
    setEditingUser(user)
    setCurrentView('editUser')
  }

  // View officers for a department
  const handleViewOfficers = (department: Department) => {
    setSelectedDepartment(department)
    setCurrentView('viewOfficers')
  }

  // Start editing a department
  const handleStartEditDepartment = (department: Department) => {
    setEditingDepartment(department)
    setCurrentView('editDepartment')
  }

  // Handle editing a department
  const handleEditDepartment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingDepartment) return

    if (!editingDepartment.name || !editingDepartment.departmentCode) {
      alert('Name and Department Code are required')
      return
    }

    setIsSubmittingDepartmentEdit(true)
    updateDepartment({
      id: editingDepartment.id,
      name: editingDepartment.name,
      description: editingDepartment.description,
      departmentCode: editingDepartment.departmentCode,
      maxOfficers: editingDepartment.maxOfficers,
      headOfDepartmentId: editingDepartment.headOfDepartmentId
    })
  }

  // Handle adding user to department
  const handleAddUserToDepartment = () => {
    if (!selectedDepartment || !selectedUserToAdd) {
      alert('Please select a user to add')
      return
    }

    setIsAddingUserToDept(true)
    addUserToDepartment({
      departmentId: selectedDepartment.id,
      userId: selectedUserToAdd
    })
  }

  // Handle removing user from department
  const handleRemoveUserFromDepartment = (userId: string) => {
    if (!selectedDepartment) return

    if (confirm('Are you sure you want to remove this user from the department?')) {
      setIsRemovingUserFromDept(true)
      removeUserFromDepartment({
        departmentId: selectedDepartment.id,
        userId: userId
      })
    }
  }

  // Reset form and go back to main view
  const handleBackToMain = () => {
    setCurrentView('main')
    setNewDepartment({
      name: '',
      description: '',
      departmentCode: '',
      maxOfficers: 10,
      headOfDepartmentId: undefined
    })
    setNewUser({
      email: '',
      pin: '',
      role: 'KSB_FIELD_OFFICER',
      employeeId: '',
      departmentId: '',
      designation: '',
      phoneNumber: '',
      officeLocation: '',
      isKSBUser: true,
      isActive: true
    })
    setEditingUser(null)
    setSelectedDepartment(null)
    setEditingDepartment(null)
    setIsSubmittingDepartmentEdit(false)
    setSelectedUserToAdd('')
    setIsAddingUserToDept(false)
    setIsRemovingUserFromDept(false)
  }

  // Render user options for the dropdown
  const renderUserOptions = () => {
    if (usersLoading) {
      return (
        <SelectItem value="loading" disabled>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading users...</span>
          </div>
        </SelectItem>
      )
    }

    if (usersError) {
      return (
        <SelectItem value="error" disabled>
          <span className="text-red-500">Error loading users</span>
        </SelectItem>
      )
    }

    return users
      .filter((user: KsbUser) => user.isActive && user.isKSBUser)
      .map((user: KsbUser) => (
        <SelectItem key={user.id} value={user.id}>
          <div className="flex flex-col">
            <span className="font-medium">{user.employeeId}</span>
            <span className="text-sm text-gray-500">{user.email} • {user.designation}</span>
          </div>
        </SelectItem>
      ))
  }

  // Render department options for the dropdown
  const renderDepartmentOptions = () => {
    if (departmentsLoading) {
      return (
        <SelectItem value="loading" disabled>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading departments...</span>
          </div>
        </SelectItem>
      )
    }

    if (departmentsError) {
      return (
        <SelectItem value="error" disabled>
          <span className="text-red-500">Error loading departments</span>
        </SelectItem>
      )
    }

    return departments
      .filter((dept: Department) => dept.isActive)
      .map((dept: Department) => (
        <SelectItem key={dept.id} value={dept.id}>
          <div className="flex flex-col">
            <span className="font-medium">{dept.name}</span>
            <span className="text-sm text-gray-500">{dept.departmentCode}</span>
          </div>
        </SelectItem>
      ))
  }

  // Handle modal close - reset to main view
  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen) {
      setCurrentView('main')
      setNewDepartment({
        name: '',
        description: '',
        departmentCode: '',
        maxOfficers: 10,
        headOfDepartmentId: undefined
      })
      setNewUser({
        email: '',
        pin: '',
        role: 'KSB_FIELD_OFFICER',
        employeeId: '',
        departmentId: '',
        designation: '',
        phoneNumber: '',
        officeLocation: '',
        isKSBUser: true,
        isActive: true
      })
      setEditingUser(null)
      setSelectedDepartment(null)
      setEditingDepartment(null)
      setIsSubmittingDepartmentEdit(false)
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-blue-600" />
            KSB Users Management
          </DialogTitle>
          <DialogDescription>
            Manage KSB system users, roles, and permissions
          </DialogDescription>
        </DialogHeader>
        
        {currentView === 'main' ? (
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users">All Users</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            {/* Users Tab Content */}
            {(() => {
              if (usersLoading) {
                return (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading users...</span>
                  </div>
                )
              }
              
              if (usersError) {
                return (
                  <div className="text-center py-8">
                    <p className="text-red-600">Error loading users: {usersError.message}</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                      Retry
                    </Button>
                  </div>
                )
              }
              
              return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-black">{usersPagination?.total || users.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-black">{users.filter((u: KsbUser) => u.isActive).length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">KSB Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-black">{users.filter((u: KsbUser) => u.isKSBUser).length}</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={() => setCurrentView('addUser')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Users
                  </Button>
                   
                </div>
                
                {/* Users Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>Complete list of KSB system users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user: KsbUser) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <UserCheck className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{user.employeeId}</h4>
                              <p className="text-sm text-gray-500">{user.email}</p>
                              <p className="text-xs text-gray-400">{user.department.name} • {formatRole(user.role)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge 
                              variant={getUserStatusVariant(user)}
                              className={getUserStatusClassName(user)}
                            >
                              {getUserStatusText(user)}
                            </Badge>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Designation</p>
                              <p className="text-xs text-gray-400">{user.designation}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStartEditUser(user)}
                              >
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
              )
            })()}
          </TabsContent>
          
            <TabsContent value="departments" className="space-y-4">
              {/* Departments Tab Content */}
              {(() => {
                if (departmentsLoading) {
                  return (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="ml-2">Loading departments...</span>
                    </div>
                  )
                }
                
                if (departmentsError) {
                  return (
                    <div className="text-center py-8">
                      <p className="text-red-600">Error loading departments: {departmentsError.message}</p>
                      <Button onClick={() => window.location.reload()} className="mt-4">
                        Retry
                      </Button>
                    </div>
                  )
                }
                
                return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Departments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-black">{departmentsPagination?.total || departments.length}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Active Departments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-black">{departments.filter((d: Department) => d.isActive).length}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Officers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-black">{departments.reduce((sum: number, d: Department) => sum + d.currentOfficerCount, 0)}</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={() => setCurrentView('addDepartment')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Department
                    </Button>
                    
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                  
                  {/* Departments Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map((dept: Department) => (
                      <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{dept.name}</CardTitle>
                            <Badge variant="outline" className={getDepartmentStatusClassName(dept)}>
                              {getDepartmentStatusBadge(dept)}
                            </Badge>
                          </div>
                          <CardDescription>{dept.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Code:</span>
                              <span className="font-medium">{dept.departmentCode}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Current Officers:</span>
                              <span className="font-medium">{dept.users.length}/{dept.maxOfficers}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Head of Department:</span>
                              <span className="font-medium">{dept.headOfDepartment?.employeeId || 'Not assigned'}</span>
                            </div>
                            {dept.users.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs text-gray-500">Officers:</span>
                                <div className="mt-1 space-y-1">
                                  {dept.users.slice(0, 2).map((user) => (
                                    <div key={user.id} className="text-xs text-gray-600">
                                      {user.employeeId} • {user.designation}
                                    </div>
                                  ))}
                                  {dept.users.length > 2 && (
                                    <div className="text-xs text-gray-500">
                                      +{dept.users.length - 2} more
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleViewOfficers(dept)}
                            >
                              View Officers
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleStartEditDepartment(dept)}
                            >
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
                )
              })()}
            </TabsContent>
          </Tabs>
        ) : currentView === 'addDepartment' ? (
          // Add Department View
          <div className="space-y-6">
              <Button
              variant="outline"
                size="sm"
                onClick={handleBackToMain}
                className="flex items-center gap-2"
              >
              <ArrowLeft className="h-4 w-4" />
                Back to Users
              </Button>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Add New Department</h2>
                <p className="text-sm text-gray-500">Create a new department in the KSB system</p>
              </div>
            </div>
            
            <form onSubmit={handleCreateDepartment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Department Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  placeholder="Enter department name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="departmentCode">Department Code *</Label>
                <Input
                  id="departmentCode"
                  type="text"
                  value={newDepartment.departmentCode}
                  onChange={(e) => setNewDepartment({ ...newDepartment, departmentCode: e.target.value })}
                  placeholder="e.g., IT-001, HR-002"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                  placeholder="Enter department description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxOfficers">Maximum Officers</Label>
                <Input
                  id="maxOfficers"
                  type="number"
                  value={newDepartment.maxOfficers}
                  onChange={(e) => setNewDepartment({ ...newDepartment, maxOfficers: parseInt(e.target.value) || 10 })}
                  min="1"
                  max="100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headOfDepartmentId">Head of Department</Label>
                <Select
                  value={newDepartment.headOfDepartmentId || 'none'}
                  onValueChange={(value) => setNewDepartment({ ...newDepartment, headOfDepartmentId: value === 'none' ? undefined : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Head of Department</SelectItem>
                    {renderUserOptions()}
                  </SelectContent>
                </Select>
              </div>
              
              {createError && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                  Error creating department: {createError.message}
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Department
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToMain}
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : currentView === 'addUser' ? (
          // Add User View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Button>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Add New User</h2>
                <p className="text-sm text-gray-500">Create a new KSB system user</p>
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email *</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="user@ksb.gov.ke"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userPin">PIN *</Label>
                  <Input
                    id="userPin"
                    type="text"
                    value={newUser.pin}
                    onChange={(e) => setNewUser({ ...newUser, pin: e.target.value })}
                    placeholder="1234"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID *</Label>
                  <Input
                    id="employeeId"
                    type="text"
                    value={newUser.employeeId}
                    onChange={(e) => setNewUser({ ...newUser, employeeId: e.target.value })}
                    placeholder="KSB001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userRole">Role *</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KSB_FIELD_OFFICER">Field Officer</SelectItem> 
                      <SelectItem value="KSB_FIELD_COORDINATOR">Field Coordinator</SelectItem> 
                      <SelectItem value="KSB_FINANCE">Finance</SelectItem> 
                      <SelectItem value="KSB_COMPLIANCE">Compliance</SelectItem> 
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userDepartment">Department *</Label>
                <Select
                  value={newUser.departmentId}
                  onValueChange={(value) => setNewUser({ ...newUser, departmentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {renderDepartmentOptions()}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    type="text"
                    value={newUser.designation}
                    onChange={(e) => setNewUser({ ...newUser, designation: e.target.value })}
                    placeholder="Senior Field Officer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={newUser.phoneNumber}
                    onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                    placeholder="+254712345678"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="officeLocation">Office Location</Label>
                <Input
                  id="officeLocation"
                  type="text"
                  value={newUser.officeLocation}
                  onChange={(e) => setNewUser({ ...newUser, officeLocation: e.target.value })}
                  placeholder="Nairobi Office"
                />
              </div>

              {createUserError && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                  Error creating user: {createUserError.message}
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmittingUser}
                  className="flex-1"
                >
                  {isSubmittingUser ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create User
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToMain}
                  disabled={isSubmittingUser}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : currentView === 'editUser' ? (
          // Edit User View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Button>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Edit User</h2>
                <p className="text-sm text-gray-500">Update user information</p>
              </div>
            </div>

            {editingUser && (
              <form onSubmit={handleEditUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editEmail">Email *</Label>
                    <Input
                      id="editEmail"
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      placeholder="user@ksb.gov.ke"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editEmployeeId">Employee ID *</Label>
                    <Input
                      id="editEmployeeId"
                      type="text"
                      value={editingUser.employeeId}
                      onChange={(e) => setEditingUser({ ...editingUser, employeeId: e.target.value })}
                      placeholder="KSB001"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editRole">Role *</Label>
                    <Select
                      value={editingUser.role}
                      onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KSB_FIELD_OFFICER">Field Officer</SelectItem>
                        <SelectItem value="KSB_MILLER">Miller</SelectItem>
                        <SelectItem value="KSB_CEO">CEO</SelectItem>
                        <SelectItem value="KSB_FIELD_COORDINATOR">Field Coordinator</SelectItem>
                        <SelectItem value="KSB_IMPORTER">Importer</SelectItem>
                        <SelectItem value="KSB_SUPER_ADMIN">Super Admin</SelectItem>
                        <SelectItem value="KSB_FINANCE">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editDepartment">Department *</Label>
                    <Select
                      value={editingUser.departmentId}
                      onValueChange={(value) => setEditingUser({ ...editingUser, departmentId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {renderDepartmentOptions()}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editDesignation">Designation</Label>
                    <Input
                      id="editDesignation"
                      type="text"
                      value={editingUser.designation}
                      onChange={(e) => setEditingUser({ ...editingUser, designation: e.target.value })}
                      placeholder="Senior Field Officer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editPhoneNumber">Phone Number</Label>
                    <Input
                      id="editPhoneNumber"
                      type="tel"
                      value={editingUser.phoneNumber}
                      onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })}
                      placeholder="+254712345678"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="editOfficeLocation">Office Location</Label>
                  <Input
                    id="editOfficeLocation"
                    type="text"
                    value={editingUser.officeLocation}
                    onChange={(e) => setEditingUser({ ...editingUser, officeLocation: e.target.value })}
                    placeholder="Nairobi Office"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editIsKSBUser">KSB User</Label>
                    <Select
                      value={editingUser.isKSBUser ? 'true' : 'false'}
                      onValueChange={(value) => setEditingUser({ ...editingUser, isKSBUser: value === 'true' })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editIsActive">Active Status</Label>
                    <Select
                      value={editingUser.isActive ? 'true' : 'false'}
                      onValueChange={(value) => setEditingUser({ ...editingUser, isActive: value === 'true' })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {updateUserError && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    Error updating user: {updateUserError.message}
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmittingEdit}
                    className="flex-1"
                  >
                    {isSubmittingEdit ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Update User
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackToMain}
                    disabled={isSubmittingEdit}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        ) : currentView === 'viewOfficers' ? (
          // View Officers View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Departments
            </Button>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Officers in {selectedDepartment?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedDepartment?.users.length || 0} officers • Max: {selectedDepartment?.maxOfficers}
                </p>
              </div>
            </div>

            {selectedDepartment && (
              <>
                {/* Add User to Department Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add User to Department</CardTitle>
                    <CardDescription>
                      Add a new user to {selectedDepartment.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <Label htmlFor="addUserSelect">Select User</Label>
                        <Select
                          value={selectedUserToAdd}
                          onValueChange={setSelectedUserToAdd}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a user to add" />
                          </SelectTrigger>
                          <SelectContent>
                            {users
                              .filter(user => 
                                user.isActive && 
                                user.isKSBUser && 
                                !selectedDepartment.users.some(deptUser => deptUser.id === user.id)
                              )
                              .map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{user.employeeId}</span>
                                    <span className="text-sm text-gray-500">{user.email} • {user.designation}</span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        onClick={handleAddUserToDepartment}
                        disabled={!selectedUserToAdd || isAddingUserToDept}
                      >
                        {isAddingUserToDept ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add User
                          </>
                        )}
                      </Button>
                    </div>
                    {addUserError && (
                      <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        Error adding user: {addUserError.message}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Department Officers</CardTitle>
                    <CardDescription>
                      Complete list of officers in {selectedDepartment.name}
                    </CardDescription>
                  </CardHeader>
                <CardContent>
                  {selectedDepartment.users.length === 0 ? (
                    <div className="text-center py-8">
                      <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No officers assigned to this department</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedDepartment.users.map((user) => {
                        // Find the full user data from the users list
                        const fullUser = users.find(u => u.id === user.id)
                        return (
                          <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <UserCheck className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{user.employeeId}</h4>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <p className="text-xs text-gray-400">{user.designation}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              {fullUser ? (
                                <>
                                  <Badge 
                                    variant={getUserStatusVariant(fullUser)}
                                    className={getUserStatusClassName(fullUser)}
                                  >
                                    {getUserStatusText(fullUser)}
                                  </Badge>
                                  <div className="text-right">
                                    <p className="text-sm text-gray-500">Role</p>
                                    <p className="text-xs text-gray-400">{formatRole(fullUser.role)}</p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleStartEditUser(fullUser)}
                                    >
                                      Edit
                                    </Button>
                                    <Button variant="outline" size="sm">View</Button>
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      onClick={() => handleRemoveUserFromDepartment(user.id)}
                                      disabled={isRemovingUserFromDept}
                                    >
                                      {isRemovingUserFromDept ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        'Remove'
                                      )}
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <div className="text-right">
                                  <p className="text-sm text-gray-500">Basic Info Only</p>
                                  <p className="text-xs text-gray-400">Full details not available</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {removeUserError && (
                    <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                      Error removing user: {removeUserError.message}
                    </div>
                  )}
                </CardContent>
              </Card>
              </>
            )}
          </div>
        ) : (
          // Edit Department View
          <div className="space-y-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToMain}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Departments
            </Button>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Edit Department</h2>
                <p className="text-sm text-gray-500">Update department information</p>
              </div>
            </div>

            {editingDepartment && (
              <form onSubmit={handleEditDepartment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editDeptName">Department Name *</Label>
                  <Input
                    id="editDeptName"
                    type="text"
                    value={editingDepartment.name}
                    onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
                    placeholder="Enter department name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editDeptCode">Department Code *</Label>
                  <Input
                    id="editDeptCode"
                    type="text"
                    value={editingDepartment.departmentCode}
                    onChange={(e) => setEditingDepartment({ ...editingDepartment, departmentCode: e.target.value })}
                    placeholder="e.g., IT-001, HR-002"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editDeptDescription">Description</Label>
                  <Textarea
                    id="editDeptDescription"
                    value={editingDepartment.description}
                    onChange={(e) => setEditingDepartment({ ...editingDepartment, description: e.target.value })}
                    placeholder="Enter department description"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editMaxOfficers">Maximum Officers</Label>
                  <Input
                    id="editMaxOfficers"
                    type="number"
                    value={editingDepartment.maxOfficers}
                    onChange={(e) => setEditingDepartment({ ...editingDepartment, maxOfficers: parseInt(e.target.value) || 10 })}
                    min="1"
                    max="100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editHeadOfDepartment">Head of Department</Label>
                  <Select
                    value={editingDepartment.headOfDepartmentId || 'none'}
                    onValueChange={(value) => setEditingDepartment({ ...editingDepartment, headOfDepartmentId: value === 'none' ? null : value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Head of Department</SelectItem>
                      {renderUserOptions()}
                    </SelectContent>
                  </Select>
                </div>

                {updateDepartmentError && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    Error updating department: {updateDepartmentError.message}
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmittingDepartmentEdit}
                    className="flex-1"
                  >
                    {isSubmittingDepartmentEdit ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Update Department
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackToMain}
                    disabled={isSubmittingDepartmentEdit}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
