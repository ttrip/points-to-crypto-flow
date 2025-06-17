
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScenarioSelection } from './cashout/ScenarioSelection';
import { NewUserFlow } from './cashout/NewUserFlow';
import { ExistingUserFlow } from './cashout/ExistingUserFlow';
import { ExistingUserFlowV2 } from './v2/ExistingUserFlowV2';
import { FlowVersionToggle } from './v2/FlowVersionToggle';
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
  const [useV2Flow, setUseV2Flow] = useState(false);

  const renderCurrentStep = () => {
    if (currentStep === 0) {
      return (
        <>
          {userScenario === 'existing' && (
            <FlowVersionToggle 
              useV2={useV2Flow}
              onToggle={setUseV2Flow}
            />
          )}
          <ScenarioSelection 
            onScenarioSelect={(scenario) => {
              setUserScenario(scenario);
              setCurrentStep(1);
            }}
          />
        </>
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
        <>
          <FlowVersionToggle 
            useV2={useV2Flow}
            onToggle={setUseV2Flow}
          />
          {useV2Flow ? (
            <ExistingUserFlowV2 
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              onBack={() => {
                setCurrentStep(0);
                setUserScenario(null);
              }}
            />
          ) : (
            <ExistingUserFlow 
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              onBack={() => {
                setCurrentStep(0);
                setUserScenario(null);
              }}
            />
          )}
        </>
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
