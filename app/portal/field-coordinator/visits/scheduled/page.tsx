"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Search, 
  Filter, 
  MapPin, 
  ArrowUpDown,
  Eye,
  Plus,
  Clock
} from "lucide-react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const scheduledVisits = [
  {
    id: 1,
    farmName: "Green Valley Farm",
    farmer: "Mary Johnson",
    location: "Kisumu County",
    date: "2024-01-15",
    time: "09:00 AM",
    type: "Crop Assessment",
    priority: "high" as const,
  },
  {
    id: 2,
    farmName: "Sunrise Agriculture",
    farmer: "David Smith",
    location: "Kakamega County",
    date: "2024-01-15",
    time: "02:00 PM",
    type: "Compliance Check",
    priority: "medium" as const,
  },
  {
    id: 3,
    farmName: "Golden Harvest",
    farmer: "Sarah Wilson",
    location: "Bungoma County",
    date: "2024-01-16",
    time: "10:30 AM",
    type: "Disease Monitoring",
    priority: "high" as const,
  },
  {
    id: 4,
    farmName: "Blue Ridge Farm",
    farmer: "Robert Brown",
    location: "Kisumu County",
    date: "2024-01-18",
    time: "11:00 AM",
    type: "Compliance Check",
    priority: "medium" as const,
  },
  {
    id: 5,
    farmName: "Valley View Agriculture",
    farmer: "Lisa Davis",
    location: "Kakamega County",
    date: "2024-01-20",
    time: "09:30 AM",
    type: "Crop Assessment",
    priority: "low" as const,
  },
  {
    id: 6,
    farmName: "Mountain Peak Farm",
    farmer: "James Miller",
    location: "Bungoma County",
    date: "2024-01-22",
    time: "02:30 PM",
    type: "Disease Monitoring",
    priority: "high" as const,
  },
]

export default function ScheduledVisitsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredVisits = scheduledVisits.filter(visit => 
    visit.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visit.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visit.location.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Scheduled Field Visits</h1>
            <p className="text-gray-500">Manage your upcoming field visits</p>
          </div>
          <Button asChild>
            <Link href="/portal/field-coordinator/visits/new">
              <Plus className="mr-2 h-4 w-4" />
              Schedule New Visit
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Field Visits
            </CardTitle>
            <CardDescription>
              You have {scheduledVisits.length} visits scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search visits by farm, farmer or location..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      <div className="flex items-center gap-1">
                        Farm
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        Date
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell className="font-medium">{visit.farmName}</TableCell>
                      <TableCell>{visit.farmer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {visit.location}
                        </div>
                      </TableCell>
                      <TableCell>{visit.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          {visit.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {visit.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          visit.priority === "high" ? "destructive" : 
                          visit.priority === "medium" ? "secondary" : 
                          "default"
                        }>
                          {visit.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/portal/field-coordinator/visits/${visit.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
