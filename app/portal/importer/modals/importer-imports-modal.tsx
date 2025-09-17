"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Ship, 
  Package, 
  Search, 
  Calendar, 
  MapPin, 
  FileText, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Building,
  Warehouse
} from "lucide-react"
import { importsData } from "../data/imports-data"

interface ImporterImportsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedImportId?: string
}

export function ImporterImportsModal({ open, onOpenChange, selectedImportId }: ImporterImportsModalProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'all' | 'tracking'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImport, setSelectedImport] = useState<any>(null)
  const [trackingId, setTrackingId] = useState('')
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [isTracking, setIsTracking] = useState(false)

  // Mock imports data
  const imports = [
    {
      id: 'IMP-2024-001',
      origin: 'Brazil',
      quantity: '250 MT',
      status: 'Cleared',
      arrivalDate: '2024-09-10',
      departureDate: '2024-08-15',
      value: 'Ksh. 125,000',
      sugarType: 'White Sugar',
      vessel: 'MV Atlantic Star',
      trackingId: 'TRACK-BR-001',
      destination: 'Mombasa Port',
      clearanceDate: '2024-09-12',
      customsRef: 'KE-CUST-2024-1234',
      documents: [
        { name: 'Bill of Lading', status: 'Verified' },
        { name: 'Certificate of Origin', status: 'Verified' },
        { name: 'Quality Certificate', status: 'Verified' },
        { name: 'Import Permit', status: 'Verified' }
      ],
      trackingHistory: [
        { date: '2024-08-15', status: 'Departed Origin Port', location: 'Santos, Brazil' },
        { date: '2024-08-30', status: 'In Transit', location: 'Atlantic Ocean' },
        { date: '2024-09-08', status: 'Arrived at Port', location: 'Mombasa, Kenya' },
        { date: '2024-09-10', status: 'Customs Clearance', location: 'Mombasa, Kenya' },
        { date: '2024-09-12', status: 'Delivery Complete', location: 'Nairobi, Kenya' }
      ]
    },
    {
      id: 'IMP-2024-002',
      origin: 'Thailand',
      quantity: '180 MT',
      status: 'In Transit',
      arrivalDate: '2024-09-20',
      departureDate: '2024-09-01',
      value: 'Ksh. 90,000',
      sugarType: 'Raw Sugar',
      vessel: 'MV Pacific Trader',
      trackingId: 'TRACK-TH-002',
      destination: 'Mombasa Port',
      customsRef: 'Pending',
      documents: [
        { name: 'Bill of Lading', status: 'Verified' },
        { name: 'Certificate of Origin', status: 'Verified' },
        { name: 'Quality Certificate', status: 'Pending' },
        { name: 'Import Permit', status: 'Verified' }
      ],
      trackingHistory: [
        { date: '2024-09-01', status: 'Departed Origin Port', location: 'Bangkok, Thailand' },
        { date: '2024-09-10', status: 'In Transit', location: 'Indian Ocean' },
        { date: '2024-09-15', status: 'Current Position', location: '3.2°S, 42.5°E, Indian Ocean' }
      ]
    },
    {
      id: 'IMP-2024-003',
      origin: 'India',
      quantity: '320 MT',
      status: 'Processing',
      arrivalDate: '2024-09-18',
      departureDate: '2024-08-28',
      value: 'Ksh. 160,000',
      sugarType: 'Refined Sugar',
      vessel: 'MV Eastern Glory',
      trackingId: 'TRACK-IN-003',
      destination: 'Mombasa Port',
      customsRef: 'KE-CUST-2024-1567',
      documents: [
        { name: 'Bill of Lading', status: 'Verified' },
        { name: 'Certificate of Origin', status: 'Verified' },
        { name: 'Quality Certificate', status: 'Verified' },
        { name: 'Import Permit', status: 'Verified' }
      ],
      trackingHistory: [
        { date: '2024-08-28', status: 'Departed Origin Port', location: 'Mumbai, India' },
        { date: '2024-09-10', status: 'In Transit', location: 'Indian Ocean' },
        { date: '2024-09-16', status: 'Arrived at Port', location: 'Mombasa, Kenya' },
        { date: '2024-09-17', status: 'Customs Processing', location: 'Mombasa, Kenya' }
      ]
    }
  ]

  // Use the imports data
  const allImports = importsData
  
  useEffect(() => {
    if (!open) {
      setSelectedImport(null)
      setTrackingResult(null)
      setTrackingId('')
      setIsTracking(false)
      setActiveTab('all')
    } else if (selectedImportId) {
      const importData = allImports.find(imp => imp.id === selectedImportId)
      if (importData) {
        setSelectedImport(importData)
      }
    }
  }, [open, selectedImportId])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleTrackShipment = () => {
    setIsTracking(true)
    
    // Simulate API call with timeout
    setTimeout(() => {
      const result = imports.find(imp => 
        imp.trackingId.toLowerCase() === trackingId.toLowerCase() ||
        imp.id.toLowerCase() === trackingId.toLowerCase()
      )
      
      setTrackingResult(result || null)
      setIsTracking(false)
    }, 1500)
  }

  const filteredImports = imports.filter(imp => 
    imp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    imp.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    imp.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    imp.sugarType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Cleared':
        return 'bg-green-100 text-green-800'
      case 'In Transit':
        return 'bg-blue-100 text-blue-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'Delayed':
        return 'bg-red-100 text-red-800'
      case 'Verified':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderImportsList = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border rounded-lg p-2">
        <Search className="h-4 w-4 text-gray-500" />
        <Input 
          placeholder="Search imports by ID, origin, status..." 
          value={searchTerm}
          onChange={handleSearch}
          className="border-0 focus-visible:ring-0"
        />
      </div>

      <div className="space-y-3">
        {filteredImports.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-gray-500">No imports found matching your search criteria.</p>
          </div>
        ) : (
          filteredImports.map((importItem) => (
            <div 
              key={importItem.id} 
              className="p-4 border rounded-lg space-y-3 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedImport(importItem)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{importItem.origin} Import</h4>
                  <p className="text-sm text-gray-600">ID: {importItem.id}</p>
                </div>
                <Badge className={getStatusColor(importItem.status)}>
                  {importItem.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Quantity:</span>
                  <p className="font-medium">{importItem.quantity}</p>
                </div>
                <div>
                  <span className="text-gray-600">Sugar Type:</span>
                  <p className="font-medium">{importItem.sugarType}</p>
                </div>
                <div>
                  <span className="text-gray-600">Value:</span>
                  <p className="font-medium">{importItem.value}</p>
                </div>
                <div>
                  <span className="text-gray-600">Arrival Date:</span>
                  <p className="font-medium">{new Date(importItem.arrivalDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderImportDetails = () => {
    if (!selectedImport) return null
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{selectedImport.origin} Import</h3>
            <p className="text-gray-600">ID: {selectedImport.id} | Tracking ID: {selectedImport.trackingId}</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedImport(null)}>
            Back to List
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Shipment Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(selectedImport.status)}>
                    {selectedImport.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Origin:</span>
                  <span>{selectedImport.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination:</span>
                  <span>{selectedImport.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vessel:</span>
                  <span>{selectedImport.vessel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure Date:</span>
                  <span>{new Date(selectedImport.departureDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Arrival:</span>
                  <span>{new Date(selectedImport.arrivalDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Cargo Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sugar Type:</span>
                  <span>{selectedImport.sugarType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span>{selectedImport.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Value:</span>
                  <span>{selectedImport.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customs Reference:</span>
                  <span>{selectedImport.customsRef}</span>
                </div>
                {selectedImport.clearanceDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Clearance Date:</span>
                    <span>{new Date(selectedImport.clearanceDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Documentation</h4>
              <div className="space-y-2">
                {(selectedImport.documents || []).map((doc: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{doc.name}</span>
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </div>
                ))}
                {(!selectedImport.documents || selectedImport.documents.length === 0) && (
                  <p className="text-gray-500 text-sm">No documents available</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-4">Tracking History</h4>
              <div className="relative">
                {(selectedImport.trackingHistory || []).map((event: any, index: number) => (
                  <div key={index} className="mb-6 relative pl-6">
                    {/* Timeline connector */}
                    {index < (selectedImport.trackingHistory || []).length - 1 && (
                      <div className="absolute left-[9px] top-[18px] bottom-0 w-0.5 bg-gray-300"></div>
                    )}
                    
                    {/* Status dot */}
                    <div className={`absolute left-0 top-1 h-[18px] w-[18px] rounded-full ${
                      index === (selectedImport.trackingHistory || []).length - 1 
                        ? 'bg-green-500' 
                        : 'bg-blue-500'
                    } flex items-center justify-center`}>
                      {index === (selectedImport.trackingHistory || []).length - 1 && (
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    
                    {/* Event details */}
                    <div>
                      <p className="font-semibold">{event.status}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {(!selectedImport.trackingHistory || selectedImport.trackingHistory.length === 0) && (
                  <p className="text-gray-500 text-sm">No tracking history available</p>
                )}
              </div>
            </div>
            
            {selectedImport.status !== 'Cleared' && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Estimated Timeline</h4>
                <div className="space-y-2">
                  {selectedImport.status === 'In Transit' && (
                    <>
                      <p className="text-sm">Current estimated arrival: <span className="font-medium">{new Date(selectedImport.arrivalDate).toLocaleDateString()}</span></p>
                      <p className="text-sm">Customs clearance typically takes 2-3 business days after arrival.</p>
                      <p className="text-sm">Delivery to warehouse estimated 1-2 days after customs clearance.</p>
                    </>
                  )}
                  {selectedImport.status === 'Processing' && (
                    <>
                      <p className="text-sm">Customs clearance in progress.</p>
                      <p className="text-sm">Estimated completion: <span className="font-medium">{new Date(new Date(selectedImport.arrivalDate).getTime() + 2*24*60*60*1000).toLocaleDateString()}</span></p>
                      <p className="text-sm">Delivery to warehouse estimated 1-2 days after customs clearance.</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderTrackingTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-2">
          <Ship className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Cargo Tracking</h4>
            <p className="text-sm text-blue-700">
              Track your shipment by entering the Tracking ID or Import ID below.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Enter Tracking ID or Import ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
        </div>
        <Button 
          onClick={handleTrackShipment} 
          disabled={!trackingId || isTracking}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isTracking ? 'Tracking...' : 'Track'}
        </Button>
      </div>

      {isTracking && (
        <div className="text-center p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for your shipment...</p>
        </div>
      )}

      {!isTracking && trackingResult && (
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Shipment Found</p>
              <p className="text-sm text-green-700">
                Tracking details for {trackingResult.id} ({trackingResult.origin} Import)
              </p>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg">{trackingResult.origin} Import</h4>
                <p className="text-gray-600">
                  {trackingResult.quantity} of {trackingResult.sugarType}
                </p>
              </div>
              <Badge className={getStatusColor(trackingResult.status)}>
                {trackingResult.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Tracking ID</p>
                <p className="font-medium">{trackingResult.trackingId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vessel</p>
                <p className="font-medium">{trackingResult.vessel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Departure</p>
                <p className="font-medium">{new Date(trackingResult.departureDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Arrival</p>
                <p className="font-medium">{new Date(trackingResult.arrivalDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h5 className="font-semibold mb-4">Tracking Timeline</h5>
              <div className="relative">
                {trackingResult.trackingHistory.map((event: any, index: number) => (
                  <div key={index} className="mb-6 relative pl-6">
                    {/* Timeline connector */}
                    {index < trackingResult.trackingHistory.length - 1 && (
                      <div className="absolute left-[9px] top-[18px] bottom-0 w-0.5 bg-gray-300"></div>
                    )}
                    
                    {/* Status dot */}
                    <div className={`absolute left-0 top-1 h-[18px] w-[18px] rounded-full ${
                      index === trackingResult.trackingHistory.length - 1 
                        ? 'bg-green-500' 
                        : 'bg-blue-500'
                    } flex items-center justify-center`}>
                      {index === trackingResult.trackingHistory.length - 1 && (
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    
                    {/* Event details */}
                    <div>
                      <p className="font-semibold">{event.status}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Button 
                onClick={() => setSelectedImport(trackingResult)} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      )}

      {!isTracking && trackingId && !trackingResult && (
        <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-red-600" />
          <div>
            <p className="font-medium text-red-800">Shipment Not Found</p>
            <p className="text-sm text-red-700">
              We couldn't find any shipment with the tracking ID: {trackingId}
            </p>
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <h4 className="font-semibold mb-3">Tracking Guide</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Ship className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium">Ocean Transit</p>
              <p className="text-sm text-gray-600">Your shipment is being transported by sea vessel.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Building className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium">Port Arrival</p>
              <p className="text-sm text-gray-600">Cargo has arrived at destination port.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium">Customs Clearance</p>
              <p className="text-sm text-gray-600">Documentation and customs processing.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium">Inland Transport</p>
              <p className="text-sm text-gray-600">Delivery from port to warehouse.</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Warehouse className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium">Delivery Complete</p>
              <p className="text-sm text-gray-600">Cargo delivered to final destination.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ship className="h-5 w-5" />
            Imports
          </DialogTitle>
          <DialogDescription>
            View and track your import shipments
          </DialogDescription>
        </DialogHeader>

        {selectedImport ? (
          renderImportDetails()
        ) : (
          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'tracking')}>
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                All Imports
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center gap-1">
                <Search className="h-4 w-4" />
                Track Shipment
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {renderImportsList()}
            </TabsContent>
            <TabsContent value="tracking">
              {renderTrackingTab()}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
