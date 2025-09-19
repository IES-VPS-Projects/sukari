"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, ArrowRight } from "lucide-react"

interface ProfileCardProps {
  onOpenClick: () => void
}

export function ProfileCard({ onOpenClick }: ProfileCardProps) {
  return (
    <Card 
      className="overflow-hidden border border-muted rounded-[24px] shadow-lg hover:shadow-xl transition-all h-[300px] flex flex-col cursor-pointer w-full"
      onClick={onOpenClick}
    >
      <CardHeader className="bg-muted/20 pl-10">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile
        </CardTitle>
        <CardDescription>View and manage your personal and company information</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
      </CardContent>
      <CardFooter className="bg-muted/30 py-3 hover:bg-muted/50 transition-colors group mt-auto">
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-center group-hover:bg-transparent">
          Open Profile
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  )
}
