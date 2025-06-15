
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, AlertTriangle, CheckCircle } from 'lucide-react';
import { UserToken } from './types';

interface UserTokensTableProps {
  userTokens: UserToken[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAdjustTokens: (email: string, adjustment: number, reason: string) => void;
}

const UserTokensTable = ({ userTokens, searchTerm, onSearchChange, onAdjustTokens }: UserTokensTableProps) => {
  const filteredUsers = userTokens.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Token Balances</CardTitle>
          <div className="flex items-center gap-2">
            <Search size={16} className="text-gray-400" />
            <Input
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
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
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const totalTokens = user.total_tokens || 0;
              const usedTokens = user.used_tokens || 0;
              const availableTokens = user.available_tokens || 0;
              const usagePercent = totalTokens > 0 ? (usedTokens / totalTokens) * 100 : 0;
              const isLowBalance = availableTokens < 10;
              const isHighUsage = usagePercent > 90;
              
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{totalTokens.toLocaleString()}</TableCell>
                  <TableCell>{usedTokens.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {availableTokens.toLocaleString()}
                      {isLowBalance && <AlertTriangle size={16} className="text-red-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={isHighUsage ? 'destructive' : usagePercent > 70 ? 'secondary' : 'default'}>
                      {Math.round(usagePercent)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {isLowBalance ? (
                        <AlertTriangle size={16} className="text-red-500" />
                      ) : (
                        <CheckCircle size={16} className="text-emerald-500" />
                      )}
                      <span className={isLowBalance ? 'text-red-600' : 'text-emerald-600'}>
                        {isLowBalance ? 'Low' : 'Good'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAdjustTokens(user.email, 100, 'Admin bonus - 100 tokens')}
                        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                      >
                        <Plus size={14} className="mr-1" />
                        +100
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAdjustTokens(user.email, -50, 'Admin adjustment - 50 tokens removed')}
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        <Minus size={14} className="mr-1" />
                        -50
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
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

export default UserTokensTable;
