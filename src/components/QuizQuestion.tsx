import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface QuizQuestionProps {
  question: {
    id: string;
    type: 'mcq-single' | 'check-all' | 'ordering' | 'fill-blank';
    prompt: string;
    choices: string[];
    correct: {
      correctIndex?: number;
      correctSet?: number[];
      correctOrder?: number[];
      text?: string;
    };
  };
  answer: number | number[] | string | undefined;
  onAnswerChange: (questionId: string, answer: number | number[] | string) => void;
  showResults?: boolean;
  result?: {
    correct: boolean;
    earned: number;
    maxPoints: number;
  };
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answer,
  onAnswerChange,
  showResults = false,
  result
}) => {
  const [orderingItems, setOrderingItems] = useState<number[]>(() => {
    if (question.type === 'ordering' && Array.isArray(answer)) {
      return answer as number[];
    }
    // Initialize with original order for new questions
    return Array.from({ length: question.choices.length }, (_, i) => i);
  });


  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (question.type !== 'ordering') return;
    
    const newOrder = [...orderingItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
      setOrderingItems(newOrder);
      onAnswerChange(question.id, newOrder);
    }
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'mcq-single':
        return (
          <div className="space-y-4">
            {question.choices.map((choice, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={index}
                  checked={answer === index}
                  onChange={(e) => onAnswerChange(question.id, parseInt(e.target.value))}
                  disabled={showResults}
                  className="mt-1 h-5 w-5 min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0"
                  style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', maxWidth: '20px', maxHeight: '20px' }}
                />
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{choice}</span>
              </label>
            ))}
          </div>
        );

      case 'check-all':
        const selectedIndices = Array.isArray(answer) ? answer as number[] : [];
        return (
          <div className="space-y-4">
            {question.choices.map((choice, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIndices.includes(index)}
                  onChange={(e) => {
                    const newSelection = e.target.checked
                      ? [...selectedIndices, index]
                      : selectedIndices.filter(i => i !== index);
                    onAnswerChange(question.id, newSelection);
                  }}
                  disabled={showResults}
                  className="mt-1 h-5 w-5 min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                  style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', maxWidth: '20px', maxHeight: '20px' }}
                />
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{choice}</span>
              </label>
            ))}
          </div>
        );

      case 'ordering':
        return (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Use the up/down arrows to arrange the items in the correct order.
            </p>
            {orderingItems.map((choiceIndex, position) => (
              <div key={`${choiceIndex}-${position}`} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[20px]">
                  {position + 1}.
                </span>
                <span className="flex-1 text-gray-700 dark:text-gray-300">
                  {question.choices[choiceIndex]}
                </span>
                <div className="flex flex-col space-y-1">
                  <button
                    type="button"
                    onClick={() => moveItem(position, 'up')}
                    disabled={showResults || position === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(position, 'down')}
                    disabled={showResults || position === orderingItems.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Type your answer in the box below:
            </p>
            <input
              type="text"
              value={String(answer || '')}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              disabled={showResults}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your answer..."
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getResultColor = () => {
    if (!showResults || !result) return '';
    return result.correct 
      ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800' 
      : 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
  };

  const getResultTextColor = () => {
    if (!showResults || !result) return '';
    return result.correct 
      ? 'text-green-800 dark:text-green-200' 
      : 'text-red-800 dark:text-red-200';
  };

  return (
    <div className={`p-6 border rounded-lg ${getResultColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {question.prompt}
        </h3>
        {showResults && result && (
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getResultTextColor()}`}>
              ({result.earned}/{result.maxPoints})
            </span>
          </div>
        )}
      </div>
      
      {renderQuestion()}

      {showResults && result && question.type === 'mcq-single' && !result.correct && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Correct answer:</strong> {question.choices[question.correct.correctIndex || 0]}
          </p>
        </div>
      )}

      {showResults && result && question.type === 'check-all' && !result.correct && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Correct answers:</strong> {(question.correct.correctSet || [])
              .map(index => question.choices[index])
              .join(', ')}
          </p>
        </div>
      )}

      {showResults && result && question.type === 'ordering' && !result.correct && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Correct order:</strong> {(question.correct.correctOrder || [])
              .map(index => question.choices[index])
              .join(' → ')}
          </p>
        </div>
      )}

      {showResults && result && question.type === 'fill-blank' && !result.correct && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Correct answer:</strong> {question.correct.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
