import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, CheckCircle, ExternalLink, Building2 } from 'lucide-react';
import { FeeBreakdown } from './FeeBreakdown';
import { CoinbaseWalletFlow } from '../v2/CoinbaseWalletFlow';

interface ExistingUserFlowProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onBack: () => void;
}

export const ExistingUserFlow: React.FC<ExistingUserFlowProps> = ({ currentStep, setCurrentStep, onBack }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [connectionMethod, setConnectionMethod] = useState<'wallet' | 'account' | null>(null);
  const [showWalletFlow, setShowWalletFlow] = useState(false);
  const pointsToRedeem = 3000;

  const connectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsWalletConnected(true);
      setWalletAddress('0x742d35Cc6634C0532925a3b8D0b4f8b30db50fc0');
      setCurrentStep(2);
    }, 1500);
  };

  const handleWalletFlowComplete = (txData: any) => {
    console.log('Transaction completed:', txData);
    setCurrentStep(3);
  };

  if (showWalletFlow) {
    return (
      <CoinbaseWalletFlow 
        onBack={() => setShowWalletFlow(false)}
        onComplete={handleWalletFlowComplete}
      />
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Choose Your Coinbase Connection</h3>
              <p className="text-gray-600">How would you like to receive your USDC?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-green-500" 
                    onClick={() => setShowWalletFlow(true)}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Wallet className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-2">⚡ Coinbase Wallet</h4>
                  <p className="text-sm text-gray-600 mb-3">Connect directly • Choose transfer method</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Connect Coinbase
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-blue-500" 
                    onClick={() => setConnectionMethod('account')}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Building2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-2">🔘 Coinbase Account</h4>
                  <p className="text-sm text-gray-600 mb-3">Enter deposit address • Direct transfer</p>
                  <Button className="w-full" onClick={connectWallet}>
                    Use Account Address
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>Back</Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Review & Confirm</h3>
              <p className="text-gray-600">Review your transaction details and fees</p>
            </div>

            <FeeBreakdown pointsToRedeem={pointsToRedeem} />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Connected Wallet</span>
                  <span className="font-mono text-sm">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network</span>
                  <span>Ethereum (ERC-20)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Arrival</span>
                  <span>1-2 blocks (~30 seconds)</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
              <Button onClick={() => setCurrentStep(3)} className="bg-green-600 hover:bg-green-700">
                Sign & Send Transaction
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Transaction Complete!</h3>
              <p className="text-gray-600">Your USDC has been sent to your connected wallet</p>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Transaction Hash:</span>
                    <span className="font-mono text-sm">0xdef456...abc123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600 font-medium">Confirmed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Block:</span>
                    <span>18,456,789</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={() => window.open('https://wallet.coinbase.com', '_blank')} className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View in Coinbase Wallet
              </Button>
              <Button onClick={() => setCurrentStep(0)} variant="outline" className="w-full">
                Start New Transaction
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderStep();
};
