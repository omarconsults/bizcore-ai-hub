
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import CreateUserModal from './CreateUserModal';
import { useUserManagement } from './user-management/useUserManagement';
import UserStatsCards from './user-management/UserStatsCards';
import SearchAndFilters from './user-management/SearchAndFilters';
import UsersTable from './user-management/UsersTable';
import ErrorDisplay from './user-management/ErrorDisplay';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { users, loading, totalUsers, error, fetchUsers } = useUserManagement();

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
          <CreateUserModal onUserCreated={fetchUsers} />
          <Button variant="outline">
            Export Users
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <UserStatsCards users={users} totalUsers={totalUsers} />

      {/* Error Display */}
      {error && <ErrorDisplay error={error} />}

      {/* Search and Filters */}
      <SearchAndFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Users Table */}
      <UsersTable users={filteredUsers} error={error} />
    </div>
  );
};

export default UserManagement;
