"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { 
  Search, 
  Hash, 
  MessageSquare, 
  Bell, 
  Bookmark, 
  Plus, 
  ChevronDown,
  Paperclip,
  Smile,
  Send,
  Home,
  Pin,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  HelpCircle
} from "lucide-react"
import { VscNewFile } from 'react-icons/vsc'
import { HiOutlineChatBubbleBottomCenterText, HiOutlineUsers } from 'react-icons/hi2'
import { MdOutlineSettingsVoice } from 'react-icons/md'
import { RiDraftLine } from 'react-icons/ri'
import { AiOutlineMore } from 'react-icons/ai'
import { BsFilter } from 'react-icons/bs'

// Mock data
const channels = [
  { id: 1, name: "events", unread: 3, hasNotification: true },
  { id: 2, name: "field-officers", unread: 0, hasNotification: false },
  { id: 3, name: "compliance-reports", unread: 1, hasNotification: true },
  { id: 4, name: "mill-operations", unread: 0, hasNotification: false },
  { id: 5, name: "finance-updates", unread: 2, hasNotification: true },
]

const directMessages: DirectMessage[] = [
  { id: 1, name: "Yusuf Menza", status: "online", unread: 2, lastMessage: "The mill inspection report for Nzoia is ready for your review", time: "5m" },
  { id: 2, name: "Joyce Jura", status: "away", unread: 0, lastMessage: "Budget allocation for Q2 has been approved by the board", time: "15m" },
  { id: 3, name: "Jude Chesire", status: "online", unread: 1, lastMessage: "Emergency meeting scheduled for tomorrow regarding regulatory changes", time: "1h" },
  { id: 4, name: "Moses Mtengo", status: "offline", unread: 0, lastMessage: "Compliance audit findings submitted to your dashboard", time: "3h" },
]

const channelMessages = [
  {
    id: 1,
    type: "system",
    content: "Jude Chesire, Darius Jabali and 163 others joined.",
    timestamp: "6:44 PM",
    date: "Friday, May 30th"
  },
  {
    id: 2,
    type: "message",
    user: "Jude Chesire (Director General)",
    avatar: "EK",
    content: "One more week until Success in Black - Customer Success network event. There's still some room to register",
    timestamp: "4:25 PM",
    isPinned: true,
    hasPreview: true,
    preview: {
      title: "Success in Black NYC Kickoff • Luma",
      description: "Join Success in Black for our first NYC community gathering! Connect with a vibrant network of professionals across all levels of Customer Success careers, from...",
      url: "luma.com"
    }
  },
  {
    id: 3,
    type: "message",
    user: "Sarah Mwangi",
    avatar: "SM",
    content: "Looking forward to this event! The networking opportunities will be valuable for our team.",
    timestamp: "4:28 PM"
  }
]

