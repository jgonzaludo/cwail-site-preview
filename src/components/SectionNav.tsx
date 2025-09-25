import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { loadModule, nextSectionId, prevSectionId, isCompleted, canAccessSection } from '../lib/progress';
import type { Section } from '../lib/progress';

const SectionNav: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSections = async () => {
      try {
        const module = await loadModule();
        setSections(module.sections);
      } catch (error) {
        console.error('Failed to load sections:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSections();
  }, []);

  const handleNext = () => {
    if (sectionId) {
      const next = nextSectionId(sectionId);
      if (next && canAccessSection(next)) {
        navigate(`/course/${next}`);
      }
    }
  };

  const handlePrev = () => {
    if (sectionId) {
      const prev = prevSectionId(sectionId);
      if (prev && canAccessSection(prev)) {
        navigate(`/course/${prev}`);
      }
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading navigation...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Section List */}
        <div className="flex flex-wrap gap-2 mb-4">
          {sections.map((section) => {
            const canAccess = canAccessSection(section.id);
            return (
              <button
                key={section.id}
                onClick={() => canAccess && navigate(`/course/${section.id}`)}
                disabled={!canAccess}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  sectionId === section.id
                    ? 'bg-blue-600 text-white'
                    : isCompleted(section.id)
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : canAccess
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                {section.title}
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={!sectionId || !prevSectionId(sectionId || '') || (sectionId && prevSectionId(sectionId) && !canAccessSection(prevSectionId(sectionId)))}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!sectionId || !nextSectionId(sectionId || '') || (sectionId && nextSectionId(sectionId) && !canAccessSection(nextSectionId(sectionId)))}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionNav;
