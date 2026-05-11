import React from 'react';
import { Link } from 'react-router-dom';
import {
  getConclusionResponseText,
  getIntroductionResponseText,
  getStoredUserName,
} from '../lib/learnerContext';

interface ModuleResponsesSummaryProps {
  variant: 'celebration' | 'certificate';
}

const ModuleResponsesSummary: React.FC<ModuleResponsesSummaryProps> = ({ variant }) => {
  const intro = getIntroductionResponseText();
  const conclusion = getConclusionResponseText();
  const name = getStoredUserName();

  const shell =
    variant === 'certificate' ?
      'no-print mx-auto mt-8 max-w-4xl rounded-lg border border-academy-forest/20 bg-cwail-elevated/80 p-6 text-left shadow-sm dark:bg-cwail-elevated/50'
    : 'mt-8 rounded-xl border border-cwail-border bg-cwail-bg/60 p-6 text-left shadow-cwail dark:bg-gray-900/40 dark:shadow-cwail-dark';

  if (!intro.trim() && !conclusion.trim()) {
    return (
      <div className={shell}>
        <p className="text-sm text-cwail-muted">
          {name ?
            `${name}, your written responses from the module will appear here after you complete the introduction and conclusion.`
          : 'Your written responses from the module will appear here after you complete the introduction and conclusion.'}{' '}
          <Link to="/course/introduction" className="font-medium text-cwail-accent2 underline underline-offset-2">
            Back to course
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className={shell}>
      <h2 className="font-display text-lg font-semibold text-cwail-ink dark:text-cwail-ink">
        Your module writing
      </h2>
      <p className="mt-1 text-sm text-cwail-muted">
        Same responses from the opening prompt and the conclusion—linked for your records.
      </p>

      {intro.trim() ? (
        <section className="mt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-academy-forest dark:text-academy-orange">
              Opening response (Introduction)
            </h3>
            <Link
              to="/course/introduction"
              className="text-xs font-medium text-cwail-accent2 hover:text-cwail-accent"
            >
              View section
            </Link>
          </div>
          <blockquote className="mt-2 whitespace-pre-wrap rounded-md border border-cwail-border bg-cwail-bg px-4 py-3 text-sm leading-relaxed text-cwail-ink dark:bg-gray-800/80">
            {intro}
          </blockquote>
        </section>
      ) : null}

      {conclusion.trim() ? (
        <section className="mt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-academy-forest dark:text-academy-orange">
              Closing reflection (Conclusion)
            </h3>
            <Link
              to="/course/conclusion"
              className="text-xs font-medium text-cwail-accent2 hover:text-cwail-accent"
            >
              View section
            </Link>
          </div>
          <blockquote className="mt-2 whitespace-pre-wrap rounded-md border border-cwail-border bg-cwail-bg px-4 py-3 text-sm leading-relaxed text-cwail-ink dark:bg-gray-800/80">
            {conclusion}
          </blockquote>
        </section>
      ) : null}
    </div>
  );
};

export default ModuleResponsesSummary;
