"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

interface BottomNavigationProps {
  navigation: NavigationItem[]
  className?: string
  isVisible?: boolean
}

export function BottomNavigation({ 
  navigation, 
  className,
  isVisible = true 
}: BottomNavigationProps) {
  const pathname = usePathname()

  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg transition-all duration-300 z-50",
        "supports-[backdrop-filter]:bg-white/80",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        className
      )}
    >
      
      {/* Safe area for devices with home indicator */}
      <div className="pb-safe-area-inset-bottom">
        <div className="flex items-center justify-center px-2 py-3">
          <div className="flex items-center justify-around w-full max-w-3xl gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 ease-in-out min-w-[60px] relative",
                    "active:scale-95 touch-manipulation",
                    isActive 
                      ? "bg-green-100 text-green-700 scale-105 shadow-sm"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50 hover:scale-105"
                  )}
                >
                  <div className="relative">
                    <item.icon className={cn(
                      "h-5 w-5 transition-all duration-200",
                      isActive && "drop-shadow-sm"
                    )} />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "text-xs font-medium transition-colors duration-200 leading-tight",
                    isActive && "font-semibold"
                  )}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
