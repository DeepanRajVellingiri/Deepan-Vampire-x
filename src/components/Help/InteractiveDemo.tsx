import { useState } from 'react';
import { Play, RotateCcw, CheckCircle2 } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  action: string;
}

interface InteractiveDemoProps {
  title: string;
  steps: Step[];
}

export function InteractiveDemo({ title, steps }: InteractiveDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(current => current + 1);
      setCompleted(current => [...current, currentStep]);
    } else {
      setCompleted(current => [...current, currentStep]);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompleted([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <button
          onClick={handleReset}
          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = completed.includes(index);

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                isActive
                  ? 'border-blue-500 bg-blue-50'
                  : isCompleted
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-500'
                    : isActive
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}>
                  <span className="text-white text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {step.description}
                  </p>
                  {isActive && (
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {step.action}
                    </button>
                  )}
                  {isCompleted && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      <span className="text-sm">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {completed.length === steps.length && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-medium">
              Congratulations! You've completed all steps.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}