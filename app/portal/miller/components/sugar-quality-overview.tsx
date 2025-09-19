"use client"

import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ZoneQualityData {
  zone: string
  healthy: number
  moderateStress: number
  highStress: number
}

interface SugarQualityOverviewProps {
  zoneData?: ZoneQualityData[]
}

export function SugarQualityOverview({ zoneData }: SugarQualityOverviewProps) {
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      type: 'bar',
      height: 100,
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
        }
      },
      zoom: {
        enabled: true
      },
      background: 'transparent',
      fontFamily: 'inherit'
    },
    responsive: [{
      breakpoint: 768,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 10
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 4
          }
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 8,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '11px',
              fontWeight: '600',
              color: '#334b35'
            },
            formatter: function (val: string | number | undefined) {
              return Math.round(Number(val) || 0) + '%'
            }
          }
        }
      },
    },
    xaxis: {
      categories: [
        'Zone A', 'Zone B', 'Zone C', 'Zone D', 
        'Zone E', 'Zone F'
      ],
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '11px',
          fontFamily: 'inherit'
        },
        rotate: 0,
        rotateAlways: false
      },
      axisBorder: {
        show: true,
        color: '#e5e7eb'
      },
      axisTicks: {
        show: true,
        color: '#e5e7eb'
      }
    },
    yaxis: {
      title: {
        text: 'Quality Distribution (%)',
        style: {
          color: '#334b35',
          fontSize: '12px',
          fontWeight: '600',
          fontFamily: 'inherit'
        }
      },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '11px',
          fontFamily: 'inherit'
        },
        formatter: function (val: number) {
          return Math.round(val) + '%'
        }
      },
      max: 100
    },
    legend: {
      show: false
    },
    fill: {
      opacity: 0.9
    },
    colors: ['#10b981', '#14b8a6', '#6b7280'],
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'light',
      shared: true,
      intersect: false,
      y: {
        formatter: function (val: number) {
          return val.toFixed(1) + '%'
        }
      },
      style: {
        fontFamily: 'inherit'
      }
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    states: {
      hover: {
        filter: {
          type: 'lighten'
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken'
        }
      }
    }
  });

  const [series, setSeries] = useState([
    {
      name: 'Healthy',
      data: [75, 60, 85, 70, 80, 65]
    },
    {
      name: 'Moderate Stress',
      data: [20, 30, 12, 25, 15, 25]
    },
    {
      name: 'High Stress',
      data: [5, 10, 3, 5, 5, 10]
    }
  ]);

  // Use provided data or fallback to default mock data
  useEffect(() => {
    if (zoneData && zoneData.length > 0) {
      const categories = zoneData.map(item => item.zone);
      
      // Extract the zone data directly
      const healthyData = zoneData.map(item => item.healthy);
      const moderateStressData = zoneData.map(item => item.moderateStress);
      const highStressData = zoneData.map(item => item.highStress);

      setChartOptions(prev => ({
        ...prev,
        xaxis: {
          ...prev.xaxis,
          categories: categories
        }
      }));

      setSeries([
        { name: 'Healthy', data: healthyData },
        { name: 'Moderate Stress', data: moderateStressData },
        { name: 'High Stress', data: highStressData }
      ]);
    }
  }, [zoneData]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold" style={{ color: '#334b35' }}>
          Sugar Quality Overview
        </CardTitle>
        <div className="text-sm text-gray-600">
          Quality distribution across processing zones
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full bg-white rounded-lg">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="bar"
            height={100}
          />
        </div>
        
        {/* Quality Indicators */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
              <span className="text-gray-700">Healthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal-500 rounded-sm"></div>
              <span className="text-gray-700">Moderate Stress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
              <span className="text-gray-700">High Stress</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}