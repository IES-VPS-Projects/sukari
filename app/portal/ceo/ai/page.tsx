"use client"

import { useState, useEffect, useRef } from "react"
import { PortalLayout } from "@/components/portal-layout"
import { useAuth } from "@/components/auth-provider"
import { customAIService, ChatMessage, ChatSession, Project, Conversation } from "@/lib/custom-ai-service"
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
  XIcon,
  FileIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from 'lucide-react'

// File attachment interfaces
interface AttachedFile {
  id: string;
  file: File;
  documentId?: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  error?: string;
  progress?: number;
}

export default function AIInterfacePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const [dynamicGreeting, setDynamicGreeting] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [loading, setLoading] = useState(false)
  const [useReportFormat, setUseReportFormat] = useState(true)
  const { user } = useAuth()

  // File attachment state
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Array of dynamic greetings for AI impression
  const dynamicGreetings = [
    "Back at it, {name}?",
    "Nice to see you {name}, What's new?",
    "Hi {name}, what should we dive into today?",
    "Hey {name}, what's on your mind today?"
  ]

  // Get the first name from the user's full name
  const getFirstName = (fullName: string) => {
    return fullName?.split(' ')?.[0] || fullName || "User"
  }

  // Get user ID consistently
  const getUserId = () => {
    if (!user) return null;
    return user.id || user.email || user.name;
  }

  // Select a random greeting when the component mounts
  useEffect(() => {
    if (user && user.name) {
      const firstName = getFirstName(user.name)
      console.log('Current user name:', user.name, 'First name extracted:', firstName) // Debug log
      const randomIndex = Math.floor(Math.random() * dynamicGreetings.length)
      const greeting = dynamicGreetings[randomIndex].replace('{name}', firstName)
      setDynamicGreeting(greeting)
    }
  }, [user])

  // Load projects and conversations on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  // Load conversations when project changes
  useEffect(() => {
    if (currentProject) {
      loadConversations(currentProject.id);
    } else {
      // Load all conversations (including standalone) when no project is selected
      loadAllConversations();
    }
  }, [currentProject]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await customAIService.getProjects();
      setProjects(projectsData);
      
      // If no projects exist, create a default project
      if (projectsData.length === 0) {
        const defaultProject = await customAIService.createProject(
          "General Analysis", 
          "Default project for general sugar production analysis"
        );
        if (defaultProject) {
          setProjects([defaultProject]);
          setCurrentProject(defaultProject);
        }
      } else {
        setCurrentProject(projectsData[0]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversations = async (projectId?: string) => {
    try {
      setLoading(true);
      const conversationsData = await customAIService.getConversations(projectId);
      setConversations(conversationsData);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllConversations = async () => {
    try {
      setLoading(true);
      // Load all conversations (both project-based and standalone)
      const conversationsData = await customAIService.getConversations();
      setConversations(conversationsData);
    } catch (error) {
      console.error('Error loading all conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadConversation = async (conversationId: string) => {
    try {
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        setCurrentConversation(conversation);
        await loadMessages(conversationId);
        setMessage("");
        setIsTyping(false);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const success = await customAIService.deleteConversation(conversationId);
      if (success) {
        setConversations(prev => prev.filter(c => c.id !== conversationId));
        
        // If we're deleting the current conversation, clear it
        if (currentConversation?.id === conversationId) {
          setCurrentConversation(null);
          setMessages([]);
        }
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      setLoading(true);
      const messagesData = await customAIService.getMessages(conversationId);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim()) {
      return;
    }

    const currentMessage = message;
    setMessage('')
    setIsTyping(true)

    try {
      // Send message to backend - this will create conversation if needed
      console.log('Sending message...');
      
      const result = await customAIService.sendMessage(
        currentConversation?.id || null, 
        currentMessage, 
        currentProject?.id
      );
      
      if (result.message && result.conversationId) {
        // Update current conversation if it was created
        if (!currentConversation && result.conversationId) {
          const newConversation = {
            id: result.conversationId,
            project_id: currentProject?.id || '',
            title: currentMessage.length > 50 ? currentMessage.substring(0, 50) + '...' : currentMessage,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          setCurrentConversation(newConversation);
          
          
          // Reload all conversations to update the sidebar
          await loadAllConversations();
        }
        
        // Get AI response with conversation context and document context
        const readyFiles = attachedFiles.filter(f => f.status === 'ready' && f.documentId)
        let aiReply: string

        if (readyFiles.length > 0) {
          // If files are attached, use document Q&A API
          try {
            const documentResponses = await Promise.all(
              readyFiles.map(async (file) => {
                const response = await fetch('http://34.42.252.158:7501/ask', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    question: currentMessage,
                    document_id: file.documentId,
                    analysis_type: 'comprehensive'
                  })
                })
                
                if (!response.ok) throw new Error(`Document analysis failed: ${response.status}`)
                return await response.json()
              })
            )

            // Combine document responses with regular AI response
            const documentSummary = documentResponses.map((doc, index) => 
              `**Document ${index + 1} (${readyFiles[index].file.name}):**\n${doc.executive_summary}\n\n**Key Insights:**\n${doc.key_insights?.join('\n') || 'No insights available'}\n\n**Detailed Analysis:**\n${doc.detailed_analysis || 'No detailed analysis available'}`
            ).join('\n\n---\n\n')

            // Get regular AI response for context
            const regularReply = await customAIService.generateResponse([{
              role: 'user',
              content: currentMessage,
              timestamp: new Date()
            }], result.conversationId, useReportFormat)

            aiReply = `## Document Analysis Results\n\n${documentSummary}\n\n---\n\n## Additional AI Insights\n\n${regularReply}`
          } catch (error) {
            console.error('Document analysis error:', error)
            // Fallback to regular AI response
            aiReply = await customAIService.generateResponse([{
              role: 'user',
              content: currentMessage,
              timestamp: new Date()
            }], result.conversationId, useReportFormat)
          }
        } else {
          // No files attached, use regular AI response
          aiReply = await customAIService.generateResponse([{
          role: 'user',
          content: currentMessage,
          timestamp: new Date()
          }], result.conversationId, useReportFormat)
        }
        setIsTyping(false)
        
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: aiReply,
          timestamp: new Date()
        }
        
        // Reload messages to get the complete conversation from backend (including user message and AI response)
        await loadMessages(result.conversationId);
        
        // Clear attached files after successful message send
        setAttachedFiles([]);
      } else {
        throw new Error('Failed to send message or create conversation');
      }
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setIsTyping(false)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I could not get a response from the AI.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
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

  // File upload handlers
  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Validate file types
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/csv',
      'text/plain',
      'text/markdown',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'image/jpeg',
      'image/png',
      'image/tiff'
    ]

    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported. Please upload PDF, DOCX, CSV, TXT, PPTX, XLSX, or image files.`)
        return false
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert(`File ${file.name} is too large. Maximum size is 50MB.`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    // Add files to state
    const newFiles: AttachedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading'
    }))

    setAttachedFiles(prev => [...prev, ...newFiles])
    setIsUploading(true)

    // Upload files
    for (const attachedFile of newFiles) {
      await uploadFile(attachedFile)
    }

    setIsUploading(false)
    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const uploadFile = async (attachedFile: AttachedFile) => {
    try {
      const formData = new FormData()
      formData.append('file', attachedFile.file)

      // Update status to processing
      setAttachedFiles(prev => 
        prev.map(f => f.id === attachedFile.id ? { ...f, status: 'processing' } : f)
      )

      const response = await fetch('http://34.42.252.158:7501/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`)
      }

      const result = await response.json()
      
      // Update with document ID and ready status
      setAttachedFiles(prev => 
        prev.map(f => f.id === attachedFile.id ? { 
          ...f, 
          documentId: result.document_id,
          status: 'ready' 
        } : f)
      )

    } catch (error) {
      console.error('Upload error:', error)
      setAttachedFiles(prev => 
        prev.map(f => f.id === attachedFile.id ? { 
          ...f, 
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed'
        } : f)
      )
    }
  }

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return '🖼️'
    if (file.type === 'application/pdf') return '📄'
    if (file.type.includes('word')) return '📝'
    if (file.type.includes('excel') || file.type.includes('spreadsheet')) return '📊'
    if (file.type.includes('powerpoint') || file.type.includes('presentation')) return '📽️'
    if (file.type === 'text/csv') return '📈'
    return '📄'
  }

  const getStatusIcon = (status: AttachedFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      case 'ready':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertCircleIcon className="w-4 h-4 text-red-500" />
    }
  }



  const handleNewChat = () => {
    // Clear current conversation and messages to start fresh
    setCurrentConversation(null);
    setMessages([]);
    setMessage("");
    setIsTyping(false);
    setAttachedFiles([]);
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
    <PortalLayout pageTitle="AI">
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
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="mb-2">
                    <button
                      onClick={() => handleLoadConversation(conversation.id)}
                      className={`w-full text-left p-2 text-sm rounded-lg hover:bg-gray-100 transition-colors mb-1 flex items-center justify-between group ${
                        currentConversation?.id === conversation.id ? 'bg-gray-200' : ''
                      }`}
                    >
                      <div className="truncate flex-1">{conversation.title}</div>
                      <button
                        onClick={(e) => handleDeleteConversation(conversation.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                      >
                        <Trash2Icon className="w-3 h-3 text-gray-500" />
                      </button>
                    </button>
                    <div className="text-xs text-gray-400 px-2 mb-1">
                      {new Date(conversation.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {conversations.length === 0 && (
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
                        placeholder="Ask anything about sugar production, mills, or agriculture..."
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
                          <p className="text-base leading-[1.6] font-sans whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    ) : (
                                            // AI Response - Left aligned, no avatar
                      <div className="flex-1">
                        <div className="max-w-none">
                          <ReactMarkdown 
                            components={{
                              p: ({children}) => (
                                <p className="mb-4 last:mb-0 text-base leading-[1.6] font-sans">
                                  {children}
                                </p>
                              ),
                              h1: ({children}) => (
                                <h1 className="text-xl font-bold mb-4 mt-6 first:mt-0 text-base leading-[1.6] font-sans">
                                  {children}
                                </h1>
                              ),
                              h2: ({children}) => (
                                <h2 className="text-lg font-bold mb-3 mt-5 first:mt-0 text-base leading-[1.6] font-sans">
                                  {children}
                                </h2>
                              ),
                              h3: ({children}) => (
                                <h3 className="text-base font-bold mb-2 mt-4 first:mt-0 text-base leading-[1.6] font-sans">
                                  {children}
                                </h3>
                              ),
                              ul: ({children}) => (
                                <ul className="list-disc list-inside mb-4 space-y-1 font-sans">
                                  {children}
                                </ul>
                              ),
                              ol: ({children}) => (
                                <ol className="list-decimal list-inside mb-4 space-y-1 font-sans">
                                  {children}
                                </ol>
                              ),
                              li: ({children}) => (
                                <li className="text-base leading-[1.6] font-sans">
                                  {children}
                                </li>
                              ),
                              strong: ({children}) => (
                                <strong className="font-semibold text-base leading-[1.6] font-sans">
                                  {children}
                                </strong>
                              ),
                              em: ({children}) => (
                                <em className="italic text-base leading-[1.6] font-sans">
                                  {children}
                                </em>
                              ),
                              code: ({children}) => (
                                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
                                  {children}
                                </code>
                              ),
                              pre: ({children}) => (
                                <pre className="bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto mb-4">
                                  {children}
                                </pre>
                              ),
                              blockquote: ({children}) => (
                                <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4 text-base leading-[1.6] font-sans">
                                  {children}
                                </blockquote>
                              ),
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
                {/* File Attachments */}
                {attachedFiles.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {attachedFiles.map((attachedFile) => (
                        <div
                          key={attachedFile.id}
                          className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                          <span className="text-lg">{getFileIcon(attachedFile.file)}</span>
                          <span className="text-gray-700 truncate max-w-[200px]">
                            {attachedFile.file.name}
                          </span>
                          {getStatusIcon(attachedFile.status)}
                          {attachedFile.status === 'error' && (
                            <span className="text-red-500 text-xs">
                              {attachedFile.error}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(attachedFile.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex items-end gap-2 bg-white border border-gray-300 rounded-2xl p-3 focus-within:border-gray-400 transition-colors">
                    <button 
                      type="button"
                      onClick={handleFileSelect}
                      disabled={isUploading}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PaperclipIcon className="w-5 h-5" />
                    </button>
                    
                    <textarea
                    value={message}
                      onChange={handleTextareaChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything about sugar production, mills, or agriculture..."
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

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.doc,.csv,.txt,.md,.pptx,.ppt,.xlsx,.xls,.jpg,.jpeg,.png,.tiff"
                onChange={handleFileChange}
                className="hidden"
              />
                
                <div className="text-center mt-2">
                  <p className="text-xs text-gray-500">
                    AI can make mistakes. Check important info.
                  </p>
                  {useReportFormat && (
                    <p className="text-xs text-blue-600 mt-1">
                      📊 Professional report format enabled
                    </p>
                  )}
                  {attachedFiles.length > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      📎 {attachedFiles.filter(f => f.status === 'ready').length} document(s) attached - AI will analyze them
                    </p>
                  )}
                </div>
            </div>
          </div>
        )}
        </div>
    </div>
    </PortalLayout>
  )
}