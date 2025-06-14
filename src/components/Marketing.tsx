
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Palette, 
  Mail, 
  Calendar,
  Download,
  Copy,
  Send,
  Eye,
  BarChart3,
  Users,
  Hash,
  Smile,
  Image,
  FileText,
  Clock,
  Target
} from 'lucide-react';
import SocialMediaGenerator from './marketing/SocialMediaGenerator';
import DesignStudio from './marketing/DesignStudio';
import CampaignManager from './marketing/CampaignManager';
import MarketingCalendar from './marketing/MarketingCalendar';

const Marketing = () => {
  const [activeTab, setActiveTab] = useState('social');

  const marketingStats = [
    { title: 'Active Campaigns', value: '8', change: '+2 this week', icon: Target },
    { title: 'Reach This Month', value: '12.5K', change: '+18%', icon: Users },
    { title: 'Engagement Rate', value: '4.2%', change: '+0.8%', icon: BarChart3 },
    { title: 'Scheduled Posts', value: '24', change: 'Next 7 days', icon: Clock },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Marketing Assistant 🚀</h1>
            <p className="text-gray-600 mt-1">Create, launch, and manage effective marketing campaigns with AI</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Today</div>
            <div className="text-lg font-semibold text-gray-900">March 15, 2024</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketingStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-emerald-600 mt-1">{stat.change}</p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-100">
                  <stat.icon className="text-emerald-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Marketing Tools */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="text-blue-900" size={20} />
            Marketing Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Bot size={16} />
                <span className="hidden sm:inline">Social Media</span>
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Palette size={16} />
                <span className="hidden sm:inline">Design Studio</span>
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="flex items-center gap-2">
                <Mail size={16} />
                <span className="hidden sm:inline">Campaigns</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="social" className="mt-6">
              <SocialMediaGenerator />
            </TabsContent>

            <TabsContent value="design" className="mt-6">
              <DesignStudio />
            </TabsContent>

            <TabsContent value="campaigns" className="mt-6">
              <CampaignManager />
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <MarketingCalendar />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Marketing;
