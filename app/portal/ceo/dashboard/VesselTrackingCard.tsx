"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Ship, TrendingUp, MapPin, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VesselTrackingCardProps {
  className?: string
}

interface VesselStats {
  totalVessels: number
  cargoShips: number
  sugarDeliveries: number
  nearbyPorts: string[]
  lastUpdate: string
}

interface MapInfo {
  center: string
  zoomLevel: number
  coverage: string
  data: string
}

const VesselTrackingCard = ({ className }: VesselTrackingCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapInfo, setMapInfo] = useState<MapInfo>({
    center: "4.06°S, 39.68°E",
    zoomLevel: 8,
    coverage: "East African Coast",
    data: "Real-time AIS"
  })

  // Mock vessel statistics for sugar cargo ships delivering to Kenya and nearby regions
  const vesselStats: VesselStats = {
    totalVessels: 24,
    cargoShips: 18,
    sugarDeliveries: 12,
    nearbyPorts: ["Mombasa", "Dar es Salaam", "Djibouti", "Port of Mogadishu"],
    lastUpdate: "2 hours ago"
  }

  useEffect(() => {
    if (modalOpen && !mapLoaded) {
      // Remove any existing VesselFinder scripts and elements
      const existingScripts = document.querySelectorAll('script[src*="vesselfinder"]')
      existingScripts.forEach(script => script.remove())
      
      const existingMaps = document.querySelectorAll('#vesselfinder_map')
      existingMaps.forEach(map => map.remove())

      // Create a container for the VesselFinder map
      const mapContainer = document.getElementById('vessel-map-container')
      if (mapContainer) {
        // Clear the container
        mapContainer.innerHTML = ''
        
        // Create the VesselFinder map div with the expected structure
        const vesselFinderDiv = document.createElement('div')
        vesselFinderDiv.id = 'vesselfinder_map'
        vesselFinderDiv.style.width = '100%'
        vesselFinderDiv.style.height = '400px'
        mapContainer.appendChild(vesselFinderDiv)

        // Add the VesselFinder configuration script
        const configScript = document.createElement('script')
        configScript.type = 'text/javascript'
        configScript.innerHTML = `
          // Map appearance
          var width="100%";         // width in pixels or percentage
          var height="400";         // height in pixels
          var latitude="4.058";     // center latitude (decimal degrees) - Port of Kilindini, Mombasa
          var longitude="39.681";   // center longitude (decimal degrees) - Port of Kilindini, Mombasa
          var zoom="8";             // initial zoom (between 3 and 18)
          var names=true;           // always show ship names
          
          // Map controls
          var zoom_control=true;    // show zoom in/out buttons
          var pan_control=true;     // enable map dragging/panning
          var mouse_wheel=true;     // enable zoom with mouse wheel
          var controls=true;        // show map controls
          var coord_display=true;   // show coordinates display in bottom left corner

          // Fleet tracking for sugar cargo vessels in East Africa region
          var fleet_timespan="1440"; // maximum age in minutes of displayed ship positions (24 hours)
          
          // Focus on cargo ships in the region
          var ship_type="cargo";    // Focus on cargo vessels
          
          // Map event callbacks for updating React state
          var mapEvents = {
            onMapReady: function() {
              console.log('VesselFinder map ready');
            },
            onMapMove: function(center, zoom) {
              try {
                if (window.updateMapInfo) {
                  const lat = center.lat ? center.lat.toFixed(3) : '4.058';
                  const lng = center.lng ? center.lng.toFixed(3) : '39.681';
                  const coverage = zoom > 10 ? 'Port Area' : zoom > 7 ? 'Coastal Region' : 'East African Coast';
                  window.updateMapInfo({
                    center: lat + '°S, ' + lng + '°E',
                    zoomLevel: zoom,
                    coverage: coverage,
                    data: 'Real-time AIS'
                  });
                }
              } catch (e) {
                console.log('Map info update error:', e);
              }
            }
          };
        `
        document.head.appendChild(configScript)

        // Add the VesselFinder map script
        const mapScript = document.createElement('script')
        mapScript.type = 'text/javascript'
        mapScript.src = "https://www.vesselfinder.com/aismap.js"
        mapScript.onload = () => {
          setMapLoaded(true)
          
          // Set up global callback for map updates
          ;(window as any).updateMapInfo = (info: MapInfo) => {
            setMapInfo(info)
          }
          
          // Try to hook into VesselFinder map events if available
          setTimeout(() => {
            try {
              // Check if VesselFinder map instance is available
              if ((window as any).vesselfinderMap || (window as any).map) {
                const mapInstance = (window as any).vesselfinderMap || (window as any).map
                
                // Listen for map events if the map supports them
                if (mapInstance.on) {
                  mapInstance.on('moveend', () => {
                    const center = mapInstance.getCenter()
                    const zoom = mapInstance.getZoom()
                    const coverage = zoom > 10 ? 'Port Area' : zoom > 7 ? 'Coastal Region' : 'East African Coast'
                    
                    setMapInfo({
                      center: `${Math.abs(center.lat).toFixed(3)}°${center.lat < 0 ? 'S' : 'N'}, ${center.lng.toFixed(3)}°E`,
                      zoomLevel: Math.round(zoom),
                      coverage: coverage,
                      data: 'Real-time AIS'
                    })
                  })
                  
                  mapInstance.on('zoomend', () => {
                    const center = mapInstance.getCenter()
                    const zoom = mapInstance.getZoom()
                    const coverage = zoom > 10 ? 'Port Area' : zoom > 7 ? 'Coastal Region' : 'East African Coast'
                    
                    setMapInfo({
                      center: `${Math.abs(center.lat).toFixed(3)}°${center.lat < 0 ? 'S' : 'N'}, ${center.lng.toFixed(3)}°E`,
                      zoomLevel: Math.round(zoom),
                      coverage: coverage,
                      data: 'Real-time AIS'
                    })
                  })
                }
              }
            } catch (e) {
              console.log('VesselFinder event binding error:', e)
            }
          }, 2000)
        }
        mapScript.onerror = () => {
          console.error('Failed to load VesselFinder map')
          setMapLoaded(true) // Still set to true to show fallback content
          // Show fallback content
          if (mapContainer) {
            mapContainer.innerHTML = `
              <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <div class="text-center">
                  <div class="text-red-500 mb-2">⚠️ Map Loading Error</div>
                  <p class="text-sm text-gray-600">Unable to load vessel tracking map</p>
                  <p class="text-xs text-gray-500 mt-1">Please check your internet connection</p>
                </div>
              </div>
            `
          }
        }
        document.head.appendChild(mapScript)
      }
    }

    // Cleanup function
    return () => {
      if (!modalOpen) {
        // Clean up global callback
        if ((window as any).updateMapInfo) {
          delete (window as any).updateMapInfo
        }
        
        // Remove VesselFinder scripts by source
        const scripts = document.querySelectorAll('script[src*="vesselfinder"]')
        scripts.forEach(script => script.remove())
        
        // Remove inline scripts that contain VesselFinder code
        const allScripts = document.querySelectorAll('script')
        allScripts.forEach(script => {
          if (script.textContent && (script.textContent.includes('var width') || script.textContent.includes('vesselfinder'))) {
            script.remove()
          }
        })
        
        // Remove VesselFinder map elements
        const vesselMaps = document.querySelectorAll('#vesselfinder_map')
        vesselMaps.forEach(map => map.remove())
        
        // Reset map loaded state and map info
        setMapLoaded(false)
        setMapInfo({
          center: "4.06°S, 39.68°E",
          zoomLevel: 8,
          coverage: "East African Coast",
          data: "Real-time AIS"
        })
      }
    }
  }, [modalOpen, mapLoaded])

  return (
    <>
      <Card 
        className={`rounded-[20px] shadow-lg border-0 bg-white cursor-pointer hover:shadow-xl transition-shadow duration-200 ${className}`}
        onClick={() => setModalOpen(true)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#202020] flex items-center gap-2">
              <Ship className="h-5 w-5 text-blue-600" />
              Vessel Tracking
            </CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Vessel Statistics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{vesselStats.totalVessels}</div>
              <p className="text-xs text-gray-600">Total Vessels</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">{vesselStats.cargoShips}</div>
              <p className="text-xs text-gray-600">Cargo Ships</p>
            </div>
          </div>

          {/* Sugar Deliveries */}
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Sugar Deliveries</span>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{vesselStats.sugarDeliveries}</div>
            <p className="text-xs text-gray-600">To Kenya & Somalia</p>
          </div>

          {/* Nearby Ports */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Active Ports</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {vesselStats.nearbyPorts.map((port) => (
                <Badge key={port} variant="outline" className="text-xs">
                  {port}
                </Badge>
              ))}
            </div>
          </div>

          {/* Last Update */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>Updated {vesselStats.lastUpdate}</span>
          </div>
        </CardContent>
      </Card>

      {/* Vessel Tracking Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden [&>button]:hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-blue-600" />
                Vessel Tracking - Live Maritime Traffic
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setModalOpen(false)}
                className="shrink-0 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Statistics Header */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{vesselStats.totalVessels}</div>
                <p className="text-xs text-gray-600">Total Vessels</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{vesselStats.cargoShips}</div>
                <p className="text-xs text-gray-600">Cargo Ships</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{vesselStats.sugarDeliveries}</div>
                <p className="text-xs text-gray-600">Sugar Deliveries</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">{vesselStats.nearbyPorts.length}</div>
                <p className="text-xs text-gray-600">Active Ports</p>
              </div>
            </div>

            {/* Map Container */}
            <div className="border rounded-lg overflow-hidden bg-gray-100">
              <div className="p-3 bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Live Vessel Positions</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Live</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Updated {vesselStats.lastUpdate}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* VesselFinder Map Container */}
              <div className="w-full h-[400px] bg-blue-50 relative">
                {!mapLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">Loading vessel tracking map...</p>
                    </div>
                  </div>
                ) : (
                  <div id="vessel-map-container" className="w-full h-full">
                    {/* VesselFinder map will be injected here by the script */}
                  </div>
                )}
              </div>
            </div>

            {/* Map Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-4 text-blue-600">Map Information</h4>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Center:</div>
                  <div className="text-sm text-blue-600 font-medium">{mapInfo.center}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Zoom Level:</div>
                  <div className="text-sm text-blue-600 font-medium">{mapInfo.zoomLevel}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Coverage:</div>
                  <div className="text-sm text-blue-600 font-medium">{mapInfo.coverage}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Data:</div>
                  <div className="text-sm text-blue-600 font-medium">{mapInfo.data}</div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default VesselTrackingCard
