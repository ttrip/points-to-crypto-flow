
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FeeBreakdownProps {
  pointsToRedeem: number;
}

export const FeeBreakdown: React.FC<FeeBreakdownProps> = ({ pointsToRedeem }) => {
  const grossUSDC = pointsToRedeem / 100; // 100 points = $1 USDC
  const flatFee = 2.50;
  const variableFeeRate = 0.005; // 0.5%
  const variableFee = grossUSDC * variableFeeRate;
  const totalSYWFee = Math.min(flatFee + variableFee, 25); // Cap at $25
  const estimatedGasFee = 15.00; // Current Ethereum gas estimate
  const netUSDC = grossUSDC - totalSYWFee - estimatedGasFee;

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Amount & Fee Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="points-amount">SYW Points to Redeem</Label>
            <Input
              id="points-amount"
              type="number"
              value={pointsToRedeem}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="border rounded-lg p-4 space-y-3">
            <h4 className="font-medium mb-3">Fee Calculation</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Gross USDC Value</span>
                <span className="font-medium">${grossUSDC.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <span>SYW Cash-Out Fee</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>$2.50 flat + 0.5% variable (max $25)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-red-600">-${totalSYWFee.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <span>Network Gas Fee</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current Ethereum network fee (estimated)</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-red-600">-${estimatedGasFee.toFixed(2)}</span>
              </div>
              
              <hr className="my-2" />
              
              <div className="flex justify-between font-medium text-lg">
                <span>Net USDC Received</span>
                <span className="text-green-600">${netUSDC.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h5 className="font-medium text-blue-900 mb-2">Fee Structure Details</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Flat fee: $2.50 per transaction</li>
              <li>• Variable fee: 0.5% of USDC amount</li>
              <li>• Maximum total fee: $25 per transaction</li>
              <li>• Gas fees are pass-through (current network rates)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
