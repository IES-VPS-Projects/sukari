"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  Activity,
  BarChart3,
  Eye
} from "lucide-react"

interface MissionData {
  title: string
  status: 'completed' | 'active'
  description: string
}

interface MissionControlPanelProps {
  todaysMissions: MissionData[]
  completedMissions: number
  onAnalyticsClick: () => void
  onApplicationsClick: () => void
}

export function MissionControlPanel({ 
  todaysMissions, 
  completedMissions, 
  onAnalyticsClick, 
  onApplicationsClick 
}: MissionControlPanelProps) {
  return (
    <Card className="shadow-lg" style={{ backgroundColor: '#334b35' }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Today's Operations
        </CardTitle>
        <div className="text-white/80 text-sm">
          {completedMissions}/{todaysMissions.length} Operations completed
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {todaysMissions.map((mission, index) => (
          <Card key={index} className="bg-white/10 border-white/20">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    mission.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {mission.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <Activity className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">{mission.title}</div>
                    <div className="text-white/70 text-xs">{mission.description}</div>
                  </div>
                </div>
                <Badge 
                  variant={mission.status === 'completed' ? 'secondary' : 'default'}
                  className={mission.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                  style={{ backgroundColor: mission.status === 'active' ? '#f7c35f' : undefined }}
                >
                  {mission.status.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="flex gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-white/30 text-white hover:bg-white/10"
            onClick={onAnalyticsClick}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Log Stats
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            style={{ backgroundColor: '#f7c35f' }}
            onClick={onApplicationsClick}
          >
            <Eye className="h-4 w-4 mr-1" />
            Go to Operations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}