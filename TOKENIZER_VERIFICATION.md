# Tokenizer Verification Guide

## Overview
This document describes the fixes made to the Token Workshop to ensure GPT-2 and GPT-4 produce different tokenization results.

## Changes Made

### 1. Enhanced Tokenizer Implementation (`src/lib/tokenizers.ts`)
- Added comprehensive logging to track tokenization process
- Improved token offset calculation for accurate highlighting
- Added `getTokenizer()` factory function for model-aware tokenization
- Enhanced error handling and debugging

### 2. Updated Token Lab UI (`src/components/TokenLabEmbed.tsx`)
- Added model information display (GPT-2 vs GPT-4)
- Added token-to-character ratio display
- Added explanatory text about encoding differences
- Improved visual feedback for different models

### 3. Added Comprehensive Tests
- `src/__tests__/tokenizer.spec.ts` - Unit tests for tokenization differences
- `src/__tests__/tokenlab.ui.spec.ts` - UI tests for Token Lab component

## Verification Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Test Token Workshop
1. Navigate to the Token Workshop page (usually in the "Try it Out" section)
2. Use the model dropdown to switch between "GPT-2" and "CL100K Base (GPT-4)"
3. Test with these sample inputs:

**Sample Input 1:**
```
The quick brown fox jumps over the lazy dog.
```

**Sample Input 2:**
```
In 2025, AI systems often use byte-pair encodings and special tokens like <|endoftext|>.
```

**Sample Input 3:**
```
def add(a, b): return a + b  # code sample with punctuation, emojis 🚀🔥
```

### 4. Verify Differences
For each input, you should see:
- **Different token counts** between GPT-2 and GPT-4
- **Different token IDs** in the token details table
- **Different token breakdowns** in the tokenized text display
- **Different token-to-character ratios**

### 5. Run Tests
```bash
# If you have a test runner set up
npm test
```

## Expected Results

### GPT-2 (BPE Encoding)
- Generally produces more tokens for the same text
- Uses Byte Pair Encoding algorithm
- May split words differently than GPT-4

### GPT-4 (CL100K Base Encoding)
- Generally produces fewer tokens for the same text
- Uses CL100K Base encoding (more efficient)
- Better handling of special characters and emojis

## Debug Information

The enhanced tokenizer now includes console logging. Open browser dev tools (F12) and check the Console tab to see:
- Which model is being used for tokenization
- Token counts and breakdowns
- Encoding information

## Files Modified

1. `src/lib/tokenizers.ts` - Enhanced tokenization logic
2. `src/components/TokenLabEmbed.tsx` - Improved UI with model information
3. `src/__tests__/tokenizer.spec.ts` - Unit tests for tokenization
4. `src/__tests__/tokenlab.ui.spec.ts` - UI tests for Token Lab

## Troubleshooting

If you still see identical results:
1. Check browser console for error messages
2. Verify that `@dqbd/tiktoken` is properly loaded
3. Ensure the model dropdown is actually changing the encoding
4. Try refreshing the page to reload the tokenizer

## Technical Notes

- The tokenizer uses `@dqbd/tiktoken` library for accurate model-specific tokenization
- GPT-2 uses the `gpt2` encoding
- GPT-4 uses the `cl100k_base` encoding
- Both encodings are loaded dynamically to avoid bundle size issues
