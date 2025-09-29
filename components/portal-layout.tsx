"use client"

import type React from "react"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Home, MessageSquare, Calendar, FileText, BarChart3, LogOut, User, HelpCircle, Settings, Bell } from "lucide-react"
import { HiSparkles } from 'react-icons/hi2'
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { ImporterAlertsModal } from "@/app/portal/importer/modals/importer-alerts-modal"
import { BottomNavigation, NavigationItem } from "@/components/ui/bottom-navigation"

const ceoNavigation: NavigationItem[] = [
  { name: "Today", href: "/portal/ceo/today", icon: Home },
  { name: "AI", href: "/portal/ceo/ai", icon: HiSparkles },
  { name: "Calendar", href: "/portal/ceo/calendar", icon: Calendar },
  { name: "Chat", href: "/portal/ceo/chat", icon: MessageSquare },
  { name: "Dashboard", href: "/portal/ceo/dashboard", icon: BarChart3 },
  { name: "Operations", href: "/portal/ceo", icon: User },
]
const ksbUserNavigation: NavigationItem[] = [
  { name: "Today", href: "/portal/ksb/today", icon: Home }, 
  { name: "Calendar", href: "/portal/ksb/calendar", icon: Calendar },
  { name: "Chat", href: "/portal/ksb/chat", icon: MessageSquare },
  { name: "Dashboard", href: "/portal/ksb/dashboard", icon: BarChart3 },
  { name: "Operations", href: "/portal/ceo", icon: User },
]

const importerNavigation: NavigationItem[] = [
  { name: "Portal", href: "/portal/importer", icon: Home },
  { name: "Applications", href: "/portal/importer/applications", icon: FileText },
  { name: "Reports", href: "/portal/importer/reports", icon: BarChart3 },
  { name: "Settings", href: "/portal/importer/settings", icon: Settings },
]

const fieldCoordinatorNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/portal/field-coordinator", icon: Home },
  { name: "Visits", href: "/portal/field-coordinator/visits", icon: Calendar },
  { name: "Farmers", href: "/portal/field-coordinator/farmers", icon: User },
  { name: "Reports", href: "/portal/field-coordinator/reports", icon: BarChart3 },
]

const millerNavigation: NavigationItem[] = [
  { name: "Portal", href: "/portal/miller", icon: Home },
  { name: "Applications", href: "/portal/miller/applications", icon: FileText },
  { name: "Reports", href: "/portal/miller/reports", icon: BarChart3 },
  { name: "Settings", href: "/portal/miller/settings", icon: Settings },
]

interface PortalLayoutProps {
  children: React.ReactNode
  pageTitle: string
}

export function PortalLayout({ children, pageTitle }: PortalLayoutProps) {
  const { user, logout } = useAuth()
  const [isVisible, setIsVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const [alertsModalOpen, setAlertsModalOpen] = useState(false)

  // Get appropriate navigation based on user type
  const [navigation, setnavigation] = useState(ceoNavigation)
 

  useEffect(() => {
    
    setnavigation(
      user?.role === "KSB_USER" ? ksbUserNavigation :
      user?.userType === "importer" ? importerNavigation : 
      user?.userType === "field-coordinator" ? fieldCoordinatorNavigation : 
      user?.userType === "miller" ? millerNavigation :
      ceoNavigation
    )
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: user?.userType === "importer" ? '#f3f4f6' : '#fbf9f1' }}>
      {/* Import alerts modal */}
      {user?.userType === "importer" && (
        <ImporterAlertsModal 
          open={alertsModalOpen} 
          onOpenChange={setAlertsModalOpen}
        />
      )}
      <div className={`px-6 ${isMobile ? 'py-2' : 'py-4'}`} style={{ backgroundColor: user?.userType === "importer" ? '#f3f4f6' : user?.userType === "miller" ? '#f3f4f6' : '#fbf9f1' }}>
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
                     
                      <Avatar className={`h-10 w-10 cursor-pointer transition-all border-2 border-gray-300 ${
                        user?.userType === "importer" ? "hover:ring-2 hover:ring-blue-300" : 
                        user?.userType === "field-coordinator" ? "hover:ring-2 hover:ring-orange-300" :
                        user?.userType === "miller" ? "hover:ring-2 hover:ring-green-300" :
                        "hover:ring-2 hover:ring-green-300"
                      }`}>
                        <AvatarImage 
                          src={
                            user?.userType === "importer" ? "/images/importer-avatar.png" : 
                            user?.userType === "field-coordinator" ? "/placeholder-user.jpg" : 
                            user?.userType === "miller" ? "/images/miller-avatar.png" :
                            "/images/KSB_CEO.png"
                          } 
                          alt="Profile" 
                        />
                        <AvatarFallback className={
                          user?.userType === "importer" ? "bg-blue-100 text-blue-800" : 
                          user?.userType === "field-coordinator" ? "bg-orange-100 text-orange-800" :
                          user?.userType === "miller" ? "bg-green-100 text-green-800" :
                          "bg-green-100 text-green-800"
                        }>
                          {user?.name
                            ?.split(" ")
                            .filter((part, index) => index === 0 || index === 1)
                            .map((n) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      {/* Status indicator */}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${
                        user?.userType === "importer" ? "bg-blue-500" : 
                        user?.userType === "field-coordinator" ? "bg-orange-500" :
                        user?.userType === "miller" ? "bg-green-500" :
                        "bg-green-500"
                      }`}></div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48" onMouseLeave={() => setOpen(false)}>
                  <DropdownMenuItem onClick={() => {
                    setOpen(false);
                    if (user?.userType === "importer") {
                      setAlertsModalOpen(true);
                    }
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
    <BottomNavigation navigation={navigation} isVisible={isVisible} />
    </div>
  )
}
