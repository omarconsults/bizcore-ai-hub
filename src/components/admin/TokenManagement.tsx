
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Clock } from 'lucide-react';
import TokenStatsCards from './token-management/TokenStatsCards';
import UserTokensTable from './token-management/UserTokensTable';
import TransactionsTable from './token-management/TransactionsTable';
import { useTokenManagement } from './token-management/useTokenManagement';

const TokenManagement = () => {
  const {
    loading,
    searchTerm,
    setSearchTerm,
    tokenStats,
    userTokens,
    recentTransactions,
    fetchTokenStats,
    adjustUserTokens,
    resetDailyTokens,
    resetMonthlyTokens
  } = useTokenManagement();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Token Management</h1>
          <p className="text-gray-600">Monitor and manage AI token usage across the platform</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={resetDailyTokens} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            <Clock size={16} className="mr-2" />
            Reset Daily Tokens
          </Button>
          <Button onClick={resetMonthlyTokens} variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
            <RefreshCw size={16} className="mr-2" />
            Reset Monthly Tokens
          </Button>
          <Button onClick={fetchTokenStats} variant="outline">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <TokenStatsCards stats={tokenStats} />

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Balances</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserTokensTable
            userTokens={userTokens}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAdjustTokens={adjustUserTokens}
          />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <TransactionsTable transactions={recentTransactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenManagement;
