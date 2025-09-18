"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Award, Trophy, Star, Medal, FileText, Crown } from "lucide-react"

interface AchievementsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AchievementsModal({ open, onOpenChange }: AchievementsModalProps) {
  const achievementsData = {
    totalAwards: 6,
    serviceMedals: 3,
    excellenceAwards: 2,
    certificates: 1,
    awards: [
      {
        id: 1,
        title: "Excellence in Leadership Award",
        category: "Leadership",
        date: "2024-03-15",
        description: "Outstanding leadership in sugar industry development initiatives",
        icon: Crown,
        level: "Gold"
      },
      {
        id: 2,
        title: "Innovation in Agriculture Medal",
        category: "Innovation",
        date: "2023-11-20",
        description: "Pioneering sustainable farming practices across sugar estates",
        icon: Medal,
        level: "Silver"
      },
      {
        id: 3,
        title: "Service Excellence Recognition",
        category: "Service",
        date: "2023-08-10",
        description: "Exceptional service delivery and stakeholder engagement",
        icon: Star,
        level: "Gold"
      },
      {
        id: 4,
        title: "Quality Management Certification",
        category: "Professional",
        date: "2023-05-22",
        description: "Advanced certification in quality management systems",
        icon: FileText,
        level: "Certification"
      },
      {
        id: 5,
        title: "Strategic Planning Award",
        category: "Strategy",
        date: "2022-12-05",
        description: "Excellence in strategic planning and implementation",
        icon: Trophy,
        level: "Bronze"
      },
      {
        id: 6,
        title: "Team Development Medal",
        category: "Development",
        date: "2022-09-18",
        description: "Outstanding contribution to team development and training",
        icon: Award,
        level: "Silver"
      }
    ]
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Gold":
        return "text-yellow-600 bg-yellow-50"
      case "Silver":
        return "text-gray-600 bg-gray-50"
      case "Bronze":
        return "text-amber-600 bg-amber-50"
      case "Certification":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 sm:p-6 border-b bg-gray-50">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Award className="h-5 w-5" />
            Achievements
          </DialogTitle>
          <DialogDescription className="text-sm">
            Professional honors, awards, and recognition for outstanding service
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-6">
          {/* Achievement Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{achievementsData.totalAwards}</div>
                <div className="text-sm text-muted-foreground">Total Awards</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Medal className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-600">{achievementsData.serviceMedals}</div>
                <div className="text-sm text-muted-foreground">Service Medals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{achievementsData.excellenceAwards}</div>
                <div className="text-sm text-muted-foreground">Excellence Awards</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{achievementsData.certificates}</div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </CardContent>
            </Card>
          </div>

          {/* Awards List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Awards & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievementsData.awards.map((award, index) => {
                  const IconComponent = award.icon
                  return (
                    <div key={award.id}>
                      <div className="flex items-start gap-4 p-4 rounded-lg border">
                        <div className={`p-3 rounded-full ${getLevelColor(award.level)}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-lg">{award.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {award.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                Awarded on {new Date(award.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge 
                                variant="secondary" 
                                className={getLevelColor(award.level)}
                              >
                                {award.level}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {award.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < achievementsData.awards.length - 1 && <Separator className="my-2" />}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  Leadership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-yellow-600">2</div>
                  <div className="text-sm text-muted-foreground">
                    Awards for exceptional leadership and team management
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-muted-foreground">
                    Recognition for innovative solutions and practices
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Professional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-muted-foreground">
                    Professional certifications and qualifications
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
