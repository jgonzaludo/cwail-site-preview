import React from 'react';
import { Link } from 'react-router-dom';
import { Award, FileText, X } from 'lucide-react';
import { ENABLE_CERT } from '../lib/flags';

interface QuizPassedModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  maxScore: number;
}

const QuizPassedModal: React.FC<QuizPassedModalProps> = ({
  isOpen,
  onClose,
  score,
  maxScore,
}) => {
  if (!isOpen) return null;

  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-passed-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-amber-200/30 bg-[#1c1917] p-6 text-left text-[#faf8f3] shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-200/15 text-emerald-200">
              <Award className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h2 id="quiz-passed-title" className="text-lg font-semibold">
                Quiz Passed!
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#faf8f3]/75">
                Congratulations! You have successfully completed the CWAIL module.
              </p>
              <p className="mt-2 text-sm font-medium text-emerald-200/90">
                Score: {score}/{maxScore} ({percentage}%)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1 text-[#faf8f3]/60 hover:bg-white/10 hover:text-[#faf8f3] focus:outline-none focus:ring-2 focus:ring-[#fb923c]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {ENABLE_CERT && (
          <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-[#faf8f3]">Your certificate</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#faf8f3]/75">
              Generate a verified certificate with your name and a QR code to confirm completion.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/certificate"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-academy-orange px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#fb923c]"
              >
                <FileText className="h-4 w-4 shrink-0" aria-hidden />
                Generate certificate
              </Link>
              <Link
                to="/celebration"
                onClick={onClose}
                className="text-center text-sm font-medium text-[#a7f3d0] underline underline-offset-2 hover:text-[#faf8f3]"
              >
                View completion summary
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/25 px-4 py-2 text-sm font-medium text-[#faf8f3] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#fb923c]"
          >
            View results
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPassedModal;
