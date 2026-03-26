import { tokenize } from '../lib/tokenizers';

describe('Tokenizer Debug Tests', () => {
  const testInputs = [
    "The quick brown fox jumps over the lazy dog.",
    "In 2025, AI systems often use byte-pair encodings and special tokens like <|endoftext|>.",
    "def add(a, b): return a + b  # code sample with punctuation, emojis 🚀🔥"
  ];

  test('GPT-2 and GPT-4 should produce different tokenization results', async () => {
    for (const input of testInputs) {
      console.log(`\n=== Testing input: "${input}" ===`);
      
      const gpt2Result = await tokenize(input, 'gpt2');
      const gpt4Result = await tokenize(input, 'cl100k_base');
      
      console.log(`GPT-2: ${gpt2Result.ids.length} tokens`);
      console.log(`GPT-4: ${gpt4Result.ids.length} tokens`);
      console.log(`GPT-2 tokens: [${gpt2Result.offsets.map(t => `"${t.slice}"`).slice(0, 5).join(', ')}...]`);
      console.log(`GPT-4 tokens: [${gpt4Result.offsets.map(t => `"${t.slice}"`).slice(0, 5).join(', ')}...]`);
      
      // Check if results are different
      const countsMatch = gpt2Result.ids.length === gpt4Result.ids.length;
      const idsMatch = JSON.stringify(gpt2Result.ids) === JSON.stringify(gpt4Result.ids);
      const tokensMatch = JSON.stringify(gpt2Result.offsets.map(t => t.slice)) === JSON.stringify(gpt4Result.offsets.map(t => t.slice));
      
      console.log(`Counts match: ${countsMatch}`);
      console.log(`IDs match: ${idsMatch}`);
      console.log(`Tokens match: ${tokensMatch}`);
      console.log(`DIFFERENT: ${!countsMatch || !idsMatch || !tokensMatch ? 'YES' : 'NO'}`);
      
      // At least one input should produce different results
      if (input === testInputs[0]) { // Test with first input
        expect(!countsMatch || !idsMatch || !tokensMatch).toBe(true);
      }
    }
  });

  test('Tokenization should work for both models', async () => {
    const input = "Hello world";
    
    const gpt2Result = await tokenize(input, 'gpt2');
    const gpt4Result = await tokenize(input, 'cl100k_base');
    
    expect(gpt2Result.ids.length).toBeGreaterThan(0);
    expect(gpt4Result.ids.length).toBeGreaterThan(0);
    expect(gpt2Result.offsets.length).toBe(gpt2Result.ids.length);
    expect(gpt4Result.offsets.length).toBe(gpt4Result.ids.length);
  });
});
