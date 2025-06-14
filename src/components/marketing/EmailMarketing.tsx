
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmailComposer from '@/components/EmailComposer';
import { Mail, Users, Send, BarChart3 } from 'lucide-react';

const EmailMarketing = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <EmailComposer />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="text-purple-600" size={20} />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Welcome Email</h3>
                    <p className="text-sm text-gray-600">Welcome new customers to your business</p>
                  </CardContent>
                </Card>
                
                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Product Launch</h3>
                    <p className="text-sm text-gray-600">Announce new products to your audience</p>
                  </CardContent>
                </Card>
                
                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Newsletter</h3>
                    <p className="text-sm text-gray-600">Regular updates and company news</p>
                  </CardContent>
                </Card>
                
                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Promotional</h3>
                    <p className="text-sm text-gray-600">Sales and special offers</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Emails Sent</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-sm text-emerald-600">+8% this month</p>
                  </div>
                  <Send className="text-blue-600" size={24} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Open Rate</p>
                    <p className="text-2xl font-bold text-gray-900">24.3%</p>
                    <p className="text-sm text-emerald-600">+2.1% vs industry</p>
                  </div>
                  <Mail className="text-emerald-600" size={24} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Subscribers</p>
                    <p className="text-2xl font-bold text-gray-900">2,103</p>
                    <p className="text-sm text-emerald-600">+156 this month</p>
                  </div>
                  <Users className="text-purple-600" size={24} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Click Rate</p>
                    <p className="text-2xl font-bold text-gray-900">3.7%</p>
                    <p className="text-sm text-emerald-600">Above average</p>
                  </div>
                  <BarChart3 className="text-orange-600" size={24} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Email Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500">
                  <BarChart3 size={48} className="mx-auto mb-2" />
                  <p>Email analytics chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailMarketing;
