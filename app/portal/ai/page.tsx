"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Mic,
  Plus,
  Grid3X3,
  FlaskRoundIcon as Flask,
  Play,
  ChevronDown,
  MoreHorizontal,
  Maximize2,
  Cloud,
  Headphones,
  AlarmClock,
  LayoutPanelLeft,
  Pencil,
} from "lucide-react"
import Image from "next/image"

const conversationHistory = [
  {
    date: "Friday, December 22",
    conversations: [
      "Sugar production analysis for Q4",
      "Weather impact on cane harvest",
      "Mill efficiency optimization",
    ],
  },
  {
    date: "Wednesday, December 20",
    conversations: ["Compliance report generation", "Stakeholder satisfaction metrics", "Revenue performance review"],
  },
  {
    date: "Monday, December 18",
    conversations: ["Strategic planning discussion", "Regional mill performance", "Policy framework updates"],
  },
]

export default function AIInterfacePage() {
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message to AI
      setMessage("")
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-[#F8F7F5]">
      {/* Left Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="text-2xl">✨</span>
              <h2 className="text-xl font-semibold text-[#202020]">Sukari AI</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <LayoutPanelLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Primary Navigation */}
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-700">
              <Grid3X3 className="h-4 w-4 mr-3" />
              Discover
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#6B6B6B]">
              <Flask className="h-4 w-4 mr-3" />
              Labs
            </Button>
          </nav>
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {conversationHistory.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-sm font-medium text-[#6B6B6B] mb-3">{group.date}</h3>
                <div className="space-y-2">
                  {group.conversations.map((conversation, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 text-sm text-[#202020] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {conversation}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Greeting Header */}
          <h1 className="text-3xl font-normal text-[#202020] mb-8">Dr. Wanjiku, it's great to see you</h1>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {/* KSB Copilot Daily - Large Featured Card */}
            <div className="lg:col-span-2 xl:col-span-2">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden rounded-[24px] shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">KSB Copilot Daily</h3>
                      <p className="text-sm text-gray-300">Dec 22 • 3 min</p>
                    </div>
                  </div>

                  {/* Audio Waveform Visualization */}
                  <div className="flex items-center justify-center mb-6 h-20">
                    <div className="flex items-end gap-1">
                      {Array.from({ length: 50 }, (_, i) => (
                        <div
                          key={i}
                          className="bg-green-400 rounded-full animate-pulse"
                          style={{
                            width: "3px",
                            height: `${Math.random() * 50 + 10}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                    Sugar production up 8%, compliance review needed for 3 mills, favorable weather conditions expected
                    for Western region
                  </p>

                  <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full py-3">
                    <Play className="h-4 w-4 mr-2" />
                    Play now
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Weather Widget */}
            <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white overflow-hidden rounded-[24px] shadow-lg border-0 relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Nairobi</h3>
                    <p className="text-4xl font-bold mb-1">24°</p>
                    <p className="text-sm opacity-90 mb-1">Mostly cloudy</p>
                    <p className="text-xs opacity-75">H 28° L 18°</p>
                  </div>
                  <div className="text-right">
                    <Cloud className="h-16 w-16 opacity-80" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KSB Insights Podcast Card */}
            <Card className="rounded-[24px] shadow-lg border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Headphones className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] flex items-center gap-1">
                      <Headphones className="h-3 w-3" />
                      KSB Insights
                    </p>
                    <h3 className="font-medium text-[#202020]">Sugar Sector Transformation</h3>
                  </div>
                </div>
                <div className="w-full h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <AlarmClock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Analytics Card */}
            <Card className="rounded-[24px] shadow-lg border-0 bg-white">
              <CardContent className="p-6">
                <h3 className="font-medium text-[#202020] mb-4">Quick Analytics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B6B6B]">Production</span>
                    <span className="font-semibold text-green-600">+8.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B6B6B]">Revenue</span>
                    <span className="font-semibold text-green-600">+12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B6B6B]">Compliance</span>
                    <span className="font-semibold text-yellow-600">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions Card */}
            <Card className="rounded-[24px] shadow-lg border-0 bg-white">
              <CardContent className="p-6">
                <h3 className="font-medium text-[#202020] mb-4">AI Suggestions</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-left h-auto p-2 text-sm">
                    Analyze Q4 trends
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left h-auto p-2 text-sm">
                    Review compliance
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left h-auto p-2 text-sm">
                    Generate report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Floating Message Input Bar */}
          <div className="max-w-4xl mx-auto mt-8">
            <form className="flex items-center gap-4 bg-white p-3 rounded-full shadow-lg">
              <div className="flex-1 relative">
                <Input
                  placeholder="Message Sukari AI"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="w-full h-12 px-4 rounded-full border-none focus:border-none focus:ring-0 text-[#202020] placeholder:text-[#6B6B6B] bg-transparent"
                />
              </div>
              <Button
                variant="ghost"
                className="rounded-full p-2 h-10 w-10"
              >
                <Image src="/sukari_ai_logo1.png" alt="Sukari AI" width={24} height={24} />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 rounded-full">
                <Plus className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className={`h-10 w-10 rounded-full ${isListening ? "bg-red-50 text-red-600" : ""}`}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
