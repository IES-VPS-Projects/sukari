"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  DollarSign,
  Calendar,
  MessageSquare,
  FileText,
  Award,
  Target,
  Play,
  Pause,
  Cloud,
  TrendingDown,
  Sun,
  CloudRain,
  Wind,
  ArrowRight,
} from "lucide-react"
import { ScheduleVisitModal } from "@/components/modals/schedule-visit-modal"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useAuth } from "@/components/auth-provider"
import { PortalLayout } from "@/components/portal-layout"

// Weather data schema
interface WeatherData {
  locationName: string
  currentTemperature: number
  highTemperature: number
  lowTemperature: number
  temperatureUnit: 'celsius'
  weatherCondition: string
  conditionCode: 'SUNNY' | 'CLOUDY' | 'RAINY' | 'WINDY'
}

const weatherLocations: WeatherData[] = [
  {
    locationName: "Nzoia",
    currentTemperature: 22,
    highTemperature: 26,
    lowTemperature: 16,
    temperatureUnit: 'celsius',
    weatherCondition: "Sunny",
    conditionCode: 'SUNNY'
  },
  {
    locationName: "Mumias",
    currentTemperature: 23,
    highTemperature: 27,
    lowTemperature: 17,
    temperatureUnit: 'celsius',
    weatherCondition: "Partly cloudy",
    conditionCode: 'CLOUDY'
  },
  {
    locationName: "Chemelil",
    currentTemperature: 25,
    highTemperature: 29,
    lowTemperature: 19,
    temperatureUnit: 'celsius',
    weatherCondition: "Light rain",
    conditionCode: 'RAINY'
  },
  {
    locationName: "Muhoroni",
    currentTemperature: 24,
    highTemperature: 28,
    lowTemperature: 18,
    temperatureUnit: 'celsius',
    weatherCondition: "Windy",
    conditionCode: 'WINDY'
  },
  {
    locationName: "Thika",
    currentTemperature: 26,
    highTemperature: 30,
    lowTemperature: 20,
    temperatureUnit: 'celsius',
    weatherCondition: "Sunny",
    conditionCode: 'SUNNY'
  },
  {
    locationName: "Ganze",
    currentTemperature: 28,
    highTemperature: 32,
    lowTemperature: 22,
    temperatureUnit: 'celsius',
    weatherCondition: "Hot and sunny",
    conditionCode: 'SUNNY'
  },
  {
    locationName: "Ramisi",
    currentTemperature: 27,
    highTemperature: 31,
    lowTemperature: 21,
    temperatureUnit: 'celsius',
    weatherCondition: "Partly cloudy",
    conditionCode: 'CLOUDY'
  },
  {
    locationName: "Butali",
    currentTemperature: 21,
    highTemperature: 25,
    lowTemperature: 15,
    temperatureUnit: 'celsius',
    weatherCondition: "Rainy",
    conditionCode: 'RAINY'
  },
  {
    locationName: "Webuye",
    currentTemperature: 20,
    highTemperature: 24,
    lowTemperature: 14,
    temperatureUnit: 'celsius',
    weatherCondition: "Cool and windy",
    conditionCode: 'WINDY'
  },
  {
    locationName: "Kibos",
    currentTemperature: 23,
    highTemperature: 27,
    lowTemperature: 17,
    temperatureUnit: 'celsius',
    weatherCondition: "Sunny",
    conditionCode: 'SUNNY'
  }
]

// Market Insights data schema
interface ProductInsight {
  productName: string
  price: number
  currency: string
  priceUnit: string
  weeklyChangePercent: number
  weeklyChangeDirection: 'up' | 'down'
  importVolume: number
  exportVolume: number
  volumeUnit: string
}

const marketData: ProductInsight[] = [
  {
    productName: "Sugarcane",
    price: 4500,
    currency: "KSh",
    priceUnit: "per tonne",
    weeklyChangePercent: 5,
    weeklyChangeDirection: 'up',
    importVolume: 1000,
    exportVolume: 200,
    volumeUnit: "tonnes"
  },
  {
    productName: "Sugar",
    price: 85,
    currency: "KSh",
    priceUnit: "per kg",
    weeklyChangePercent: 2,
    weeklyChangeDirection: 'down',
    importVolume: 2450,
    exportVolume: 890,
    volumeUnit: "tonnes"
  },
  {
    productName: "Molasses",
    price: 15000,
    currency: "KSh",
    priceUnit: "per tonne",
    weeklyChangePercent: 3,
    weeklyChangeDirection: 'up',
    importVolume: 500,
    exportVolume: 300,
    volumeUnit: "tonnes"
  },
  {
    productName: "Fertilizer",
    price: 2500,
    currency: "KSh",
    priceUnit: "per 50 kg bag",
    weeklyChangePercent: 1,
    weeklyChangeDirection: 'down',
    importVolume: 1200,
    exportVolume: 100,
    volumeUnit: "tonnes"
  }
]

