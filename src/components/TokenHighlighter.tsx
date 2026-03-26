import React from 'react';

interface Token {
  id?: number;
  start: number;
  end: number;
  slice: string;
}

interface TokenHighlighterProps {
  text: string;
  tokens: Token[];
  className?: string;
}

const TokenHighlighter: React.FC<TokenHighlighterProps> = ({ text, tokens, className = '' }) => {
  if (!tokens.length) {
    return <span className={className}>{text}</span>;
  }

  // Color palette for different tokens
  const tokenColors = [
    'bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100',
    'bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100',
    'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100',
    'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100',
    'bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100',
    'bg-pink-200 dark:bg-pink-800 text-pink-900 dark:text-pink-100',
    'bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100',
    'bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-100',
    'bg-teal-200 dark:bg-teal-800 text-teal-900 dark:text-teal-100',
    'bg-cyan-200 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100',
    'bg-lime-200 dark:bg-lime-800 text-lime-900 dark:text-lime-100',
    'bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100',
    'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100',
    'bg-violet-200 dark:bg-violet-800 text-violet-900 dark:text-violet-100',
    'bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100',
    'bg-sky-200 dark:bg-sky-800 text-sky-900 dark:text-sky-100'
  ];

  const renderTokens = () => {
    const elements: React.ReactNode[] = [];
    let lastEnd = 0;

    tokens.forEach((token, index) => {
      // Add text before this token
      if (token.start > lastEnd) {
        elements.push(
          <span key={`text-${index}`}>
            {text.slice(lastEnd, token.start)}
          </span>
        );
      }

      // Get color for this token (cycle through the palette)
      const colorClass = tokenColors[index % tokenColors.length];

      // Add the token
      elements.push(
        <span
          key={`token-${index}`}
          className={`${colorClass} px-1 rounded cursor-help focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-200 hover:opacity-80`}
          title={`Token ${index + 1}/${tokens.length} - ID: ${token.id || 'unknown'} - "${token.slice}"`}
          tabIndex={0}
          role="button"
          aria-label={`Token ${index + 1}: ${token.slice}`}
        >
          {token.slice}
        </span>
      );

      lastEnd = token.end;
    });

    // Add remaining text
    if (lastEnd < text.length) {
      elements.push(
        <span key="text-end">
          {text.slice(lastEnd)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div className={`inline break-words ${className}`}>
      {renderTokens()}
    </div>
  );
};

export default TokenHighlighter;
