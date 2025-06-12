
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { CashOutFlow } from '@/components/CashOutFlow';
import { PointsBalance } from '@/components/PointsBalance';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userScenario, setUserScenario] = useState<'new' | 'existing' | null>(null);

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
          
          <CashOutFlow 
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            userScenario={userScenario}
            setUserScenario={setUserScenario}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
