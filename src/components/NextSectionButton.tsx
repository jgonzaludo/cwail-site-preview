import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../lib/storage';
import { setCompleted } from '../lib/progress';

interface NextSectionButtonProps {
  currentSectionId: string;
  nextSectionId?: string;
  onNavigate?: () => void;
  className?: string;
}

const NextSectionButton: React.FC<NextSectionButtonProps> = ({
  currentSectionId,
  nextSectionId,
  onNavigate,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Mark current section as completed
    setCompleted(currentSectionId, true);
    
    // Update progress in localStorage
    const progress = storage.get('cwail:progress', { completedSections: [] });
    if (!progress.completedSections.includes(currentSectionId)) {
      progress.completedSections.push(currentSectionId);
      storage.set('cwail:progress', progress);
    }

    // Emit custom event for analytics
    window.dispatchEvent(new CustomEvent('cwail:section:completed', {
      detail: { sectionId: currentSectionId }
    }));

    // Navigate to next section
    if (nextSectionId) {
      navigate(`/course/${nextSectionId}`);
    }

    // Call optional callback
    onNavigate?.();
  };

  const isDisabled = !nextSectionId;

  return (
    <div className={`flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isDisabled ? 'No next section available' : `Continue to next section: ${nextSectionId}`}
      >
        {isDisabled ? 'Complete' : 'Next Section'}
        {!isDisabled && (
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default NextSectionButton;
