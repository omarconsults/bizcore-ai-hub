
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Coins, Plus, RefreshCw, ShoppingCart, Gift } from 'lucide-react';
import { useTokens } from '@/hooks/useTokens';
import TokenPurchaseModal from './TokenPurchaseModal';

const TokenBalance = () => {
  const { tokenBalance, loading, refreshBalance } = useTokens();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

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
              of {tokenBalance.totalTokens.toLocaleString()} total
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

        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
          <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium mb-1">
            <Gift size={14} />
            Monthly Free Tokens
          </div>
          <p className="text-emerald-600 text-xs">
            You get 10 free tokens every month! Perfect for trying our AI features.
          </p>
        </div>

        <div className="flex gap-2">
          <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700">
                <ShoppingCart size={14} />
                Buy Tokens
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Purchase AI Tokens</DialogTitle>
              </DialogHeader>
              <TokenPurchaseModal onClose={() => setShowPurchaseModal(false)} />
            </DialogContent>
          </Dialog>
          
          {tokenBalance.availableTokens < 5 && (
            <Badge variant="destructive" className="text-xs">
              Low balance
            </Badge>
          )}
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <div>• AI Copilot: 1 token per message</div>
          <div>• Document generation: 5-25 tokens</div>
          <div>• Business plan: 50 tokens</div>
          <div>• Marketing content: 10-20 tokens</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenBalance;
