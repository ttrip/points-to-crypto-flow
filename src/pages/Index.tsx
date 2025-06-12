
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { CashOutLanding } from '@/components/v2/CashOutLanding';
import { CoinbaseAccountFlow } from '@/components/v2/CoinbaseAccountFlow';
import { CoinbaseWalletFlow } from '@/components/v2/CoinbaseWalletFlow';
import { ConfirmationStatus } from '@/components/v2/ConfirmationStatus';
import { PointsBalance } from '@/components/PointsBalance';

type FlowType = 'landing' | 'account' | 'wallet' | 'confirmation';

const Index = () => {
  const [currentFlow, setCurrentFlow] = useState<FlowType>('landing');
  const [transactionData, setTransactionData] = useState<any>(null);

  const handleFlowSelect = (flow: 'account' | 'wallet') => {
    setCurrentFlow(flow);
  };

  const handleTransactionComplete = (txData: any) => {
    setTransactionData(txData);
    setCurrentFlow('confirmation');
  };

  const handleBack = () => {
    setCurrentFlow('landing');
  };

  const renderCurrentFlow = () => {
    switch (currentFlow) {
      case 'landing':
        return <CashOutLanding onFlowSelect={handleFlowSelect} />;
      case 'account':
        return (
          <CoinbaseAccountFlow 
            onBack={handleBack}
            onComplete={handleTransactionComplete}
          />
        );
      case 'wallet':
        return (
          <CoinbaseWalletFlow 
            onBack={handleBack}
            onComplete={handleTransactionComplete}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationStatus 
            transactionData={transactionData}
            onDone={() => setCurrentFlow('landing')}
          />
        );
      default:
        return <CashOutLanding onFlowSelect={handleFlowSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Cash Out to Coinbase
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Convert your Shop Your Way Points to USDC and receive them directly in your Coinbase account or wallet
            </p>
          </div>

          <PointsBalance />
          
          {renderCurrentFlow()}
        </div>
      </div>
    </div>
  );
};

export default Index;
