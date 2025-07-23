"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  DollarSign,
  Calendar,
  MessageSquare,
  FileText,
  Award,
  Target,
} from "lucide-react"
import { ScheduleVisitModal } from "@/components/modals/schedule-visit-modal"

export default function TodayPage() {
  const [scheduleVisitOpen, setScheduleVisitOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")

  const currentTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const handleScheduleVisit = (location?: string) => {
    setSelectedLocation(location || "")
    setScheduleVisitOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      {/* Centered Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Header with User Info */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-normal text-[#202020]">Good morning, Dr. Wanjiku</h1>
              <p className="text-[#6B6B6B]">{currentTime}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Target className="h-3 w-3 mr-1" />
                1,250 Points
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Award className="h-3 w-3 mr-1" />
                Level 5 Executive
              </Badge>
            </div>
          </div>

          {/* AI Morning Briefing */}
          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white mb-8 rounded-[24px] shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5" />
                <h3 className="font-semibold text-lg">AI Morning Briefing</h3>
              </div>
              <p className="text-sm text-green-100 mb-6">Generated at 6:00 AM • Last updated 2 minutes ago</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-3">Key Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Sugar production up 12% this week vs last week</li>
                    <li>• 3 mills reporting optimal capacity utilization</li>
                    <li>• Weather conditions favorable for next 7 days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Action Required</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Review Mumias region compliance report</li>
                    <li>• Approve 2 pending mill licenses</li>
                    <li>• Schedule farmer meeting for next week</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations and Stakeholder Sentiment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#202020]">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  AI Recommendations
                </CardTitle>
                <CardDescription className="text-[#6B6B6B]">
                  Intelligent insights based on current data patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Consider visiting Mumias region</p>
                    <p className="text-xs text-[#6B6B6B]">
                      15% production drop detected - requires executive attention
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleScheduleVisit("Mumias Sugar Mill")}>
                    Schedule
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Recommend policy review</p>
                    <p className="text-xs text-[#6B6B6B]">23% increase in compliance violations this quarter</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Weather alert preparation</p>
                    <p className="text-xs text-[#6B6B6B]">Prepare drought mitigation for Western region</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Prepare
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#202020]">
                  <Users className="h-5 w-5 text-purple-600" />
                  Stakeholder Sentiment
                </CardTitle>
                <CardDescription className="text-[#6B6B6B]">
                  AI-analyzed feedback from field reports and communications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-[#202020]">Farmers</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">78% Positive</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-[#202020]">Mill Operators</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600">85% Positive</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-[#202020]">Dealers</span>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">65% Neutral</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-[#202020]">Field Officers</span>
                    </div>
                    <span className="text-sm font-medium text-purple-600">92% Positive</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-[#6B6B6B]">
                    <strong>Recent Feedback:</strong> "New digital reporting system has improved efficiency
                    significantly" - Field Officer, Nyanza Region
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start h-auto p-3 bg-transparent">
                  <Calendar className="h-4 w-4 mr-3" />
                  Schedule Mill Visit
                </Button>
                <Button variant="ghost" className="w-full justify-start h-auto p-3 bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-3" />
                  Message Stakeholders
                </Button>
                <Button variant="ghost" className="w-full justify-start h-auto p-3 bg-transparent">
                  <FileText className="h-4 w-4 mr-3" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Board Meeting</p>
                    <p className="text-xs text-[#6B6B6B]">Today, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Farmer Representatives</p>
                    <p className="text-xs text-[#6B6B6B]">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Mill Operators Review</p>
                    <p className="text-xs text-[#6B6B6B]">Friday, 3:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-[#202020]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Approved mill license renewal</p>
                    <p className="text-xs text-[#6B6B6B]">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Reviewed compliance report</p>
                    <p className="text-xs text-[#6B6B6B]">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Scheduled farmer meeting</p>
                    <p className="text-xs text-[#6B6B6B]">Yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Insights */}
          <Card className="bg-white rounded-[24px] shadow-lg border-0 mb-8">
            <CardHeader>
              <CardTitle className="text-[#202020]">Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#6B6B6B]">Sugarcane</h3>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#202020] mb-1">KSh 4,500</div>
                  <p className="text-xs text-[#6B6B6B] mb-3">per tonne current price</p>
                  <p className="text-xs text-green-600 mb-2">+5% from last week</p>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#6B6B6B]">Import Volume</span>
                    <span className="font-medium">1,000 tonnes</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B6B6B]">Export Volume</span>
                    <span className="font-medium">200 tonnes</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#6B6B6B]">Sugar</h3>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#202020] mb-1">KSh 85</div>
                  <p className="text-xs text-[#6B6B6B] mb-3">per kg current price</p>
                  <p className="text-xs text-red-600 mb-2">-2% from last week</p>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#6B6B6B]">Import Volume</span>
                    <span className="font-medium">2,450 tonnes</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B6B6B]">Export Volume</span>
                    <span className="font-medium">890 tonnes</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#6B6B6B]">Molasses</h3>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#202020] mb-1">KSh 15,000</div>
                  <p className="text-xs text-[#6B6B6B] mb-3">per tonne current price</p>
                  <p className="text-xs text-green-600 mb-2">+3% from last week</p>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#6B6B6B]">Import Volume</span>
                    <span className="font-medium">500 tonnes</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B6B6B]">Export Volume</span>
                    <span className="font-medium">300 tonnes</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-[#6B6B6B]">Fertilizer</h3>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#202020] mb-1">KSh 2,500</div>
                  <p className="text-xs text-[#6B6B6B] mb-3">per 50 kg bag current price</p>
                  <p className="text-xs text-red-600 mb-2">-1% from last week</p>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#6B6B6B]">Import Volume</span>
                    <span className="font-medium">1,200 tonnes</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B6B6B]">Export Volume</span>
                    <span className="font-medium">100 tonnes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      <ScheduleVisitModal
        open={scheduleVisitOpen}
        onOpenChange={setScheduleVisitOpen}
        defaultLocation={selectedLocation}
      />
    </div>
  )
}
