"use client"

import { useState } from "react"
import { 
  FileCheck, 
  Database,
  Shield,
  UserCheck,
  Building2,
  FileText,
  Workflow
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PortalLayout } from "@/components/portal-layout"
import { KsbUsersModal } from "@/components/modals/ksb-users-modal"
import { LicensesModal } from "@/components/modals/licenses-modal"
import { ClientsModal } from "@/components/modals/clients-modal"
import { BrsModal } from "@/components/modals/brs-modal"
import { IprsModal } from "@/components/modals/iprs-modal"
import { WorkflowTemplatesModal } from "@/components/modals/workflow-templates-modal"
import { useAuth } from "@/components/auth-provider"


export default function SuperAdminDashboard() {
  // Modal states
  const [ksbUsersModalOpen, setKsbUsersModalOpen] = useState(false)
  const [licensesModalOpen, setLicensesModalOpen] = useState(false)
  const [clientsModalOpen, setClientsModalOpen] = useState(false)
  const [brsModalOpen, setBrsModalOpen] = useState(false)
  const [iprsModalOpen, setIprsModalOpen] = useState(false)
  const [workflowTemplatesModalOpen, setWorkflowTemplatesModalOpen] = useState(false)

  const { user, logout } = useAuth()
  return (
    <PortalLayout pageTitle="Super Admin">
      <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Admin Header */}
        <Card className="rounded-[20px] shadow-lg border-0 bg-white p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
                <Shield className="h-10 w-10 text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-black">Super Admin Portal</h2>
              <p className="text-gray-600 font-bold mt-1">
                {user?.name}
              </p>
               
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">System Status</p>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                System Healthy
              </Badge>
            </div>
          </div>
        </Card>

        {/* Management Cards Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* KSB Users Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setKsbUsersModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserCheck className="h-5 w-5" />
                KSB Users
              </CardTitle>
              <CardDescription>Manage KSB system users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* Licenses Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setLicensesModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileCheck className="h-5 w-5" />
                Licenses
              </CardTitle>
              <CardDescription>Manage and approve license applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>
              {/* Workflow Engine Card */}
              <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setWorkflowTemplatesModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Workflow className="h-5 w-5" />
                Workflow Engine
              </CardTitle>
              <CardDescription>Create and manage workflow templates for license applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* Clients Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setClientsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5" />
                Clients
              </CardTitle>
              <CardDescription>Manage client companies and organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* BRS Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setBrsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                BRS
              </CardTitle>
              <CardDescription>Business Registration System management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

          {/* IPRS Card */}
          <Card 
            className="rounded-[20px] shadow-lg border-0 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setIprsModalOpen(true)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="h-5 w-5" />
                IPRS
              </CardTitle>
              <CardDescription>Integrated Population Registration System</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-32"></div>
              </div>
            </CardContent>
          </Card>

      
        </div>
      </div>

      {/* Modals */}
      <KsbUsersModal 
        open={ksbUsersModalOpen} 
        onOpenChange={setKsbUsersModalOpen}
      />
      <LicensesModal 
        open={licensesModalOpen} 
        onOpenChange={setLicensesModalOpen}
      />
      <ClientsModal 
        open={clientsModalOpen} 
        onOpenChange={setClientsModalOpen}
      />
      <BrsModal 
        open={brsModalOpen} 
        onOpenChange={setBrsModalOpen}
      />
      <IprsModal 
        open={iprsModalOpen} 
        onOpenChange={setIprsModalOpen}
      />
      <WorkflowTemplatesModal 
        open={workflowTemplatesModalOpen} 
        onOpenChange={setWorkflowTemplatesModalOpen}
      />
    </PortalLayout>
  )
}
