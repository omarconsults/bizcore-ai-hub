
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, MoreHorizontal, Mail, Calendar } from 'lucide-react';
import { User } from './types';

interface UsersTableProps {
  users: User[];
  error: string | null;
}

const UsersTable = ({ users, error }: UsersTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users ({users.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Business Name</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Total Tokens</TableHead>
              <TableHead>Used Tokens</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>{user.business_name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.source}</Badge>
                </TableCell>
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
            {users.length === 0 && !error && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No users found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersTable;
