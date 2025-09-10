"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  Bell, 
  Shield, 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Lock, 
  Smartphone,
  Mail,
  Save,
  CheckCircle
} from "lucide-react"

interface ImporterSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImporterSettingsModal({ open, onOpenChange }: ImporterSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'preferences' | 'documents' | 'security'>('preferences')
  const [isSaved, setIsSaved] = useState(false)
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      applications: true,
      returns: true,
      renewals: true,
      system: false
    },
    preferences: {
      language: 'English',
      timezone: 'Africa/Nairobi',
      dateFormat: 'DD/MM/YYYY',
      currency: 'USD'
    },
    security: {
      twoFactor: true,
      sessionTimeout: '30',
      passwordExpiry: '90'
    }
  })

  // Mock documents data
  const documents = [
    {
      id: 'DOC-001',
      name: 'Business Registration Certificate',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-03-15',
      status: 'Verified'
    },
    {
      id: 'DOC-002',
      name: 'Tax Compliance Certificate',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-03-20',
      status: 'Verified'
    },
    {
      id: 'DOC-003',
      name: 'Import License Copy',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: '2024-03-25',
      status: 'Verified'
    },
    {
      id: 'DOC-004',
      name: 'Company Profile',
      type: 'PDF',
      size: '1.5 MB',
      uploadDate: '2024-04-01',
      status: 'Pending Review'
    }
  ]

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }))
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }))
  }

  const handleSecurityChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }))
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800'
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Bell className="h-5 w-5" />
        Notification Preferences
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-gray-600">Receive notifications via email</p>
          </div>
          <Switch
            id="email-notifications"
            checked={settings.notifications.email}
            onCheckedChange={(checked) => handleNotificationChange('email', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sms-notifications">SMS Notifications</Label>
            <p className="text-sm text-gray-600">Receive notifications via SMS</p>
          </div>
          <Switch
            id="sms-notifications"
            checked={settings.notifications.sms}
            onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="application-notifications">Application Updates</Label>
            <p className="text-sm text-gray-600">Notify about application status changes</p>
          </div>
          <Switch
            id="application-notifications"
            checked={settings.notifications.applications}
            onCheckedChange={(checked) => handleNotificationChange('applications', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="returns-notifications">Returns Reminders</Label>
            <p className="text-sm text-gray-600">Remind about pending returns submissions</p>
          </div>
          <Switch
            id="returns-notifications"
            checked={settings.notifications.returns}
            onCheckedChange={(checked) => handleNotificationChange('returns', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="renewal-notifications">License Renewals</Label>
            <p className="text-sm text-gray-600">Notify about upcoming license renewals</p>
          </div>
          <Switch
            id="renewal-notifications"
            checked={settings.notifications.renewals}
            onCheckedChange={(checked) => handleNotificationChange('renewals', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="system-notifications">System Updates</Label>
            <p className="text-sm text-gray-600">Notify about system maintenance and updates</p>
          </div>
          <Switch
            id="system-notifications"
            checked={settings.notifications.system}
            onCheckedChange={(checked) => handleNotificationChange('system', checked)}
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="text-md font-semibold mb-4">General Preferences</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              value={settings.preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="English">English</option>
              <option value="Swahili">Swahili</option>
            </select>
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <select
              id="timezone"
              value={settings.preferences.timezone}
              onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Africa/Nairobi">East Africa Time (EAT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div>
            <Label htmlFor="dateFormat">Date Format</Label>
            <select
              id="dateFormat"
              value={settings.preferences.dateFormat}
              onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <Label htmlFor="currency">Default Currency</Label>
            <select
              id="currency"
              value={settings.preferences.currency}
              onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="USD">US Dollar (USD)</option>
              <option value="KES">Kenyan Shilling (KES)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  )

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Uploaded Documents
        </h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{doc.name}</h4>
                <p className="text-sm text-gray-600">
                  {doc.type} • {doc.size} • Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                </p>
              </div>
              <Badge className={getDocumentStatusColor(doc.status)}>
                {doc.status}
              </Badge>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Document Requirements</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Business Registration Certificate (Required)</li>
          <li>• Tax Compliance Certificate (Required)</li>
          <li>• Import License Copy (Required)</li>
          <li>• Company Profile (Optional)</li>
          <li>• Insurance Certificate (Optional)</li>
        </ul>
      </div>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Shield className="h-5 w-5" />
        Security Settings
      </h3>

      <div className="space-y-6">
        {/* Password Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold">Password & Authentication</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Switch
              id="two-factor"
              checked={settings.security.twoFactor}
              onCheckedChange={(checked) => handleSecurityChange('twoFactor', checked)}
            />
          </div>

          <div>
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="password-expiry">Password Expiry (days)</Label>
            <Input
              id="password-expiry"
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleSecurityChange('passwordExpiry', e.target.value)}
              className="w-full"
            />
          </div>

          <Button variant="outline" className="w-full">
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>

        {/* Connected Devices */}
        <div className="border-t pt-6">
          <h4 className="font-semibold mb-4">Connected Devices</h4>
          
          <div className="space-y-3">
            <div className="p-3 border rounded-lg flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">iPhone 15 Pro</p>
                  <p className="text-sm text-gray-600">Last active: 2 minutes ago</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Current Device
              </Badge>
            </div>

            <div className="p-3 border rounded-lg flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">MacBook Pro</p>
                  <p className="text-sm text-gray-600">Last active: 1 hour ago</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-red-600">
                Revoke Access
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t pt-6">
          <h4 className="font-semibold mb-4">Recovery Contact</h4>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="recovery-email">Recovery Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <Input
                  id="recovery-email"
                  type="email"
                  value="bernard.kasavuli@sugarimports.co.ke"
                  className="flex-1"
                  readOnly
                />
                <Button size="sm" variant="outline">
                  Verify
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="recovery-phone">Recovery Phone</Label>
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-gray-500" />
                <Input
                  id="recovery-phone"
                  type="tel"
                  value="+254 700 222 234"
                  className="flex-1"
                  readOnly
                />
                <Button size="sm" variant="outline">
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Security Settings
        </Button>
      </div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Settings
          </DialogTitle>
          <DialogDescription>
            Manage your account preferences, documents, and security settings
          </DialogDescription>
        </DialogHeader>

        {/* Success Message */}
        {isSaved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'preferences'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Preferences
              </div>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'documents'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'security'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </div>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'preferences' && renderPreferencesTab()}
          {activeTab === 'documents' && renderDocumentsTab()}
          {activeTab === 'security' && renderSecurityTab()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
