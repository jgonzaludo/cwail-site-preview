import React, { useState, useEffect } from 'react';
import { storage } from '../lib/storage';

interface SubmissionBoxProps {
  id: string;
  minWords?: number;
  maxWords?: number;
  placeholder?: string;
  onSubmitted?: (value: string) => void;
  onSubmittedStateChange?: (isSubmitted: boolean) => void;
}

const SubmissionBox: React.FC<SubmissionBoxProps> = ({
  id,
  minWords = 100,
  maxWords = 250,
  placeholder = "Enter your response here...",
  onSubmitted,
  onSubmittedStateChange
}) => {
  const [response, setResponse] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Load existing response from localStorage
  useEffect(() => {
    const savedResponse = storage.get(`cwail:response:${id}`, '');
    if (savedResponse) {
      setResponse(savedResponse);
      setIsSubmitted(true);
    }
  }, [id]);

  // Update word count when response changes
  useEffect(() => {
    const words = response.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [response]);

  // Notify parent when submitted state changes
  useEffect(() => {
    onSubmittedStateChange?.(isSubmitted);
  }, [isSubmitted, onSubmittedStateChange]);

  const handleSubmit = () => {
    if (wordCount < minWords || wordCount > maxWords) {
      return;
    }

    // Save to localStorage
    storage.set(`cwail:response:${id}`, response);
    storage.set(`cwail:response:${id}:ts`, new Date().toISOString());
    
    setIsSubmitted(true);
    onSubmitted?.(response);
  };

  const handleClear = () => {
    setResponse('');
    setIsSubmitted(false);
    storage.remove(`cwail:response:${id}`);
    storage.remove(`cwail:response:${id}:ts`);
  };

  const isValidWordCount = wordCount >= minWords && wordCount <= maxWords;
  const isDisabled = !response.trim() || !isValidWordCount;

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Your Response
      </h3>
      
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder={placeholder}
        disabled={isSubmitted}
        className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
      />
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Word count: <span className={isValidWordCount ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
            {wordCount}
          </span> / {minWords}-{maxWords} words
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            disabled={!response.trim()}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={isDisabled || isSubmitted}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitted ? 'Submitted' : 'Submit'}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default SubmissionBox;
