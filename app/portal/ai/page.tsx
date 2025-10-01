"use client"

import { useState, useEffect } from "react"
import { PortalLayout } from "@/components/portal-layout"
import { useAuth } from "@/components/auth-provider"
import { judicialAIService, ChatMessage, ChatSession } from "@/lib/judicial-ai-service"
import ReactMarkdown from 'react-markdown'
import { 
  PlusIcon, 
  SearchIcon, 
  MessageSquareIcon, 
  BookOpenIcon,
  MenuIcon,
  ShareIcon,
  MoreHorizontalIcon,
  MicIcon,
  PaperclipIcon,
  ArrowUpIcon,
  SparklesIcon,
  LayoutPanelLeft,
  Pencil,
  Trash2Icon,
} from 'lucide-react'

export default function AIInterfacePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [dynamicGreeting, setDynamicGreeting] = useState("")
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

  // Get user ID consistently
  const getUserId = () => {
    if (!user) return null;
    return user.id || user.email || user.name;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Create new session if none exists
      if (!currentSession) {
        const userId = getUserId();
        if (!userId) return;
        
        const newSession = judicialAIService.createNewSession(userId);
        setCurrentSession(newSession);
        judicialAIService.saveSession(newSession);
        setSessions(judicialAIService.getSessions(userId));
      }

      const userMessage: ChatMessage = {
        role: 'user',
        content: message,
        timestamp: new Date()
      }
      
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages)
      setMessage('')
      setIsTyping(true)

      try {
        const aiReply = await judicialAIService.generateResponse(updatedMessages, currentSession?.id)
        setIsTyping(false)
        
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: aiReply,
          timestamp: new Date()
        }
        
        const finalMessages = [...updatedMessages, aiMessage];
        setMessages(finalMessages)
        
        // Update session with new messages
        if (currentSession) {
          const updatedSession = {
            ...currentSession,
            messages: finalMessages,
            updatedAt: new Date()
          };
          
          // Update session title based on first message
          if (finalMessages.length === 2) {
            judicialAIService.updateSessionTitle(updatedSession, userMessage.content);
          }
          
          setCurrentSession(updatedSession);
          judicialAIService.saveSession(updatedSession);
          const userId = getUserId();
          if (userId) {
            setSessions(judicialAIService.getSessions(userId));
          }
        }
      } catch (err) {
        setIsTyping(false)
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: 'Sorry, I could not get a response from the AI.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      }
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  // Load sessions on component mount and when user changes
  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      const savedSessions = judicialAIService.getSessions(userId);
      setSessions(savedSessions);
      setCurrentSession(null); // Reset current session when user changes
      setMessages([]);
    } else {
      setSessions([]);
      setCurrentSession(null);
      setMessages([]);
    }
  }, [user]);

  const handleNewChat = () => {
    const userId = getUserId();
    if (!userId) return;
    
    const newSession = judicialAIService.createNewSession(userId);
    setCurrentSession(newSession);
    setMessages([]);
    setMessage("");
    setIsTyping(false);
    
    // Save the new session
    judicialAIService.saveSession(newSession);
    setSessions(judicialAIService.getSessions(userId));
  }

  const handleLoadSession = (sessionId: string) => {
    const userId = getUserId();
    if (!userId) return;
    
    const session = judicialAIService.getSession(sessionId, userId);
    if (session) {
      setCurrentSession(session);
      setMessages(session.messages);
      setMessage("");
      setIsTyping(false);
    }
  }

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const userId = getUserId();
    if (!userId) return;
    
    judicialAIService.deleteSession(sessionId, userId);
    setSessions(judicialAIService.getSessions(userId));
    
    // If we're deleting the current session, start a new one
    if (currentSession?.id === sessionId) {
      handleNewChat();
    }
  }

  const SidebarActions = () => (
    <div className="flex flex-col gap-2">
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MenuIcon className="w-4 h-4" />
        {sidebarOpen && "Menu"}
      </button>
      
      {/* New Chat */}
      <button
        onClick={handleNewChat}
        className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <PlusIcon className="w-4 h-4" />
        {sidebarOpen && "New chat"}
      </button>
    </div>
  )

  return (
    <PortalLayout pageTitle="Judicial AI Assistant">
      <div className="flex h-[calc(100vh-8rem)] bg-white text-gray-800">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-12'} transition-all duration-300 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden`}>
          {/* Sidebar Header */}
          <div className="p-3 flex flex-col gap-2">
            <SidebarActions />
          </div>

          {/* Search */}
          <div className="px-3 pb-3">
            <div className="flex items-center gap-3 w-full p-2 text-sm text-gray-700">
              <SearchIcon className="w-4 h-4" />
              {sidebarOpen && "Search chats"}
            </div>
          </div>

          {/* Library */}
          <div className="px-3 pb-3">
            <div className="flex items-center gap-3 w-full p-2 text-sm text-gray-700">
              <BookOpenIcon className="w-4 h-4" />
              {sidebarOpen && "Library"}
            </div>
          </div>

          {/* Chats Section */}
          {sidebarOpen && (
            <div className="flex-1 overflow-y-auto">
              <div className="px-3">
                <div className="text-xs font-medium text-gray-500 mb-2 px-2">Chats</div>
                {sessions.map((session) => (
                  <div key={session.id} className="mb-2">
                    <button
                      onClick={() => handleLoadSession(session.id)}
                      className={`w-full text-left p-2 text-sm rounded-lg hover:bg-gray-100 transition-colors mb-1 flex items-center justify-between group ${
                        currentSession?.id === session.id ? 'bg-gray-200' : ''
                      }`}
                    >
                      <div className="truncate flex-1">{session.title}</div>
                      <button
                        onClick={(e) => handleDeleteSession(session.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                      >
                        <Trash2Icon className="w-3 h-3 text-gray-500" />
                      </button>
                    </button>
                    <div className="text-xs text-gray-400 px-2 mb-1">
                      {session.updatedAt.toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {sessions.length === 0 && (
                  <div className="text-xs text-gray-400 px-2 py-4 text-center">
                    No previous chats
                  </div>
                )}
              </div>
            </div>
          )}


        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              // Initial State
              <div className="flex flex-col items-center justify-center h-full px-4">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-medium text-gray-800 mb-8">
                    {dynamicGreeting || "Hey, ready to dive in?"}
                  </h1>
                </div>
                
                {/* Centered Input Box */}
                <div className="w-full max-w-2xl">
                  <form onSubmit={handleSubmit} className="relative">
                    <div className="flex items-end gap-2 bg-white border border-gray-300 rounded-2xl p-3 focus-within:border-gray-400 transition-colors shadow-sm">
                      <button 
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <PlusIcon className="w-5 h-5" />
                      </button>
                      
                      <textarea
                        value={message}
                        onChange={handleTextareaChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything about case law, legal precedents, or judicial procedures..."
                        className="flex-1 resize-none border-0 bg-transparent focus:outline-none min-h-[24px] max-h-32 py-1 text-gray-900 placeholder-gray-500"
                        rows={1}
                      />
                      
                      <div className="flex items-center gap-2">
                        <button 
                          type="button"
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <MicIcon className="w-5 h-5" />
                        </button>
                        
                        <button 
                          type="button"
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                  
                  <div className="text-center mt-2">
                    <p className="text-xs text-gray-500">
                      AI can make mistakes. Check important info.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Chat Messages
              <div className="max-w-3xl mx-auto px-4 py-8">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-8">
                    {msg.role === 'user' ? (
                      // User Message - Right aligned without avatar
                      <div className="flex justify-end">
                        <div className="bg-gray-100 rounded-2xl p-4 ml-12">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // AI Response - Left aligned, no avatar
                      <div className="flex-1">
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown 
                            components={{
                              p: ({children}) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                              h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                              h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                              h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                              ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                              li: ({children}) => <li className="text-sm leading-relaxed">{children}</li>,
                              strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                              em: ({children}) => <em className="italic">{children}</em>,
                              code: ({children}) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                              pre: ({children}) => <pre className="bg-gray-200 p-2 rounded text-xs font-mono overflow-x-auto mb-2">{children}</pre>,
                              blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-2">{children}</blockquote>,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area - Only show when there are messages */}
          {messages.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex items-end gap-2 bg-white border border-gray-300 rounded-2xl p-3 focus-within:border-gray-400 transition-colors">
                    <button 
                      type="button"
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <PaperclipIcon className="w-5 h-5" />
                    </button>
                    
                    <textarea
                      value={message}
                      onChange={handleTextareaChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything about case law, legal precedents, or judicial procedures..."
                      className="flex-1 resize-none border-0 bg-transparent focus:outline-none min-h-[24px] max-h-32 py-1 text-gray-900 placeholder-gray-500"
                      rows={1}
                    />
                    
                    <div className="flex items-center gap-2">
                      <button 
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <MicIcon className="w-5 h-5" />
                      </button>
                      
                      <button 
                        type="submit"
                        className={`p-2 rounded-lg transition-colors ${
                          message.trim() 
                            ? 'bg-black text-white hover:bg-gray-800' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!message.trim()}
                      >
                        <ArrowUpIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </form>
                
                <div className="text-center mt-2">
                  <p className="text-xs text-gray-500">
                    AI can make mistakes. Check important info.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  )
}
