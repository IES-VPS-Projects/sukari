"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Search, Users, MessageSquare, Phone, Video } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Regional Managers",
    lastMessage: "Production targets for Q4 have been updated",
    time: "2 min ago",
    unread: 3,
    type: "group",
    priority: "high",
  },
  {
    id: 2,
    name: "Field Officers",
    lastMessage: "Compliance inspection scheduled for tomorrow",
    time: "15 min ago",
    unread: 1,
    type: "group",
    priority: "medium",
  },
  {
    id: 3,
    name: "Mill Representatives",
    lastMessage: "Equipment maintenance completed successfully",
    time: "1 hour ago",
    unread: 0,
    type: "group",
    priority: "low",
  },
  {
    id: 4,
    name: "John Kamau",
    lastMessage: "The financial report is ready for review",
    time: "2 hours ago",
    unread: 0,
    type: "direct",
    priority: "medium",
  },
]

const messages = [
  {
    id: 1,
    sender: "Michael Ochieng",
    message: "Good morning team. The production figures for this week show a significant improvement.",
    time: "9:15 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    message: "Excellent news! What are the key factors contributing to this improvement?",
    time: "9:18 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Sarah Wanjiru",
    message:
      "The new equipment at Mumias mill is performing better than expected. Also, weather conditions have been favorable.",
    time: "9:22 AM",
    isOwn: false,
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-12rem)]">
      <div className="flex h-full gap-6">
        {/* Conversations List */}
        <Card className="w-1/3 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search conversations..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat.id === conversation.id ? "bg-green-50 border border-green-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedChat(conversation)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-green-100 text-green-800">
                          {conversation.type === "group" ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            conversation.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">{conversation.name}</p>
                          {conversation.priority === "high" && (
                            <Badge variant="destructive" className="text-xs">
                              High
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{conversation.time}</p>
                      {conversation.unread > 0 && (
                        <Badge className="bg-green-600 text-white text-xs mt-1">{conversation.unread}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-green-100 text-green-800">
                    {selectedChat.type === "group" ? (
                      <Users className="h-4 w-4" />
                    ) : (
                      selectedChat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedChat.name}</h3>
                  <p className="text-sm text-gray-600">{selectedChat.type === "group" ? "12 members" : "Online"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {!message.isOwn && <p className="text-xs font-medium mb-1">{message.sender}</p>}
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? "text-green-100" : "text-gray-500"}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
