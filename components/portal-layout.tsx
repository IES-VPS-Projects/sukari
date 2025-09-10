"use client"

import type React from "react"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Home, MessageSquare, Calendar, FileText, BarChart3, LogOut, User, HelpCircle, Settings } from "lucide-react"
import { HiSparkles } from 'react-icons/hi2'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const ceoNavigation = [
  { name: "Today", href: "/portal/ceo/today", icon: Home },
  { name: "AI", href: "/portal/ceo/ai", icon: HiSparkles },
  { name: "Calendar", href: "/portal/ceo/calendar", icon: Calendar },
  { name: "Chat", href: "/portal/ceo/chat", icon: MessageSquare },
  { name: "Dashboard", href: "/portal/ceo/dashboard", icon: BarChart3 },
  { name: "Operations", href: "/portal/ceo", icon: User },
]

const importerNavigation = [
  { name: "Portal", href: "/portal/importer", icon: Home },
]

export function PortalLayout({ children, pageTitle }: { children: React.ReactNode, pageTitle: string }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  // Get appropriate navigation based on user type
  const navigation = user?.userType === "importer" ? importerNavigation : ceoNavigation

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className={`bg-gray-50 px-6 ${isMobile ? 'py-2' : 'py-4'}`}>
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
                    Information Management System
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
                        user?.userType === "importer" ? "hover:ring-2 hover:ring-blue-300" : "hover:ring-2 hover:ring-green-300"
                      }`}>
                        <AvatarImage 
                          src={user?.userType === "importer" ? "/images/importer-avatar.png" : "/images/KSB_CEO.png"} 
                          alt="Profile" 
                        />
                        <AvatarFallback className={user?.userType === "importer" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                          {user?.name
                            ?.split(" ")
                            .filter((part, index) => index === 0 || index === 1)
                            .map((n) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      {/* Status indicator */}
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${
                        user?.userType === "importer" ? "bg-blue-500" : "bg-green-500"
                      }`}></div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48" onMouseLeave={() => setOpen(false)}>
                  <DropdownMenuItem asChild>
                    <Link href={user?.userType === "importer" ? "/portal/importer" : "/portal/ceo"} className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
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
        <main className={`flex-1 overflow-auto ${user?.userType === "importer" ? "pb-6" : "pb-24"}`}>{children}</main>
        {user?.userType !== "importer" && (
          <nav className={`fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`}>
            <div className="flex items-center justify-center px-1 py-3">
              <div className="flex items-center justify-around w-full max-w-3xl gap-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all duration-300 ease-in-out min-w-[55px] ${
                        isActive 
                          ? "bg-green-100 text-green-700 scale-105"
                          : "text-gray-600 hover:text-green-600 hover:bg-green-50 hover:scale-105"
                      }`}
                    >
                      <item.icon className="h-5 w-5 transition-transform duration-200" />
                      <span className="text-xs font-medium transition-colors duration-200">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
        )}
    </div>
  )
}
