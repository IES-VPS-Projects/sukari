"use client"

import { useState, useEffect } from "react"
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
import { useAuth } from "@/components/auth-provider"
import { geminiService, ChatMessage } from "@/lib/gemini-service";

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
  const [dynamicGreeting, setDynamicGreeting] = useState("")
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth()

  // Array of dynamic greetings for AI impression
  const dynamicGreetings = [
    "Back at it, {name}?",
    "Nice to see you {name}, What's new?",
    "Hi {name}, what should we dive into today?",
    "Hey {name}, what's on your mind today?"
  ]

  // Get the first name from the user's full name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0]
  }

  // Select a random greeting when the component mounts
  useEffect(() => {
    if (user) {
      const firstName = getFirstName(user.name)
      const randomIndex = Math.floor(Math.random() * dynamicGreetings.length)
      const greeting = dynamicGreetings[randomIndex].replace('{name}', firstName)
      setDynamicGreeting(greeting)
    }
  }, [user])

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMsg: ChatMessage = { role: 'user', content: message };
      setConversation(prev => [...prev, userMsg]);
      setMessage("");
      setLoading(true);
      try {
        const aiReply = await geminiService.generateResponse([...conversation, userMsg]);
        setConversation(prev => [...prev, { role: 'assistant', content: aiReply }]);
      } catch (err) {
        setConversation(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not get a response from the AI.' }]);
      }
      setLoading(false);
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

  const SidebarActions = () => (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={handleToggleSidebar} className="text-green-600 hover:text-green-700 hover:bg-green-100">
        <LayoutPanelLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={handleNewChat} className="text-green-600 hover:text-green-700 hover:bg-green-100">
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] bg-white">
      {/* Left Sidebar */}
      <aside className={`bg-green-50 border-r border-gray-200 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:w-0 lg:overflow-hidden' : 'w-full lg:w-80'}`}>
        {/* Sidebar Header */}
        <div className={`p-4 border-b border-gray-200 transition-opacity duration-300 ${isSidebarCollapsed ? 'lg:opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <span className="text-2xl">✨</span>
              <h2 className="text-xl font-semibold text-green-700">Sukari AI</h2>
            </div>
            <SidebarActions />
          </div>
        </div>

        {/* Conversation History */}
        <div className={`flex-1 overflow-y-auto p-4 transition-opacity duration-300 ${isSidebarCollapsed ? 'lg:opacity-0' : 'opacity-100'}`}>
          <h3 className="text-lg font-medium text-green-700 mb-4">Conversations</h3>
          <div className="space-y-6">
            {conversationHistory.map((group: ConversationGroup, groupIndex: number) => (
              <div key={groupIndex}>
                <h4 className="text-sm font-medium text-green-600 mb-3">{group.date}</h4>
                <div className="space-y-2">
                  {group.conversations.map((conversation: string, index: number) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 text-sm text-green-700 hover:bg-green-100 rounded-lg transition-colors"
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
            {/* Conversation History */}
            <div className="mb-6 space-y-4">
              {conversation.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-xl px-4 py-2 max-w-[80%] ${msg.role === 'user' ? 'bg-green-200 text-right' : 'bg-gray-100 text-left'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-4 py-2 bg-gray-100 text-left animate-pulse">Sukari AI is typing...</div>
                </div>
              )}
            </div>
            {/* Greeting Header */}
            <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
              {dynamicGreeting || "Great to see you"}
            </h1>

            {/* Floating Message Input Bar */}
            <form 
              className="flex items-center gap-4 bg-green-100 p-3 rounded-full shadow-lg mb-6"
              onSubmit={e => { e.preventDefault(); handleSendMessage(); }}
            >
              <div className="flex-1 relative bg-white rounded-full">
                <Input
                  placeholder="Message Sukari AI"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-12 px-4 rounded-full border-none focus:border-none focus:ring-0 outline-none text-[#202020] placeholder:text-[#6B6B6B] bg-transparent"
                />
              </div>
              <Button 
                type="submit"
                variant="ghost" 
                size="sm" 
                className="h-10 w-10 rounded-full text-green-600 hover:text-green-700 hover:bg-green-100"
                aria-label="Send message"
              >
                <Play className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className={`h-10 w-10 rounded-full ${isListening ? "bg-red-50 text-red-600" : "text-green-600 hover:text-green-700 hover:bg-green-100"}`}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </form>

            {/* AI Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Show national sugar production for 2024")}
              >
                Show national sugar production for 2024
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Compare sugar production by region for last year")}
              >
                Compare sugar production by region for last year
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Which factory had the highest production this month?")}
              >
                Which factory had the highest production this month?
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Show sugar production trends for the last 5 years")}
              >
                Show sugar production trends for the last 5 years
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("What is the average crop yield by region?")}
              >
                What is the average crop yield by region?
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("List all factories and their production for June")}
              >
                List all factories and their production for June
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("What was the total cane deliveries in Nzoia in March?")}
              >
                What was the total cane deliveries in Nzoia in March?
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Show production value by variety")}
              >
                Show production value by variety
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Which regions had the lowest production last quarter?")}
              >
                Which regions had the lowest production last quarter?
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 text-left justify-start rounded-xl border-gray-200 hover:bg-green-100 active:bg-green-100 text-[#6B6B6B] hover:text-[#202020] whitespace-normal"
                onClick={() => setMessage("Give me a summary of sugar prices over the years")}
              >
                Give me a summary of sugar prices over the years
              </Button>
            </div>
          </div>
        </div>
      </main>

      {isSidebarCollapsed && (
        <div className="fixed top-[80px] left-0 z-10 p-2">
          <SidebarActions />
        </div>
      )}
    </div>
  )
}
