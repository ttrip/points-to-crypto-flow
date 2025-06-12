
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, CheckCircle, ExternalLink } from 'lucide-react';
import { FeeBreakdown } from './FeeBreakdown';

interface ExistingUserFlowProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onBack: () => void;
}

export const ExistingUserFlow: React.FC<ExistingUserFlowProps> = ({ currentStep, setCurrentStep, onBack }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const pointsToRedeem = 3000;

  const connectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsWalletConnected(true);
      setWalletAddress('0x742d35Cc6634C0532925a3b8D0b4f8b30db50fc0');
      setCurrentStep(2);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Connect Your Coinbase Wallet</h3>
              <p className="text-gray-600">Connect your existing Coinbase wallet to receive USDC directly</p>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="w-8 h-8 text-blue-600" />
                </div>
                
                {!isWalletConnected ? (
                  <div className="space-y-4">
                    <h4 className="font-medium">Choose Connection Method</h4>
                    <div className="space-y-3">
                      <Button 
                        className="w-full" 
                        onClick={connectWallet}
                        disabled={false}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect Coinbase Wallet
                      </Button>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        WalletConnect
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                    <h4 className="font-medium text-green-700">Wallet Connected!</h4>
                    <p className="text-sm text-gray-600 font-mono">{walletAddress}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>Back</Button>
              {isWalletConnected && (
                <Button onClick={() => setCurrentStep(2)}>Continue</Button>
              )}
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
