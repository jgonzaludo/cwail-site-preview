import { describe, it, expect } from 'vitest';
import { validateAll } from '../lib/quizValidation';
import finalQuiz from '../data/finalQuiz';

describe('QuizDataValidation', () => {
  it('should validate all questions in finalQuiz are structurally correct', () => {
    const result = validateAll(finalQuiz);
    
    if (!result.ok) {
      console.error('Validation errors found:');
      for (const [questionId, errors] of Object.entries(result.errors)) {
        console.error(`Question ${questionId}:`, errors);
      }
    }
    
    expect(result.ok).toBe(true);
  });

  it('should validate individual question types', () => {
    // Test mcq-single validation
    const mcqQuestion = finalQuiz.find(q => q.type === 'mcq-single');
    expect(mcqQuestion).toBeDefined();
    if (mcqQuestion) {
      const validation = validateAll([mcqQuestion]);
      expect(validation.ok).toBe(true);
    }

    // Test check-all validation
    const checkAllQuestion = finalQuiz.find(q => q.type === 'check-all');
    expect(checkAllQuestion).toBeDefined();
    if (checkAllQuestion) {
      const validation = validateAll([checkAllQuestion]);
      expect(validation.ok).toBe(true);
    }

    // Test ordering validation
    const orderingQuestion = finalQuiz.find(q => q.type === 'ordering');
    expect(orderingQuestion).toBeDefined();
    if (orderingQuestion) {
      const validation = validateAll([orderingQuestion]);
      expect(validation.ok).toBe(true);
    }
  });

  it('should detect invalid question data', () => {
    const invalidQuestion = {
      id: 'test',
      type: 'mcq-single' as const,
      prompt: 'Test question',
      choices: ['A', 'B', 'C'],
      correct: { correctIndex: 5 } // Out of range
    };

    const result = validateAll([invalidQuestion]);
    expect(result.ok).toBe(false);
    expect(result.errors.test).toContain('correctIndex 5 out of range [0, 2]');
  });

  it('should detect invalid ordering question', () => {
    const invalidOrderingQuestion = {
      id: 'test',
      type: 'ordering' as const,
      prompt: 'Test ordering',
      choices: ['A', 'B', 'C'],
      correct: { correctOrder: [0, 1, 5] } // Index 5 out of range
    };

    const result = validateAll([invalidOrderingQuestion]);
    expect(result.ok).toBe(false);
    expect(result.errors.test).toContain('correctOrder index 5 out of range [0, 2]');
  });
});
