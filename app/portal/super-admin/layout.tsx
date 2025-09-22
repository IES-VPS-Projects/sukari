"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Shield, 
  Settings, 
  BarChart3, 
  Activity,
  LogOut,
  Menu,
  X,
  Home,
  UserCheck,
  FileCheck,
  Database,
  Bell,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BottomNavigation, NavigationItem } from "@/components/ui/bottom-navigation"

interface SuperAdminLayoutProps {
  children: React.ReactNode
}

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/portal/super-admin",
    icon: Home
  },
  {
    name: "Users",
    href: "/portal/super-admin/users",
    icon: Users
  },
  {
    name: "Licenses",
    href: "/portal/super-admin/licenses",
    icon: FileCheck
  },
  {
    name: "Settings",
    href: "/portal/super-admin/settings",
    icon: Settings
  },
  {
    name: "Reports",
    href: "/portal/super-admin/reports",
    icon: BarChart3
  }
]

const fullNavigationItems = [
  {
    name: "Dashboard",
    href: "/portal/super-admin",
    icon: Home,
    description: "System overview and key metrics"
  },
  {
    name: "User Management",
    href: "/portal/super-admin/users",
    icon: Users,
    description: "Manage all system users and roles"
  },
  {
    name: "License Management",
    href: "/portal/super-admin/licenses",
    icon: FileCheck,
    description: "Oversee all licenses and permits"
  },
  {
    name: "System Settings",
    href: "/portal/super-admin/settings",
    icon: Settings,
    description: "Configure system parameters"
  },
  {
    name: "Audit Logs",
    href: "/portal/super-admin/audit",
    icon: Activity,
    description: "Monitor system activity and changes"
  },
  {
    name: "Reports & Analytics",
    href: "/portal/super-admin/reports",
    icon: BarChart3,
    description: "System performance and usage reports"
  },
  {
    name: "Data Management",
    href: "/portal/super-admin/data",
    icon: Database,
    description: "Manage system data and backups"
  }
]

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(true)

  // Check if user has super admin access
  useEffect(() => {
    if (user && user.role !== 'admin' && user.userType !== 'ADMIN') {
      router.push("/portal")
    }
  }, [user, router])

  // Handle scroll visibility for bottom navigation
  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const atBottom = window.innerHeight + currentScroll >= document.body.offsetHeight - 50
      if (currentScroll > lastScroll && !atBottom) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScroll = currentScroll
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!user || (user.role !== 'super-admin' && user.userType !== 'ADMIN')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the Super Admin portal.</p>
          <Button 
            onClick={() => router.push("/portal")} 
            className="mt-4"
          >
            Return to Portal
          </Button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const filteredNavigation = fullNavigationItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSidebarOpen(false)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-red-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Super Admin</h1>
              <p className="text-xs text-gray-500">System Administration</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-gray-500 truncate">
                Super Administrator
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {filteredNavigation.map((item) => {
            const isActive = typeof window !== 'undefined' && window.location.pathname === item.href
            return (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-red-100 text-red-700 border-r-2 border-red-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500'
                }`} />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                </div>
              </a>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="ml-4 lg:ml-0">
                <h2 className="text-lg font-semibold text-gray-900">
                  {typeof window !== 'undefined' && 
                    navigationItems.find(item => item.href === window.location.pathname)?.name || 
                    'Super Admin Portal'
                  }
                </h2>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Super Admin
              </Badge>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 pb-24">
          {children}
        </main>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigationItems} isVisible={isVisible} />
    </div>
  )
}
