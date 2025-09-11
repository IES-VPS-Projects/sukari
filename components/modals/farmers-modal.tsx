"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Eye, Users, Search, Filter, ArrowUpDown, Phone, Mail } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"

const farmers = [
  {
    id: 1,
    name: "Mary Johnson",
    location: "Kisumu County",
    contact: "+254 712 345 678",
    email: "mary.johnson@example.com",
    farms: 2,
    status: "Active",
    registrationDate: "2020-05-10",
  },
  {
    id: 2,
    name: "David Smith",
    location: "Kakamega County",
    contact: "+254 723 456 789",
    email: "david.smith@example.com",
    farms: 1,
    status: "Active",
    registrationDate: "2021-03-15",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    location: "Bungoma County",
    contact: "+254 734 567 890",
    email: "sarah.wilson@example.com",
    farms: 3,
    status: "Active",
    registrationDate: "2019-11-20",
  },
  {
    id: 4,
    name: "Robert Brown",
    location: "Kisumu County",
    contact: "+254 745 678 901",
    email: "robert.brown@example.com",
    farms: 1,
    status: "Inactive",
    registrationDate: "2020-08-05",
  },
  {
    id: 5,
    name: "Lisa Davis",
    location: "Kakamega County",
    contact: "+254 756 789 012",
    email: "lisa.davis@example.com",
    farms: 2,
    status: "Active",
    registrationDate: "2022-01-18",
  },
  {
    id: 6,
    name: "James Miller",
    location: "Bungoma County",
    contact: "+254 767 890 123",
    email: "james.miller@example.com",
    farms: 1,
    status: "Under Review",
    registrationDate: "2023-02-25",
  },
]

interface FarmersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FarmersModal({ open, onOpenChange }: FarmersModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredFarmers = farmers.filter(farmer => 
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Farmers Management
          </DialogTitle>
          <DialogDescription>
            View and manage all registered farmers
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search farmers by name, location or email..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Register New Farmer
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <div className="flex items-center gap-1">
                      Farmer Name
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Farms</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFarmers.map((farmer) => (
                  <TableRow key={farmer.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {farmer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{farmer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        {farmer.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        {farmer.contact}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        {farmer.email}
                      </div>
                    </TableCell>
                    <TableCell>{farmer.farms}</TableCell>
                    <TableCell>
                      <Badge variant={
                        farmer.status === "Active" ? "default" : 
                        farmer.status === "Inactive" ? "secondary" : 
                        "outline"
                      }>
                        {farmer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{farmer.registrationDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
