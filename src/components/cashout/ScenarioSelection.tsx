
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Wallet, CheckCircle, AlertCircle } from 'lucide-react';

interface ScenarioSelectionProps {
  onScenarioSelect: (scenario: 'new' | 'existing') => void;
}

export const ScenarioSelection: React.FC<ScenarioSelectionProps> = ({ onScenarioSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Choose Your Coinbase Status</h2>
        <p className="text-gray-600">Select the option that best describes your current situation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-blue-500" 
              onClick={() => onScenarioSelect('new')}>
          <CardHeader className="text-center pb-3">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-xl">New to Coinbase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <span className="text-sm">No Coinbase account</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <span className="text-sm">No Coinbase wallet</span>
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700">
                We'll guide you through creating a Coinbase account and receiving your USDC
              </p>
            </div>
            <Button className="w-full mt-4" onClick={() => onScenarioSelect('new')}>
              Get Started
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-green-500" 
              onClick={() => onScenarioSelect('existing')}>
          <CardHeader className="text-center pb-3">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Wallet className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-xl">Existing Coinbase User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Have Coinbase account</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Have Coinbase wallet</span>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                Connect your existing wallet and receive USDC directly
              </p>
            </div>
            <Button className="w-full mt-4" onClick={() => onScenarioSelect('existing')}>
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
