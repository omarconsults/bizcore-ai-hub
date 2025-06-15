
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User } from './types';

interface UserStatsCardsProps {
  users: User[];
  totalUsers: number;
}

const UserStatsCards = ({ users, totalUsers }: UserStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-blue-600">
            {users.filter(u => u.source === 'business_profile').length}
          </div>
          <div className="text-sm text-gray-600">Business Profiles</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.source === 'tokens').length}
          </div>
          <div className="text-sm text-gray-600">Token Users</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-purple-600">
            {users.filter(u => u.source === 'onboarding').length}
          </div>
          <div className="text-sm text-gray-600">Onboarding Users</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-orange-600">{totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatsCards;
