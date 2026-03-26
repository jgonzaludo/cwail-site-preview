import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { tokenize, type TokenizationResult, type EncodingName } from '../lib/tokenizers';
import TokenHighlighter from '../components/TokenHighlighter';
import { RevealOnScroll } from '../components/RevealOnScroll';

const LabTokenization: React.FC = () => {
  const [text, setText] = useState('');
  const [encoding, setEncoding] = useState<EncodingName>('gpt2');
  const [result, setResult] = useState<TokenizationResult>({ ids: [], offsets: [] });
  const [loading, setLoading] = useState(false);

  const presets = {
    'Emojis & Unicode': 'Hello 🚀 world! 🌍 Testing émojis and unicode: café, naïve, résumé',
    'Code with Comments': 'def fibonacci(n): # Calculate nth Fibonacci number\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)',
    'Special Tokens': 'The endoftext token marks the end. Use start and end for sequences.',
    'Numbers & Math': 'The year 2024 has 366 days. Calculate 3.14159 * 2.71828 = 8.539734222672566',
    'Mixed Languages': 'Hello world! Bonjour le monde! 你好世界! Hola mundo! مرحبا بالعالم!',
    'Long Words': 'antidisestablishmentarianism pneumonoultramicroscopicsilicovolcanoconiosis',
    'Punctuation Heavy': 'What?! Really??? No way... But why??? Oh my gosh!!!',
    'Whitespace Test': '   Multiple    spaces    and\ttabs\t\there\n\n\nNewlines too'
  };

  const debouncedTokenize = useCallback(
    debounce(async (text: string, encoding: 'gpt2' | 'cl100k_base') => {
      if (!text.trim()) {
        setResult({ ids: [], offsets: [] });
        return;
      }
      
      setLoading(true);
      try {
        const tokenization = await tokenize(text, encoding);
        setResult(tokenization);
      } catch (error) {
        console.error('Tokenization failed:', error);
        setResult({ ids: [], offsets: [] });
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedTokenize(text, encoding);
  }, [text, encoding, debouncedTokenize]);

  const handlePreset = (presetText: string) => {
    setText(presetText);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Tokenization Lab
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore how text is broken down into tokens by different language models.
          </p>
        </motion.div>

        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label htmlFor="encoding" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Encoding
              </label>
              <select
                id="encoding"
                value={encoding}
                onChange={(e) => setEncoding(e.target.value as 'gpt2' | 'cl100k_base')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="gpt2">GPT-2</option>
                <option value="cl100k_base">CL100K Base (GPT-4)</option>
              </select>
            </div>

            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Text Input
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                placeholder="Enter text to tokenize..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Presets (designed to show model differences)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(presets).map(([name, presetText]) => (
                  <button
                    key={name}
                    onClick={() => handlePreset(presetText)}
                    className="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-left"
                    title={presetText}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Statistics
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Characters</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {text.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tokens</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {loading ? '...' : result.ids.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Tokenized Text
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 min-h-[200px]">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="text-gray-900 dark:text-gray-100 leading-relaxed break-words overflow-x-auto">
                    <TokenHighlighter text={text} tokens={result.offsets} />
                  </div>
                )}
              </div>
              {result.offsets.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    💡 Each token is highlighted with a different color. Hover over tokens to see details.
                  </p>
                </div>
              )}
            </div>

            {result.ids.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Token Details
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Index
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Token
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            ID
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {result.offsets.map((token, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                              {index}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 font-mono">
                              {token.slice}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                              {result.ids[index]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default LabTokenization;
