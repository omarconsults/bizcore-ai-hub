
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Coins, Plus, RefreshCw } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';

const TokenBalance = () => {
  const { tokenBalance, loading, refreshBalance } = useTokens();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const usagePercentage = tokenBalance.totalTokens > 0 
    ? (tokenBalance.usedTokens / tokenBalance.totalTokens) * 100 
    : 0;

  const getUsageColor = () => {
    if (usagePercentage >= 90) return 'text-red-600';
    if (usagePercentage >= 70) return 'text-yellow-600';
    return 'text-emerald-600';
  };

  const getProgressColor = () => {
    if (usagePercentage >= 90) return 'bg-red-500';
    if (usagePercentage >= 70) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Coins className="text-emerald-600" size={20} />
          AI Tokens
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshBalance}
            className="ml-auto"
          >
            <RefreshCw size={14} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {tokenBalance.availableTokens.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              of {tokenBalance.totalTokens.toLocaleString()} available
            </div>
          </div>
          <Badge variant="outline" className={getUsageColor()}>
            {Math.round(usagePercentage)}% used
          </Badge>
        </div>

        <Progress 
          value={usagePercentage} 
          className="w-full h-2"
        />

        <div className="flex gap-2">
          <Button size="sm" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700">
            <Plus size={14} />
            Buy Tokens
          </Button>
          {tokenBalance.availableTokens < 10 && (
            <Badge variant="destructive" className="text-xs">
              Low balance
            </Badge>
          )}
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <div>• AI Copilot: 1 token per message</div>
          <div>• Document generation: 10-25 tokens</div>
          <div>• Business plan: 50 tokens</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenBalance;
