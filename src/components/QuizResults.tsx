import React from 'react';
import { Award, RotateCcw, FileText } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  maxScore: number;
  passed: boolean;
  attempts: Array<{
    attemptId: string;
    timestamp: string;
    score: number;
    maxScore: number;
    orderKey: string;
  }>;
  onRetake: () => void;
  isCertificateEligible: boolean;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  maxScore,
  passed,
  attempts,
  onRetake,
  isCertificateEligible
}) => {
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className={`p-6 rounded-lg border ${
        passed 
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${
            passed 
              ? 'bg-green-100 dark:bg-green-800' 
              : 'bg-red-100 dark:bg-red-800'
          }`}>
            <Award className={`h-6 w-6 ${
              passed 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`} />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${
              passed 
                ? 'text-green-900 dark:text-green-100' 
                : 'text-red-900 dark:text-red-100'
            }`}>
              {passed ? 'Quiz Passed!' : 'Quiz Not Passed'}
            </h2>
            <p className={`text-sm ${
              passed 
                ? 'text-green-700 dark:text-green-300' 
                : 'text-red-700 dark:text-red-300'
            }`}>
              {passed 
                ? 'Congratulations! You have successfully completed the CWAIL module.' 
                : `You scored ${score}/${maxScore} (${percentage}%). You need 8/10 (80%) to pass.`}
            </p>
          </div>
        </div>
      </div>

      {/* Score Display */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {score}/{maxScore}
          </div>
          <div className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
            {percentage}%
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-4">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                passed ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Passing score: 8/10 (80%)
          </p>
        </div>
      </div>

      {/* Certificate Eligibility */}
      {isCertificateEligible && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
              <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Certificate Eligible
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                You have successfully completed the CWAIL module and are eligible for a certificate.
              </p>
            </div>
            <button
              disabled
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed flex items-center space-x-2"
              title="Eligible — certificate generation available in next release"
            >
              <FileText className="h-4 w-4" />
              <span>Generate Certificate</span>
            </button>
          </div>
        </div>
      )}

      {/* Attempts History */}
      {attempts.length > 1 && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Attempt History
          </h3>
          <div className="space-y-3">
            {attempts.map((attempt, index) => (
              <div key={attempt.attemptId} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Attempt {index + 1}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(attempt.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-semibold ${
                    attempt.score >= 8 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {attempt.score}/{attempt.maxScore}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({Math.round((attempt.score / attempt.maxScore) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        {!passed && (
          <button
            onClick={onRetake}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </button>
        )}
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