// Transcript data for the audio briefing
const transcriptData = [
  { time: 0, text: "Overview: This briefing summarizes key developments in Kenya's sugar sector from July 26 to August 2, 2025, based on recent government announcements, market trends, and stakeholder reports." },
  { time: 10, text: "The sector shows signs of recovery amid ongoing reforms, with emphasis on production revival, pricing adjustments, and reduced import dependency. " },
  { time: 20, text: "No major disruptions reported this week, but focus remains on mill efficiencies and farmer payments. " },
  { time: 30, text: "Production and Milling Updates. Sugarcane deliveries and mill operations continue to improve under recent leasing agreements. Nzoia Sugar Company, leased to West Kenya Sugar Co. earlier in 2025, cleared KSh 1.5 billion in debt and disbursed Sh300M to farmers, contributing to a reported 66% production increase year-over-year." },
  { time: 40, text: "Chemelil Sugar Mill achieved timely farmer payments within one week, a shift from historical delays, supporting broader sector momentum toward self-sufficiency." },
  { time: 50, text: "Stakeholder sentiment is largely positive: 78% of farmers are optimistic, driven by a cane price hike to KSh5,750 per tonne and a KSh150 million bonus for Mumias farmers, a first for the sector. Mill operators are 85% positive, buoyed by reforms like the Sugar Act 2024. Field officers, at 92% positive, praise the new digital reporting system, with one Nyanza officer noting it “has improved efficiency significantly." },
  { time: 60, text: "Dealers remain 65% neutral, cautious about market stability due to import challenges." },
  { time: 70, text: "Two recent headlines highlight progress and challenges. In Kakamega, a new digital cane tracking system at Butali Sugar Mills has cut delivery delays by 30%, ensuring farmers are paid within seven days, a game-changer for local growers." },
  { time: 80, text: "Meanwhile, in Mumias, a 15% production drop has raised concerns, prompting a Kenya Sugar Board order to halt milling for three months from July 14, 2025, to address immature cane harvesting. " },         
  { time: 90, text: "This affects key mills like Mumias, Butali, and Nzoia, with a cane survey planned to stabilize supply." },    
  { time: 100, text: "That concludes today's briefing. Stay updated with the latest developments through your dashboard." },
  { time: 110, text: "Thank you for listening. Stay tuned for more updates on the sugar sector." }  
];

