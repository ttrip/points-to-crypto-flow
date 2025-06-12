
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScenarioSelection } from './cashout/ScenarioSelection';
import { NewUserFlow } from './cashout/NewUserFlow';
import { ExistingUserFlow } from './cashout/ExistingUserFlow';
import { ProgressSteps } from './cashout/ProgressSteps';

interface CashOutFlowProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  userScenario: 'new' | 'existing' | null;
  setUserScenario: (scenario: 'new' | 'existing' | null) => void;
}

export const CashOutFlow: React.FC<CashOutFlowProps> = ({
  currentStep,
  setCurrentStep,
  userScenario,
  setUserScenario
}) => {
  const renderCurrentStep = () => {
    if (currentStep === 0) {
      return (
        <ScenarioSelection 
          onScenarioSelect={(scenario) => {
            setUserScenario(scenario);
            setCurrentStep(1);
          }}
        />
      );
    }

    if (userScenario === 'new') {
      return (
        <NewUserFlow 
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          onBack={() => {
            setCurrentStep(0);
            setUserScenario(null);
          }}
        />
      );
    }

    if (userScenario === 'existing') {
      return (
        <ExistingUserFlow 
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          onBack={() => {
            setCurrentStep(0);
            setUserScenario(null);
          }}
        />
      );
    }

    return null;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Cash Out Process
          {userScenario && <ProgressSteps currentStep={currentStep} scenario={userScenario} />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderCurrentStep()}
      </CardContent>
    </Card>
  );
};
