import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Copy, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { FeeBreakdown } from './FeeBreakdown';

interface NewUserFlowProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onBack: () => void;
}

export const NewUserFlow: React.FC<NewUserFlowProps> = ({ currentStep, setCurrentStep, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    coinbaseAddress: '',
    pointsToRedeem: 3000
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Create Your Coinbase Account</h3>
              <p className="text-gray-600">First, you'll need to set up a Coinbase account to receive your USDC</p>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Secure & Regulated</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Coinbase is a regulated cryptocurrency exchange with industry-leading security practices
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                  <h4 className="font-medium">Sign Up</h4>
                  <p className="text-sm text-gray-600">Create account with email</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                  <h4 className="font-medium">Verify Identity</h4>
                  <p className="text-sm text-gray-600">Complete KYC process</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                  <h4 className="font-medium">Get USDC Address</h4>
                  <p className="text-sm text-gray-600">Copy your deposit address</p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button className="flex items-center space-x-2" onClick={() => window.open('https://www.coinbase.com/signup', '_blank')}>
                  <span>Create Coinbase Account</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>Back</Button>
              <Button onClick={() => setCurrentStep(2)}>I've Created My Account</Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Get Your USDC Deposit Address</h3>
              <p className="text-gray-600">Copy your USDC deposit address from your Coinbase account</p>
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Important Instructions</h4>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>• Log into your Coinbase account</li>
                      <li>• Go to Assets → Cash (USDC) → Receive</li>
                      <li>• Select Ethereum (ERC-20) network</li>
                      <li>• Copy the deposit address</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Label htmlFor="coinbase-address">USDC Deposit Address (ERC-20)</Label>
              <div className="flex space-x-2">
                <Input
                  id="coinbase-address"
                  placeholder="0x1234567890abcdef1234567890abcdef12345678"
                  value={formData.coinbaseAddress}
                  onChange={(e) => setFormData({ ...formData, coinbaseAddress: e.target.value })}
                  className="font-mono text-sm"
                />
                <Button variant="outline" size="icon">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                This should be a 42-character address starting with "0x"
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
              <Button 
                onClick={() => setCurrentStep(3)}
                disabled={!formData.coinbaseAddress || formData.coinbaseAddress.length < 42}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Review & Confirm</h3>
              <p className="text-gray-600">Review your transaction details and fees</p>
            </div>

            <FeeBreakdown pointsToRedeem={formData.pointsToRedeem} />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination</span>
                  <span className="font-mono text-sm">{formData.coinbaseAddress.slice(0, 6)}...{formData.coinbaseAddress.slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network</span>
                  <span>Ethereum (ERC-20)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Arrival</span>
                  <span>2-5 minutes</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>Back</Button>
              <Button onClick={() => setCurrentStep(4)} className="bg-green-600 hover:bg-green-700">
                Confirm Transaction
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Transaction Submitted!</h3>
              <p className="text-gray-600">Your USDC is on its way to your Coinbase account</p>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Transaction Hash:</span>
                    <span className="font-mono text-sm">0xabc123...def789</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600 font-medium">Confirming</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={() => setCurrentStep(0)} variant="outline">
              Start New Transaction
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return renderStep();
};
