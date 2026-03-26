import { tokenize, getTokenizer } from '../lib/tokenizers';

describe('Tokenizer Tests', () => {
  const testInputs = [
    "The quick brown fox jumps over the lazy dog.",
    "In 2025, AI systems often use byte-pair encodings and special tokens like <|endoftext|>.",
    "def add(a, b): return a + b  # code sample with punctuation, emojis 🚀🔥"
  ];

  describe('GPT-2 vs GPT-4 Tokenization Differences', () => {
    test('should produce different token counts for at least one input', async () => {
      let foundDifference = false;
      
      for (const input of testInputs) {
        const gpt2Result = await tokenize(input, 'gpt2');
        const gpt4Result = await tokenize(input, 'cl100k_base');
        
        if (gpt2Result.ids.length !== gpt4Result.ids.length) {
          foundDifference = true;
          console.log(`Different token counts for: "${input}"`);
          console.log(`GPT-2: ${gpt2Result.ids.length} tokens`);
          console.log(`GPT-4: ${gpt4Result.ids.length} tokens`);
          break;
        }
      }
      
      expect(foundDifference).toBe(true);
    });

    test('should produce different token IDs for at least one input', async () => {
      let foundDifference = false;
      
      for (const input of testInputs) {
        const gpt2Result = await tokenize(input, 'gpt2');
        const gpt4Result = await tokenize(input, 'cl100k_base');
        
        if (JSON.stringify(gpt2Result.ids) !== JSON.stringify(gpt4Result.ids)) {
          foundDifference = true;
          console.log(`Different token IDs for: "${input}"`);
          console.log(`GPT-2 IDs: [${gpt2Result.ids.slice(0, 5).join(', ')}...]`);
          console.log(`GPT-4 IDs: [${gpt4Result.ids.slice(0, 5).join(', ')}...]`);
          break;
        }
      }
      
      expect(foundDifference).toBe(true);
    });

    test('should produce different token strings for at least one input', async () => {
      let foundDifference = false;
      
      for (const input of testInputs) {
        const gpt2Result = await tokenize(input, 'gpt2');
        const gpt4Result = await tokenize(input, 'cl100k_base');
        
        const gpt2Tokens = gpt2Result.offsets.map(t => t.slice);
        const gpt4Tokens = gpt4Result.offsets.map(t => t.slice);
        
        if (JSON.stringify(gpt2Tokens) !== JSON.stringify(gpt4Tokens)) {
          foundDifference = true;
          console.log(`Different token strings for: "${input}"`);
          console.log(`GPT-2 tokens: [${gpt2Tokens.slice(0, 5).map(t => `"${t}"`).join(', ')}...]`);
          console.log(`GPT-4 tokens: [${gpt4Tokens.slice(0, 5).map(t => `"${t}"`).join(', ')}...]`);
          break;
        }
      }
      
      expect(foundDifference).toBe(true);
    });
  });

  describe('Tokenizer Factory', () => {
    test('should create different tokenizers for gpt2 and gpt4', () => {
      const gpt2Tokenizer = getTokenizer('gpt2');
      const gpt4Tokenizer = getTokenizer('gpt4');
      
      const testText = "Hello world";
      
      const gpt2Ids = gpt2Tokenizer.encode(testText);
      const gpt4Ids = gpt4Tokenizer.encode(testText);
      
      expect(gpt2Ids).not.toEqual(gpt4Ids);
    });

    test('should support encode/decode roundtrip for both tokenizers', () => {
      const gpt2Tokenizer = getTokenizer('gpt2');
      const gpt4Tokenizer = getTokenizer('gpt4');
      
      const testText = "Hello world";
      
      const gpt2Ids = gpt2Tokenizer.encode(testText);
      const gpt2Decoded = gpt2Tokenizer.decode(gpt2Ids);
      expect(gpt2Decoded).toBe(testText);
      
      const gpt4Ids = gpt4Tokenizer.encode(testText);
      const gpt4Decoded = gpt4Tokenizer.decode(gpt4Ids);
      expect(gpt4Decoded).toBe(testText);
    });

    test('should support encodeTokens for both tokenizers', () => {
      const gpt2Tokenizer = getTokenizer('gpt2');
      const gpt4Tokenizer = getTokenizer('gpt4');
      
      const testText = "Hello world";
      
      const gpt2Tokens = gpt2Tokenizer.encodeTokens(testText);
      const gpt4Tokens = gpt4Tokenizer.encodeTokens(testText);
      
      expect(gpt2Tokens.length).toBeGreaterThan(0);
      expect(gpt4Tokens.length).toBeGreaterThan(0);
      expect(gpt2Tokens).not.toEqual(gpt4Tokens);
    });
  });

  describe('Tokenization Accuracy', () => {
    test('should tokenize text correctly for both models', async () => {
      const input = "Hello world";
      
      const gpt2Result = await tokenize(input, 'gpt2');
      const gpt4Result = await tokenize(input, 'cl100k_base');
      
      expect(gpt2Result.ids.length).toBeGreaterThan(0);
      expect(gpt4Result.ids.length).toBeGreaterThan(0);
      expect(gpt2Result.offsets.length).toBe(gpt2Result.ids.length);
      expect(gpt4Result.offsets.length).toBe(gpt4Result.ids.length);
    });

    test('should handle empty string', async () => {
      const gpt2Result = await tokenize('', 'gpt2');
      const gpt4Result = await tokenize('', 'cl100k_base');
      
      expect(gpt2Result.ids.length).toBe(0);
      expect(gpt4Result.ids.length).toBe(0);
    });

    test('should handle special characters and emojis', async () => {
      const input = "Hello 🚀 world!";
      
      const gpt2Result = await tokenize(input, 'gpt2');
      const gpt4Result = await tokenize(input, 'cl100k_base');
      
      expect(gpt2Result.ids.length).toBeGreaterThan(0);
      expect(gpt4Result.ids.length).toBeGreaterThan(0);
      
      // Both should handle the emoji, but may tokenize it differently
      const gpt2Text = gpt2Result.offsets.map(t => t.slice).join('');
      const gpt4Text = gpt4Result.offsets.map(t => t.slice).join('');
      
      expect(gpt2Text).toContain('🚀');
      expect(gpt4Text).toContain('🚀');
    });
  });
});
