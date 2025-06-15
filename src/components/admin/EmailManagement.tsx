
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Send, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useEmailService } from '@/hooks/useEmailService';
import { useToast } from '@/hooks/use-toast';

const EmailManagement = () => {
  const { sendEmail, loading } = useEmailService();
  const { toast } = useToast();
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    content: ''
  });

  const emailCampaigns = [
    {
      id: 'camp-001',
      subject: 'Welcome to BizCore Platform',
      recipients: 245,
      sent: '2024-06-15 10:30',
      status: 'delivered',
      openRate: '68%'
    },
    {
      id: 'camp-002', 
      subject: 'New Features Available',
      recipients: 892,
      sent: '2024-06-14 14:15',
      status: 'delivered',
      openRate: '72%'
    },
    {
      id: 'camp-003',
      subject: 'Security Update Required',
      recipients: 156,
      sent: '2024-06-13 09:00',
      status: 'pending',
      openRate: '-'
    }
  ];

  const handleSendEmail = async () => {
    if (!emailForm.to || !emailForm.subject || !emailForm.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await sendEmail({
        to: emailForm.to,
        subject: emailForm.subject,
        html: `<p>${emailForm.content.replace(/\n/g, '<br>')}</p>`,
        text: emailForm.content
      });

      setEmailForm({ to: '', subject: '', content: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Email Management</h1>
        <p className="text-gray-600">Send emails and manage communication campaigns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Email Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail size={20} />
              Send Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Email
              </label>
              <Input
                type="email"
                placeholder="user@example.com"
                value={emailForm.to}
                onChange={(e) => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <Input
                placeholder="Email subject"
                value={emailForm.subject}
                onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <Textarea
                placeholder="Email content..."
                rows={6}
                value={emailForm.content}
                onChange={(e) => setEmailForm(prev => ({ ...prev, content: e.target.value }))}
              />
            </div>
            <Button 
              onClick={handleSendEmail}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <Send className="mr-2" size={16} />
              {loading ? 'Sending...' : 'Send Email'}
            </Button>
          </CardContent>
        </Card>

        {/* Email Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Email Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Emails Sent</span>
                <span className="font-semibold">1,293</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Rate</span>
                <span className="font-semibold text-emerald-600">98.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Open Rate</span>
                <span className="font-semibold text-blue-600">70%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bounce Rate</span>
                <span className="font-semibold text-red-600">1.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Email Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Open Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-gray-400" />
                      {campaign.recipients}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-gray-400" />
                      {campaign.sent}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === 'delivered' ? 'default' : 'secondary'}>
                      {campaign.status === 'delivered' ? (
                        <CheckCircle size={12} className="mr-1" />
                      ) : (
                        <AlertTriangle size={12} className="mr-1" />
                      )}
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{campaign.openRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailManagement;
