import type { Question } from './quizScoring';

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

export interface ValidationAllResult {
  ok: boolean;
  errors: Record<string, string[]>;
}

/**
 * Validates a single question for structural correctness
 */
export function validateQuestion(question: Question): ValidationResult {
  const errors: string[] = [];

  // Check basic structure
  if (!question.id) {
    errors.push('Missing question id');
  }
  if (!question.type) {
    errors.push('Missing question type');
  }
  if (!question.prompt) {
    errors.push('Missing question prompt');
  }
  if (!Array.isArray(question.choices)) {
    errors.push('Choices must be an array');
  }
  if (!question.correct) {
    errors.push('Missing correct answer metadata');
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const choices = question.choices;
  const correct = question.correct;

  // Validate based on question type
  switch (question.type) {
    case 'mcq-single':
      if (correct.correctIndex === undefined) {
        errors.push('mcq-single requires correctIndex');
      } else if (typeof correct.correctIndex !== 'number') {
        errors.push('correctIndex must be a number');
      } else if (correct.correctIndex < 0 || correct.correctIndex >= choices.length) {
        errors.push(`correctIndex ${correct.correctIndex} out of range [0, ${choices.length - 1}]`);
      }
      break;

    case 'check-all':
      if (!Array.isArray(correct.correctSet)) {
        errors.push('check-all requires correctSet array');
      } else {
        for (const index of correct.correctSet) {
          if (typeof index !== 'number') {
            errors.push(`correctSet contains non-number: ${index}`);
          } else if (index < 0 || index >= choices.length) {
            errors.push(`correctSet index ${index} out of range [0, ${choices.length - 1}]`);
          }
        }
        // Check for duplicates
        const uniqueIndices = new Set(correct.correctSet);
        if (uniqueIndices.size !== correct.correctSet.length) {
          errors.push('correctSet contains duplicate indices');
        }
      }
      break;

    case 'ordering':
      if (!Array.isArray(correct.correctOrder)) {
        errors.push('ordering requires correctOrder array');
      } else {
        for (const index of correct.correctOrder) {
          if (typeof index !== 'number') {
            errors.push(`correctOrder contains non-number: ${index}`);
          } else if (index < 0 || index >= choices.length) {
            errors.push(`correctOrder index ${index} out of range [0, ${choices.length - 1}]`);
          }
        }
        // Check for duplicates
        const uniqueIndices = new Set(correct.correctOrder);
        if (uniqueIndices.size !== correct.correctOrder.length) {
          errors.push('correctOrder contains duplicate indices');
        }
        // Note: Partial ordering is allowed - not all choices need to be in correctOrder
      }
      break;

    case 'fill-blank':
      if (correct.text === undefined || correct.text === null) {
        errors.push('fill-blank requires text');
      } else if (typeof correct.text !== 'string') {
        errors.push('text must be a string');
      }
      break;

    default:
      errors.push(`Unknown question type: ${question.type}`);
  }

  return {
    ok: errors.length === 0,
    errors
  };
}

/**
 * Validates all questions in an array
 */
export function validateAll(questions: Question[]): ValidationAllResult {
  const allErrors: Record<string, string[]> = {};
  let allOk = true;

  for (const question of questions) {
    const result = validateQuestion(question);
    if (!result.ok) {
      allOk = false;
      allErrors[question.id || 'unknown'] = result.errors;
    }
  }

  return {
    ok: allOk,
    errors: allErrors
  };
}
