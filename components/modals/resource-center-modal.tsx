"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { 
  Search, 
  X, 
  Info, 
  BookOpen, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock,
  ChevronLeft,
  Filter,
  Star
} from "lucide-react"
import { 
  resourceCenterData, 
  getResourcesByType, 
  getPopularResources, 
  searchResources,
  getResourceCounts,
  type ResourceDocument 
} from '@/lib/resource-data'

interface Resource {
  id: string
  title: string
  type: 'article' | 'doc' | 'publication' | 'report' | 'case-study'
  author?: string
  readTime?: string
  savedDate: string
  category?: string
  description?: string
  content?: string
  image?: string
}

interface ResourceCenterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recentResources: Resource[]
  resourceStats: {
    totalSaved: number
    thisMonth: number
    categories: number
    unread: number
  }
  initialResourceId?: string // Add this to support direct navigation to a resource
}

type ViewType = 'home' | 'search' | 'details'

const ResourceCenterModal = ({ open, onOpenChange, recentResources, resourceStats, initialResourceId }: ResourceCenterModalProps) => {
  const [currentView, setCurrentView] = useState<ViewType>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedResourceType, setSelectedResourceType] = useState<string>('')
  const [selectedResource, setSelectedResource] = useState<Resource | ResourceDocument | null>(null)
  const [currentChapter, setCurrentChapter] = useState(1)

  // Handle initial resource selection
  useEffect(() => {
    if (initialResourceId && open) {
      const allResources: (Resource | ResourceDocument)[] = [
        ...recentResources,
        ...resourceCenterData.filter(resource => 
          !recentResources.some(recent => recent.id === resource.id)
        )
      ]
      const resource = allResources.find(r => r.id === initialResourceId)
      if (resource) {
        setSelectedResource(resource)
        setCurrentView('details')
        setCurrentChapter(1)
      }
    }
  }, [initialResourceId, open, recentResources])

  // Scroll tracking for chapter navigation
  useEffect(() => {
    if (currentView !== 'details' || !selectedResource) return

    const handleScroll = () => {
      const scrollContainer = document.querySelector('[data-scroll-container]')
      if (!scrollContainer) return

      const chapterElements = scrollContainer.querySelectorAll('[id^="chapter-"]')
      const scrollTop = scrollContainer.scrollTop
      const containerHeight = scrollContainer.clientHeight
      const offset = 100 // Offset to trigger chapter change

      let activeChapter = 1

      // Check each chapter element to find which one is currently in view
      chapterElements.forEach((element, index) => {
        const htmlElement = element as HTMLElement
        const rect = element.getBoundingClientRect()
        const containerRect = scrollContainer.getBoundingClientRect()
        
        // Calculate the element's position relative to the scroll container
        const elementTop = htmlElement.offsetTop
        const elementBottom = elementTop + htmlElement.offsetHeight
        
        // Check if this chapter is currently in view (with some offset)
        if (scrollTop + offset >= elementTop && scrollTop < elementBottom) {
          activeChapter = index + 1
        }
        
        // Also check if we're near the end of the content
        if (scrollTop + containerHeight >= scrollContainer.scrollHeight - 50) {
          // If we're near the bottom, set to the last chapter
          activeChapter = chapterElements.length
        }
      })

      if (activeChapter !== currentChapter) {
        setCurrentChapter(activeChapter)
      }
    }

    const scrollContainer = document.querySelector('[data-scroll-container]')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      // Also call once to set initial state
      handleScroll()
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [currentView, selectedResource, currentChapter])

  // Use hardcoded resource data and filter out duplicates
  const allResources: (Resource | ResourceDocument)[] = [
    ...recentResources,
    ...resourceCenterData.filter(resource => 
      !recentResources.some(recent => recent.id === resource.id)
    )
  ]

  // Popular resources from hardcoded data
  const popularResources = getPopularResources()

  // Get resource counts from actual data
  const resourceCounts = getResourceCounts()
  const resourceTypes = [
    { key: 'article', label: 'Articles', count: resourceCounts.article, icon: <FileText className="h-5 w-5" /> },
    { key: 'doc', label: 'Documents', count: resourceCounts.doc, icon: <BookOpen className="h-5 w-5" /> },
    { key: 'publication', label: 'Publications', count: resourceCounts.publication, icon: <TrendingUp className="h-5 w-5" /> },
    { key: 'report', label: 'Reports', count: resourceCounts.report, icon: <TrendingUp className="h-5 w-5" /> },
    { key: 'case-study', label: 'Case Studies', count: 3, icon: <Users className="h-5 w-5" /> }
  ]

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="h-4 w-4" />
      case 'report': return <TrendingUp className="h-4 w-4" />
      case 'case-study': return <Users className="h-4 w-4" />
      case 'publication': return <TrendingUp className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  const getResourceTypeLabel = (type: string) => {
    switch (type) {
      case 'case-study': return 'Case Study'
      default: return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setCurrentView('search')
    }
  }

  const handleResourceTypeClick = (type: string) => {
    setSelectedResourceType(type)
    setCurrentView('search')
  }

  const handleResourceClick = (resource: Resource | ResourceDocument) => {
    setSelectedResource(resource)
    setCurrentChapter(1)
    setCurrentView('details')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSearchQuery('')
    setSelectedResourceType('')
    setSelectedResource(null)
    setCurrentChapter(1)
  }

  const filteredResources = (() => {
    let resources = allResources

    // Use hardcoded search function if there's a search query
    if (searchQuery.trim()) {
      const searchResults = searchResources(searchQuery)
      // Combine and filter out duplicates
      const combined = [...recentResources, ...searchResults]
      resources = combined.filter((resource, index, self) => 
        index === self.findIndex(r => r.id === resource.id)
      )
    }

    // Filter by type if selected
    if (selectedResourceType) {
      resources = resources.filter(resource => resource.type === selectedResourceType)
    }

    return resources
  })()

  const resetAndClose = () => {
    setCurrentView('home')
    setSearchQuery('')
    setSelectedResourceType('')
    setSelectedResource(null)
    setCurrentChapter(1)
    onOpenChange(false)
  }

  // Helper function to check if resource is a ResourceDocument
  const isResourceDocument = (resource: Resource | ResourceDocument): resource is ResourceDocument => {
    return 'content' in resource && resource.content !== undefined
  }

  // Get content for the selected resource
  const getResourceContent = () => {
    if (!selectedResource) return null
    
    if (isResourceDocument(selectedResource) && selectedResource.content) {
      // Use parsed PDF content - return single chapter content
      const { content } = selectedResource
      
      if (content.chapters && content.chapters.length > 0) {
        const chapter = content.chapters[currentChapter - 1]
        return chapter ? chapter.content : content.extractedText.slice(0, 1000) + '...'
      }
      
      return content.extractedText.slice(0, 1000) + '...'
    }
    
    // Fall back to generic content for regular resources
    return getGenericContent()
  }

  // Get ALL content for scrollable PDF-like view
  const getAllResourceContent = () => {
    if (!selectedResource) return null
    
    if (isResourceDocument(selectedResource) && selectedResource.content) {
      const { content } = selectedResource
      
      if (content.chapters && content.chapters.length > 0) {
        // Combine all chapters with chapter anchors for navigation
        return content.chapters.map((chapter, index) => `
          <div id="chapter-${index + 1}" class="mb-12">
            <div class="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
              <h2 class="text-2xl font-bold text-green-800 mb-2">Chapter ${index + 1}: ${chapter.title}</h2>
            </div>
            ${chapter.content}
          </div>
        `).join('')
      }
      
      // If no chapters, return full extracted text
      return `
        <div class="prose max-w-none">
          ${content.extractedText.replace(/\n/g, '<br>')}
        </div>
      `
    }
    
    // Fall back to all generic chapters for regular resources
    return getAllGenericContent()
  }

  // Get all generic content for resources without parsed content
  const getAllGenericContent = () => {
    const chapters = [
      'Introduction',
      'Key Concepts',
      'Implementation Guide',
      'Best Practices',
      'Case Studies',
      'Future Considerations'
    ]
    
    return chapters.map((chapterTitle, index) => `
      <div id="chapter-${index + 1}" class="mb-12">
        <div class="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
          <h2 class="text-2xl font-bold text-blue-800 mb-2">Chapter ${index + 1}: ${chapterTitle}</h2>
        </div>
        
        <p class="mb-4">
          ${selectedResource?.description || 'This resource provides valuable information and insights on the specified topic.'}
        </p>



        <p class="mb-4">
          This comprehensive section has been carefully curated to provide you with the most relevant and up-to-date information about ${chapterTitle.toLowerCase()}. 
          Each subsection builds upon the previous one to create a cohesive understanding of the subject matter.
        </p>
      </div>
    `).join('')
  }

  // Function to scroll to a specific chapter
  const scrollToChapter = (chapterNumber: number) => {
    const scrollContainer = document.querySelector('[data-scroll-container]')
    const element = document.getElementById(`chapter-${chapterNumber}`)
    
    if (element && scrollContainer) {
      const elementTop = element.offsetTop
      const targetScroll = elementTop - 20 // 20px offset from top
      
      scrollContainer.scrollTo({ 
        top: targetScroll, 
        behavior: 'smooth' 
      })
      
      // Update the current chapter immediately for immediate visual feedback
      setCurrentChapter(chapterNumber)
    }
  }

  const getGenericContent = () => {
    // Generic content as fallback
    if (currentChapter === 1) {
      return `
        <p class="mb-4">
          ${selectedResource?.description || 'This resource provides valuable information and insights on the specified topic.'}
        </p>



        <p class="mb-4">
          This comprehensive resource has been carefully curated to provide you with the most relevant and up-to-date information. 
          Each section builds upon the previous one to create a cohesive understanding of the subject matter.
        </p>
      `
    }
    
    return `
      <div class="text-center py-8">
        <p class="text-gray-600 mb-4">Chapter ${currentChapter} content would be displayed here...</p>
        <p class="text-sm text-gray-500">Additional content for this chapter would follow the same detailed format.</p>
      </div>
    `
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogPortal>
        <DialogOverlay className="z-[55]" />
        <DialogContent className="max-w-6xl z-[60] max-h-[90vh] overflow-hidden [&>button]:hidden p-0">
          <VisuallyHidden>
            <DialogTitle>Resource Center</DialogTitle>
          </VisuallyHidden>
          {/* Home View */}
          {currentView === 'home' && (
            <div className="h-[80vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-600 to-green-700 text-white">
                <h2 className="text-2xl font-bold">Resource Center</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-green-600">
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={resetAndClose} className="text-white hover:bg-green-600">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-gray-600 mb-6 text-center">
                  Browse through a list of your saved resources at your convenience
                </p>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Type here for search"
                      className="pl-10 pr-20"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8">
                      Search
                    </Button>
                  </div>
                </div>

                {/* Resource Type */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Resource Type</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {resourceTypes.map((type) => (
                      <Card 
                        key={type.key}
                        className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                        onClick={() => handleResourceTypeClick(type.key)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="flex justify-center mb-2 text-gray-600">
                            {type.icon}
                          </div>
                          <h4 className="font-semibold text-sm mb-1">{type.label} ({type.count})</h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Popular Resources */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Popular Resources</h3>
                    <Button variant="outline" size="sm">
                      See all →
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {popularResources.map((resource) => (
                      <Card 
                        key={resource.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <CardContent className="p-4">
                          <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                            {getResourceIcon(resource.type)}
                          </div>
                          <h4 className="font-semibold text-sm mb-2 line-clamp-2">{resource.title}</h4>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{resource.author}</span>
                            <span>{resource.readTime}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search View */}
          {currentView === 'search' && (
            <div className="h-[80vh] flex">
              {/* Left Sidebar - Resource Types */}
              <div className="w-64 border-r bg-gray-50 p-4">
                <div className="mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToHome}
                    className="mb-4"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Guides
                  </Button>
                </div>
                
                <h3 className="font-semibold mb-4">Resource Types</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedResourceType === '' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedResourceType('')}
                  >
                    All Resources
                  </Button>
                  {resourceTypes.map((type) => (
                    <Button
                      key={type.key}
                      variant={selectedResourceType === type.key ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedResourceType(type.key)}
                    >
                      <span className="mr-2">{type.icon}</span>
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Right Content - Search Results */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">
                      {selectedResourceType ? `${getResourceTypeLabel(selectedResourceType)} Resources` : 'All Resources'}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={resetAndClose}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search resources..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Search Results */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {filteredResources.map((resource) => (
                      <Card 
                        key={resource.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-2">{resource.title}</h4>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {resource.description || "No description available"}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {resource.author}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {resource.readTime}
                                </span>
                                <Badge variant="outline">
                                  {getResourceTypeLabel(resource.type)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Details View */}
          {currentView === 'details' && selectedResource && (
            <div className="h-[80vh] flex">
              {/* Left Sidebar - Chapters */}
              <div className="w-64 border-r bg-gray-50 p-4 flex flex-col">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentView('search')}
                  className="mb-4"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Resources
                </Button>
                
                <h3 className="font-semibold mb-4">Chapters</h3>
                <div className="space-y-2 flex-1 overflow-y-auto">
                  {isResourceDocument(selectedResource) && selectedResource.content?.chapters ? (
                    // Show actual chapters from resource data
                    selectedResource.content.chapters.map((chapter, index) => (
                      <div 
                        key={index}
                        className={`p-2 rounded cursor-pointer transition-colors text-sm ${
                          currentChapter === index + 1 
                            ? 'text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-600' 
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                        onClick={() => scrollToChapter(index + 1)}
                      >
                        {index + 1}. {chapter.title}
                      </div>
                    ))
                  ) : (
                    // Show generic chapters for resources without parsed content
                    ['Introduction', 'Key Concepts', 'Implementation Guide', 'Best Practices', 'Case Studies', 'Future Considerations'].map((chapterTitle, index) => (
                      <div 
                        key={index}
                        className={`p-2 rounded cursor-pointer transition-colors text-sm ${
                          currentChapter === index + 1 
                            ? 'text-blue-600 bg-blue-50 font-medium border-l-4 border-blue-600' 
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                        onClick={() => scrollToChapter(index + 1)}
                      >
                        {index + 1}. {chapterTitle}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Content - Resource Details */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{selectedResource.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>By {selectedResource.author}</span>
                        <span>{selectedResource.readTime}</span>
                        <Badge variant="outline">
                          {getResourceTypeLabel(selectedResource.type)}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetAndClose}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Resource Content - Scrollable Full Content */}
                <div className="flex-1 overflow-y-auto p-6" data-scroll-container>
                  {/* Hero Image */}
                  <div className="h-64 rounded-lg mb-6 overflow-hidden">
                    {isResourceDocument(selectedResource) && selectedResource.image ? (
                      <div className="h-full relative flex items-end">
                        <img 
                          src={selectedResource.image} 
                          alt={selectedResource.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative w-full bg-gradient-to-t from-black/70 to-transparent p-6 z-10">
                          <h2 className="text-xl font-bold text-white">{selectedResource.title}</h2>
                          <p className="text-white/90 text-sm">By {selectedResource.author}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            {getResourceIcon(selectedResource.type)}
                          </div>
                          <h2 className="text-xl font-bold">{selectedResource.title}</h2>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* All Content in Scrollable Format */}
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: getAllResourceContent() || '' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default ResourceCenterModal