// Market Insights Component
const MarketInsightsCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % marketData.length)
  }

  const currentProduct = marketData[currentIndex]

  return (
    <Card 
      className="rounded-[24px] shadow-lg border-0 bg-white relative overflow-hidden cursor-pointer"
      onClick={handleNext}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[#202020]">Market Insights</CardTitle>
        <Badge className="bg-gray-100 text-green-600 flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-[#6B6B6B]">{currentProduct.productName}</h3>
          {currentProduct.weeklyChangeDirection === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="text-2xl font-bold text-[#202020] mb-1">{currentProduct.currency} {currentProduct.price}</div>
        <p className="text-xs text-[#6B6B6B] mb-3">{currentProduct.priceUnit}</p>
        <p className="text-xs text-green-600 mb-2">{currentProduct.weeklyChangeDirection === 'up' ? '+' : '-'}{currentProduct.weeklyChangePercent}% from last week</p>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#6B6B6B]">Import Volume</span>
          <span className="font-medium">{currentProduct.importVolume} {currentProduct.volumeUnit}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[#6B6B6B]">Export Volume</span>
          <span className="font-medium">{currentProduct.exportVolume} {currentProduct.volumeUnit}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Weather Widget Component
const WeatherCarouselWidget = () => {
  const [isActive, setIsActive] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % weatherLocations.length)
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive])

  const currentWeather = weatherLocations[currentIndex]

  const getBackgroundGradient = (conditionCode: string) => {
    switch (conditionCode) {
      case 'SUNNY':
        return 'from-orange-400 to-yellow-500'
      case 'CLOUDY':
        return 'from-blue-400 to-blue-600'
      case 'RAINY':
        return 'from-gray-500 to-blue-500'
      case 'WINDY':
        return 'from-gray-400 to-gray-600'
      default:
        return 'from-blue-400 to-blue-600'
    }
  }

  const getWeatherIcon = (conditionCode: string) => {
    switch (conditionCode) {
      case 'SUNNY':
        return <Sun className="h-16 w-16 opacity-80" />
      case 'CLOUDY':
        return <Cloud className="h-16 w-16 opacity-80" />
      case 'RAINY':
        return <CloudRain className="h-16 w-16 opacity-80" />
      case 'WINDY':
        return <Wind className="h-16 w-16 opacity-80" />
      default:
        return <Cloud className="h-16 w-16 opacity-80" />
    }
  }

  return (
    <Card 
      className={`bg-gradient-to-br ${getBackgroundGradient(currentWeather.conditionCode)} text-white overflow-hidden rounded-[24px] shadow-lg border-0 relative transition-all duration-500 cursor-pointer`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        setIsActive(false)
        setCurrentIndex(0)
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <CardContent className="p-4 relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{currentWeather.locationName}</h3>
          <div>
            {getWeatherIcon(currentWeather.conditionCode)}
          </div>
        </div>
        <div className="flex justify-between items-end mt-auto">
          <div>
            <p className="text-4xl font-bold">{currentWeather.currentTemperature}°</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90 mb-1">{currentWeather.weatherCondition}</p>
            <p className="text-xs opacity-75">H {currentWeather.highTemperature}° L {currentWeather.lowTemperature}°</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TodayPage() {
  const [scheduleVisitOpen, setScheduleVisitOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")
  const [greeting, setGreeting] = useState("")
  const { user } = useAuth()
  
  // Audio state and logic
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(typeof window !== 'undefined' ? new Audio('/sukari2.mp3') : null)
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0)
  const [audioTime, setAudioTime] = useState(0)

  const handleAudioPlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', () => setIsPlaying(false))
      return () => {
        audio.removeEventListener('ended', () => setIsPlaying(false))
      }
    }
  }, [audio])

  useEffect(() => {
    if (audio && isPlaying) {
      const updateTranscript = () => {
        const currentTime = audio.currentTime
        setAudioTime(currentTime)

        let currentSegment = -1
        for (let i = 0; i < transcriptData.length; i++) {
          const segment = transcriptData[i]
          const nextSegment = transcriptData[i + 1]
          if (currentTime >= segment.time && (!nextSegment || currentTime < nextSegment.time)) {
            currentSegment = i
            break
          }
        }
        if (currentSegment !== -1 && currentSegment !== currentTranscriptIndex) {
          setCurrentTranscriptIndex(currentSegment)
        }
      }

      const interval = setInterval(updateTranscript, 100)
      return () => clearInterval(interval)
    }
  }, [audio, isPlaying, currentTranscriptIndex])

  const getCurrentTranscriptLines = () => {
    if (currentTranscriptIndex < transcriptData.length) {
      const segment = transcriptData[currentTranscriptIndex]
      const progress = Math.min((audioTime - segment.time) / 8, 1) // 8 seconds per segment
      const textLength = Math.floor(segment.text.length * progress)

      return [{
        text: segment.text.substring(0, textLength),
        isActive: true,
        isComplete: progress >= 1
      }]
    }
    return [{ text: "...", isActive: false, isComplete: false }]
  }
  
  // Get the first name from the user's full name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0]
  }
  
  // Generate time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    const firstName = user ? getFirstName(user.name) : "there"
    
    if (hour < 12) {
      return `Good Morning, ${firstName}`
    } else if (hour < 17) {
      return `Good Afternoon, ${firstName}`
    } else {
      return `Good Evening, ${firstName}`
    }
  }
  
  // Set time-based greeting when component mounts or user changes
  useEffect(() => {
    setGreeting(getTimeBasedGreeting())
  }, [user])

  const currentTime = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const handleScheduleVisit = (location?: string) => {
    setSelectedLocation(location || "")
    setScheduleVisitOpen(true)
  }

  return (
    <PortalLayout pageTitle="Today">
      {/* Centered Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Header with User Info */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#202020]">{greeting}</h1>
              <p className="text-[#6B6B6B]">{currentTime}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Target className="h-3 w-3 mr-1" />
                1,250 Points
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Award className="h-3 w-3 mr-1" />
                Level 5 Executive
              </Badge>
            </div>
          </div>

          {/* AI Morning Briefing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" style={{ height: "50%" }}>
            <div>
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden rounded-[24px] shadow-lg border-0" style={{ height: "100%" }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-xl">Briefing</h3>
                      <p className="text-sm text-gray-300">August 5th • 3 min</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mb-4 h-15">
                    <div className="flex items-end gap-1">
                      {Array.from({ length: 50 }, (_, i) => (
                        <div
                          key={i}
                          className={`rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                          style={{
                            width: "3px",
                            height: `${Math.random() * 10 + 10}px`,
                            backgroundColor: isPlaying ? '#10B981' : '#6B7280',
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Audio Progress */}
                  {audio && (
                    <div className="mb-4">
                      <Progress 
                        value={audio.duration ? (audio.currentTime / audio.duration) * 100 : 0} 
                        className="h-1 bg-gray-700"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{Math.floor(audio.currentTime || 0)}s</span>
                        <span>{Math.floor(audio.duration || 0)}s</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Transcript Display */}
                  <div className="mb-6">
                    {getCurrentTranscriptLines().map((line, index) => (
                      <p 
                        key={index} 
                        className={`text-xs leading-relaxed transition-all duration-300 ${
                          line.isActive 
                            ? 'text-green-400' 
                            : line.isComplete 
                              ? 'text-gray-400' 
                              : 'text-gray-300'
                        }`}
                      >
                        {line.text}
                        {line.isActive && <span className="animate-pulse">|</span>}
                      </p>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleAudioPlay}
                    className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full py-3"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Play now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
            <MarketInsightsCard />
            <WeatherCarouselWidget />
          </div>

          {/* AI Recommendations and Stakeholder Sentiment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#202020]">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Action Items
                </CardTitle>
                <CardDescription className="text-[#6B6B6B]">
                  Intelligent insights based on current data patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Consider visiting Mumias region</p>
                    <p className="text-xs text-[#6B6B6B]">
                      15% production drop detected - requires executive attention
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleScheduleVisit("Mumias Sugar Mill")}>
                    Schedule
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Recommend policy review</p>
                    <p className="text-xs text-[#6B6B6B]">23% increase in compliance violations this quarter</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#202020]">Weather alert preparation</p>
                    <p className="text-xs text-[#6B6B6B]">Prepare drought mitigation for Western region</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Prepare
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#202020]">
                  <Users className="h-5 w-5 text-purple-600" />
                  Stakeholder Sentiment
                </CardTitle>
                <CardDescription className="text-[#6B6B6B]">
                  AI-analyzed feedback from field reports and communications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-[#202020]">Farmers</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">78% Positive</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-[#202020]">Mill Operators</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600">85% Positive</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-[#202020]">Dealers</span>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">65% Neutral</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-[#202020]">Field Officers</span>
                    </div>
                    <span className="text-sm font-medium text-purple-600">92% Positive</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-[#6B6B6B]">
                    <strong>Recent Feedback:</strong> "New digital reporting system has improved efficiency
                    significantly" - Field Officer, Nyanza Region
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#202020]">Industry News</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full" opts={{ loop: true }} plugins={[Autoplay({ delay: 4000 })]}>
                  <CarouselContent>
                    <CarouselItem className="bg-[url('/images/sugar_surge.jpeg')] bg-cover bg-center h-40 flex items-center justify-center text-white font-bold text-lg">
                      Sugar Prices Surge
                    </CarouselItem>
                    <CarouselItem className="bg-[url('/images/cane_tech.jpeg')] bg-cover bg-center h-40 flex items-center justify-center text-white font-bold text-lg">
                      New Tech Boosts Yields
                    </CarouselItem>
                    <CarouselItem className="bg-[url('/images/govt_subsidies.png')] bg-cover bg-center h-40 flex items-center justify-center text-white font-bold text-lg">
                      Government Subsidies
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#202020]">Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Board Meeting</p>
                    <p className="text-xs text-[#6B6B6B]">Today, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Farmer Representatives</p>
                    <p className="text-xs text-[#6B6B6B]">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Mill Operators Review</p>
                    <p className="text-xs text-[#6B6B6B]">Friday, 3:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="rounded-[20px] shadow-lg border-0 bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#202020]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Approved mill license renewal</p>
                    <p className="text-xs text-[#6B6B6B]">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Reviewed compliance report</p>
                    <p className="text-xs text-[#6B6B6B]">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#202020]">Scheduled farmer meeting</p>
                    <p className="text-xs text-[#6B6B6B]">Yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

      <ScheduleVisitModal
        open={scheduleVisitOpen}
        onOpenChange={setScheduleVisitOpen}
        defaultLocation={selectedLocation}
      />
    </PortalLayout>
  )
}
