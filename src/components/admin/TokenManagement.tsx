
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Coins, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Search,
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TokenManagement = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tokenStats, setTokenStats] = useState({
    totalUsers: 0,
    totalTokensIssued: 0,
    totalTokensConsumed: 0,
    averageUsage: 0
  });
  const [userTokens, setUserTokens] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const fetchTokenStats = async () => {
    try {
      // Get total users with tokens
      const { data: usersData, error: usersError } = await supabase
        .from('user_tokens')
        .select('*');

      if (usersError) throw usersError;

      // Get recent transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('token_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (transactionsError) throw transactionsError;

      // Calculate stats
      const totalUsers = usersData.length;
      const totalTokensIssued = usersData.reduce((sum, user) => sum + user.total_tokens, 0);
      const totalTokensConsumed = usersData.reduce((sum, user) => sum + user.used_tokens, 0);
      const averageUsage = totalUsers > 0 ? totalTokensConsumed / totalUsers : 0;

      setTokenStats({
        totalUsers,
        totalTokensIssued,
        totalTokensConsumed,
        averageUsage: Math.round(averageUsage)
      });

      setUserTokens(usersData);
      setRecentTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching token stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch token statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const adjustUserTokens = async (userEmail: string, adjustment: number, reason: string) => {
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from('user_tokens')
        .select('total_tokens, user_id')
        .eq('email', userEmail)
        .single();

      if (fetchError) throw fetchError;

      const newTotal = Math.max(0, currentData.total_tokens + adjustment);

      const { error: updateError } = await supabase
        .from('user_tokens')
        .update({ 
          total_tokens: newTotal,
          updated_at: new Date().toISOString()
        })
        .eq('email', userEmail);

      if (updateError) throw updateError;

      // Log the transaction
      const { error: transactionError } = await supabase
        .from('token_transactions')
        .insert({
          user_id: currentData.user_id,
          email: userEmail,
          transaction_type: adjustment > 0 ? 'purchase' : 'refund',
          amount: adjustment,
          feature_used: 'admin_adjustment',
          description: reason
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Success",
        description: `Token balance updated for ${userEmail}`,
      });

      fetchTokenStats();
    } catch (error) {
      console.error('Error adjusting tokens:', error);
      toast({
        title: "Error",
        description: "Failed to adjust token balance",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchTokenStats();
  }, []);

  const filteredUsers = userTokens.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
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
        <Button onClick={fetchTokenStats} variant="outline">
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{tokenStats.totalUsers}</p>
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
                <p className="text-2xl font-bold text-gray-900">{tokenStats.totalTokensIssued.toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-gray-900">{tokenStats.totalTokensConsumed.toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-gray-900">{tokenStats.averageUsage}</p>
              </div>
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Balances</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Token Balances</CardTitle>
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-gray-400" />
                  <Input
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Tokens</TableHead>
                    <TableHead>Used Tokens</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Usage %</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const usagePercent = user.total_tokens > 0 ? (user.used_tokens / user.total_tokens) * 100 : 0;
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.total_tokens.toLocaleString()}</TableCell>
                        <TableCell>{user.used_tokens.toLocaleString()}</TableCell>
                        <TableCell>{user.available_tokens.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={usagePercent > 90 ? 'destructive' : usagePercent > 70 ? 'secondary' : 'default'}>
                            {Math.round(usagePercent)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => adjustUserTokens(user.email, 100, 'Admin bonus - 100 tokens')}
                            >
                              <Plus size={14} className="mr-1" />
                              +100
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => adjustUserTokens(user.email, -50, 'Admin adjustment - 50 tokens removed')}
                            >
                              <Minus size={14} className="mr-1" />
                              -50
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Token Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Feature</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{transaction.email}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.transaction_type === 'consume' ? 'destructive' : 'default'}>
                          {transaction.transaction_type}
                        </Badge>
                      </TableCell>
                      <TableCell className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </TableCell>
                      <TableCell>{transaction.feature_used || '-'}</TableCell>
                      <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenManagement;
