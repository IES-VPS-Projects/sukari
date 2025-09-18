"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

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

interface MarketInsightsCardProps {
  className?: string;
  marketData?: ProductInsight[];
}

const MarketInsightsCard: React.FC<MarketInsightsCardProps> = ({ 
  className = "",
  marketData: externalMarketData
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Use external market data if provided, otherwise use default
  const currentMarketData = externalMarketData || marketData

  const handleNext = () => {
    setCurrentIndex((prev: number) => (prev + 1) % currentMarketData.length)
  }

  const currentProduct = currentMarketData[currentIndex]

  return (
    <Card 
      className={`rounded-[24px] shadow-lg border-0 bg-white relative overflow-hidden cursor-pointer ${className}`}
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

export default MarketInsightsCard
