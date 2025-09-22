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
import { UserCheck, Plus, Download, Settings, Loader2, X, ArrowLeft } from "lucide-react"
import { useDepartments, type Department, type CreateDepartmentRequest } from "@/hooks/use-departments"
import { useKsbUsers, type KsbUser, type CreateKsbUserData } from "@/hooks/use-ksb-users"
import { useState, useEffect } from "react"

// Define view types for the modal
type ModalView = 'main' | 'addDepartment'


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
        isCreating,
        createError
    } = useDepartments()
    const { users, isLoading: usersLoading, error: usersError, pagination: usersPagination } = useKsbUsers()

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
                                                    <div className="text-2xl font-bold text-blue-600">{usersPagination?.total || users.length}</div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-sm">Active Users</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-2xl font-bold text-green-600">{users.filter((u: KsbUser) => u.isActive).length}</div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-sm">KSB Users</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-2xl font-bold text-purple-600">{users.filter((u: KsbUser) => u.isKSBUser).length}</div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div className="flex space-x-2">
                                            <Button>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add New User
                                            </Button>
                                            <Button variant="outline">
                                                <Download className="h-4 w-4 mr-2" />
                                                Export Users
                                            </Button>
                                            <Button variant="outline">
                                                <Settings className="h-4 w-4 mr-2" />
                                                Bulk Actions
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
                                                                    <Button variant="outline" size="sm">Edit</Button>
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
                                                                <span className="font-medium">{dept.currentOfficerCount}/{dept.maxOfficers}</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-500">Head of Department:</span>
                                                                <span className="font-medium">{dept.headOfDepartment?.name || 'Not assigned'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2 mt-4">
                                                            <Button variant="outline" size="sm" className="flex-1">View Officers</Button>
                                                            <Button variant="outline" size="sm" className="flex-1">Edit</Button>
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
                ) : (
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
                )}
            </DialogContent>

        </Dialog>
    )
}
