import { calculateFinalQuizScore } from '../lib/quizScoring';
import type { Question, Answer } from '../lib/quizScoring';

describe('quizScoring', () => {
  const sampleQuestions: Question[] = [
    {
      id: 'q1',
      type: 'mcq-single',
      prompt: 'What is 2+2?',
      choices: ['3', '4', '5', '6'],
      correct: { correctIndex: 1 }
    },
    {
      id: 'q2',
      type: 'check-all',
      prompt: 'Select even numbers',
      choices: ['2', '3', '4', '5'],
      correct: { correctSet: [0, 2] }
    },
    {
      id: 'q3',
      type: 'ordering',
      prompt: 'Order the numbers',
      choices: ['First', 'Second', 'Third'],
      correct: { correctOrder: [0, 1, 2] }
    },
    {
      id: 'q4',
      type: 'fill-blank',
      prompt: 'Complete: The sky is ___',
      choices: [],
      correct: { text: 'blue' }
    }
  ];

  describe('calculateFinalQuizScore', () => {
    it('should return 4/4 for all correct answers', () => {
      const answers: Answer = {
        'q1': 1, // Correct index for MCQ
        'q2': [0, 2], // Correct set for check-all
        'q3': [0, 1, 2], // Correct order for ordering
        'q4': 'blue' // Correct text for fill-blank
      };

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      
      expect(result.score).toBe(4);
      expect(result.maxScore).toBe(4);
      expect(result.details).toHaveLength(4);
      expect(result.details.every(d => d.correct)).toBe(true);
    });

    it('should return 0/4 for empty answers', () => {
      const answers: Answer = {};

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      
      expect(result.score).toBe(0);
      expect(result.maxScore).toBe(4);
      expect(result.details).toHaveLength(4);
      expect(result.details.every(d => !d.correct)).toBe(true);
    });

    it('should handle mcq-single correctly', () => {
      const answers: Answer = {
        'q1': 1 // Correct answer
      };

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      const q1Detail = result.details.find(d => d.questionId === 'q1');
      
      expect(q1Detail?.correct).toBe(true);
      expect(q1Detail?.earned).toBe(1);
    });

    it('should handle check-all with exact set match', () => {
      const answers: Answer = {
        'q2': [0, 2] // Correct set
      };

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      const q2Detail = result.details.find(d => d.questionId === 'q2');
      
      expect(q2Detail?.correct).toBe(true);
      expect(q2Detail?.earned).toBe(1);
    });

    it('should reject check-all with incorrect set', () => {
      const answers: Answer = {
        'q2': [0, 1] // Incorrect set
      };

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      const q2Detail = result.details.find(d => d.questionId === 'q2');
      
      expect(q2Detail?.correct).toBe(false);
      expect(q2Detail?.earned).toBe(0);
    });

    it('should handle ordering with exact sequence match', () => {
      const answers: Answer = {
        'q3': [0, 1, 2] // Correct order
      };

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      const q3Detail = result.details.find(d => d.questionId === 'q3');
      
      expect(q3Detail?.correct).toBe(true);
      expect(q3Detail?.earned).toBe(1);
    });

    it('should reject ordering with incorrect sequence', () => {
      const answers: Answer = {
        'q3': [1, 0, 2] // Incorrect order
      };

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      const q3Detail = result.details.find(d => d.questionId === 'q3');
      
      expect(q3Detail?.correct).toBe(false);
      expect(q3Detail?.earned).toBe(0);
    });

    it('should handle fill-blank with case-insensitive matching', () => {
      const answers: Answer = {
        'q4': 'BLUE' // Correct but different case
      };

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      const q4Detail = result.details.find(d => d.questionId === 'q4');
      
      expect(q4Detail?.correct).toBe(true);
      expect(q4Detail?.earned).toBe(1);
    });

    it('should handle fill-blank with trimmed whitespace', () => {
      const answers: Answer = {
        'q4': '  blue  ' // Correct but with whitespace
      };

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      const q4Detail = result.details.find(d => d.questionId === 'q4');
      
      expect(q4Detail?.correct).toBe(true);
      expect(q4Detail?.earned).toBe(1);
    });

    it('should reject fill-blank with incorrect answer', () => {
      const answers: Answer = {
        'q4': 'red' // Incorrect answer
      };

      const result = calculateFinalQuizScore(answers, sampleQuestions);
      const q4Detail = result.details.find(d => d.questionId === 'q4');
      
      expect(q4Detail?.correct).toBe(false);
      expect(q4Detail?.earned).toBe(0);
    });
  });
});
