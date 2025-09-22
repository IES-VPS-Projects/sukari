"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Shield, 
  Settings, 
  BarChart3, 
  LogOut,
  Home,
  FileCheck,
  Bell,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { BottomNavigation, NavigationItem } from "@/components/ui/bottom-navigation"
import { useIsMobile } from "@/hooks/use-mobile"

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


export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  // Check if user has super admin access
  useEffect(() => {
    if (user && user.role !== 'admin' && user.userType !== 'ADMIN') {
      router.push("/portal")
    }
  }, [user, router])

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


  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fbf9f1' }}>
      <div className={`px-6 ${isMobile ? 'py-2' : 'py-4'}`} style={{ backgroundColor: '#fbf9f1' }}>
        <header className="bg-white border border-gray-200 rounded-[20px] shadow-lg px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/ISE_Agri_Logo.png" 
                  alt="ISE Agriculture Logo" 
                  className={`${isMobile ? 'h-8' : 'h-12'} w-auto`}
                />
                <img 
                  src="/images/kenya_vertical_separator.jpg" 
                  alt="Vertical Separator" 
                  className={`${isMobile ? 'h-8' : 'h-12'} w-auto`}
                />
                <img 
                  src="/images/ksb2.png" 
                  alt="KSB Logo" 
                  className={`${isMobile ? 'h-8' : 'h-12'} w-auto`}
                />
                <div className="flex flex-col ml-2">
                  <h1 className={`${isMobile ? 'text-sm' : 'text-lg'} font-bold text-gray-900 leading-tight`}>
                    KENYA SUGAR BOARD
                  </h1>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 leading-tight`}>
                    Sugar Industry Management Information System
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild onMouseEnter={() => setOpen(true)} onClick={() => setOpen((prev) => !prev)}>
                  <Button variant="ghost" className="p-0 rounded-full hover:bg-transparent">
                    <div className="relative">
                     
                      <Avatar className={`h-10 w-10 cursor-pointer transition-all border-2 border-gray-300 hover:ring-2 hover:ring-green-300`}>
                        <AvatarImage 
                          src="/images/KSB_CEO.png"
                          alt="Profile" 
                        />
                        <AvatarFallback className="bg-green-100 text-green-800">
                          {user?.name
                            ?.split(" ")
                            .filter((part, index) => index === 0 || index === 1)
                            .map((n) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      {/* Status indicator */}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full bg-green-500`}></div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48" onMouseLeave={() => setOpen(false)}>
                  <DropdownMenuItem onClick={() => {
                    setOpen(false);
                  }}>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Support
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-red-100 text-red-600" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      </div>
    <main className="flex-1 overflow-auto pb-24">{children}</main>
    <BottomNavigation navigation={navigationItems} isVisible={isVisible} />
    </div>
  )
}
