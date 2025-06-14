
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface ComplianceCalendarProps {
  onSetupReminders: () => void;
}

const ComplianceCalendar: React.FC<ComplianceCalendarProps> = ({ onSetupReminders }) => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Calendar</h3>
        <p className="text-gray-600">Never miss important deadlines and renewal dates</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
        <h4 className="text-lg font-medium text-gray-900 mb-2">Calendar Integration Coming Soon</h4>
        <p className="text-gray-600 mb-4">
          We're building a comprehensive compliance calendar with automated reminders and notifications.
        </p>
        <Button 
          variant="outline"
          onClick={onSetupReminders}
        >
          Set Up Reminders
        </Button>
      </div>
    </div>
  );
};

export default ComplianceCalendar;
