
import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  UserPlus, 
  Calendar as CalendarIcon, 
  Star
} from 'lucide-react';
import { TeamDirectory } from './hr/TeamDirectory';
import { ContractsTab } from './hr/ContractsTab';
import { HiringAssistant } from './hr/HiringAssistant';
import { LeaveManagement } from './hr/LeaveManagement';
import { PerformanceReviews } from './hr/PerformanceReviews';
import { TeamMember, LeaveRequest, ContractData } from './hr/types';

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('contracts');
  const [contractData, setContractData] = useState<ContractData>({
    type: '',
    role: '',
    salary: '',
    startDate: undefined
  });
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: 'Musa Bello', role: 'Sales Manager', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Tobi Adeyemi', role: 'Freelance Designer', status: 'Contract', joinDate: '2024-02-01' },
    { id: 3, name: 'Sarah Okafor', role: 'Marketing Intern', status: 'Intern', joinDate: '2024-03-01' },
    { id: 4, name: 'Ahmed Yusuf', role: 'Developer', status: 'Active', joinDate: '2023-12-10' },
  ]);
  
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 1, name: 'Musa Bello', type: 'Annual Leave', dates: 'Mar 20-22, 2024', status: 'pending' },
    { id: 2, name: 'Ahmed Yusuf', type: 'Sick Leave', dates: 'Mar 15, 2024', status: 'approved' },
    { id: 3, name: 'Sarah Okafor', type: 'Personal Leave', dates: 'Mar 25, 2024', status: 'pending' },
  ]);

  const tabs = [
    { id: 'directory', name: 'Team Directory', icon: Users },
    { id: 'contracts', name: 'Contracts', icon: FileText },
    { id: 'hiring', name: 'Hiring Assistant', icon: UserPlus },
    { id: 'leave', name: 'Leave & Attendance', icon: CalendarIcon },
    { id: 'performance', name: 'Performance Reviews', icon: Star },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'directory':
        return (
          <TeamDirectory 
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
          />
        );
      case 'contracts':
        return (
          <ContractsTab 
            contractData={contractData}
            setContractData={setContractData}
          />
        );
      case 'hiring':
        return <HiringAssistant />;
      case 'leave':
        return (
          <LeaveManagement 
            leaveRequests={leaveRequests}
            setLeaveRequests={setLeaveRequests}
          />
        );
      case 'performance':
        return <PerformanceReviews teamMembers={teamMembers} />;
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

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
