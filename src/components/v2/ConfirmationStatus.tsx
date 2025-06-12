
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface ConfirmationStatusProps {
  transactionData: any;
  onDone: () => void;
}

export const ConfirmationStatus: React.FC<ConfirmationStatusProps> = ({ transactionData, onDone }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">🎉 Cash-Out Submitted</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">TX Hash:</span>
            <span className="font-mono text-sm">{transactionData?.txHash || '0x123...abc'}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.open('https://etherscan.io', '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Etherscan
        </Button>

        <Button 
          onClick={onDone}
          className="w-full"
        >
          Done
        </Button>
      </CardContent>
    </Card>
  );
};
