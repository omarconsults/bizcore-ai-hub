import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Mail, 
  MessageSquare, 
  Eye,
  BarChart3,
  Plus,
  Calendar,
  Target,
  DollarSign,
  Zap
} from 'lucide-react';
import CampaignManager from '@/components/marketing/CampaignManager';
import SocialMediaGenerator from '@/components/marketing/SocialMediaGenerator';
import DesignStudio from '@/components/marketing/DesignStudio';
import EmailMarketing from '@/components/marketing/EmailMarketing';

const Marketing = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Marketing Hub</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="design">Design Studio</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Website Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,457</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>+12% from last month</span>
                </div>
                <Progress value={65} className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Customer Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,892</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>+8% new users</span>
                </div>
                <Progress value={80} className="mt-4" />
              </CardContent>
            </Card>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Email Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,103</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="h-4 w-4 text-emerald-500" />
                  <span>+156 this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">SMS Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,456</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-purple-500" />
                  <span>+87 this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Social Media Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,765</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Eye className="h-4 w-4 text-orange-500" />
                  <span>+4% this week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500">
                  <BarChart3 size={48} className="mx-auto mb-2" />
                  <p>Campaign performance chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          <CampaignManager />
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email">
          <EmailMarketing />
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social">
          <SocialMediaGenerator />
        </TabsContent>

        {/* Design Studio Tab */}
        <TabsContent value="design">
          <DesignStudio />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketing;
