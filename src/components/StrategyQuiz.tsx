import { useState } from 'react';

interface StrategyQuizProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function StrategyQuiz({
  question,
  options,
  correctAnswer,
  explanation,
}: StrategyQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{question}</h3>
      
      <div className="space-y-2 mb-4">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === correctAnswer;
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

      {showExplanation && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  );
}

