
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, MoreHorizontal, RefreshCw, Mail, Calendar, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  business_name?: string;
  email_confirmed_at: string;
  total_tokens?: number;
  used_tokens?: number;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching users data...');
      
      // Try multiple approaches to get user data
      
      // First, try to get users from business_profiles (this should work for registered users)
      const { data: businessProfiles, error: businessError } = await supabase
        .from('business_profiles')
        .select('user_id, business_name, created_at')
        .order('created_at', { ascending: false });

      console.log('Business profiles data:', { businessProfiles, businessError });

      // Then get token data for additional user info
      const { data: tokenData, error: tokenError } = await supabase
        .from('user_tokens')
        .select('user_id, email, created_at, total_tokens, used_tokens')
        .order('created_at', { ascending: false });

      console.log('Token data:', { tokenData, tokenError });

      // Combine the data sources
      const userMap = new Map();

      // Add users from business profiles
      if (businessProfiles && !businessError) {
        businessProfiles.forEach(profile => {
          userMap.set(profile.user_id, {
            id: profile.user_id,
            email: profile.user_id, // We'll try to get actual email from tokens
            created_at: profile.created_at,
            last_sign_in_at: profile.created_at,
            business_name: profile.business_name,
            email_confirmed_at: profile.created_at,
            total_tokens: 0,
            used_tokens: 0
          });
        });
      }

      // Enhance with token data
      if (tokenData && !tokenError) {
        tokenData.forEach(token => {
          const userId = token.user_id || token.email;
          if (userMap.has(userId)) {
            const existing = userMap.get(userId);
            userMap.set(userId, {
              ...existing,
              email: token.email,
              total_tokens: token.total_tokens,
              used_tokens: token.used_tokens
            });
          } else {
            // Add users who exist in tokens but not in business profiles
            userMap.set(userId, {
              id: userId,
              email: token.email,
              created_at: token.created_at,
              last_sign_in_at: token.created_at,
              business_name: token.email.split('@')[0],
              email_confirmed_at: token.created_at,
              total_tokens: token.total_tokens,
              used_tokens: token.used_tokens
            });
          }
        });
      }

      const combinedUsers = Array.from(userMap.values());
      
      console.log('Combined users:', combinedUsers);

      if (combinedUsers.length === 0) {
        if (businessError || tokenError) {
          throw new Error(`Data access error: ${businessError?.message || tokenError?.message}`);
        } else {
          setError('No users found. This might be due to Row Level Security policies.');
        }
      }

      setUsers(combinedUsers);
      setTotalUsers(combinedUsers.length);
      
      if (combinedUsers.length > 0) {
        toast({
          title: "Success",
          description: `Loaded ${combinedUsers.length} users successfully`,
        });
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      const errorMessage = error.message || 'Failed to fetch users';
      setError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.business_name && user.business_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage platform users and their accounts ({totalUsers} total users)</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchUsers} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" />
            Export Users
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 mt-1" size={20} />
              <div>
                <h3 className="font-medium text-red-800">Data Access Issue</h3>
                <p className="text-red-700 mt-1">{error}</p>
                <p className="text-sm text-red-600 mt-2">
                  This might be due to Row Level Security policies. You may need to configure admin access permissions in Supabase.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Total Tokens</TableHead>
                <TableHead>Used Tokens</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>{user.business_name || 'Not specified'}</TableCell>
                  <TableCell>{user.total_tokens?.toLocaleString() || '0'}</TableCell>
                  <TableCell>{user.used_tokens?.toLocaleString() || '0'}</TableCell>
                  <TableCell>
                    <Badge variant={user.email_confirmed_at ? 'default' : 'destructive'}>
                      {user.email_confirmed_at ? 'Active' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && !error && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    {users.length === 0 ? 'No users found in the system.' : 'No users found matching your search criteria.'}
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

export default UserManagement;
