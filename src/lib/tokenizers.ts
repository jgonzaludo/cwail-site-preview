import { encoding_for_model } from '@dqbd/tiktoken';

export interface TokenOffset {
  start: number;
  end: number;
  slice: string;
}

export interface TokenizationResult {
  ids: number[];
  offsets: TokenOffset[];
}

export type EncodingName = 'gpt2' | 'cl100k_base';

// Map encoding names to model names
const encodingMap: Record<EncodingName, string> = {
  'gpt2': 'gpt2',
  'cl100k_base': 'gpt-4'
};

// Tokenizer interface
export interface Tokenizer {
  encode(text: string): number[];
  decode(ids: number[]): string;
  encodeTokens(text: string): string[];
}

// Factory function to get tokenizer by model name
export function getTokenizer(modelName: string): Tokenizer {
  const encoding = modelName === 'gpt2' ? 'gpt2' : 'cl100k_base';
  
  return {
    encode: (text: string) => {
      const enc = encoding_for_model(encodingMap[encoding] as any);
      const ids = Array.from(enc.encode(text));
      enc.free();
      return ids;
    },
    
    decode: (ids: number[]) => {
      const enc = encoding_for_model(encodingMap[encoding] as any);
      const text = enc.decode(new Uint32Array(ids));
      enc.free();
      return new TextDecoder().decode(text);
    },
    
    encodeTokens: (text: string) => {
      const enc = encoding_for_model(encodingMap[encoding] as any);
      const ids = enc.encode(text);
      const tokens: string[] = [];
      
      for (let i = 0; i < ids.length; i++) {
        const tokenBytes = enc.decode(new Uint32Array([ids[i]]));
        const token = new TextDecoder().decode(tokenBytes);
        tokens.push(token);
      }
      
      enc.free();
      return tokens;
    }
  };
}

export async function tokenize(
  text: string, 
  encoding: EncodingName
): Promise<TokenizationResult> {
  try {
    const modelName = encodingMap[encoding];
    console.log(`Tokenizing with model: ${modelName} (encoding: ${encoding})`);
    console.log(`Input text: "${text}"`);
    
    const enc = encoding_for_model(modelName as any);
    console.log(`Using encoding: ${enc.name}`);
    
    const ids = enc.encode(text);
    console.log(`Encoded ${text.length} characters into ${ids.length} tokens`);
    
    const tokens: TokenOffset[] = [];
    
    // Simple approach: just assign sequential positions to avoid duplicates
    let currentPos = 0;
    
    for (let i = 0; i < ids.length; i++) {
      const tokenBytes = enc.decode(new Uint32Array([ids[i]]));
      const token = new TextDecoder().decode(tokenBytes);
      
      // Assign sequential positions to prevent duplicates
      const tokenStart = currentPos;
      const tokenEnd = currentPos + token.length;
      
      tokens.push({
        id: ids[i],
        start: tokenStart,
        end: tokenEnd,
        slice: token
      });
      
      currentPos = tokenEnd;
    }
    
    console.log(`Token breakdown: [${tokens.slice(0, 5).map(t => `"${t.slice}"`).join(', ')}${tokens.length > 5 ? '...' : ''}]`);
    
    enc.free();
    return { ids: Array.from(ids), offsets: tokens };
  } catch (error) {
    console.error('Tokenization failed:', error);
    console.error('Error details:', error);
    return { ids: [], offsets: [] };
  }
}
