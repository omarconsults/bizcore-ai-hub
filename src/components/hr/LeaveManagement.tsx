
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus,
  CheckCircle,
  Calendar as CalendarIcon, 
  AlertCircle
} from 'lucide-react';
import { LeaveRequest } from './types';

interface LeaveManagementProps {
  leaveRequests: LeaveRequest[];
  setLeaveRequests: React.Dispatch<React.SetStateAction<LeaveRequest[]>>;
}

export const LeaveManagement: React.FC<LeaveManagementProps> = ({
  leaveRequests,
  setLeaveRequests
}) => {
  const { toast } = useToast();

  const approveLeaveRequest = (requestId: number) => {
    setLeaveRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, status: 'approved' } : request
    ));
    
    toast({
      title: "Leave Approved",
      description: "Leave request has been approved."
    });
  };

  const rejectLeaveRequest = (requestId: number) => {
    setLeaveRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, status: 'rejected' } : request
    ));
    
    toast({
      title: "Leave Rejected",
      description: "Leave request has been rejected."
    });
  };

  const requestLeave = () => {
    toast({
      title: "Leave Request",
      description: "Leave request form opened. This would typically open a detailed form."
    });
  };

  const viewLeaveBalances = () => {
    toast({
      title: "Leave Balances",
      description: "Opening leave balance overview..."
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Button onClick={requestLeave} className="bg-blue-900 hover:bg-blue-800 h-20">
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
        <Button onClick={viewLeaveBalances} variant="outline" className="h-20">
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
            {leaveRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{request.name}</h4>
                  <p className="text-sm text-gray-600">{request.type}</p>
                  <p className="text-xs text-gray-500">{request.dates}</p>
                </div>
                <div className="flex items-center gap-2">
                  {request.status === 'pending' ? (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => approveLeaveRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => rejectLeaveRequest(request.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <>
                      {request.status === 'approved' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
