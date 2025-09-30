"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import AutoPlay from "embla-carousel-autoplay"
import { rssService, RSSArticle } from "@/lib/rss-service"

interface IndustryNewsCardProps {
  className?: string;
  onNewsClick?: () => void;
}

const IndustryNewsCard: React.FC<IndustryNewsCardProps> = ({ 
  className = "",
  onNewsClick
}) => {
  const [industryNewsArticles, setIndustryNewsArticles] = useState<RSSArticle[]>([])
  const [isLoadingNews, setIsLoadingNews] = useState(true)

  // Load industry news articles
  useEffect(() => {
    const loadIndustryNews = async () => {
      setIsLoadingNews(true)
      try {
        const categories = await rssService.fetchAllArticles()
        // Get articles from all categories and take the first 7
        const allArticles = categories.flatMap(category => category.articles)
        setIndustryNewsArticles(allArticles.slice(0, 7))
      } catch (error) {
        console.error('Failed to load industry news:', error)
        // Keep empty array on error
      } finally {
        setIsLoadingNews(false)
      }
    }
    
    loadIndustryNews()
  }, [])

  return (
    <Card 
      className={`rounded-[20px] shadow-lg border-0 bg-white cursor-pointer hover:shadow-xl transition-shadow ${className}`} 
      onClick={onNewsClick}
    >
      <CardHeader className="pb-1">
        <CardTitle className="text-[#202020] flex items-center justify-between">
          Industry News
          <Badge className="bg-gray-100 text-green-600 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isLoadingNews ? (
          <div className="h-48 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-gray-500">Loading latest news...</div>
          </div>
        ) : (
          <Carousel className="w-full" opts={{ loop: true }} plugins={[AutoPlay({ delay: 4000 })]}>
            <CarouselContent>
              {industryNewsArticles.length > 0 ? industryNewsArticles.map((article, index) => (
                <CarouselItem key={article.id || index}>
                  <div 
                    className="relative h-48 rounded-lg overflow-hidden"
                    style={{
                      backgroundImage: `url('${article.imageUrl || '/images/loading.gif'}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative h-full flex items-center justify-center p-4">
                      <div className="bg-black/50 p-4 rounded-lg text-center">
                        <h3 className="text-white font-bold text-sm leading-tight line-clamp-3">
                          {article.title}
                        </h3>
                        <p className="text-gray-200 text-xs mt-2">
                          {article.source}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              )) : (
                // Fallback to static content if no articles
                <CarouselItem className="bg-[url('/images/sugar_surge.jpeg')] bg-cover bg-center h-48 flex items-center justify-center text-white font-bold text-lg rounded-l-lg">
                  <div className="bg-black/50 p-4 rounded-lg">
                    Sugar Prices Surge
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>
        )}
      </CardContent>
    </Card>
  )
}

export default IndustryNewsCard