const dmMessages: { [key: number]: any[] } = {
  1: [ // Yusuf Menza
    {
      id: 1,
      type: "message",
      user: "Yusuf Menza",
      avatar: "YM",
      content: "Good morning Jude Chesire! The Nzoia Sugar Mill inspection has been completed.",
      timestamp: "9:15 AM",
      date: "Today"
    },
    {
      id: 2,
      type: "message",
      user: "Yusuf Menza",
      avatar: "YM",
      content: "We found some equipment maintenance issues that need immediate attention. The detailed report is attached.",
      timestamp: "9:17 AM",
      date: "Today"
    },
    {
      id: 3,
      type: "message",
      user: "Yusuf Menza",
      avatar: "YM",
      content: "The mill inspection report for Nzoia is ready for your review",
      timestamp: "10:45 AM",
      date: "Today"
    }
  ],
  2: [ // Joyce Jura
    {
      id: 1,
      type: "message",
      user: "Joyce Jura",
      avatar: "JJ",
      content: "Jude Chesire, I have great news about the Q2 budget proposal!",
      timestamp: "8:30 AM",
      date: "Today"
    },
    {
      id: 2,
      type: "message",
      user: "Joyce Jura",
      avatar: "JJ",
      content: "The board has approved the additional funding for mill modernization projects.",
      timestamp: "8:32 AM",
      date: "Today"
    },
    {
      id: 3,
      type: "message",
      user: "Joyce Jura",
      avatar: "JJ",
      content: "Budget allocation for Q2 has been approved by the board",
      timestamp: "9:15 AM",
      date: "Today"
    }
  ],
  3: [ // Jude Chesire
    {
      id: 1,
      type: "message",
      user: "Jude Chesire",
      avatar: "EK",
      content: "Good morning! We need to discuss the new regulatory framework from the Ministry.",
      timestamp: "7:45 AM",
      date: "Today"
    },
    {
      id: 2,
      type: "message",
      user: "Jude Chesire",
      avatar: "EK",
      content: "There are significant changes to sugar industry compliance requirements that affect all our mills.",
      timestamp: "7:47 AM",
      date: "Today"
    },
    {
      id: 3,
      type: "message",
      user: "Jude Chesire",
      avatar: "EK",
      content: "Emergency meeting scheduled for tomorrow regarding regulatory changes",
      timestamp: "8:30 AM",
      date: "Today"
    }
  ],
  4: [ // Moses Mtengo
    {
      id: 1,
      type: "message",
      user: "Moses Mtengo",
      avatar: "MM",
      content: "The quarterly compliance audit has been completed for all operational mills.",
      timestamp: "2:15 PM",
      date: "Yesterday"
    },
    {
      id: 2,
      type: "message",
      user: "Moses Mtengo",
      avatar: "MM",
      content: "Overall compliance score is 94%, which is excellent. Only minor issues found in documentation.",
      timestamp: "2:17 PM",
      date: "Yesterday"
    },
    {
      id: 3,
      type: "message",
      user: "Moses Mtengo",
      avatar: "MM",
      content: "Compliance audit findings submitted to your dashboard",
      timestamp: "6:30 PM",
      date: "Yesterday"
    }
  ]
}

type NavigationItem = "home" | "dms" | "activity" | "saved"
type ViewType = "channel" | "dm" | "activity" | "saved"

type DirectMessage = {
  id: number
  name: string
  status: "online" | "away" | "offline"
  unread: number
  lastMessage: string
  time: string
}

