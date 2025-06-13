
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, CheckCircle, ExternalLink, Building2, AlertTriangle, Shield, Zap, DollarSign, Coins } from 'lucide-react';
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
  const [connectionMethod, setConnectionMethod] = useState<'wallet' | 'account' | 'direct_usdc' | null>(null);
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

  const handleMethodSelection = (method: 'wallet' | 'account' | 'direct_usdc') => {
    setConnectionMethod(method);
    setCurrentStep(2);
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
              <h3 className="text-xl font-semibold mb-2">Choose Your Coinbase Cash-Out Method</h3>
              <p className="text-gray-600">Select how you'd like to convert and receive your SYW points</p>
            </div>

            {/* Cash Deposit Option */}
            <div className="relative">
              <div className="absolute -top-2 left-4 z-10">
                <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  💰 Traditional
                </span>
              </div>
              <Card className="border-2 border-blue-500 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">Cash Deposit → Coinbase Account</h4>
                      <p className="text-sm text-gray-700 mb-4">
                        Convert points to cash, then deposit directly to your Coinbase account balance. Traditional and familiar.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-blue-700">Bank-like Experience</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-blue-700">Manual Control</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-blue-700">No Network Fees</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-blue-700">Cash Balance</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleMethodSelection('account')}
                      >
                        Use Cash Deposit Method
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Direct USDC - Coinbase Account */}
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
                      <h4 className="font-semibold text-lg mb-2">Direct USDC Purchase → Coinbase Account</h4>
                      <p className="text-sm text-gray-700 mb-4">
                        Instantly convert points to USDC cryptocurrency in your Coinbase account. Automated and modern.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700">Instant USDC</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700">Fully Automated</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700">No Gas Fees</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Coins className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-green-700">USDC Crypto</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleMethodSelection('direct_usdc')}
                      >
                        Use Direct USDC Purchase
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
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-lg">Direct USDC Purchase → Coinbase Wallet</h4>
                      <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
                        Advanced
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">
                      Convert points directly to USDC in your Coinbase Wallet. Full crypto control with DeFi access.
                    </p>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-amber-700">
                          <strong>Advanced Users:</strong> Requires wallet management skills. Optional network fees (~$3.50) apply for Ethereum transfers. Choose this for DeFi integration.
                        </div>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleMethodSelection('wallet')}
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
              <p className="text-gray-600">Review your transaction details and processing method</p>
            </div>

            <FeeBreakdown pointsToRedeem={pointsToRedeem} />

            {/* Instructions based on selected method */}
            {connectionMethod === 'account' && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span>Cash Deposit Process</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-blue-800">
                    <h4 className="font-medium mb-2">What happens next:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Enter your Coinbase USDC deposit address manually</li>
                      <li>Your points are converted to cash value</li>
                      <li>Cash deposit is sent to your Coinbase account</li>
                      <li>Appears as account balance (not crypto holdings)</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}

            {connectionMethod === 'direct_usdc' && (
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-green-600" />
                    <span>Direct USDC Purchase Process</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-green-800">
                    <h4 className="font-medium mb-2">What happens next:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Automatic connection to your Coinbase account</li>
                      <li>Points instantly converted to USDC cryptocurrency</li>
                      <li>USDC appears in your crypto portfolio</li>
                      <li>Ready for trading, converting, or holding</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}

            {connectionMethod === 'wallet' && (
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-purple-600" />
                    <span>Coinbase Wallet USDC Purchase</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-purple-800">
                    <h4 className="font-medium mb-2">What happens next:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Connect your Coinbase Wallet browser extension</li>
                      <li>Choose: Keep in Coinbase (free) or transfer to Ethereum (~$3.50)</li>
                      <li>Points converted directly to USDC cryptocurrency</li>
                      <li>Full control for DeFi, Web3, and external apps</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-medium">
                    {connectionMethod === 'account' && 'Cash Deposit'}
                    {connectionMethod === 'direct_usdc' && 'Direct USDC Purchase'}
                    {connectionMethod === 'wallet' && 'Wallet USDC Purchase'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination</span>
                  <span>
                    {connectionMethod === 'account' && 'Coinbase Account (Cash Balance)'}
                    {connectionMethod === 'direct_usdc' && 'Coinbase Account (USDC)'}
                    {connectionMethod === 'wallet' && 'Coinbase Wallet (USDC)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing</span>
                  <span>
                    {connectionMethod === 'account' && 'Manual address → Direct deposit'}
                    {connectionMethod === 'direct_usdc' && 'Automated → Instant USDC'}
                    {connectionMethod === 'wallet' && 'Wallet connection → USDC transfer'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
              <Button 
                onClick={() => {
                  if (connectionMethod === 'account') {
                    setShowAccountFlow(true);
                  } else if (connectionMethod === 'direct_usdc') {
                    // For direct USDC to account, we could create a separate flow or reuse the account flow
                    setShowAccountFlow(true);
                  } else {
                    setShowWalletFlow(true);
                  }
                }} 
                className="bg-green-600 hover:bg-green-700"
              >
                Continue to {connectionMethod === 'account' ? 'Cash Deposit' : connectionMethod === 'direct_usdc' ? 'USDC Purchase' : 'Wallet Connection'}
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
              <p className="text-gray-600">
                Your {connectionMethod === 'account' ? 'cash deposit has been sent' : 'USDC has been delivered'} to your {connectionMethod === 'wallet' ? 'connected wallet' : 'Coinbase account'}
              </p>
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
                    <span>Type:</span>
                    <span>
                      {connectionMethod === 'account' && 'Cash Deposit'}
                      {connectionMethod === 'direct_usdc' && 'USDC Purchase'}
                      {connectionMethod === 'wallet' && 'Wallet USDC'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                onClick={() => window.open(
                  connectionMethod === 'wallet' ? 'https://wallet.coinbase.com' : 'https://www.coinbase.com', 
                  '_blank'
                )} 
                className="w-full"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View in {connectionMethod === 'wallet' ? 'Coinbase Wallet' : 'Coinbase'}
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
