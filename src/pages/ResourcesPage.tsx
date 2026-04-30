import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList, FileText, MessageSquareText } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';

const ResourcesPage: React.FC = () => {
  const resources = [
    {
      title: 'Citing/Attributing AI Tools',
      description: 'Citation formats and examples for APA, MLA, Chicago/Turabian, and IEEE.',
      eyebrow: 'Citation guide',
      to: '/resources/citing-ai',
      icon: FileText,
    },
    {
      title: 'Responsible AI Templates',
      description: 'Prompt templates for writing support, source work, revision, and clerical tasks.',
      eyebrow: 'Prompt library',
      to: '/resources/responsible-ai',
      icon: MessageSquareText,
    },
  ];

  return (
    <div className="min-h-screen bg-cwail-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cwail-ink mb-4">
            Additional Resources
          </h1>
          <p className="text-xl text-cwail-muted max-w-3xl mx-auto">
            Reference pages for AI citation, responsible prompting, and course context.
          </p>
        </motion.div>

        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.title}
                  to={resource.to}
                  className="group cwail-surface rounded-xl p-6 shadow-cwail dark:shadow-cwail-dark transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-cwail-accent2/50 hover:bg-cwail-elevated/90 focus:outline-none focus:ring-2 focus:ring-cwail-accent2 focus:ring-offset-2 focus:ring-offset-cwail-bg"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-cwail-accent2/10 text-cwail-accent2 group-hover:bg-cwail-accent2 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <ArrowRight className="h-5 w-5 text-cwail-muted transition-transform group-hover:translate-x-1 group-hover:text-cwail-accent2" aria-hidden />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cwail-accent mb-3">
                    {resource.eyebrow}
                  </p>
                  <h2 className="text-xl font-display font-semibold text-cwail-ink mb-2">
                    {resource.title}
                  </h2>
                  <p className="text-cwail-muted text-sm leading-relaxed">{resource.description}</p>
                </Link>
              );
            })}
            <div
              className="cwail-surface rounded-xl p-6 shadow-cwail dark:shadow-cwail-dark opacity-75 border border-dashed border-cwail-border"
              aria-disabled="true"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-cwail-muted/15 text-cwail-muted">
                  <ClipboardList className="h-5 w-5" aria-hidden />
                </div>
                <button
                  type="button"
                  disabled
                  className="pointer-events-none shrink-0 rounded-lg border border-cwail-border bg-cwail-bg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cwail-muted cursor-not-allowed"
                  aria-label="Instructor notes (in progress)"
                >
                  IN PROGRESS
                </button>
              </div>
              <h2 className="text-xl font-display font-semibold text-cwail-ink">
                Instructor Notes
              </h2>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default ResourcesPage;