export default function ChatPage() {
  const [activeNavigation, setActiveNavigation] = useState<NavigationItem>("home")
  const [currentView, setCurrentView] = useState<ViewType>("channel")
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [selectedDM, setSelectedDM] = useState<DirectMessage | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [showChannels, setShowChannels] = useState(true)
  const [showDMs, setShowDMs] = useState(true)
  const [showUnreadsOnly, setShowUnreadsOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeActivityTab, setActiveActivityTab] = useState<"all" | "mentions" | "threads" | "reactions">("all")
  const [activeSavedTab, setActiveSavedTab] = useState<"in_progress" | "archived" | "completed">("in_progress")
  const [showSavedCard, setShowSavedCard] = useState(true)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("")
    }
  }

  const handleCreateNewMessage = () => {
    // Logic to create new message
    console.log("Creating new message...")
  }

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesUnread = showUnreadsOnly ? channel.unread > 0 : true
    return matchesSearch && matchesUnread
  })

  const filteredDMs = directMessages.filter(dm => {
    const matchesSearch = dm.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesUnread = showUnreadsOnly ? dm.unread > 0 : true
    return matchesSearch && matchesUnread
  })

  const renderMainContent = () => {
    if (currentView === "saved") {
      return (
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="max-w-md text-center">
            {/* 3D Purple Illustration */}
            <div className="mb-8">
              <div className="w-64 h-48 mx-auto relative">
                {/* Creating a 3D folded paper illustration using CSS */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg transform rotate-3 shadow-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg transform -rotate-2 shadow-md"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-400 rounded-lg shadow-sm"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded transform rotate-45 shadow-sm"></div>
                <div className="absolute bottom-6 left-6 w-12 h-2 bg-purple-600 rounded-full transform -rotate-12"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (currentView === "activity") {
      return (
        <div className="flex-1 flex">
          {/* Activity Feed - Reduced width by 50% */}
          <div className="w-1/4 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-green-600">Activity</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Show unread only</span>
                  <Switch 
                    checked={showUnreadsOnly}
                    onCheckedChange={setShowUnreadsOnly}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <button 
                  className={`text-sm ${activeActivityTab === "all" ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-green-500 hover:text-green-700"}`}
                  onClick={() => setActiveActivityTab("all")}
                >
                  All
                </button>
                <button 
                  className={`text-sm ${activeActivityTab === "mentions" ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-green-500 hover:text-green-700"}`}
                  onClick={() => setActiveActivityTab("mentions")}
                >
                  Mentions
                </button>
                <button 
                  className={`text-sm ${activeActivityTab === "threads" ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-green-500 hover:text-green-700"}`}
                  onClick={() => setActiveActivityTab("threads")}
                >
                  Threads
                </button>
                <button 
                  className={`text-sm ${activeActivityTab === "reactions" ? "text-green-600 border-b-2 border-green-600 pb-1" : "text-green-500 hover:text-green-700"}`}
                  onClick={() => setActiveActivityTab("reactions")}
                >
                  Reactions
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <div className="space-y-4">
                <div className="p-3 hover:bg-green-50 rounded-lg cursor-pointer">
                  <div className="text-sm text-green-600 mb-1">@channel mention in #field-officers</div>
                  <div className="text-sm text-green-700">Hey Track Leads, @channel (kindly read till the end)...</div>
                  <div className="text-xs text-green-500 mt-1">12:00 PM</div>
                </div>
                <div className="p-3 hover:bg-green-50 rounded-lg cursor-pointer">
                  <div className="text-sm text-green-600 mb-1">@channel mention in #compliance-reports</div>
                  <div className="text-sm text-green-700">@channel - anyone looking for a capstone project partner? 🤔</div>
                  <div className="text-xs text-green-500 mt-1">Friday</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Conversation Context - Increased width */}
          <div className="w-3/4 flex flex-col bg-white">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {activeActivityTab === "all" && (
                  <>
                    <Hash className="h-4 w-4" />
                    <span className="font-semibold">All Activity</span>
                    <Badge variant="outline" className="text-xs">Recent updates</Badge>
                  </>
                )}
                {activeActivityTab === "mentions" && (
                  <>
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-semibold">Mentions</span>
                    <Badge variant="outline" className="text-xs">Where you were tagged</Badge>
                  </>
                )}
                {activeActivityTab === "threads" && (
                  <>
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-semibold">Threads</span>
                    <Badge variant="outline" className="text-xs">Ongoing conversations</Badge>
                  </>
                )}
                {activeActivityTab === "reactions" && (
                  <>
                    <Bookmark className="h-4 w-4" />
                    <span className="font-semibold">Reactions</span>
                    <Badge variant="outline" className="text-xs">Past conversations</Badge>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              {activeActivityTab === "all" && (
                <>
                  <div className="text-center text-sm text-gray-500 mb-4">Today</div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>BK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Bright Kumedzro</span>
                          <span className="text-gray-500">10:14 AM</span>
                        </div>
                        <p className="text-sm mt-1">Hi Everyone! 👋</p>
                        <p className="text-sm mt-2">
                          I&apos;m Bright, a Program Coordinator at MMC and your Point of Contact (POC) for the program.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>YM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Yusuf Menza</span>
                          <span className="text-gray-500">11:30 AM</span>
                        </div>
                        <p className="text-sm mt-1">The mill inspection report for Nzoia is ready for your review</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {activeActivityTab === "mentions" && (
                <>
                  <div className="text-center text-sm text-gray-500 mb-4">Your Mentions</div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>EK</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Jude Chesire</span>
                          <span className="text-gray-500">Yesterday</span>
                        </div>
                        <p className="text-sm mt-1">@Director we need to discuss the new regulatory framework from the Ministry.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Joyce Jura</span>
                          <span className="text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-sm mt-1">@Director Budget allocation for Q2 has been approved by the board</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {activeActivityTab === "threads" && (
                <>
                  <div className="text-center text-sm text-gray-500 mb-4">Your Threads</div>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4" />
                        <span className="font-medium">field-officers</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>BK</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">Hi Everyone! 👋</div>
                        </div>
                        <div className="flex gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>YM</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">Welcome Bright! Looking forward to working with you.</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">3 replies • Updated 2h ago</div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4" />
                        <span className="font-medium">compliance-reports</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>MM</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">The quarterly compliance audit has been completed for all operational mills.</div>
                        </div>
                        <div className="flex gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>JJ</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">Great work! What were the key findings?</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">5 replies • Updated 1d ago</div>
                    </div>
                  </div>
                </>
              )}
              
              {activeActivityTab === "reactions" && (
                <>
                  <div className="text-center text-sm text-gray-500 mb-4">Archived Items</div>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-100 rounded-lg opacity-75">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4" />
                        <span className="font-medium">budget-planning-2024</span>
                      </div>
                      <div className="text-sm text-gray-600">This channel was archived on June 15, 2024</div>
                      <Button variant="outline" size="sm" className="mt-2">Restore Channel</Button>
                    </div>
                    
                    <div className="p-3 bg-gray-100 rounded-lg opacity-75">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4" />
                        <span className="font-medium">q1-reporting</span>
                      </div>
                      <div className="text-sm text-gray-600">This channel was archived on April 10, 2024</div>
                      <Button variant="outline" size="sm" className="mt-2">Restore Channel</Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )
    }

    // Channel or DM view
    const isChannelView = currentView === "channel"
    const currentChat = isChannelView ? selectedChannel : selectedDM

    return (
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header - 2 Rows */}
        <div className="border-b border-gray-200">
          {/* First Row */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="p-1">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 ml-3">
                {isChannelView ? <Hash className="h-5 w-5" /> : null}
                <h2 className="text-lg font-semibold">
                  {isChannelView ? `${selectedChannel.name}` : selectedDM?.name || "Select a conversation"}
                </h2>
                {!isChannelView && selectedDM?.status && (
                  <div className={`w-2 h-2 rounded-full ${
                    selectedDM.status === "online" ? "bg-green-500" : 
                    selectedDM.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                  }`} />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isChannelView && (
                <Badge variant="outline" className="text-xs bg-gray-100">
                  <HiOutlineUsers className="h-3 w-3 mr-1" />
                  210
                </Badge>
              )}
              <Button variant="ghost" size="sm">
                <AiOutlineMore className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Second Row */}
          <div className="px-4 pb-3">
            <div className="flex gap-6 text-sm">
              <button className="px-0 py-2 text-green-600 border-b-2 border-green-600 font-medium">Messages</button>
              <button className="px-0 py-2 text-gray-500 hover:text-gray-700">Files</button>
              <button className="px-0 py-2 text-gray-500 hover:text-gray-700">Pins</button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden p-6">
          {currentChat && (() => {
            const currentMessages = isChannelView ? channelMessages : (selectedDM ? dmMessages[selectedDM.id] || [] : [])
            return (
              <div className="space-y-6">
                {currentMessages.map((message: any, index: number) => (
                  <div key={message.id}>
                    {/* Date separator */}
                    {(index === 0 || currentMessages[index - 1].date !== message.date) && (
                      <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="px-4 text-sm text-gray-500 bg-white">{message.date}</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>
                    )}
                  
                    {message.type === "system" ? (
                      <div className="text-center text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {message.content}
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-3 group hover:bg-gray-50 -mx-4 px-4 py-2 rounded">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-green-100 text-green-800 text-sm">
                            {message.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{message.user}</span>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                            {message.isPinned && <Pin className="h-3 w-3 text-red-500" />}
                          </div>
                          <div className="text-sm text-gray-900 mb-2">{message.content}</div>
                          {message.hasPreview && message.preview && (
                            <div className="border border-gray-200 rounded-lg p-3 max-w-md">
                              <div className="text-sm font-semibold text-blue-600 mb-1">{message.preview.title}</div>
                              <div className="text-xs text-gray-600 mb-2">{message.preview.description}</div>
                              <div className="text-xs text-gray-500">{message.preview.url}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          })()}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="border border-gray-300 rounded-lg">
            <div className="flex items-center gap-2 p-2 border-b border-gray-200">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs font-bold">B</Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs italic">I</Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs">S</Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Hash className="h-3 w-3" />
              </Button>
              <div className="flex-1"></div>
            </div>
            <div className="flex items-end gap-2 p-3">
              <div className="flex-1">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message ${isChannelView ? `#${selectedChannel.name}` : selectedDM?.name || "..."}`}
                  className="border-0 focus:ring-0 bg-transparent resize-none"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-gray-50">
      {/* Column 1: Primary Navigation Sidebar */}
      <div className="w-20 bg-green-700 text-white flex flex-col items-center py-6">
        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center space-y-6">
          <button
            onClick={() => {
              setActiveNavigation("home")
              setCurrentView("channel")
            }}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors relative ${
              activeNavigation === "home" ? "bg-green-600" : "hover:bg-green-600"
            }`}
          >
            <div className="relative">
              <Home className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
            </div>
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => {
              setActiveNavigation("dms")
              setCurrentView("dm")
              if (!selectedDM && directMessages.length > 0) {
                setSelectedDM(directMessages[0])
              }
            }}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
              activeNavigation === "dms" ? "bg-green-600" : "hover:bg-green-600"
            }`}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs font-medium">DMs</span>
          </button>
          
          <button
            onClick={() => {
              setActiveNavigation("activity")
              setCurrentView("activity")
            }}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors relative ${
              activeNavigation === "activity" ? "bg-green-600" : "hover:bg-green-600"
            }`}
          >
            <div className="relative">
              <Bell className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">1</span>
              </div>
            </div>
            <span className="text-xs font-medium">Activity</span>
          </button>
          
          <button
            onClick={() => {
              setActiveNavigation("saved")
              setCurrentView("saved")
            }}
            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
              activeNavigation === "saved" ? "bg-green-600" : "hover:bg-green-600"
            }`}
          >
            <Bookmark className="h-6 w-6" />
            <span className="text-xs font-medium">Saved</span>
          </button>
        </nav>

        {/* Plus Button at Bottom */}
        <div className="mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Column 2: Secondary Navigation / Conversation List */}
      {(currentView === "channel" || currentView === "dm" || currentView === "saved") && (
        <div className="w-80 bg-green-50 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            {currentView === "saved" ? (
              /* Later Header for Saved View */
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-bold text-green-700">Later</h1>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100">
                    <BsFilter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              /* Default Header for Home/DMs */
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-bold text-green-700">
                  {activeNavigation === "dms" ? "Direct Messages" : "Home"}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600">Unreads</span>
                    <Switch 
                      checked={showUnreadsOnly}
                      onCheckedChange={setShowUnreadsOnly}
                      className="scale-75"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleCreateNewMessage}
                    className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100"
                  >
                    <VscNewFile className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {currentView !== "saved" && (
              <>
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find a message"
                    className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
                
                {/* Action Buttons - Only show for Home tab */}
                {activeNavigation === "home" && (
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-sm text-green-700 hover:text-green-800 hover:bg-green-100">
                      <HiOutlineChatBubbleBottomCenterText className="h-4 w-4" />
                      Threads
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-sm text-green-700 hover:text-green-800 hover:bg-green-100">
                      <MdOutlineSettingsVoice className="h-4 w-4" />
                      Meetings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-sm text-green-700 hover:text-green-800 hover:bg-green-100">
                      <RiDraftLine className="h-4 w-4" />
                      Drafts
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Saved View Content */}
            {currentView === "saved" && (
              <div>
                {/* Save Important Messages Card */}
                {showSavedCard && (
                  <div className="bg-yellow-50 rounded-lg p-4 mb-6 relative">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2 p-1 h-6 w-6"
                      onClick={() => setShowSavedCard(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <h3 className="font-bold text-gray-900 mb-3">Save important messages for later.</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Save messages or files and set reminders from any conversation. When you have time, come to Later to organize your work and check things off your to-do list.
                    </p>
                    <Button variant="outline" size="sm" className="bg-white">Learn More</Button>
                  </div>
                )}

                {/* Tab Navigation */}
                <div className="mb-6">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setActiveSavedTab("in_progress")}
                      className={`text-sm pb-2 relative ${
                        activeSavedTab === "in_progress" 
                          ? "text-green-600 font-medium" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      In progress
                      {activeSavedTab === "in_progress" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveSavedTab("archived")}
                      className={`text-sm pb-2 relative ${
                        activeSavedTab === "archived" 
                          ? "text-green-600 font-medium" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Archived
                      {activeSavedTab === "archived" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveSavedTab("completed")}
                      className={`text-sm pb-2 relative ${
                        activeSavedTab === "completed" 
                          ? "text-green-600 font-medium" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Completed
                      {activeSavedTab === "completed" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Empty State Content */}
                <div className="text-center">
                  {/* Green Sprout Icon */}
                  <div className="mb-4">
                    <div className="w-8 h-8 mx-auto text-green-500">
                      🌱
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Nothing here</h3>
                  <p className="text-sm text-gray-600 mb-6">Enjoy a little moment to yourself.</p>
                  <Button variant="outline" size="sm" className="bg-white">Create Reminder</Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Conversation List */}
          {currentView !== "saved" && (
            <div className="flex-1 overflow-y-auto p-4 pb-28">
              {activeNavigation === "home" ? (
              /* Channels Section for Home tab */
              <div className="mb-6">
                <button
                  onClick={() => setShowChannels(!showChannels)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-green-700 hover:text-green-800"
                >
                  <span className="font-semibold">Channels</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showChannels ? "" : "-rotate-90"}`} />
                </button>
                {showChannels && (
                  <div className="mt-2 space-y-1">
                    {filteredChannels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => {
                          setSelectedChannel(channel)
                          setCurrentView("channel")
                          setActiveNavigation("home")
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                          currentView === "channel" && selectedChannel.id === channel.id
                            ? "bg-green-100 border border-green-200 text-green-800"
                            : "text-green-700 hover:bg-green-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-green-500" />
                          <span className={channel.unread > 0 ? "font-semibold" : ""}>{channel.name}</span>
                        </div>
                        {channel.unread > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">{channel.unread}</Badge>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Direct Messages Section for Home tab */}
                <div className="mt-6">
                  <button
                    onClick={() => setShowDMs(!showDMs)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-green-700 hover:text-green-800"
                  >
                    <span className="font-semibold">Direct Messages</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showDMs ? "" : "-rotate-90"}`} />
                  </button>
                  {showDMs && (
                    <div className="mt-2 space-y-1">
                      {filteredDMs.map((dm) => (
                        <button
                          key={dm.id}
                          onClick={() => {
                            setSelectedDM(dm)
                            setCurrentView("dm")
                            setActiveNavigation("dms")
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentView === "dm" && selectedDM?.id === dm.id
                              ? "bg-green-100 border border-green-200 text-green-800"
                              : "text-green-700 hover:bg-green-100"
                          }`}
                        >
                          <div className="relative">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                                {dm.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${
                              dm.status === "online" ? "bg-green-500" : 
                              dm.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm ${dm.unread > 0 ? "font-semibold" : ""}`}>{dm.name}</div>
                            <div className="text-xs text-green-500 truncate">{dm.lastMessage}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-green-500">{dm.time}</div>
                            {dm.unread > 0 && (
                              <Badge className="bg-red-500 text-white text-xs mt-1">{dm.unread}</Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Direct Messages List for DMs tab */
              <div className="space-y-1">
                {filteredDMs.map((dm) => (
                  <button
                    key={dm.id}
                    onClick={() => {
                      setSelectedDM(dm)
                      setCurrentView("dm")
                      setActiveNavigation("dms")
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      currentView === "dm" && selectedDM?.id === dm.id
                        ? "bg-green-100 border border-green-200 text-green-800"
                        : "text-green-700 hover:bg-green-100"
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                          {dm.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${
                        dm.status === "online" ? "bg-green-500" : 
                        dm.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm ${dm.unread > 0 ? "font-semibold" : ""}`}>{dm.name}</div>
                      <div className="text-xs text-green-500 truncate">{dm.lastMessage}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-500">{dm.time}</div>
                      {dm.unread > 0 && (
                        <Badge className="bg-red-500 text-white text-xs mt-1">{dm.unread}</Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
            )}
        </div>
      )}

      {/* Column 3: Main Content / Chat View */}
      {renderMainContent()}
    </div>
  )
}
