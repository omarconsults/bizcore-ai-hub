
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, AlertCircle, CheckCircle, RefreshCw, Users, DollarSign, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Subscription {
  user_id: string;
  email: string;
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
  created_at: string;
  total_tokens?: number;
  used_tokens?: number;
}

const SubscriptionManagement = () => {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    activeSubscribers: 0,
    basicCount: 0,
    professionalCount: 0,
    enterpriseCount: 0
  });

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      
      // Fetch user data from user_tokens table
      const { data, error } = await supabase
        .from('user_tokens')
        .select('user_id, email, created_at, total_tokens, used_tokens')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching subscriptions:', error);
        throw error;
      }

      if (!data) {
        setSubscriptions([]);
        return;
      }

      // Determine subscription tier based on token allocation
      const mockSubscriptions = data.map((user, index) => {
        const totalTokens = user.total_tokens || 0;
        let subscriptionTier = null;
        let subscribed = false;

        if (totalTokens >= 5000) {
          subscriptionTier = 'Enterprise';
          subscribed = true;
        } else if (totalTokens >= 1000) {
          subscriptionTier = 'Professional';
          subscribed = true;
        } else if (totalTokens >= 200) {
          subscriptionTier = 'Basic';
          subscribed = true;
        }

        return {
          user_id: user.user_id || user.email || 'unknown',
          email: user.email,
          subscribed,
          subscription_tier: subscriptionTier,
          subscription_end: subscribed ? 
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
          created_at: user.created_at,
          total_tokens: user.total_tokens,
          used_tokens: user.used_tokens
        };
      });

      setSubscriptions(mockSubscriptions);

      // Calculate stats
      const totalSubscribers = mockSubscriptions.length;
      const activeSubscribers = mockSubscriptions.filter(s => s.subscribed).length;
      const basicCount = mockSubscriptions.filter(s => s.subscription_tier === 'Basic').length;
      const professionalCount = mockSubscriptions.filter(s => s.subscription_tier === 'Professional').length;
      const enterpriseCount = mockSubscriptions.filter(s => s.subscription_tier === 'Enterprise').length;

      setStats({
        totalSubscribers,
        activeSubscribers,
        basicCount,
        professionalCount,
        enterpriseCount
      });

      toast({
        title: "Success",
        description: "Subscription data loaded successfully",
      });

    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subscription data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  const planStats = [
    { plan: "Basic", count: stats.basicCount, revenue: "₦" + (stats.basicCount * 15000).toLocaleString() },
    { plan: "Professional", count: stats.professionalCount, revenue: "₦" + (stats.professionalCount * 35000).toLocaleString() },
    { plan: "Enterprise", count: stats.enterpriseCount, revenue: "₦" + (stats.enterpriseCount * 75000).toLocaleString() }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="text-gray-600">Monitor and manage user subscriptions</p>
        </div>
        <Button onClick={fetchSubscriptions} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSubscribers}</p>
              </div>
              <Users className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSubscribers}</p>
              </div>
              <CheckCircle className="text-emerald-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalSubscribers > 0 ? Math.round((stats.activeSubscribers / stats.totalSubscribers) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Est. Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦{((stats.basicCount * 15000) + (stats.professionalCount * 35000) + (stats.enterpriseCount * 75000)).toLocaleString()}
                </p>
              </div>
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{stat.plan} Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                <p className="text-sm text-gray-600">Active subscribers</p>
                <div className="text-lg font-semibold text-emerald-600">{stat.revenue}</div>
                <p className="text-sm text-gray-600">Monthly revenue</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions ({subscriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Tokens</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription End</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.slice(0, 20).map((subscription) => (
                <TableRow key={subscription.user_id}>
                  <TableCell className="font-medium">{subscription.email}</TableCell>
                  <TableCell>
                    {subscription.subscription_tier ? (
                      <Badge variant="outline">{subscription.subscription_tier}</Badge>
                    ) : (
                      <Badge variant="secondary">Free</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{subscription.total_tokens?.toLocaleString() || '0'} total</div>
                      <div className="text-gray-500">{subscription.used_tokens?.toLocaleString() || '0'} used</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {subscription.subscribed ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Badge variant={subscription.subscribed ? 'default' : 'destructive'}>
                        {subscription.subscribed ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {subscription.subscription_end 
                      ? new Date(subscription.subscription_end).toLocaleDateString()
                      : '-'
                    }
                  </TableCell>
                  <TableCell>{new Date(subscription.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {subscriptions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No subscriptions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;
