"use client"

import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function SugarYieldChart() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const chartOptions = {
    series: [{
      name: 'Predicted Yield',
      data: [65, 72, 68, 75, 71, 78, 82, 77, 85, 83, 88, 90]
    }, {
      name: 'Actual Yield',
      data: [62, 69, 70, 73, 73, 76, 79, 82, 81, 87, 85, 92]
    }],
    chart: {
      height: 180,
      type: 'area' as const,
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3
    },
    colors: ['#ec4899', '#14b8a6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    xaxis: {
      type: 'datetime' as const,
      categories: [
        "2024-01-01T00:00:00.000Z",
        "2024-02-01T00:00:00.000Z",
        "2024-03-01T00:00:00.000Z",
        "2024-04-01T00:00:00.000Z",
        "2024-05-01T00:00:00.000Z",
        "2024-06-01T00:00:00.000Z",
        "2024-07-01T00:00:00.000Z",
        "2024-08-01T00:00:00.000Z",
        "2024-09-01T00:00:00.000Z",
        "2024-10-01T00:00:00.000Z",
        "2024-11-01T00:00:00.000Z",
        "2024-12-01T00:00:00.000Z"
      ],
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        },
        formatter: (value: number) => `${value} MT/ha`
      }
    },
    tooltip: {
      x: {
        format: 'MMM yyyy'
      },
      y: {
        formatter: (value: number) => `${value} MT/ha`
      }
    },
    legend: {
      show: true,
      position: 'top' as const,
      horizontalAlign: 'center' as const,
      markers: {
        size: 6,
        strokeWidth: 0,
        fillColors: ['#ec4899', '#14b8a6']
      }
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
            Sugar Yield Prediction vs Actual
          </CardTitle>
          <Badge 
            variant="outline" 
            className="bg-teal-500/10 text-teal-700 border-teal-300 px-3 py-1 text-sm font-medium"
          >
            Avg. Accuracy: 94.2%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col">
        {isClient && (
          <div className="relative flex items-center">
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type="area"
              height={120}
            />
          </div>
        )}
        {!isClient && (
          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg flex items-center justify-center h-32">
            <div className="text-gray-500">Loading chart...</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}