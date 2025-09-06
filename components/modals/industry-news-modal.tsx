"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, ExternalLink, Calendar, Share, Bookmark, RefreshCw } from "lucide-react"
import { rssService, RSSArticle, RSSCategory } from "@/lib/rss-service"
import { format } from "date-fns"

interface IndustryNewsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type ArticleContentItem = {
  type: 'text' | 'image'
  content: string
  alt?: string
}

export function IndustryNewsModal({ open, onOpenChange }: IndustryNewsModalProps) {
  const [categories, setCategories] = useState<RSSCategory[]>([])
  const [selectedArticle, setSelectedArticle] = useState<RSSArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [loadingFullArticle, setLoadingFullArticle] = useState(false)

  useEffect(() => {
    if (open) {
      fetchArticles()
    }
  }, [open])

  const fetchArticles = async () => {
    setLoading(true)
    setRefreshing(false)
    try {
      const data = await rssService.fetchAllArticles()
      setCategories(data)
      if (data.length > 0 && !activeCategory) {
        setActiveCategory(data[0].name)
      }
      
      // Preload images for articles that are using placeholder images
      preloadImagesForPlaceholderArticles(data)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
      // Provide user feedback for errors
      // You could show a toast notification here
    } finally {
      setLoading(false)
    }
  }

  const preloadImagesForPlaceholderArticles = async (categories: RSSCategory[]) => {
    // Find articles using placeholder images and fetch better images
    const articlesToEnhance = categories.flatMap(category => 
      category.articles.filter((article: RSSArticle) => 
        !article.id.startsWith('mock-') && 
        article.link !== '#' && 
        (!article.imageUrl || article.imageUrl.includes('loading.gif'))
      )
    )

    // Limit to first 5 articles to avoid overwhelming the server
    const limitedArticles = articlesToEnhance.slice(0, 5)

    // Fetch images in parallel but limit concurrency
    const imagePromises = limitedArticles.map(async (article) => {
      try {
        const fullArticle = await rssService.fetchFullArticle(article.link)
        if (fullArticle.imageUrl && fullArticle.imageUrl !== article.imageUrl) {
          // Update the article in categories
          setCategories(prevCategories => 
            prevCategories.map(category => ({
              ...category,
              articles: category.articles.map((art: RSSArticle) => 
                art.id === article.id 
                  ? { ...art, imageUrl: fullArticle.imageUrl }
                  : art
              )
            }))
          )
        }
      } catch (error) {
        console.error(`Failed to preload image for article ${article.id}:`, error)
      }
    })

    // Wait for all image fetches to complete (but don't block the UI)
    Promise.allSettled(imagePromises)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchArticles()
    setRefreshing(false)
  }

  const handleArticleClick = async (article: RSSArticle) => {
    setSelectedArticle(article)
    setLoadingFullArticle(true)
    
    try {
      // Fetch full article content if it's not mock data
      if (!article.id.startsWith('mock-') && article.link !== '#') {
        const fullArticle = await rssService.fetchFullArticle(article.link)
        
        // Update the article with full content and better image
        const enhancedArticle = {
          ...article,
          content: fullArticle.content,
          imageUrl: fullArticle.imageUrl || article.imageUrl
        }
        
        setSelectedArticle(enhancedArticle)
        
        // Also update the original article in the categories list
        if (fullArticle.imageUrl) {
          setCategories(prevCategories => 
            prevCategories.map(category => ({
              ...category,
              articles: category.articles.map((art: RSSArticle) => 
                art.id === article.id 
                  ? { ...art, imageUrl: fullArticle.imageUrl, content: fullArticle.content }
                  : art
              )
            }))
          )
        }
      }
    } catch (error) {
      console.error('Failed to fetch full article:', error)
    } finally {
      setLoadingFullArticle(false)
    }
  }

  const handleBackToList = () => {
    setSelectedArticle(null)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm")
    } catch {
      return "Recent"
    }
  }

  const formatArticleContent = (content: string): ArticleContentItem[] => {
    if (!content) return []
    
    // First check if content contains HTML
    const hasHTML = /<[^>]*>/g.test(content)
    
    if (hasHTML) {
      // Parse HTML content and extract text with images
      return parseHTMLContent(content)
    }
    
    // Handle plain text content
    let paragraphs = content
      .split(/\n\s*\n/)
      .map(p => p.trim().replace(/\s+/g, ' ')) // Clean up extra whitespace
      .filter(p => p.length > 0)
    
    // If we don't have good paragraph breaks, try splitting by periods followed by capital letters
    if (paragraphs.length === 1 && paragraphs[0].length > 300) {
      const text = paragraphs[0]
      paragraphs = []
      
      // Split on periods followed by capital letters, but be careful not to split abbreviations
      const sentences = text.split(/\.(?=\s+[A-Z])/g)
      let currentParagraph = ''
      
      sentences.forEach((sentence, index) => {
        const cleanSentence = sentence.trim()
        if (!cleanSentence) return
        
        // Add the sentence to current paragraph
        if (currentParagraph) {
          currentParagraph += '. ' + cleanSentence
        } else {
          currentParagraph = cleanSentence
        }
        
        // If paragraph is getting long or we're at the end, save it
        if (currentParagraph.length > 200 || index === sentences.length - 1) {
          if (!currentParagraph.endsWith('.')) {
            currentParagraph += '.'
          }
          paragraphs.push(currentParagraph)
          currentParagraph = ''
        }
      })
    }
    
    // Clean up each paragraph and return as text-only objects
    return paragraphs.map(p => {
      let cleaned = p.trim()
      // Ensure paragraph ends with proper punctuation
      if (!cleaned.match(/[.!?]$/)) {
        cleaned += '.'
      }
      return { type: 'text' as const, content: cleaned }
    }).filter(p => p.content.length > 1)
  }

  // New function to parse HTML content and extract text with inline images
  const parseHTMLContent = (htmlContent: string): ArticleContentItem[] => {
    // Check if DOMParser is available (client-side only)
    if (typeof window === 'undefined' || !window.DOMParser) {
      // Fallback: return text-only content for server-side rendering
      return [{ type: 'text', content: htmlContent.replace(/<[^>]*>/g, '').trim() }]
    }

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlContent, 'text/html')
      const elements: ArticleContentItem[] = []
      
      // Function to process nodes recursively
      const processNode = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim()
        if (text && text.length > 0) {
          elements.push({ type: 'text' as const, content: text })
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element
        
        // Handle images
        if (element.tagName.toLowerCase() === 'img') {
          const src = element.getAttribute('src')
          const alt = element.getAttribute('alt') || 'Article illustration'
          
          if (src && !isAdvertisement(src, alt)) {
            // Convert relative URLs to absolute if needed
            const imageUrl = src.startsWith('http') ? src : new URL(src, window.location.origin).href
            elements.push({ type: 'image' as const, content: imageUrl, alt })
          }
        }
        // Handle paragraphs and other text containers
        else if (['p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(element.tagName.toLowerCase())) {
          // Skip elements that look like ads
          if (!isAdvertisementElement(element)) {
            // Process child nodes
            Array.from(element.childNodes).forEach(processNode)
          }
        }
        // For other elements, process children
        else if (!['script', 'style', 'nav', 'aside', 'footer'].includes(element.tagName.toLowerCase())) {
          Array.from(element.childNodes).forEach(processNode)
        }
      }
    }
    
    // Process the document body
    Array.from(doc.body.childNodes).forEach(processNode)
    
    // Group consecutive text elements into paragraphs
    const result: ArticleContentItem[] = []
    let currentParagraph = ''
    
    elements.forEach((element, index) => {
      if (element.type === 'text') {
        if (currentParagraph) {
          currentParagraph += ' ' + element.content
        } else {
          currentParagraph = element.content
        }
        
        // If next element is image or this is the last element, finalize paragraph
        if (index === elements.length - 1 || elements[index + 1]?.type === 'image') {
          if (currentParagraph.trim().length > 0) {
            result.push({ type: 'text' as const, content: currentParagraph.trim() })
            currentParagraph = ''
          }
        }
      } else if (element.type === 'image') {
        // Finalize current paragraph before adding image
        if (currentParagraph.trim().length > 0) {
          result.push({ type: 'text' as const, content: currentParagraph.trim() })
          currentParagraph = ''
        }
        result.push(element)
      }
    })
    
    return result.filter(item => item.content.length > 0)
    } catch (error) {
      console.error('Error parsing HTML content:', error)
      // Fallback: return text-only content
      return [{ type: 'text', content: htmlContent.replace(/<[^>]*>/g, '').trim() }]
    }
  }

  // Helper function to detect advertisements by URL or alt text
  const isAdvertisement = (src: string, alt: string) => {
    const adKeywords = ['ad', 'advertisement', 'banner', 'sponsored', 'promo', 'affiliate']
    const srcLower = src.toLowerCase()
    const altLower = alt.toLowerCase()
    
    return adKeywords.some(keyword => 
      srcLower.includes(keyword) || altLower.includes(keyword)
    ) || srcLower.includes('googleads') || srcLower.includes('doubleclick')
  }

  // Helper function to detect advertisement elements
  const isAdvertisementElement = (element: Element) => {
    const classNames = element.className.toLowerCase()
    const id = element.id.toLowerCase()
    const adSelectors = ['ad', 'advertisement', 'banner', 'sponsored', 'promo', 'sidebar', 'widget']
    
    return adSelectors.some(selector => 
      classNames.includes(selector) || id.includes(selector)
    )
  }

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'sugar industry':
      case 'sugar':
        return "🍯"
      case 'market trends':
      case 'markets':
        return "📈"
      case 'processing technology':
      case 'technology':
        return "⚙️"
      default:
        return "📰"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-6xl h-[95vh] max-h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-4 sm:px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between pr-6 sm:pr-8">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {selectedArticle && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToList}
                  className="p-1 h-8 w-8 flex-shrink-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <DialogTitle className="text-xl font-bold">
                {selectedArticle ? selectedArticle.title : "Industry News"}
              </DialogTitle>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Badge variant="secondary" className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Feed
              </Badge>
              {categories.length > 0 && categories[0].articles.some((article: RSSArticle) => article.id.startsWith('mock-')) && (
                <Badge variant="outline" className="text-xs">
                  Demo Data
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 w-full mb-3" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : selectedArticle ? (
          // Article Detail View
          <div className="flex-1 overflow-hidden relative">
            {/* Scroll indicator */}
            <div className="absolute top-0 right-4 z-10 text-xs text-muted-foreground bg-white/90 px-2 py-1 rounded-b-md border border-t-0">
              Scroll to read more
            </div>
            <ScrollArea className="h-full max-h-[70vh]">
              <div className="p-6 space-y-6">
                {loadingFullArticle && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm text-blue-700">Loading full article content...</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedArticle.category}</Badge>
                    <Badge variant="secondary">{selectedArticle.source}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(selectedArticle.pubDate)}
                    </span>
                  </div>
                  
                  {selectedArticle.imageUrl && (
                    <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
                      <img
                        src={selectedArticle.imageUrl}
                        alt={selectedArticle.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/loading.gif';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                </div>

                <article className="prose prose-lg max-w-none">
                  {/* Article Description/Lead */}
                  <div className="mb-8">
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium border-l-4 border-primary pl-6 italic bg-muted/20 p-4 rounded-r-lg">
                      {selectedArticle.description}
                    </p>
                  </div>
                  
                  {/* Main Article Content */}
                  {selectedArticle.content && selectedArticle.content !== selectedArticle.description && (
                    <div className="space-y-6">
                      {(() => {
                        const formattedContent = formatArticleContent(selectedArticle.content);
                        return formattedContent.map((item, index) => (
                          <div key={index} className="group">
                            {item.type === 'text' ? (
                              <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide mb-6">
                                {item.content}
                              </p>
                            ) : item.type === 'image' ? (
                              <div className="my-8">
                                <div className="relative max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
                                  <img
                                    src={item.content}
                                    alt={item.alt || 'Article illustration'}
                                    className="w-full h-auto object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                    }}
                                  />
                                  {item.alt && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                      <p className="text-white text-sm font-medium">{item.alt}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                  
                  {/* Enhanced content for mock articles */}
                  {selectedArticle.id.startsWith('mock-') && (
                    <div className="space-y-8 mt-10">
                      {/* Market Analysis Section */}
                      <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-primary"></div>
                          <h3 className="text-2xl font-bold text-foreground tracking-tight">Market Analysis</h3>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="group">
                            <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide mb-6">
                              The sugar industry continues to face dynamic market conditions driven by global commodity prices, 
                              changing consumer preferences, and evolving agricultural practices. Current market trends indicate 
                              significant opportunities for producers who can adapt to emerging demands for sustainable and 
                              high-quality sugar products.
                            </p>
                          </div>
                          
                          <div className="group">
                            <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide mb-6">
                              Production efficiency remains a critical factor in maintaining competitiveness in the global market. 
                              Sugar manufacturing facilities are increasingly adopting advanced technologies to optimize extraction 
                              rates, reduce waste, and improve overall operational performance. These improvements directly impact 
                              profitability and market positioning.
                            </p>
                          </div>
                          
                          <div className="group">
                            <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide">
                              Environmental sustainability has become a key differentiator in the industry, with consumers and 
                              regulatory bodies placing greater emphasis on eco-friendly production methods. Sugar producers 
                              are implementing comprehensive sustainability programs that address water usage, energy efficiency, 
                              and waste management throughout the production cycle.
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Industry Impact Section */}
                      <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-primary"></div>
                          <h3 className="text-2xl font-bold text-foreground tracking-tight">Industry Impact</h3>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="group">
                            <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide mb-6">
                              Regional sugar production plays a vital role in supporting local economies and providing employment 
                              opportunities for thousands of workers. The industry's contribution extends beyond direct employment 
                              to include support for agricultural communities, transportation services, and related manufacturing 
                              sectors.
                            </p>
                          </div>
                          
                          <div className="group">
                            <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide mb-6">
                              Technological advancements in sugar processing have led to improved product quality and expanded 
                              product portfolios. Modern facilities can produce various sugar grades and specialty products that 
                              meet diverse market requirements, from industrial applications to premium consumer products.
                            </p>
                          </div>
                          
                          <div className="group">
                            <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide mb-6">
                              The industry's commitment to quality assurance and food safety standards ensures that products 
                              meet international requirements for export markets. This focus on quality has opened new 
                              opportunities for market expansion and premium product positioning.
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Future Outlook Section */}
                      <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-primary"></div>
                          <h3 className="text-2xl font-bold text-foreground tracking-tight">Future Outlook</h3>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="group">
                            <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide mb-6">
                              The sugar industry is positioned for continued growth through strategic investments in technology, 
                              sustainability initiatives, and market diversification. Companies that embrace innovation and 
                              maintain focus on operational excellence will be best positioned to capitalize on emerging 
                              opportunities.
                            </p>
                          </div>
                          
                          <div className="group">
                            <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide mb-6">
                              Research and development efforts continue to drive improvements in cultivation techniques, 
                              processing efficiency, and product innovation. These advances support the industry's ability 
                              to meet evolving consumer demands while maintaining competitive cost structures.
                            </p>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}
                </article>

                <Separator className="my-8" />

                <div className="flex items-center justify-between sticky bottom-0 bg-white/95 backdrop-blur-sm p-4 -mx-6 border-t">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                  {selectedArticle.link !== '#' && (
                    <Button asChild>
                      <a href={selectedArticle.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Original
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        ) : (
          // Categories and Articles List View
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="h-full flex flex-col">
              <div className="px-6 py-3 border-b">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
                  {categories.map((category) => (
                    <TabsTrigger key={category.name} value={category.name} className="flex items-center gap-2">
                      <span>{getCategoryIcon(category.name)}</span>
                      {category.name}
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {category.count}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="flex-1 overflow-hidden">
                {categories.map((category) => (
                  <TabsContent key={category.name} value={category.name} className="mt-0 h-full">
                    <ScrollArea className="h-[calc(100vh-280px)]">
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-none">
                          {category.articles.map((article: RSSArticle) => (
                            <Card 
                              key={article.id} 
                              className="cursor-pointer hover:shadow-lg transition-shadow"
                              onClick={() => handleArticleClick(article)}
                            >
                              <CardHeader>
                                <div className="flex items-start justify-between gap-2">
                                  <CardTitle className="text-sm font-semibold overflow-hidden">
                                    <div className="line-clamp-2">{article.title}</div>
                                  </CardTitle>
                                  <Badge variant="outline" className="text-xs shrink-0">
                                    {article.source}
                                  </Badge>
                                </div>
                                <CardDescription className="text-xs flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(article.pubDate)}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                {article.imageUrl && (
                                  <div className="relative h-40 rounded-md overflow-hidden mb-3">
                                    <img
                                      src={article.imageUrl}
                                      alt={article.title}
                                      className="w-full h-full object-cover transition-transform hover:scale-105"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/images/loading.gif';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                  </div>
                                )}
                                <div className="text-sm text-muted-foreground overflow-hidden">
                                  <div className="line-clamp-3">{article.description}</div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        {category.articles.length === 0 && (
                          <div className="text-center py-12">
                            <div className="mb-4">
                              <span className="text-4xl">📰</span>
                            </div>
                            <p className="text-muted-foreground text-lg font-medium mb-2">No articles available</p>
                            <p className="text-muted-foreground text-sm">
                              We're working to fetch the latest {category.name.toLowerCase()} updates.
                            </p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-4"
                              onClick={handleRefresh}
                              disabled={refreshing}
                            >
                              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                              Try Again
                            </Button>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
