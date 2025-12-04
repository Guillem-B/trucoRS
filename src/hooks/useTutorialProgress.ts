import { useState, useEffect } from 'react';
import { saveTutorialProgress, getModuleProgress } from '../data/tutorials';

export function useTutorialProgress(moduleId: string) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const savedStep = getModuleProgress(moduleId);
    setCurrentStep(savedStep);
  }, [moduleId]);

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    saveTutorialProgress(moduleId, stepIndex);
  };

  const nextStep = () => {
    goToStep(currentStep + 1);
  };

  const previousStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    goToStep,
    nextStep,
    previousStep,
  };
}

