
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  MessageSquare, 
  Users,
  Send,
  Eye,
  BarChart3,
  Upload,
  Plus,
  Play,
  Pause,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CampaignManager = () => {
  const { toast } = useToast();
  const [activeCampaignTab, setActiveCampaignTab] = useState('create');
  const [campaignType, setCampaignType] = useState('');
  const [campaignData, setCampaignData] = useState({
    name: '',
    goal: '',
    audience: '',
    subject: '',
    content: '',
    sendTime: ''
  });

  const campaignGoals = [
    'Promote New Product',
    'Announce Sale/Discount',
    'Share Company News',
    'Welcome New Customers',
    'Re-engage Inactive Users',
    'Event Invitation',
    'Survey/Feedback Request',
    'Newsletter Update'
  ];

  const audienceSegments = [
    'All Customers',
    'New Customers (Last 30 days)',
    'VIP/Loyal Customers',
    'Inactive Customers',
    'Lagos Customers',
    'Abuja Customers',
    'Custom Segment'
  ];

  const activeCampaigns = [
    {
      id: 1,
      name: 'Spring Sale Announcement',
      type: 'Email',
      status: 'Active',
      sent: 1250,
      opened: 312,
      clicked: 48,
      openRate: 24.9,
      clickRate: 3.8
    },
    {
      id: 2,
      name: 'New Product Launch SMS',
      type: 'SMS',
      status: 'Scheduled',
      sent: 0,
      scheduled: 850,
      sendDate: '2024-03-20'
    },
    {
      id: 3,
      name: 'Customer Feedback Survey',
      type: 'Email',
      status: 'Completed',
      sent: 500,
      opened: 145,
      clicked: 23,
      openRate: 29.0,
      clickRate: 4.6
    }
  ];

  const createCampaign = () => {
    if (!campaignData.name || !campaignData.goal || !campaignType) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Campaign Created! 🚀",
      description: `${campaignData.name} is ready to launch`
    });

    // Reset form
    setCampaignData({
      name: '',
      goal: '',
      audience: '',
      subject: '',
      content: '',
      sendTime: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeCampaignTab} onValueChange={setActiveCampaignTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        {/* Create Campaign */}
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="text-emerald-600" size={20} />
                Create New Campaign
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Campaign Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer transition-all ${
                    campaignType === 'email' ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCampaignType('email')}
                >
                  <CardContent className="p-6 text-center">
                    <Mail className="mx-auto mb-3 text-blue-600" size={32} />
                    <h3 className="font-semibold">Email Campaign</h3>
                    <p className="text-sm text-gray-600">Rich content, detailed analytics</p>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all ${
                    campaignType === 'sms' ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCampaignType('sms')}
                >
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="mx-auto mb-3 text-green-600" size={32} />
                    <h3 className="font-semibold">SMS Campaign</h3>
                    <p className="text-sm text-gray-600">Direct, immediate reach</p>
                  </CardContent>
                </Card>
              </div>

              {campaignType && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="campaignName">Campaign Name</Label>
                      <Input
                        id="campaignName"
                        placeholder="e.g., March Product Launch"
                        value={campaignData.name}
                        onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goal">Campaign Goal</Label>
                      <Select value={campaignData.goal} onValueChange={(value) => setCampaignData({...campaignData, goal: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select campaign goal" />
                        </SelectTrigger>
                        <SelectContent>
                          {campaignGoals.map((goal) => (
                            <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select value={campaignData.audience} onValueChange={(value) => setCampaignData({...campaignData, audience: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          {audienceSegments.map((segment) => (
                            <SelectItem key={segment} value={segment}>{segment}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sendTime">Send Time</Label>
                      <Input
                        id="sendTime"
                        type="datetime-local"
                        value={campaignData.sendTime}
                        onChange={(e) => setCampaignData({...campaignData, sendTime: e.target.value})}
                      />
                    </div>
                  </div>

                  {campaignType === 'email' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Email Subject</Label>
                        <Input
                          id="subject"
                          placeholder="e.g., 🎉 New arrivals just dropped!"
                          value={campaignData.subject}
                          onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Email Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Write your email content here..."
                          className="min-h-[120px]"
                          value={campaignData.content}
                          onChange={(e) => setCampaignData({...campaignData, content: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  {campaignType === 'sms' && (
                    <div className="space-y-2">
                      <Label htmlFor="smsContent">SMS Message</Label>
                      <Textarea
                        id="smsContent"
                        placeholder="Keep it short and impactful..."
                        className="min-h-[80px]"
                        maxLength={160}
                        value={campaignData.content}
                        onChange={(e) => setCampaignData({...campaignData, content: e.target.value})}
                      />
                      <p className="text-sm text-gray-500">{campaignData.content.length}/160 characters</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button onClick={createCampaign} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <Send className="mr-2 h-4 w-4" />
                      Create Campaign
                    </Button>
                    <Button variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Campaigns */}
        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="text-blue-600" size={20} />
                Campaign Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                          <Badge variant="outline">{campaign.type}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye size={14} className="mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings size={14} className="mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>

                      {campaign.status === 'Active' || campaign.status === 'Completed' ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Sent</p>
                            <p className="font-semibold">{campaign.sent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Opened</p>
                            <p className="font-semibold">{campaign.opened?.toLocaleString() || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Open Rate</p>
                            <p className="font-semibold">{campaign.openRate ? `${campaign.openRate}%` : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Click Rate</p>
                            <p className="font-semibold">{campaign.clickRate ? `${campaign.clickRate}%` : 'N/A'}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm">
                          <p className="text-gray-600">Scheduled for: <span className="font-semibold">{campaign.sendDate}</span></p>
                          <p className="text-gray-600">Recipients: <span className="font-semibold">{campaign.scheduled?.toLocaleString()}</span></p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Campaigns</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-sm text-emerald-600">+3 this month</p>
                  </div>
                  <BarChart3 className="text-blue-600" size={24} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Open Rate</p>
                    <p className="text-2xl font-bold text-gray-900">26.7%</p>
                    <p className="text-sm text-emerald-600">+2.1% vs last month</p>
                  </div>
                  <Eye className="text-emerald-600" size={24} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reach</p>
                    <p className="text-2xl font-bold text-gray-900">18.2K</p>
                    <p className="text-sm text-emerald-600">+12% growth</p>
                  </div>
                  <Users className="text-purple-600" size={24} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Click Rate</p>
                    <p className="text-2xl font-bold text-gray-900">4.2%</p>
                    <p className="text-sm text-emerald-600">Industry avg: 3.1%</p>
                  </div>
                  <Send className="text-orange-600" size={24} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500">
                  <BarChart3 size={48} className="mx-auto mb-2" />
                  <p>Performance chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts */}
        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="text-green-600" size={20} />
                  Contact Management
                </span>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Contacts
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border">
                  <CardContent className="p-4 text-center">
                    <Users className="mx-auto mb-2 text-blue-600" size={32} />
                    <h3 className="font-semibold">All Contacts</h3>
                    <p className="text-2xl font-bold text-gray-900">2,847</p>
                    <p className="text-sm text-gray-600">Total subscribers</p>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-4 text-center">
                    <Mail className="mx-auto mb-2 text-emerald-600" size={32} />
                    <h3 className="font-semibold">Email Subscribers</h3>
                    <p className="text-2xl font-bold text-gray-900">2,103</p>
                    <p className="text-sm text-gray-600">Active email list</p>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-4 text-center">
                    <MessageSquare className="mx-auto mb-2 text-purple-600" size={32} />
                    <h3 className="font-semibold">SMS Subscribers</h3>
                    <p className="text-2xl font-bold text-gray-900">1,456</p>
                    <p className="text-sm text-gray-600">SMS opt-ins</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Audience Segments</h3>
                <div className="space-y-2">
                  {audienceSegments.slice(0, 5).map((segment, index) => (
                    <div key={segment} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{segment}</span>
                      <Badge variant="outline">{Math.floor(Math.random() * 800) + 100} contacts</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create New Segment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignManager;
