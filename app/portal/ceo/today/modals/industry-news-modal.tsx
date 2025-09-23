"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  ChevronDown,
  ExternalLink, 
  RefreshCw, 
  Share, 
  X,
  Bookmark
} from "lucide-react"
import { useState } from "react"
import { FaRegNewspaper } from "react-icons/fa"
import { MdAnalytics, MdOutlineArticle } from "react-icons/md"
import { HiOutlineGlobe } from "react-icons/hi"
import { TbBuildingFactory } from "react-icons/tb"
import { BsGraphUpArrow } from "react-icons/bs"

interface IndustryNewsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Types for RSS feed data
interface RSSArticle {
  id: string
  title: string
  description: string
  content: string
  link: string
  pubDate: string
  imageUrl?: string
  source: string
  category: string
}

export function IndustryNewsModal({ 
  open, 
  onOpenChange 
}: IndustryNewsModalProps) {
  // Tabs for different news categories
  const [activeCategory, setActiveCategory] = useState("Industry News")
  const [selectedArticle, setSelectedArticle] = useState<RSSArticle | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  // Function to format date strings in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  }

  // Get category icon based on category name
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Industry News":
        return <FaRegNewspaper className="h-4 w-4" />;
      case "Market Analysis":
        return <MdAnalytics className="h-4 w-4" />;
      default:
        return <MdOutlineArticle className="h-4 w-4" />;
    }
  };

  // Mock RSS feed data
  const categories = [
    {
      name: "Industry News",
      count: 18,
      articles: [
        {
          id: "1",
          title: "New Sugar Production Regulations Set to Impact Local Mills",
          description: "The government has announced new regulations for sugar production that will affect operations at local mills starting next month.",
          content: "The Ministry of Agriculture has announced a comprehensive set of regulations aimed at streamlining sugar production across the country. These new guidelines, which will come into effect on September 1, introduce stricter quality control measures, environmental standards, and worker safety protocols. Industry experts suggest that while the regulations may increase operational costs initially, they will ultimately lead to more efficient and sustainable production methods.",
          link: "#",
          pubDate: "2025-08-19T10:30:00Z",
          imageUrl: "https://images.unsplash.com/photo-1611181343063-de5534300099?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Agriculture Daily",
          category: "Industry News"
        },
        {
          id: "2",
          title: "Global Sugar Prices Rise Amid Supply Chain Disruptions",
          description: "Ongoing global logistics challenges have contributed to a 15% increase in international sugar prices over the past quarter.",
          content: "International sugar markets have experienced significant price volatility in recent months, with benchmark prices rising approximately 15% since May. Analysts attribute this increase primarily to supply chain disruptions affecting major sugar-producing regions in Brazil and India. Transportation bottlenecks and increased shipping costs have created delivery delays and uncertainty in global markets. The situation presents both challenges and opportunities for regional producers who may be able to fill supply gaps in local markets, particularly if they can maintain reliable production schedules.",
          link: "#",
          pubDate: "2025-08-17T14:45:00Z",
          imageUrl: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Commodity Insights",
          category: "Industry News"
        },
        {
          id: "3",
          title: "Innovative Harvesting Technology Shows Promise for Reducing Labor Costs",
          description: "A new semi-automated harvesting system has demonstrated potential to reduce manual labor requirements by up to 40%.",
          content: "Agricultural technology firm AgriTech Solutions has unveiled a promising new semi-automated harvesting system specifically designed for sugarcane fields. Early trials conducted in partnership with several regional sugar producers have shown that the system can reduce manual labor requirements by approximately 40% while maintaining or even improving harvest quality. The technology combines machine learning algorithms with specialized cutting mechanisms that can adapt to different field conditions. Industry observers note that such innovations could help address persistent labor shortage challenges while improving operational efficiency throughout the sugar production value chain.",
          link: "#",
          pubDate: "2025-08-15T09:15:00Z",
          imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Tech in Agriculture",
          category: "Industry News"
        },
        {
          id: "4",
          title: "Climate-Resilient Sugarcane Varieties Show Promising Results in Field Trials",
          description: "New drought-resistant sugarcane varieties have demonstrated 30% higher yield under challenging weather conditions.",
          content: "A research partnership between the National Agricultural Research Institute and several private sector companies has yielded promising results in the development of climate-resilient sugarcane varieties. Field trials conducted over the past three growing seasons indicate that these new varieties can maintain approximately 30% higher yields under drought conditions compared to traditional varieties. The research team focused on developing plants with deeper root systems and modified leaf structures that reduce water loss through transpiration. These developments could prove particularly valuable as climate change continues to create more unpredictable growing conditions for agricultural producers throughout the region.",
          link: "#",
          pubDate: "2025-08-12T11:20:00Z",
          imageUrl: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Agricultural Innovation",
          category: "Industry News"
        },
        {
          id: "5",
          title: "Sugar Producers Form Alliance to Establish Industry Sustainability Standards",
          description: "Leading sugar producers have joined forces to develop unified sustainability metrics and best practices for the industry.",
          content: "A coalition of major sugar producers announced yesterday the formation of the Sustainable Sugar Alliance (SSA), an industry-led initiative focused on establishing unified sustainability standards for sugar production. The alliance aims to develop a comprehensive framework addressing environmental impact, resource efficiency, and social responsibility throughout the sugar value chain. Initial priorities include water conservation, renewable energy implementation, and ethical labor practices. The SSA plans to introduce a certification program that will enable consumers and industrial buyers to identify sugar products that meet specific sustainability criteria, potentially creating market advantages for early adopters of these enhanced standards.",
          link: "#",
          pubDate: "2025-08-10T16:00:00Z",
          imageUrl: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Sustainability Report",
          category: "Industry News"
        },
        {
          id: "6",
          title: "Regional Economic Report Highlights Sugar Industry's Contribution to GDP",
          description: "A comprehensive economic analysis shows the sugar sector generates $3.2 billion in annual economic activity across the region.",
          content: "The latest Regional Economic Impact Report released by the Economic Development Authority emphasizes the significant contribution of the sugar industry to the regional economy. According to the analysis, sugar production and related activities generate approximately $3.2 billion in annual economic activity, supporting over 45,000 direct and indirect jobs. The report also highlights the industry's multiplier effect, with each dollar of sugar production value creating an additional $1.80 in economic activity through supply chain relationships and employee spending. Government officials have cited these findings in discussions about potential infrastructure investments and policy supports designed to strengthen this important economic sector.",
          link: "#",
          pubDate: "2025-08-08T13:30:00Z",
          imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Economic Times",
          category: "Industry News"
        }
      ]
    },
    {
      name: "Market Analysis",
      count: 7,
      articles: [
        {
          id: "7",
          title: "Sugar Industry Outlook 2025-2030: Growth Opportunities and Challenges",
          description: "New market research projects 4.5% CAGR for sugar consumption over the next five years, with specialty products driving premium segment growth.",
          content: "A comprehensive market analysis report released by Global Industry Insights provides a detailed forecast for the sugar industry from 2025 to 2030. The report projects a compound annual growth rate (CAGR) of approximately 4.5% for overall sugar consumption, with particularly strong performance expected in specialty and premium product categories. Consumer trends toward clean-label products with minimal processing are creating new market opportunities for producers who can deliver high-quality, environmentally responsible sugar products. The analysis identifies several key challenge areas, including increasing competition from alternative sweeteners, regulatory pressures related to health concerns, and the need for significant capital investments to achieve sustainability goals.",
          link: "#",
          pubDate: "2025-08-18T15:45:00Z",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Market Research Pro",
          category: "Market Analysis"
        },
        {
          id: "8",
          title: "Export Market Opportunities: Emerging Trends in International Sugar Trade",
          description: "Shifting trade patterns create new export possibilities for quality-focused producers in underserved regional markets.",
          content: "A detailed analysis of international sugar trade patterns conducted by Trade Economics Institute reveals emerging opportunities for export-oriented producers. The research indicates that shifting trade relationships and changing consumer preferences in several key Asian markets have created potential openings for suppliers who can deliver consistent quality and reliable logistics. Particular growth potential exists in specialty sugar categories, including organic and fair-trade certified products, which command premium prices in developed markets. The analysis suggests that producers who invest in quality control systems, sustainability certifications, and efficient export infrastructure could gain competitive advantages in these evolving international markets despite overall price pressures in commodity sugar segments.",
          link: "#",
          pubDate: "2025-08-16T12:30:00Z",
          imageUrl: "https://images.unsplash.com/photo-1542744173-8659b8e95b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Global Trade Review",
          category: "Market Analysis"
        },
        {
          id: "9",
          title: "Investment Analysis: Capital Requirements for Modernizing Sugar Production Facilities",
          description: "Financial models indicate 15-25% efficiency gains possible through strategic technology investments with 4-6 year ROI timelines.",
          content: "A detailed investment analysis report from Agricultural Finance Partners examines the financial implications of modernizing sugar production facilities. According to their models, comprehensive technology upgrades typically require capital investments of $15-30 million for mid-sized operations but can generate efficiency improvements of 15-25% across the production process. The analysis suggests that well-planned modernization projects can achieve return on investment within 4-6 years, depending on specific technology choices and implementation effectiveness. The report emphasizes the importance of phased implementation approaches that allow for learning and adjustment throughout the modernization process. Financial experts recommend that producers develop detailed technology roadmaps aligned with their specific operational challenges rather than pursuing generic modernization strategies.",
          link: "#",
          pubDate: "2025-08-14T10:15:00Z",
          imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Investment Weekly",
          category: "Market Analysis"
        },
        {
          id: "10",
          title: "Competitive Landscape Analysis: Regional Sugar Industry Positioning",
          description: "Comparative analysis reveals key competitive differentiators among major producers and highlights strategic positioning opportunities.",
          content: "Industry analysts at Regional Business Intelligence have published a comprehensive competitive landscape analysis of the sugar industry. The report evaluates major producers across several key performance dimensions, including production efficiency, product quality, market access, and financial stability. The analysis reveals significant differentiation in strategic approaches, with some producers focusing on high-volume commodity production while others pursue premium positioning through specialty products and sustainability credentials. The report identifies several potential competitive advantages that remain underexploited by most industry participants, including integrated energy production, agricultural extension services for growers, and value-added processing. These findings suggest opportunities for strategic repositioning that could strengthen competitive positions even in challenging market conditions.",
          link: "#",
          pubDate: "2025-08-11T14:00:00Z",
          imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
          source: "Strategic Business Review",
          category: "Market Analysis"
        }
      ]
    }
  ];

  // Handle article click
  const handleArticleClick = (article: RSSArticle) => {
    setSelectedArticle(article);
  };

  // Handle back button click to return to article list
  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  // Handle refresh action
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh - in a real app, this would fetch fresh data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">Industry News</DialogTitle>
        
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FaRegNewspaper className="h-5 w-5 text-primary" />
                Industry News
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Latest updates and analysis from the sugar industry
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Article Detail View */}
        {selectedArticle ? (
          <div className="flex-1 overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleBackToList}>
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Articles
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-6">
                <article className="max-w-3xl mx-auto">
                  <Badge className="mb-4">{selectedArticle.category}</Badge>
                  <h1 className="text-2xl font-bold mb-2 text-foreground">
                    {selectedArticle.title}
                  </h1>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{selectedArticle.source}</span> • {formatDate(selectedArticle.pubDate)}
                    </div>
                  </div>
                  
                  {selectedArticle.imageUrl && (
                    <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                      <img
                        src={selectedArticle.imageUrl}
                        alt={selectedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Introduction */}
                  <p className="text-base leading-8 text-foreground text-justify font-normal tracking-wide mb-10">
                    {selectedArticle.description}
                  </p>
                  
                  {/* Main Content */}
                  {selectedArticle.content && (
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