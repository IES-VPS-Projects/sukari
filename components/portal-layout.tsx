"use client"

import type React from "react"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Home, MessageSquare, Calendar, FileText, BarChart3, LogOut, ChevronDown, User, HelpCircle, Settings } from "lucide-react"
import { HiSparkles } from 'react-icons/hi2'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const navigation = [
  { name: "Today", href: "/portal/today", icon: Home },
  { name: "Chat", href: "/portal/chat", icon: MessageSquare },
  { name: "Calendar", href: "/portal/calendar", icon: Calendar },
  { name: "Reports", href: "/portal/reports", icon: FileText },
  { name: "Dashboard", href: "/portal/dashboard", icon: BarChart3 },
  { name: "AI", href: "/portal/ai", icon: HiSparkles },
]

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

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
      <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/images/AGRI-Logo.png" alt="AGRI Logo" width={75} height={75} className="rounded-lg" />
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild onMouseEnter={() => setOpen(true)} onClick={() => setOpen((prev) => !prev)}>
                  <Button variant="ghost" className="flex items-center gap-2 border-2 border-gray-300 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-800">
                        {user?.name
                          ?.split(" ")
                          .filter((part, index) => index === 1 || index === 2) // Get "Elvis" and "Kazungu"
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-gray-500">{user?.role}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onMouseLeave={() => setOpen(false)}>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
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
        <main className="flex-1 pb-24 overflow-auto">{children}</main>
        <nav className={`fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`}>
            <div className="flex items-center justify-center px-4 py-3">
              <div className="flex items-center justify-around w-full max-w-2xl">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[80px] ${
                        isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>
    </div>
  )
}
