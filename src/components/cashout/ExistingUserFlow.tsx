
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, CheckCircle, ExternalLink, Building2, AlertTriangle, Shield, Zap } from 'lucide-react';
import { FeeBreakdown } from './FeeBreakdown';
import { CoinbaseWalletFlow } from '../v2/CoinbaseWalletFlow';
import { CoinbaseAccountFlow } from '../v2/CoinbaseAccountFlow';

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
  const [showAccountFlow, setShowAccountFlow] = useState(false);
  const pointsToRedeem = 3000;

  const connectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsWalletConnected(true);
      setWalletAddress('0x742d35Cc6634C0532925a3b8D0b4f8b30db50fc0');
      setCurrentStep(2);
    }, 1500);
  };

  const handleFlowComplete = (txData: any) => {
    console.log('Transaction completed:', txData);
    setCurrentStep(3);
  };

  if (showWalletFlow) {
    return (
      <CoinbaseWalletFlow 
        onBack={() => setShowWalletFlow(false)}
        onComplete={handleFlowComplete}
      />
    );
  }

  if (showAccountFlow) {
    return (
      <CoinbaseAccountFlow 
        onBack={() => setShowAccountFlow(false)}
        onComplete={handleFlowComplete}
      />
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Choose Your Coinbase Destination</h3>
              <p className="text-gray-600">Select how you'd like to receive your USDC</p>
            </div>

            {/* Recommended Option - Coinbase Account */}
            <div className="relative">
              <div className="absolute -top-2 left-4 z-10">
                <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  ✨ Recommended
                </span>
              </div>
              <Card className="border-2 border-green-500 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">Coinbase Account</h4>
                      <p className="text-sm text-gray-700 mb-4">
                        Your USDC goes directly to your Coinbase account balance - safe, simple, and ready to use.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700">Coinbase Security</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700">Instant Transfer</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700">No Gas Fees</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700">Easy to Use</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => setShowAccountFlow(true)}
                      >
                        Use Coinbase Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Option - Coinbase Wallet */}
            <Card className="border border-gray-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-lg">Coinbase Wallet</h4>
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                        Advanced
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">
                      For crypto-savvy users who want full control. Connects to DeFi, Web3, and other apps.
                    </p>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-amber-700">
                          <strong>Important:</strong> You'll need to manage your own seed phrase and pay network fees (~$3.50). 
                          Only choose this if you're comfortable with crypto wallets.
                        </div>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowWalletFlow(true)}
                    >
                      Use Coinbase Wallet (Advanced)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
