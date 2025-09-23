"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Bell, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Key, 
  CheckCircle, 
  AlertCircle, 
  Trash2,
  Plus,
  Settings,
  Mail,
  MessageSquare,
  Clock,
  Globe
} from "lucide-react"

interface MillerSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MillerSettingsModal({ open, onOpenChange }: MillerSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'security' | 'notifications'>('security')
  
  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    sessionTimeout: '30',
    passwordExpiry: '90'
  })

  // Mock logged in devices data
  const [loggedInDevices, setLoggedInDevices] = useState([
    {
      id: '1',
      deviceType: 'desktop',
      deviceName: 'Windows PC - Chrome',
      location: 'Nairobi, Kenya',
      lastActive: '2024-09-12T10:30:00',
      ipAddress: '197.248.12.45',
      isCurrent: true
    },
    {
      id: '2',
      deviceType: 'mobile',
      deviceName: 'iPhone 14 Pro - Safari',
      location: 'Mumias, Kenya',
      lastActive: '2024-09-12T08:15:00',
      ipAddress: '41.90.64.12',
      isCurrent: false
    },
    {
      id: '3',
      deviceType: 'tablet',
      deviceName: 'iPad Air - Safari',
      location: 'Nairobi, Kenya',
      lastActive: '2024-09-11T16:45:00',
      ipAddress: '197.248.12.45',
      isCurrent: false
    },
    {
      id: '4',
      deviceType: 'desktop',
      deviceName: 'MacBook Pro - Chrome',
      location: 'Kisumu, Kenya',
      lastActive: '2024-09-10T14:20:00',
      ipAddress: '41.89.96.78',
      isCurrent: false
    }
  ])

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      applications: true,
      returns: true,
      compliance: true,
      systemUpdates: false,
      marketing: false
    },
    smsNotifications: {
      urgent: true,
      deadlines: true,
      approvals: false,
      general: false
    },
    pushNotifications: {
      enabled: true,
      applications: true,
      returns: true,
      compliance: true
    },
    frequency: {
      email: 'immediate',
      sms: 'urgent-only',
      push: 'immediate'
    },
    deliveryTime: {
      startTime: '08:00',
      endTime: '18:00',
      timezone: 'Africa/Nairobi'
    }
  })

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="h-5 w-5 text-blue-600" />
      case 'tablet':
        return <Tablet className="h-5 w-5 text-green-600" />
      case 'desktop':
      default:
        return <Monitor className="h-5 w-5 text-gray-600" />
    }
  }

  const handleRemoveDevice = (deviceId: string) => {
    setLoggedInDevices(devices => devices.filter(device => device.id !== deviceId))
  }

  const handleSecuritySettingChange = (key: string, value: boolean | string) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }))
  }

  const handleNotificationChange = (category: string, key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }))
  }

  const handleFrequencyChange = (type: string, frequency: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      frequency: {
        ...prev.frequency,
        [type]: frequency
      }
    }))
  }

  const handleDeliveryTimeChange = (key: string, value: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      deliveryTime: {
        ...prev.deliveryTime,
        [key]: value
      }
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh]">
        <DialogHeader className="bg-gray-50 -m-6 mb-0 p-6 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold">Miller Settings</DialogTitle>
          <DialogDescription>
            Manage security settings and notification preferences for your miller account
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6">
          {[
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === id
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Multi-Factor Authentication */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Key className="h-5 w-5" />
                Multi-Factor Authentication
              </h3>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(checked) => handleSecuritySettingChange('twoFactorEnabled', checked)}
                    />
                    {securitySettings.twoFactorEnabled ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Enabled
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Disabled
                      </Badge>
                    )}
                  </div>
                </div>

                {securitySettings.twoFactorEnabled && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Authentication</span>
                      <Switch
                        checked={securitySettings.emailNotifications}
                        onCheckedChange={(checked) => handleSecuritySettingChange('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SMS Authentication</span>
                      <Switch
                        checked={securitySettings.smsNotifications}
                        onCheckedChange={(checked) => handleSecuritySettingChange('smsNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Login Alerts</span>
                      <Switch
                        checked={securitySettings.loginAlerts}
                        onCheckedChange={(checked) => handleSecuritySettingChange('loginAlerts', checked)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Session Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Session Management
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select 
                    value={securitySettings.sessionTimeout} 
                    onValueChange={(value) => handleSecuritySettingChange('sessionTimeout', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Select 
                    value={securitySettings.passwordExpiry} 
                    onValueChange={(value) => handleSecuritySettingChange('passwordExpiry', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Active Devices */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Active Devices ({loggedInDevices.length})</h3>
              
              <div className="grid gap-4">
                {loggedInDevices.map((device) => (
                  <div key={device.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getDeviceIcon(device.deviceType)}
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            {device.deviceName}
                            {device.isCurrent && (
                              <Badge variant="outline" className="text-xs">Current</Badge>
                            )}
                          </h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                {device.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(device.lastActive).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs">IP: {device.ipAddress}</p>
                          </div>
                        </div>
                      </div>
                      {!device.isCurrent && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveDevice(device.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </h3>
              
              <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Application Updates</span>
                  <Switch
                    checked={notificationSettings.emailNotifications.applications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'applications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Returns Reminders</span>
                  <Switch
                    checked={notificationSettings.emailNotifications.returns}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'returns', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Compliance Alerts</span>
                  <Switch
                    checked={notificationSettings.emailNotifications.compliance}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'compliance', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">System Updates</span>
                  <Switch
                    checked={notificationSettings.emailNotifications.systemUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'systemUpdates', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Marketing Communications</span>
                  <Switch
                    checked={notificationSettings.emailNotifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', 'marketing', checked)}
                  />
                </div>
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                SMS Notifications
              </h3>
              
              <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Urgent Alerts</span>
                  <Switch
                    checked={notificationSettings.smsNotifications.urgent}
                    onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'urgent', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Deadline Reminders</span>
                  <Switch
                    checked={notificationSettings.smsNotifications.deadlines}
                    onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'deadlines', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Approval Notifications</span>
                  <Switch
                    checked={notificationSettings.smsNotifications.approvals}
                    onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'approvals', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">General Notifications</span>
                  <Switch
                    checked={notificationSettings.smsNotifications.general}
                    onCheckedChange={(checked) => handleNotificationChange('smsNotifications', 'general', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Notification Frequency */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Notification Frequency</h3>
              
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="emailFreq">Email Frequency</Label>
                  <Select 
                    value={notificationSettings.frequency.email} 
                    onValueChange={(value) => handleFrequencyChange('email', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="smsFreq">SMS Frequency</Label>
                  <Select 
                    value={notificationSettings.frequency.sms} 
                    onValueChange={(value) => handleFrequencyChange('sms', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent-only">Urgent Only</SelectItem>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="pushFreq">Push Frequency</Label>
                  <Select 
                    value={notificationSettings.frequency.push} 
                    onValueChange={(value) => handleFrequencyChange('push', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Delivery Time Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Delivery Time Preferences</h3>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={notificationSettings.deliveryTime.startTime}
                      onChange={(e) => handleDeliveryTimeChange('startTime', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={notificationSettings.deliveryTime.endTime}
                      onChange={(e) => handleDeliveryTimeChange('endTime', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={notificationSettings.deliveryTime.timezone} 
                      onValueChange={(value) => handleDeliveryTimeChange('timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="Africa/Cairo">Africa/Cairo (EET)</SelectItem>
                        <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Notifications will only be sent between {notificationSettings.deliveryTime.startTime} and {notificationSettings.deliveryTime.endTime} in your timezone.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}