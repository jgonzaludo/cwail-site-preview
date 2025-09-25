import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  onOpenItemsChange?: (openItems: Set<number>) => void;
}

const Accordion: React.FC<AccordionProps> = ({ items, className = '', onOpenItemsChange }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
    onOpenItemsChange?.(newOpenItems);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        return (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {item.title}
              </span>
              {isOpen ? (
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            {isOpen && (
              <div
                id={`accordion-content-${index}`}
                className="px-4 py-3 text-gray-700 dark:text-gray-300"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
