import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';
import { RevealOnScroll } from './RevealOnScroll';

interface ResourceArticleProps {
  title: string;
  eyebrow: string;
  summary: string;
  children: ReactNode;
}

export function ResourceArticle({ title, eyebrow, summary, children }: ResourceArticleProps) {
  return (
    <div className="min-h-screen bg-cwail-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-sm font-medium text-cwail-muted hover:text-cwail-accent2 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Resources
        </Link>

        <RevealOnScroll>
          <header className="cwail-surface rounded-2xl p-6 md:p-8 shadow-cwail dark:shadow-cwail-dark mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cwail-accent mb-3">
              {eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-cwail-ink mb-4">
              {title}
            </h1>
            <p className="text-lg leading-relaxed text-cwail-muted max-w-3xl">{summary}</p>
          </header>
        </RevealOnScroll>

        {children}
      </div>
    </div>
  );
}

interface ExampleBoxProps {
  title?: string;
  children: ReactNode;
  note?: string;
}

export function ExampleBox({ title, children, note }: ExampleBoxProps) {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="text-green-600 dark:text-green-400 font-semibold text-sm shrink-0">
          Example:
        </span>
        <div className="min-w-0">
          {title && (
            <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">{title}</p>
          )}
          <div className="text-green-800 dark:text-green-200 italic leading-relaxed">{children}</div>
          {note && (
            <p className="mt-3 text-sm not-italic text-green-900/80 dark:text-green-100/80">{note}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface GuidanceCardProps {
  title: string;
  children: ReactNode;
}

export function GuidanceCard({ title, children }: GuidanceCardProps) {
  return (
    <section className="cwail-surface rounded-xl p-5 md:p-6 shadow-cwail dark:shadow-cwail-dark">
      <h2 className="text-xl font-display font-semibold text-cwail-ink mb-3">{title}</h2>
      <div className="text-cwail-muted leading-relaxed">{children}</div>
    </section>
  );
}

interface LinkCalloutProps {
  to: string;
  children: ReactNode;
}

export function LinkCallout({ to, children }: LinkCalloutProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-medium text-cwail-accent2 hover:text-cwail-accent transition-colors underline underline-offset-4 decoration-cwail-accent/40"
    >
      {children}
      <ExternalLink className="h-4 w-4" aria-hidden />
    </Link>
  );
}
