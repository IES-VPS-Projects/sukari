"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Check, X, Users, Clock, ArrowRight, RefreshCw } from "lucide-react"
import { GoInfo } from 'react-icons/go'
import { allActivitiesData } from "@/lib/mockdata"

// Define extended interface for ActivityItem with missing properties
interface ExtendedActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: string;
  status: string;
  location?: string;
  date: string;
  time: string;
  participants?: string[];
  category?: string;
  priority?: string;
  relatedEntities?: string[];
}

interface ActivitiesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onActivityClick?: (activityId: string) => void
}

export function ActivitiesModal({ 
  open, 
  onOpenChange, 
  onActivityClick 
}: ActivitiesModalProps) {

  const handleClose = () => {
    onOpenChange(false)
  }
  
  const handleActivityClick = (activityId: string) => {
    if (onActivityClick) {
      onActivityClick(activityId);
    }
  }

  // Cast to extended type
  const extendedActivities = allActivitiesData as unknown as ExtendedActivityItem[];

  // Function to format date strings in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  }

  // Helper function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <MapPin className="h-4 w-4 text-blue-500" />;
      case 'meeting':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'task':
        return <Check className="h-4 w-4 text-amber-500" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  }

  // Helper function to get badge style based on status
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'in-progress':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'scheduled':
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case 'pending':
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case 'cancelled':
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  }

  // Helper function to get hover bg based on activity type
  const getHoverBg = (type: string) => {
    switch (type) {
      case 'visit':
        return 'hover:bg-blue-50';
      case 'meeting':
        return 'hover:bg-green-50';
      case 'task':
        return 'hover:bg-amber-50';
      case 'event':
        return 'hover:bg-purple-50';
      default:
        return 'hover:bg-gray-50';
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">Activities</DialogTitle>
        
        <div className="flex flex-col h-full min-h-0">
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Activities</h2>
                <p className="text-sm text-gray-500 mt-1">{extendedActivities.length} planned and completed activities</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="group relative">
                  <GoInfo className="h-5 w-5 text-gray-400 cursor-help" />
                  <div className="absolute right-0 top-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    Scheduled activities and tasks
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="shrink-0 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="flex-1 flex flex-col min-h-0">
            <div className="border-b px-6">
              <TabsList className="border-b-0 p-0 h-12">
                <TabsTrigger value="all" className="flex gap-2 py-3 px-4 border-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none">
                  <span>All</span>
                  <Badge className="ml-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {extendedActivities.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="flex gap-2 py-3 px-4 border-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none">
                  <span>Scheduled</span>
                  <Badge className="ml-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {extendedActivities.filter(activity => activity.status === 'scheduled' || activity.status === 'in-progress').length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex gap-2 py-3 px-4 border-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none">
                  <span>Completed</span>
                  <Badge className="ml-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {extendedActivities.filter(activity => activity.status === 'completed').length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="flex-1 min-h-0 m-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-0.5 p-1">
                  {extendedActivities.map((activity) => (
                    <div 
                      key={activity.id}
                      className={`flex items-start gap-3 p-4 ${getHoverBg(activity.type)} rounded-md cursor-pointer transition-colors duration-200`}
                      onClick={() => handleActivityClick(activity.id)}
                    >
                      <div className={`w-8 h-8 ${activity.type === 'visit' ? 'bg-blue-100' : activity.type === 'meeting' ? 'bg-green-100' : activity.type === 'task' ? 'bg-amber-100' : 'bg-purple-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-[#202020] truncate">{activity.title}</h4>
                            <p className="text-xs text-[#6B6B6B] mb-1">{activity.description}</p>
                            <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                              <span>{formatDate(activity.date)}</span>
                              <span>•</span>
                              <span>{activity.time}</span>
                              <span>•</span>
                              <span>{activity.location}</span>
                            </div>
                          </div>
                          <div>
                            <Badge className={`text-xs whitespace-nowrap ${getStatusBadgeStyle(activity.status)}`}>
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1).replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="scheduled" className="flex-1 min-h-0 m-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-0.5 p-1">
                  {extendedActivities
                    .filter(activity => activity.status === 'scheduled' || activity.status === 'in-progress')
                    .map((activity) => (
                    <div 
                      key={activity.id}
                      className={`flex items-start gap-3 p-4 ${getHoverBg(activity.type)} rounded-md cursor-pointer transition-colors duration-200`}
                      onClick={() => handleActivityClick(activity.id)}
                    >
                      <div className={`w-8 h-8 ${activity.type === 'visit' ? 'bg-blue-100' : activity.type === 'meeting' ? 'bg-green-100' : activity.type === 'task' ? 'bg-amber-100' : 'bg-purple-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-[#202020] truncate">{activity.title}</h4>
                            <p className="text-xs text-[#6B6B6B] mb-1">{activity.description}</p>
                            <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                              <span>{formatDate(activity.date)}</span>
                              <span>•</span>
                              <span>{activity.time}</span>
                              <span>•</span>
                              <span>{activity.location}</span>
                            </div>
                          </div>
                          <div>
                            <Badge className={`text-xs whitespace-nowrap ${getStatusBadgeStyle(activity.status)}`}>
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1).replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="completed" className="flex-1 min-h-0 m-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-0.5 p-1">
                  {extendedActivities
                    .filter(activity => activity.status === 'completed')
                    .map((activity) => (
                    <div 
                      key={activity.id}
                      className={`flex items-start gap-3 p-4 ${getHoverBg(activity.type)} rounded-md cursor-pointer transition-colors duration-200`}
                      onClick={() => handleActivityClick(activity.id)}
                    >
                      <div className={`w-8 h-8 ${activity.type === 'visit' ? 'bg-blue-100' : activity.type === 'meeting' ? 'bg-green-100' : activity.type === 'task' ? 'bg-amber-100' : 'bg-purple-100'} rounded-full flex items-center justify-center flex-shrink-0`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-[#202020] truncate">{activity.title}</h4>
                            <p className="text-xs text-[#6B6B6B] mb-1">{activity.description}</p>
                            <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                              <span>{formatDate(activity.date)}</span>
                              <span>•</span>
                              <span>{activity.time}</span>
                              <span>•</span>
                              <span>{activity.location}</span>
                            </div>
                          </div>
                          <div>
                            <Badge className="text-xs whitespace-nowrap bg-green-100 text-green-800 hover:bg-green-200">
                              Completed
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}