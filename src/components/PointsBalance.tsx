
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, TrendingUp } from 'lucide-react';

export const PointsBalance = () => {
  const pointsBalance = 3000;
  const exchangeRate = 0.001; // $0.001 per point
  const usdcValue = pointsBalance * exchangeRate;

  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Coins className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-sm font-medium opacity-90">Available SYW Points</h3>
              <p className="text-3xl font-bold">{pointsBalance.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-sm font-medium opacity-90">Estimated USDC Value</h3>
              <p className="text-3xl font-bold">${usdcValue.toFixed(2)}</p>
              <p className="text-sm opacity-75">1000 points = $1.00 USDC</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
