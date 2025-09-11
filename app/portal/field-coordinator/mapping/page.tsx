"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Layers, Satellite, Map, Navigation, Plus, Download, Maximize, Settings } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const farmLocations = [
  {
    id: 1,
    name: "Green Valley Farm",
    farmer: "Mary Johnson",
    coordinates: { lat: -1.2921, lng: 36.8219 },
    size: "25.5 acres",
    crops: ["Sugarcane"],
    status: "active",
    compliance: 92,
  },
  {
    id: 2,
    name: "Sunrise Agriculture",
    farmer: "David Smith",
    coordinates: { lat: -1.2845, lng: 36.8156 },
    size: "18.2 acres",
    crops: ["Sugarcane"],
    status: "active",
    compliance: 87,
  },
  {
    id: 3,
    name: "Golden Harvest",
    farmer: "Sarah Wilson",
    coordinates: { lat: -1.2967, lng: 36.8298 },
    size: "32.1 acres",
    crops: ["Sugarcane"],
    status: "pending",
    compliance: 78,
  },
]

const mapLayers = [
  { id: "satellite", name: "Satellite View", active: true },
  { id: "terrain", name: "Terrain", active: false },
  { id: "hybrid", name: "Hybrid", active: false },
  { id: "farms", name: "Farm Boundaries", active: true },
  { id: "crops", name: "Crop Types", active: true },
  { id: "compliance", name: "Compliance Status", active: false },
  { id: "weather", name: "Weather Data", active: false },
]

export default function MappingPage() {
  const [selectedFarm, setSelectedFarm] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [mapView, setMapView] = useState("satellite")
  const [layers, setLayers] = useState(mapLayers)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const toggleLayer = (layerId: string) => {
    setLayers((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, active: !layer.active } : layer)))
  }

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev)
  }

  // Add event listener for Escape key to exit full screen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullScreen])

  const filteredFarms = farmLocations.filter(
    (farm) =>
      farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.farmer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">GIS Mapping</h1>
            <p className="text-gray-500">Interactive mapping and spatial analysis of farms in your jurisdiction</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Map
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Farm Boundary
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Map Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Map Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Farms</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search farms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Map View */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Map View</label>
                <Select value={mapView} onValueChange={setMapView}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satellite">
                      <div className="flex items-center gap-2">
                        <Satellite className="h-4 w-4" />
                        Satellite
                      </div>
                    </SelectItem>
                    <SelectItem value="terrain">
                      <div className="flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        Terrain
                      </div>
                    </SelectItem>
                    <SelectItem value="hybrid">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        Hybrid
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Map Layers */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Map Layers</label>
                <div className="space-y-2">
                  {layers.map((layer) => (
                    <div key={layer.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={layer.id}
                        checked={layer.active}
                        onChange={() => toggleLayer(layer.id)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor={layer.id} className="text-sm">
                        {layer.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Display */}
          <Card className={`lg:col-span-2 ${isFullScreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
            <CardHeader className={isFullScreen ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' : ''}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Interactive Map
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Navigation className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={toggleFullScreen}
                    title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className={isFullScreen ? 'h-[calc(100vh-4rem)] overflow-auto' : ''}>
              {/* Map Placeholder - In a real app, this would be an actual map component */}
              <div className={`relative ${isFullScreen ? 'h-full' : 'aspect-[4/3]'} overflow-hidden rounded-lg border bg-muted`}>
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Map visualization would be displayed here</p>
                    <p className="text-sm text-gray-400 mt-1">Integration with mapping services required</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/10" />

                {/* Farm Markers */}
                {filteredFarms.map((farm, index) => (
                  <div
                    key={farm.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                      selectedFarm === farm.id ? "z-10" : ""
                    }`}
                    style={{
                      left: `${30 + index * 20}%`,
                      top: `${40 + index * 15}%`,
                    }}
                    onClick={() => setSelectedFarm(selectedFarm === farm.id ? null : farm.id)}
                  >
                    <div
                      className={`rounded-full border-2 border-white p-2 shadow-lg ${
                        farm.status === "active"
                          ? "bg-green-500"
                          : farm.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      } ${selectedFarm === farm.id ? "scale-125" : ""}`}
                    >
                      <MapPin className="h-4 w-4 text-white" />
                    </div>

                    {selectedFarm === farm.id && (
                      <div className="absolute top-full left-1/2 mt-2 w-64 -translate-x-1/2 rounded-lg border bg-white p-3 shadow-lg">
                        <h4 className="font-medium">{farm.name}</h4>
                        <p className="text-sm text-muted-foreground">{farm.farmer}</p>
                        <div className="mt-2 space-y-1 text-xs">
                          <div>Size: {farm.size}</div>
                          <div>Crops: {farm.crops.join(", ")}</div>
                          <div className="flex items-center gap-2">
                            <span>Compliance:</span>
                            <Badge variant={farm.compliance >= 90 ? "default" : "secondary"} className="text-xs">
                              {farm.compliance}%
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" className="mt-2 w-full" asChild>
                          <Link href={`/portal/field-coordinator/farms/${farm.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 p-3 shadow-lg">
                  <h4 className="text-sm font-medium mb-2">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Active Farms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>Pending Farms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span>Inactive Farms</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farm List */}
          <Card>
            <CardHeader>
              <CardTitle>Farm Locations</CardTitle>
              <CardDescription>{filteredFarms.length} farms found</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredFarms.map((farm) => (
                  <div
                    key={farm.id}
                    className={`cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50 ${
                      selectedFarm === farm.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedFarm(selectedFarm === farm.id ? null : farm.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{farm.name}</h4>
                      <Badge
                        variant={
                          farm.status === "active"
                            ? "default"
                            : farm.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {farm.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{farm.farmer}</p>
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <div>Size: {farm.size}</div>
                      <div>Crops: {farm.crops.join(", ")}</div>
                      <div>Compliance: {farm.compliance}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Analytics */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Spatial Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Total Area Mapped</span>
                <span className="font-medium">3,247 acres</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Average Farm Size</span>
                <span className="font-medium">25.3 acres</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Farms per Sector</span>
                <span className="font-medium">18.2 avg</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Crop Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Sugarcane</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Crops</span>
                <span className="font-medium">15%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance by Region</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Sector 7</span>
                <span className="font-medium text-green-600">92%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sector 12</span>
                <span className="font-medium text-yellow-600">78%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sector 3</span>
                <span className="font-medium text-red-600">65%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
