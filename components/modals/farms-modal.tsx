"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Eye, Tractor, Search, Filter, ArrowUpDown } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"

const farms = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "Kisumu County, Western Region",
    size: "120 acres",
    cropType: "Sugarcane",
    status: "Active",
    complianceScore: 92,
    lastVisit: "2023-12-15",
  },
  {
    id: 2,
    name: "Sunrise Agriculture",
    location: "Kakamega County, Western Region",
    size: "85 acres",
    cropType: "Sugarcane",
    status: "Active",
    complianceScore: 87,
    lastVisit: "2023-12-10",
  },
  {
    id: 3,
    name: "Golden Harvest",
    location: "Bungoma County, Western Region",
    size: "150 acres",
    cropType: "Sugarcane",
    status: "Active",
    complianceScore: 95,
    lastVisit: "2023-12-20",
  },
  {
    id: 4,
    name: "Blue Ridge Farm",
    location: "Kisumu County, Western Region",
    size: "75 acres",
    cropType: "Sugarcane",
    status: "Inactive",
    complianceScore: 65,
    lastVisit: "2023-11-05",
  },
  {
    id: 5,
    name: "Valley View Agriculture",
    location: "Kakamega County, Western Region",
    size: "110 acres",
    cropType: "Sugarcane",
    status: "Active",
    complianceScore: 89,
    lastVisit: "2023-12-18",
  },
  {
    id: 6,
    name: "Mountain Peak Farm",
    location: "Bungoma County, Western Region",
    size: "95 acres",
    cropType: "Sugarcane",
    status: "Under Review",
    complianceScore: 78,
    lastVisit: "2023-12-01",
  },
]

interface FarmsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FarmsModal({ open, onOpenChange }: FarmsModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredFarms = farms.filter(farm => 
    farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farm.location.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tractor className="h-5 w-5" />
            Farms Management
          </DialogTitle>
          <DialogDescription>
            View and manage all registered farms
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search farms by name or location..." 
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
                <Tractor className="mr-2 h-4 w-4" />
                Register New Farm
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <div className="flex items-center gap-1">
                      Farm Name
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Crop Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFarms.map((farm) => (
                  <TableRow key={farm.id}>
                    <TableCell className="font-medium">{farm.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        {farm.location}
                      </div>
                    </TableCell>
                    <TableCell>{farm.size}</TableCell>
                    <TableCell>{farm.cropType}</TableCell>
                    <TableCell>
                      <Badge variant={
                        farm.status === "Active" ? "default" : 
                        farm.status === "Inactive" ? "secondary" : 
                        "outline"
                      }>
                        {farm.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${
                          farm.complianceScore >= 90 ? "bg-green-500" :
                          farm.complianceScore >= 80 ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}></span>
                        {farm.complianceScore}%
                      </div>
                    </TableCell>
                    <TableCell>{farm.lastVisit}</TableCell>
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
