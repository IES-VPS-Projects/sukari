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

type ConversationGroup = {
  date: string
  conversations: string[]
}

// Make conversationHistory dynamic
const initialHistory: ConversationGroup[] = [
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<ConversationGroup[]>(initialHistory)

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("")
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
  }

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleNewChat = () => {
    setMessage("")
    setConversationHistory([
      { date: new Date().toLocaleDateString(), conversations: [] },
      ...conversationHistory
    ])
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-[#F8F7F5]">
      {/* Left Sidebar */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all ${isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-80'}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="text-2xl">✨</span>
              <h2 className="text-xl font-semibold text-[#202020]">Sukari AI</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleToggleSidebar}>
                <LayoutPanelLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleNewChat}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-lg font-medium text-[#202020] mb-4">Conversations</h3>
          <div className="space-y-6">
            {conversationHistory.map((group: ConversationGroup, groupIndex: number) => (
              <div key={groupIndex}>
                <h4 className="text-sm font-medium text-[#6B6B6B] mb-3">{group.date}</h4>
                <div className="space-y-2">
                  {group.conversations.map((conversation: string, index: number) => (
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
        <div className="flex-1 flex flex-col justify-center items-center overflow-y-auto p-8">
          <div className="max-w-4xl w-full">
            {/* Greeting Header */}
            <h1 className="text-3xl font-bold text-[#202020] mb-8 text-center">Dr. Kazungu, it's great to see you</h1>

            {/* Floating Message Input Bar */}
            <form className="flex items-center gap-4 bg-[#F5F5DC] p-3 rounded-full shadow-lg mb-6">
              <div className="flex-1 relative bg-white rounded-full">
                <Input
                  placeholder="Message Sukari AI"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="w-full h-12 px-4 rounded-full border-none focus:border-none focus:ring-0 outline-none text-[#202020] placeholder:text-[#6B6B6B] bg-transparent"
                />
              </div>
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

            {/* AI Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-[#F5F5DC] active:bg-[#F5F5DC] text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("What's the drought risk for Western region?")}
              >
                What's the drought risk for Western region?
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-[#F5F5DC] active:bg-[#F5F5DC] text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Predict next month's sugar production")}
              >
                Predict next month's sugar production
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-[#F5F5DC] active:bg-[#F5F5DC] text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("What are the top revenue-generating mills?")}
              >
                What are the top revenue-generating mills?
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-[#F5F5DC] active:bg-[#F5F5DC] text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Compare revenue vs budget for Q1")}
              >
                Compare revenue vs budget for Q1
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-[#F5F5DC] active:bg-[#F5F5DC] text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Show me pending license renewals")}
              >
                Show me pending license renewals
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-[#F5F5DC] active:bg-[#F5F5DC] text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("List all compliance violations this month")}
              >
                List all compliance violations this month
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-[#F5F5DC] active:bg-[#F5F5DC] text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Which mills are underperforming this month?")}
              >
                Which mills are underperforming this month?
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-[#F5F5DC] active:bg-[#F5F5DC] text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Compare this season's production with last year")}
              >
                Compare this season's production with last year
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-[#F5F5DC] active:bg-[#F5F5DC] text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Show me sugar production by county for the last quarter")}
              >
                Show me sugar production by county for the last quarter
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
