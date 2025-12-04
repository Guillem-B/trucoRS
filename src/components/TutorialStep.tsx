import { TutorialStep as TutorialStepType } from '../data/tutorials';
import Card from './Card';
import { useState } from 'react';

interface TutorialStepProps {
  step: TutorialStepType;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function TutorialStepComponent({
  step,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: TutorialStepProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {step.title}
      </h2>
      
      <div className="text-gray-700 mb-6 leading-relaxed">
        {step.content}
      </div>

      {step.type === 'interactive' && step.interactiveContent?.cards && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {step.interactiveContent.cards.map((card) => (
              <Card key={card.id} card={card} size="md" />
            ))}
          </div>
        </div>
      )}

      {step.type === 'quiz' && step.interactiveContent && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {step.interactiveContent.question}
          </h3>
          
          <div className="space-y-2 mb-4">
            {step.interactiveContent.options?.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === step.interactiveContent?.correctAnswer;
              const showResult = showExplanation && isSelected;
              
              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-all
                    ${isSelected && showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-primary-400'
                    }
                    ${showExplanation ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'}
                  `}
                >
                  {option}
                  {showResult && isCorrect && (
                    <span className="ml-2 text-green-600 font-bold">✓</span>
                  )}
                  {showResult && !isCorrect && (
                    <span className="ml-2 text-red-600 font-bold">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && step.interactiveContent.explanation && (
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded mb-4">
              <p className="text-gray-700">{step.interactiveContent.explanation}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`
            px-6 py-2 rounded-lg font-medium transition-colors
            ${hasPrevious
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          ← Anterior
        </button>

        <button
          onClick={handleNext}
          disabled={!hasNext || (step.type === 'quiz' && !showExplanation)}
          className={`
            px-6 py-2 rounded-lg font-medium transition-colors
            ${hasNext && (step.type !== 'quiz' || showExplanation)
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {hasNext ? 'Próximo →' : 'Concluir'}
        </button>
      </div>
    </div>
  );
}

