import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TokenLabEmbed from '../components/TokenLabEmbed';

// Mock the tokenize function
jest.mock('../lib/tokenizers', () => ({
  tokenize: jest.fn()
}));

import { tokenize } from '../lib/tokenizers';

const mockTokenize = tokenize as jest.MockedFunction<typeof tokenize>;

describe('TokenLab UI Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render Token Lab component', () => {
    render(<TokenLabEmbed />);
    
    expect(screen.getByText('Token Workshop')).toBeInTheDocument();
    expect(screen.getByText('Explore how text is broken down into tokens by different language models.')).toBeInTheDocument();
  });

  test('should have model selector dropdown', () => {
    render(<TokenLabEmbed />);
    
    const encodingSelect = screen.getByLabelText('Encoding');
    expect(encodingSelect).toBeInTheDocument();
    expect(encodingSelect).toHaveValue('gpt2');
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(screen.getByText('GPT-2')).toBeInTheDocument();
    expect(screen.getByText('CL100K Base (GPT-4)')).toBeInTheDocument();
  });

  test('should switch between GPT-2 and GPT-4 models', async () => {
    // Mock different responses for different models
    mockTokenize.mockImplementation(async (text: string, encoding: string) => {
      if (encoding === 'gpt2') {
        return {
          ids: [1, 2, 3],
          offsets: [
            { start: 0, end: 5, slice: 'Hello' },
            { start: 5, end: 6, slice: ' ' },
            { start: 6, end: 11, slice: 'world' }
          ]
        };
      } else {
        return {
          ids: [10, 20, 30],
          offsets: [
            { start: 0, end: 5, slice: 'Hello' },
            { start: 5, end: 6, slice: ' ' },
            { start: 6, end: 11, slice: 'world' }
          ]
        };
      }
    });

    render(<TokenLabEmbed />);
    
    const textarea = screen.getByLabelText('Text Input');
    const encodingSelect = screen.getByLabelText('Encoding');
    
    // Enter some text
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    
    // Wait for GPT-2 tokenization
    await waitFor(() => {
      expect(mockTokenize).toHaveBeenCalledWith('Hello world', 'gpt2');
    });
    
    // Switch to GPT-4
    fireEvent.change(encodingSelect, { target: { value: 'cl100k_base' } });
    
    // Wait for GPT-4 tokenization
    await waitFor(() => {
      expect(mockTokenize).toHaveBeenCalledWith('Hello world', 'cl100k_base');
    });
    
    // Verify both calls were made
    expect(mockTokenize).toHaveBeenCalledTimes(2);
  });

  test('should display token count and statistics', async () => {
    mockTokenize.mockResolvedValue({
      ids: [1, 2, 3, 4],
      offsets: [
        { start: 0, end: 5, slice: 'Hello' },
        { start: 5, end: 6, slice: ' ' },
        { start: 6, end: 11, slice: 'world' },
        { start: 11, end: 12, slice: '!' }
      ]
    });

    render(<TokenLabEmbed />);
    
    const textarea = screen.getByLabelText('Text Input');
    fireEvent.change(textarea, { target: { value: 'Hello world!' } });
    
    await waitFor(() => {
      expect(screen.getByText('12')).toBeInTheDocument(); // Character count
      expect(screen.getByText('4')).toBeInTheDocument(); // Token count
    });
  });

  test('should display token details table', async () => {
    mockTokenize.mockResolvedValue({
      ids: [1, 2, 3],
      offsets: [
        { start: 0, end: 5, slice: 'Hello' },
        { start: 5, end: 6, slice: ' ' },
        { start: 6, end: 11, slice: 'world' }
      ]
    });

    render(<TokenLabEmbed />);
    
    const textarea = screen.getByLabelText('Text Input');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    
    await waitFor(() => {
      expect(screen.getByText('Token Details')).toBeInTheDocument();
      expect(screen.getByText('Index')).toBeInTheDocument();
      expect(screen.getByText('Token')).toBeInTheDocument();
      expect(screen.getByText('ID')).toBeInTheDocument();
      
      // Check for token data
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // First token ID
    });
  });

  test('should handle preset buttons', () => {
    render(<TokenLabEmbed />);
    
    const jackJillButton = screen.getByText('Jack & Jill');
    const introPromptButton = screen.getByText('Intro prompt');
    
    expect(jackJillButton).toBeInTheDocument();
    expect(introPromptButton).toBeInTheDocument();
    
    // Click a preset
    fireEvent.click(jackJillButton);
    
    const textarea = screen.getByLabelText('Text Input');
    expect(textarea).toHaveValue('Jack and Jill went up the hill to fetch a pail of water.');
  });

  test('should show loading state during tokenization', async () => {
    // Mock a delayed response
    mockTokenize.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({
        ids: [1, 2, 3],
        offsets: [
          { start: 0, end: 5, slice: 'Hello' },
          { start: 5, end: 6, slice: ' ' },
          { start: 6, end: 11, slice: 'world' }
        ]
      }), 100);
    }));

    render(<TokenLabEmbed />);
    
    const textarea = screen.getByLabelText('Text Input');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    
    // Should show loading state
    expect(screen.getByText('...')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('...')).not.toBeInTheDocument();
    });
  });
});
