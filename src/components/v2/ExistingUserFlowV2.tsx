
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Wallet, CheckCircle, ExternalLink, Building2, AlertTriangle, Shield, Zap, DollarSign, Coins, Info, Star } from 'lucide-react';
import { CoinbaseWalletFlow } from './CoinbaseWalletFlow';
import { CoinbaseAccountFlow } from './CoinbaseAccountFlow';

interface ExistingUserFlowV2Props {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onBack: () => void;
}

export const ExistingUserFlowV2: React.FC<ExistingUserFlowV2Props> = ({ currentStep, setCurrentStep, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState<'cash' | 'usdc' | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<'account' | 'wallet' | null>(null);
  const [showWalletFlow, setShowWalletFlow] = useState(false);
  const [showAccountFlow, setShowAccountFlow] = useState(false);
  const pointsToRedeem = 3000;
  const usdcAmount = pointsToRedeem * 0.001;

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
          <div className="space-y-8">
            {/* Trust Building Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Secure Point Conversion</h3>
                  <p className="text-gray-600">Trusted by 100,000+ Shop Your Way members</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant Processing</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Bank-Level Security</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Simple Two-Step Process */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold mb-2">Quick Setup - Just 2 Steps!</h4>
                  <p className="text-gray-600">Choose what you want and where you want it</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                    <div className="font-medium">What do you want?</div>
                    <div className="text-sm text-gray-600">Cash or Cryptocurrency</div>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                    <div className="font-medium">Where should it go?</div>
                    <div className="text-sm text-gray-600">Your Coinbase destination</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 1: What do you want? */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <h4 className="text-lg font-semibold">What would you like to receive?</h4>
              </div>
              
              <Tabs value={selectedMethod || ''} onValueChange={(value) => setSelectedMethod(value as 'cash' | 'usdc')}>
                <TabsList className="grid w-full grid-cols-2 h-auto p-1">
                  <TabsTrigger value="cash" className="h-16 flex-col space-y-1">
                    <DollarSign className="w-5 h-5" />
                    <span>Cash</span>
                  </TabsTrigger>
                  <TabsTrigger value="usdc" className="h-16 flex-col space-y-1">
                    <Coins className="w-5 h-5" />
                    <span>USDC Crypto</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="cash" className="mt-4">
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold mb-1">Cash Deposit</h5>
                          <p className="text-sm text-gray-700 mb-3">
                            Convert your points to traditional cash. Perfect if you're not into cryptocurrency yet.
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1 text-green-700">
                              <CheckCircle className="w-3 h-3" />
                              <span>Familiar cash balance</span>
                            </div>
                            <div className="flex items-center space-x-1 text-green-700">
                              <CheckCircle className="w-3 h-3" />
                              <span>No crypto knowledge needed</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="usdc" className="mt-4">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Coins className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-semibold">USDC Cryptocurrency</h5>
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>Popular</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">
                            Get USDC (a stable cryptocurrency that equals $1). Great for trading or future crypto investments.
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1 text-blue-700">
                              <CheckCircle className="w-3 h-3" />
                              <span>Always worth $1</span>
                            </div>
                            <div className="flex items-center space-x-1 text-blue-700">
                              <CheckCircle className="w-3 h-3" />
                              <span>Perfect for crypto beginners</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Step 2: Where should it go? */}
            {selectedMethod && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <h4 className="text-lg font-semibold">Where should we send it?</h4>
                </div>
                
                <div className="grid gap-4">
                  <Card 
                    className={`cursor-pointer transition-all ${selectedDestination === 'account' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setSelectedDestination('account')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold">Your Coinbase Account</h5>
                              <p className="text-sm text-gray-600">
                                {selectedMethod === 'cash' ? 'Appears in your account balance' : 'Stored safely in your Coinbase portfolio'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {selectedDestination === 'account' && <CheckCircle className="w-5 h-5 text-blue-500" />}
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Recommended</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedMethod === 'usdc' && (
                    <Card 
                      className={`cursor-pointer transition-all ${selectedDestination === 'wallet' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setSelectedDestination('wallet')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h5 className="font-semibold">Your Coinbase Wallet</h5>
                                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Advanced</span>
                                </div>
                                <p className="text-sm text-gray-600">For DeFi, Web3, and external app connections</p>
                              </div>
                              {selectedDestination === 'wallet' && <CheckCircle className="w-5 h-5 text-purple-500" />}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Help text based on selection */}
                {selectedDestination && (
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-2">
                        <Info className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-700">
                          {selectedDestination === 'account' && selectedMethod === 'cash' && (
                            <div>
                              <strong>Cash in Coinbase Account:</strong> Your cash will appear in your Coinbase account balance, just like a bank deposit. You can use it to buy crypto, transfer to your bank, or keep as cash.
                            </div>
                          )}
                          {selectedDestination === 'account' && selectedMethod === 'usdc' && (
                            <div>
                              <strong>USDC in Coinbase Account:</strong> Your USDC will appear in your crypto portfolio. You can trade it, convert it to cash, or send it to others. No network fees!
                            </div>
                          )}
                          {selectedDestination === 'wallet' && (
                            <div>
                              <strong>USDC in Coinbase Wallet:</strong> Your USDC goes to your personal wallet for DeFi and Web3 apps. You have full control, but optional network fees may apply (~$3.50) for Ethereum transfers.
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Summary and Continue */}
            {selectedMethod && selectedDestination && (
              <Card className="border-green-500 bg-green-50">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h4 className="text-lg font-semibold text-green-800">Ready to Process!</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Converting:</span>
                        <span className="font-medium">{pointsToRedeem} SYW Points</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">You'll receive:</span>
                        <span className="font-medium">
                          {selectedMethod === 'cash' ? `$${usdcAmount.toFixed(2)} Cash` : `${usdcAmount.toFixed(2)} USDC`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Destination:</span>
                        <span className="font-medium">
                          Coinbase {selectedDestination === 'account' ? 'Account' : 'Wallet'}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      Continue to Secure Processing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>Back</Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Processing Your Conversion</h3>
              <p className="text-gray-600">We'll handle the secure transfer to your Coinbase destination</p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
              <Button 
                onClick={() => {
                  if (selectedDestination === 'wallet') {
                    setShowWalletFlow(true);
                  } else {
                    setShowAccountFlow(true);
                  }
                }} 
                className="bg-green-600 hover:bg-green-700"
              >
                Start Secure Transfer
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
              <h3 className="text-xl font-semibold mb-2">Transfer Complete!</h3>
              <p className="text-gray-600">
                Your {selectedMethod === 'cash' ? 'cash' : 'USDC'} has been securely delivered to your Coinbase {selectedDestination}
              </p>
            </div>

            <Button onClick={() => setCurrentStep(0)} variant="outline" className="w-full">
              Start New Conversion
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return renderStep();
};
