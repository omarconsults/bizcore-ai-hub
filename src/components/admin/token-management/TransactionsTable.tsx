
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TokenTransaction } from './types';

interface TransactionsTableProps {
  transactions: TokenTransaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
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
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">{transaction.email}</TableCell>
                <TableCell>
                  <Badge variant={transaction.transaction_type === 'consume' ? 'destructive' : 'default'}>
                    {transaction.transaction_type}
                  </Badge>
                </TableCell>
                <TableCell className={transaction.amount < 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{transaction.feature_used || '-'}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
              </TableRow>
            ))}
            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
