
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Wallet } from 'lucide-react';

interface CashOutLandingProps {
  onFlowSelect: (flow: 'account' | 'wallet') => void;
}

export const CashOutLanding: React.FC<CashOutLandingProps> = ({ onFlowSelect }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">SYW LOGO</div>
          <div className="text-sm text-gray-500">← Profile</div>
        </div>
        <CardTitle className="text-2xl">CARD MEMBER • Cash Out</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center space-y-3 border-2 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            onClick={() => onFlowSelect('account')}
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold">🔘 Coinbase Account</div>
              <div className="text-sm text-gray-500 mt-1">Enter deposit address</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center space-y-3 border-2 hover:border-green-500 hover:bg-green-50 transition-colors"
            onClick={() => onFlowSelect('wallet')}
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold">⚡ Coinbase Wallet</div>
              <div className="text-sm text-gray-500 mt-1">Connect directly</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
