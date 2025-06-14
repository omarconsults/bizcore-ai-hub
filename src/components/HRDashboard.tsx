
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Users, 
  FileText, 
  UserPlus, 
  Calendar as CalendarIcon, 
  Star,
  Download,
  Copy,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('contracts');
  const [contractData, setContractData] = useState({
    type: '',
    role: '',
    salary: '',
    startDate: undefined as Date | undefined
  });
  const [jobTitle, setJobTitle] = useState('');
  const [generatedJD, setGeneratedJD] = useState('');

  const tabs = [
    { id: 'directory', name: 'Team Directory', icon: Users },
    { id: 'contracts', name: 'Contracts', icon: FileText },
    { id: 'hiring', name: 'Hiring Assistant', icon: UserPlus },
    { id: 'leave', name: 'Leave & Attendance', icon: CalendarIcon },
    { id: 'performance', name: 'Performance Reviews', icon: Star },
  ];

  const recentContracts = [
    { name: 'Musa Bello.pdf', type: 'Full-time', date: '2024-03-10' },
    { name: 'Freelance_Tobi.docx', type: 'Freelance', date: '2024-03-08' },
    { name: 'Intern_Sarah.pdf', type: 'Internship', date: '2024-03-05' },
  ];

  const teamMembers = [
    { name: 'Musa Bello', role: 'Sales Manager', status: 'Active', joinDate: '2024-01-15' },
    { name: 'Tobi Adeyemi', role: 'Freelance Designer', status: 'Contract', joinDate: '2024-02-01' },
    { name: 'Sarah Okafor', role: 'Marketing Intern', status: 'Intern', joinDate: '2024-03-01' },
    { name: 'Ahmed Yusuf', role: 'Developer', status: 'Active', joinDate: '2023-12-10' },
  ];

  const leaveRequests = [
    { name: 'Musa Bello', type: 'Annual Leave', dates: 'Mar 20-22, 2024', status: 'pending' },
    { name: 'Ahmed Yusuf', type: 'Sick Leave', dates: 'Mar 15, 2024', status: 'approved' },
    { name: 'Sarah Okafor', type: 'Personal Leave', dates: 'Mar 25, 2024', status: 'pending' },
  ];

  const generateJobDescription = () => {
    if (!jobTitle) return;
    
    const template = `Job Title: ${jobTitle}

Job Summary:
We are seeking a highly motivated ${jobTitle} to join our dynamic team. The successful candidate will be responsible for driving results and contributing to our company's growth.

Key Responsibilities:
• Lead and manage team initiatives
• Develop and implement strategic plans
• Collaborate with cross-functional teams
• Monitor performance metrics and KPIs
• Ensure compliance with company policies

Requirements:
• Bachelor's degree in relevant field
• 3+ years of experience in similar role
• Strong communication and leadership skills
• Proficiency in relevant software tools
• Ability to work in fast-paced environment

What We Offer:
• Competitive salary package
• Health insurance coverage
• Professional development opportunities
• Flexible working arrangements
• Performance-based bonuses`;

    setGeneratedJD(template);
  };

  const handleGenerateContract = () => {
    console.log('Generating contract with data:', contractData);
    // Here you would typically call an API to generate the contract
    alert('Contract generation started! You will receive an email when ready.');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJD);
    alert('Job description copied to clipboard!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'directory':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Team Directory</h3>
              <Button className="bg-blue-900 hover:bg-blue-800">
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </div>
            <div className="grid gap-4">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <p className="text-xs text-gray-500">Joined: {member.joinDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          member.status === 'Active' ? 'bg-green-100 text-green-800' :
                          member.status === 'Contract' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'contracts':
        return (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Create New Contract
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contract-type">Contract Type</Label>
                  <Select value={contractData.type} onValueChange={(value) => setContractData({...contractData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time Employment</SelectItem>
                      <SelectItem value="part-time">Part-time Employment</SelectItem>
                      <SelectItem value="freelance">Freelance Contract</SelectItem>
                      <SelectItem value="internship">Internship Agreement</SelectItem>
                      <SelectItem value="consultant">Consultant Agreement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role"
                    placeholder="e.g. Sales Manager"
                    value={contractData.role}
                    onChange={(e) => setContractData({...contractData, role: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="salary">Salary</Label>
                  <Input 
                    id="salary"
                    placeholder="e.g. ₦500,000"
                    value={contractData.salary}
                    onChange={(e) => setContractData({...contractData, salary: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !contractData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {contractData.startDate ? format(contractData.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={contractData.startDate}
                        onSelect={(date) => setContractData({...contractData, startDate: date})}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button 
                  onClick={handleGenerateContract}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={!contractData.type || !contractData.role}
                >
                  Generate Contract
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentContracts.map((contract, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{contract.name}</p>
                        <p className="text-xs text-gray-500">{contract.type} • {contract.date}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'hiring':
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  AI Hiring Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input 
                    id="job-title"
                    placeholder="e.g. Sales Lead"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={generateJobDescription}
                  className="w-full bg-blue-900 hover:bg-blue-800"
                  disabled={!jobTitle}
                >
                  Generate Job Description
                </Button>

                {generatedJD && (
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                      <pre className="text-sm whitespace-pre-wrap">{generatedJD}</pre>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'leave':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-blue-900 hover:bg-blue-800 h-20">
                <div className="text-center">
                  <Plus className="mx-auto mb-1" />
                  Request Leave
                </div>
              </Button>
              <Button variant="outline" className="h-20">
                <div className="text-center">
                  <CheckCircle className="mx-auto mb-1" />
                  Approve Requests
                </div>
              </Button>
              <Button variant="outline" className="h-20">
                <div className="text-center">
                  <CalendarIcon className="mx-auto mb-1" />
                  Leave Balances
                </div>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Leave Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{request.name}</h4>
                        <p className="text-sm text-gray-600">{request.type}</p>
                        <p className="text-xs text-gray-500">{request.dates}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {request.status === 'pending' ? (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        ) : request.status === 'approved' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          request.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Performance Reviews</h3>
              <Button className="bg-blue-900 hover:bg-blue-800">
                <Plus className="mr-2 h-4 w-4" />
                New Review Cycle
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold mx-auto">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <div className="flex justify-center">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        View Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">HR & Team Tools Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your team, contracts, and HR processes</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-900 text-blue-900 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
