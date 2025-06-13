import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Wallet, CheckCircle, Zap, DollarSign, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface CoinbaseWalletFlowProps {
  onBack: () => void;
  onComplete: (txData: any) => void;
}

export const CoinbaseWalletFlow: React.FC<CoinbaseWalletFlowProps> = ({ onBack, onComplete }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [pointsAmount, setPointsAmount] = useState(3000);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transferMethod, setTransferMethod] = useState<'ethereum' | 'assets' | null>(null);
  
  const usdcAmount = pointsAmount * 0.001;
  const sywFee = (usdcAmount * 0.005) + 2.50;
  
  // Network fees only apply for direct-to-Ethereum
  const networkFee = transferMethod === 'ethereum' ? 3.50 : 0;
  const totalFees = sywFee + networkFee;
  const netUSDC = usdcAmount - totalFees;

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const handleSignInWallet = () => {
    // Show confirmation toast
    const transferMethodText = transferMethod === 'assets' ? 'Direct to Assets' : 'Direct to Ethereum';
    toast("Wallet Transaction Confirmed! 🎉", {
      description: `Converting ${pointsAmount} points to $${netUSDC.toFixed(2)} USDC via ${transferMethodText}. Processing transaction...`,
      duration: 4000,
    });

    const txData = {
      type: 'wallet',
      transferMethod,
      points: pointsAmount,
      usdcAmount,
      sywFee,
      networkFee,
      totalFees,
      netUSDC,
      txHash: '0x456...def'
    };
    
    // Add a small delay to let the user see the toast before completing
    setTimeout(() => {
      onComplete(txData);
    }, 1500);
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
              {isConnecting ? 'Connecting...' : 'Connect Coinbase'}
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

        {/* Step 2: Choose Transfer Method */}
        {isConnected && !transferMethod && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">→ Step 2: Choose transfer method</span>
            </div>
            
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:border-blue-500 hover:bg-blue-50"
                onClick={() => setTransferMethod('assets')}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Direct to Assets (Recommended)</div>
                    <div className="text-sm text-gray-600">No network fees • Instant • Stay in Coinbase</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">No extra fees</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:border-orange-500 hover:bg-orange-50"
                onClick={() => setTransferMethod('ethereum')}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Direct to Ethereum Wallet</div>
                    <div className="text-sm text-gray-600">Network fees apply • Self-custody • External wallet</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-orange-600">~$3.50 network fee</div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <strong>Recommendation:</strong> Choose "Direct to Assets" to avoid network fees. Your USDC will be available instantly in your Coinbase account.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Enter points & preview */}
        {isConnected && transferMethod && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">→ Step 3: Enter points & preview</span>
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
                  <span>• Platform Exchange Fee:</span>
                  <span>${sywFee.toFixed(2)}</span>
                </div>
                {transferMethod === 'ethereum' && (
                  <div className="flex justify-between">
                    <span>• Network Fee (Ethereum):</span>
                    <span>${networkFee.toFixed(2)}</span>
                  </div>
                )}
                {transferMethod === 'assets' && (
                  <div className="flex justify-between text-green-600">
                    <span>• Network Fee:</span>
                    <span>$0.00 (Direct to Assets)</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>• Net USDC:</span>
                  <span className="text-green-600">${netUSDC.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setTransferMethod(null)}>
                Back
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
