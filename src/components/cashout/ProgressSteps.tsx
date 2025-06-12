
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
  scenario: 'new' | 'existing';
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, scenario }) => {
  const newUserSteps = [
    'Account Setup',
    'Identity Verification', 
    'Wallet Setup',
    'Amount & Fees',
    'Confirmation'
  ];

  const existingUserSteps = [
    'Wallet Connection',
    'Amount & Fees', 
    'Confirmation',
    'Transfer Complete'
  ];

  const steps = scenario === 'new' ? newUserSteps : existingUserSteps;

  return (
    <div className="flex items-center space-x-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        
        return (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                isCurrent ? 'bg-blue-500 border-blue-500 text-white' : 
                'bg-gray-200 border-gray-300 text-gray-500'}`}>
              {isCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="text-xs font-medium">{stepNumber}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};
