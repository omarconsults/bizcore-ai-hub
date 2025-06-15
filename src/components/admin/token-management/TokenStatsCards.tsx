
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Coins, TrendingUp, DollarSign } from 'lucide-react';
import { TokenStats } from './types';

interface TokenStatsCardsProps {
  stats: TokenStats;
}

const TokenStatsCards = ({ stats }: TokenStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="text-blue-600" size={24} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tokens Issued</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTokensIssued.toLocaleString()}</p>
            </div>
            <Coins className="text-emerald-600" size={24} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tokens Consumed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTokensConsumed.toLocaleString()}</p>
            </div>
            <TrendingUp className="text-orange-600" size={24} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Usage</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageUsage}</p>
            </div>
            <DollarSign className="text-purple-600" size={24} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenStatsCards;
