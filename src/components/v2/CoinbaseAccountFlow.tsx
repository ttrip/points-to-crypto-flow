
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ExternalLink, Copy } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface CoinbaseAccountFlowProps {
  onBack: () => void;
  onComplete: (txData: any) => void;
}

export const CoinbaseAccountFlow: React.FC<CoinbaseAccountFlowProps> = ({ onBack, onComplete }) => {
  const [depositAddress, setDepositAddress] = useState('');
  const [pointsAmount, setPointsAmount] = useState(3000);
  
  const usdcAmount = pointsAmount * 0.001;
  const sywFee = (usdcAmount * 0.005) + 2.50;
  const netUSDC = usdcAmount - sywFee;

  const handleConfirm = () => {
    // Show confirmation toast
    toast("Transaction Confirmed! 🎉", {
      description: `Converting ${pointsAmount} points to $${netUSDC.toFixed(2)} USDC. Your transaction is being processed.`,
      duration: 4000,
    });

    const txData = {
      type: 'account',
      address: depositAddress,
      points: pointsAmount,
      usdcAmount,
      netUSDC,
      txHash: '0x123...abc'
    };
    
    // Add a small delay to let the user see the toast before completing
    setTimeout(() => {
      onComplete(txData);
    }, 1500);
  };

  const isFormValid = depositAddress.length >= 40 && pointsAmount > 0;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle>Coinbase Account Flow</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Paste USDC deposit address */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">→ Step 1: Paste your USDC deposit address</span>
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="0x1234567890abcdef1234567890abcdef12345678"
              value={depositAddress}
              onChange={(e) => setDepositAddress(e.target.value)}
              className="font-mono text-sm flex-1"
            />
            <Button 
              variant="outline" 
              onClick={() => window.open('https://www.coinbase.com', '_blank')}
              className="whitespace-nowrap"
            >
              Copy from Coinbase →
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Step 2: Enter points */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">→ Step 2: Enter points to redeem</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={pointsAmount}
                onChange={(e) => setPointsAmount(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-gray-600">pts</span>
            </div>
            <span className="text-gray-400">→</span>
            <div className="font-medium">${usdcAmount.toFixed(2)} USDC</div>
          </div>
        </div>

        {/* Fees breakdown */}
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium">→ Fees:</div>
          <div className="space-y-1 ml-4 text-sm">
            <div className="flex justify-between">
              <span>• SYW Fee (0.5% + $2.50):</span>
              <span>${sywFee.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Net USDC:</span>
              <span className="text-green-600">${netUSDC.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!isFormValid}
            className="bg-green-600 hover:bg-green-700"
          >
            Confirm & Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
