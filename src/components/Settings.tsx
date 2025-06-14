
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  LogOut,
  Save,
  Building
} from 'lucide-react';

const Settings = () => {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    businessName: user?.user_metadata?.business_name || '',
    email: user?.email || '',
    notifications: {
      emailUpdates: true,
      complianceReminders: true,
      taskDeadlines: true,
      marketingInsights: false
    },
    privacy: {
      dataCollection: true,
      analyticsSharing: false,
      thirdPartyIntegrations: true
    },
    appearance: {
      theme: 'light',
      compactMode: false,
      showTips: true
    }
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log('Settings saved:', settings);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen max-w-4xl mx-auto">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and application settings</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={settings.businessName}
              onChange={(e) => setSettings(prev => ({ ...prev, businessName: e.target.value }))}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1"
              disabled
            />
            <p className="text-sm text-gray-500 mt-1">Email cannot be changed from here</p>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          {[
            { key: 'emailUpdates', label: 'Email Updates', description: 'Receive product updates and announcements' },
            { key: 'complianceReminders', label: 'Compliance Reminders', description: 'Get notified about upcoming deadlines' },
            { key: 'taskDeadlines', label: 'Task Deadlines', description: 'Reminders for important tasks' },
            { key: 'marketingInsights', label: 'Marketing Insights', description: 'Weekly marketing performance reports' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <Switch
                checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                onCheckedChange={(checked) => updateSetting('notifications', item.key, checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>
        </div>
        
        <div className="space-y-4">
          {[
            { key: 'dataCollection', label: 'Data Collection', description: 'Allow us to collect usage data to improve the service' },
            { key: 'analyticsSharing', label: 'Analytics Sharing', description: 'Share anonymized analytics with third parties' },
            { key: 'thirdPartyIntegrations', label: 'Third-party Integrations', description: 'Allow connections to external services' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <Switch
                checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                onCheckedChange={(checked) => updateSetting('privacy', item.key, checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-5 h-5 text-orange-600" />
          <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
        </div>
        
        <div className="space-y-4">
          {[
            { key: 'compactMode', label: 'Compact Mode', description: 'Show more content in less space' },
            { key: 'showTips', label: 'Show Tips', description: 'Display helpful tips and guidance' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <Switch
                checked={settings.appearance[item.key as keyof typeof settings.appearance]}
                onCheckedChange={(checked) => updateSetting('appearance', item.key, checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Data Export */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Download className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Data Export</h2>
        </div>
        
        <p className="text-gray-600 mb-4">Download a copy of your business data</p>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
        
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800"
        >
          <Save className="w-4 h-4" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
