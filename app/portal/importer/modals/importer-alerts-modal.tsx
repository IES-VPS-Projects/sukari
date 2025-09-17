"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertTriangle, 
  Bell, 
  Search, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronRight,
  ArrowLeft,
  Ship,
  FileText,
  AlertCircle,
  Filter
} from "lucide-react"
import { alertsData } from "../data/alerts-data"

interface ImporterAlertsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedAlertId?: string
}

export function ImporterAlertsModal({ open, onOpenChange, selectedAlertId }: ImporterAlertsModalProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'resolved'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [filter, setFilter] = useState<string>('all')

  // Extend imported alerts data with additional fields needed by the component
  const alerts = alertsData.map(alert => ({
    ...alert,
    isRead: Math.random() > 0.5, // Random read status for demo
    resolvedDate: alert.isResolved ? '2024-09-11T16:20:00' : undefined
  })).concat([
    // Additional alerts not in the imported data
    {
      id: 'ALT-2024-004',
      title: 'Monthly Returns Due',
      message: 'Your August 2024 monthly import returns are due by September 15, 2024. Please submit them to remain compliant with KSB regulations.',
      type: 'warning',
      category: 'regulatory',
      timestamp: '2024-09-10T09:00:00',
      isRead: true,
      isCritical: false,
      isResolved: true,
      resolvedDate: '2024-09-11T16:20:00',
      relatedDocument: 'RET-2024-001',
      actions: [],
      additionalInfo: 'Monthly returns must include details of all sugar imports, sales, and stock levels for the previous month. This information is used by KSB for market analysis and regulatory oversight.'
    },
    {
      id: 'ALT-2024-005',
      title: 'New Import Regulations',
      message: 'KSB has announced new sugar import regulations effective October 1, 2024. These changes affect quality requirements and documentation procedures.',
      type: 'info',
      category: 'regulatory',
      timestamp: '2024-09-08T11:30:00',
      isRead: true,
      isCritical: false,
      isResolved: false,
      relatedDocument: 'KSB-REG-2024-12',
      actions: [
        { label: 'View Regulations', link: '/portal/importer/resources' }
      ],
      additionalInfo: 'Key changes include: 1) Enhanced quality testing requirements for all imported sugar, 2) Additional documentation for country of origin verification, 3) Updated labeling requirements for retail packaging.'
    },
    {
      id: 'ALT-2024-006',
      title: 'Customs Clearance Complete',
      message: 'Your shipment from Brazil (IMP-2024-001) has completed customs clearance and is ready for collection.',
      type: 'success',
      category: 'logistics',
      timestamp: '2024-09-07T15:45:00',
      isRead: true,
      isCritical: false,
      isResolved: true,
      resolvedDate: '2024-09-07T16:00:00',
      relatedDocument: 'IMP-2024-001',
      actions: [],
      additionalInfo: 'All import duties and taxes have been paid. The cargo is currently at Mombasa Port Container Terminal. Please arrange for collection within 3 days to avoid storage charges.'
    }
  ])

  useEffect(() => {
    if (!open) {
      setSelectedAlert(null)
      setSearchTerm('')
      setActiveTab('all')
      setFilter('all')
    } else if (selectedAlertId) {
      const alert = alerts.find(a => a.id === selectedAlertId)
      if (alert) {
        setSelectedAlert(alert)
      }
    }
  }, [open, selectedAlertId])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const getFilteredAlerts = () => {
    // First filter by tab
    let filteredByTab = alerts
    if (activeTab === 'critical') {
      filteredByTab = alerts.filter(alert => alert.isCritical)
    } else if (activeTab === 'resolved') {
      filteredByTab = alerts.filter(alert => alert.isResolved)
    }
    
    // Then filter by category if needed
    if (filter !== 'all') {
      filteredByTab = filteredByTab.filter(alert => alert.category === filter)
    }
    
    // Finally filter by search term
    return filteredByTab.filter(alert => 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'info':
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300'
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'regulatory':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Regulatory</Badge>
      case 'financial':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Financial</Badge>
      case 'logistics':
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Logistics</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{category}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const renderAlertsList = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-1 items-center gap-2 border rounded-lg p-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search alerts..." 
            value={searchTerm}
            onChange={handleSearch}
            className="border-0 focus-visible:ring-0"
          />
        </div>
        
        <div className="flex items-center gap-2 border rounded-lg p-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-0 bg-transparent focus:outline-none text-sm flex-1"
          >
            <option value="all">All Categories</option>
            <option value="regulatory">Regulatory</option>
            <option value="financial">Financial</option>
            <option value="logistics">Logistics</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {getFilteredAlerts().length === 0 ? (
          <div className="text-center p-4">
            <p className="text-gray-500">No alerts found matching your criteria.</p>
          </div>
        ) : (
          getFilteredAlerts().map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 border rounded-lg space-y-2 hover:bg-gray-50 transition-colors cursor-pointer ${!alert.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  {getAlertTypeIcon(alert.type)}
                  <div>
                    <h4 className="font-semibold">{alert.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{alert.message}</p>
                  </div>
                </div>
                {alert.isCritical && (
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                    Critical
                  </Badge>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getCategoryBadge(alert.category)}
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(alert.timestamp)}
                  </span>
                </div>
                
                <div className="flex items-center">
                  {alert.isResolved && (
                    <Badge variant="outline" className="border-green-300 text-green-700 mr-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Resolved
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const renderAlertDetails = () => {
    if (!selectedAlert) return null
    
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          className="mb-2" 
          onClick={() => setSelectedAlert(null)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Alerts
        </Button>
        
        <div className={`p-6 rounded-lg ${getAlertTypeColor(selectedAlert.type)}`}>
          <div className="flex items-start gap-3">
            {getAlertTypeIcon(selectedAlert.type)}
            <div>
              <h3 className="text-lg font-semibold">{selectedAlert.title}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {getCategoryBadge(selectedAlert.category)}
                {selectedAlert.isCritical && (
                  <Badge className="bg-red-200 text-red-800 hover:bg-red-200">
                    Critical
                  </Badge>
                )}
                {selectedAlert.isResolved && (
                  <Badge className="bg-green-200 text-green-800 hover:bg-green-200">
                    Resolved
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-1">ALERT ID</h4>
            <p>{selectedAlert.id}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-1">DATE & TIME</h4>
            <p>{formatDate(selectedAlert.timestamp)} at <span className="font-medium">{formatTime(selectedAlert.timestamp)}</span></p>
          </div>
          
          {selectedAlert.isResolved && selectedAlert.resolvedDate && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-1">RESOLVED ON</h4>
              <p>{formatDate(selectedAlert.resolvedDate)} at <span className="font-medium">{formatTime(selectedAlert.resolvedDate)}</span></p>
            </div>
          )}
          
          {selectedAlert.relatedDocument && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-1">RELATED DOCUMENT</h4>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-blue-500 mr-2" />
                <span>{selectedAlert.relatedDocument}</span>
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-1">MESSAGE</h4>
            <p className="text-gray-800 whitespace-pre-line">{selectedAlert.message}</p>
          </div>
          
          {selectedAlert.additionalInfo && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Additional Information</h4>
              <p className="text-gray-700 text-sm">{selectedAlert.additionalInfo}</p>
            </div>
          )}
          
          {selectedAlert.actions && selectedAlert.actions.length > 0 && (
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">RECOMMENDED ACTIONS</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAlert.actions.map((action: any, index: number) => (
                  <Button 
                    key={index} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {!selectedAlert.isResolved && (
          <div className="pt-4 border-t flex justify-end">
            <Button variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Resolved
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alerts
          </DialogTitle>
          <DialogDescription>
            View and manage important alerts and notifications
          </DialogDescription>
        </DialogHeader>

        {selectedAlert ? (
          renderAlertDetails()
        ) : (
          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'critical' | 'resolved')}>
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                All Alerts
              </TabsTrigger>
              <TabsTrigger value="critical" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Critical
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Resolved
              </TabsTrigger>
            </TabsList>
            {renderAlertsList()}
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
