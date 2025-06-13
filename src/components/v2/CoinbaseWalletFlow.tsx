
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Wallet, CheckCircle } from 'lucide-react';

interface CoinbaseWalletFlowProps {
  onBack: () => void;
  onComplete: (txData: any) => void;
}

export const CoinbaseWalletFlow: React.FC<CoinbaseWalletFlowProps> = ({ onBack, onComplete }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [pointsAmount, setPointsAmount] = useState(3000);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const usdcAmount = pointsAmount * 0.001;
  const sywFee = (usdcAmount * 0.005) + 2.50;

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const handleSignInWallet = () => {
    const txData = {
      type: 'wallet',
      points: pointsAmount,
      usdcAmount,
      sywFee,
      txHash: '0x456...def'
    };
    onComplete(txData);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle>Coinbase Wallet Flow</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Connect Wallet */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">→ Step 1: Connect Wallet</span>
            {isConnected && <CheckCircle className="w-4 h-4 text-green-500" />}
          </div>
          
          {!isConnected ? (
            <Button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full"
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Coinbase Account'}
            </Button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-medium">Wallet Connected</span>
              </div>
              <div className="text-sm text-green-600 font-mono mt-1">
                0x742d35Cc6634C0532925a3b8D0b4f8b30db50fc0
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Enter points & preview */}
        {isConnected && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">→ Step 2: Enter points & preview</span>
            </div>
            
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-sm">• Points:</span>
                <Input
                  type="number"
                  value={pointsAmount}
                  onChange={(e) => setPointsAmount(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-gray-400">→</span>
                <span className="text-sm">USDC: {usdcAmount.toFixed(2)}</span>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>• SYW Fee:</span>
                  <span>${sywFee.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button 
                onClick={handleSignInWallet}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign in Wallet
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
