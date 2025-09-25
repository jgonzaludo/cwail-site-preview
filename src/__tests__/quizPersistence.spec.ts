import { 
  saveAnswers, 
  getAnswers, 
  clearAnswers,
  saveAttempt,
  getAttempts,
  setCertificateEligible,
  isCertificateEligible,
  saveAttemptOrder,
  getAttemptOrder
} from '../lib/quizScoring';
import type { Answer, QuizAttempt } from '../lib/quizScoring';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('quizPersistence', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('answers persistence', () => {
    it('should save answers to localStorage', () => {
      const answers: Answer = {
        'q1': 1,
        'q2': [0, 2],
        'q3': 'test answer'
      };

      saveAnswers(answers);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cwail:quiz:final:answers',
        JSON.stringify(answers)
      );
    });

    it('should retrieve answers from localStorage', () => {
      const answers: Answer = {
        'q1': 1,
        'q2': [0, 2]
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(answers));

      const retrievedAnswers = getAnswers();

      expect(localStorageMock.getItem).toHaveBeenCalledWith('cwail:quiz:final:answers');
      expect(retrievedAnswers).toEqual(answers);
    });

    it('should return empty object when no answers exist', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const answers = getAnswers();

      expect(answers).toEqual({});
    });

    it('should clear answers from localStorage', () => {
      clearAnswers();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('cwail:quiz:final:answers');
    });
  });

  describe('attempts persistence', () => {
    it('should save attempt to localStorage', () => {
      const attempt: QuizAttempt = {
        attemptId: 'test-attempt-1',
        timestamp: '2023-01-01T00:00:00.000Z',
        score: 8,
        maxScore: 10,
        orderKey: 'test-order-key'
      };

      localStorageMock.getItem.mockReturnValue('[]');

      saveAttempt(attempt);

      expect(localStorageMock.getItem).toHaveBeenCalledWith('cwail:quiz:final:attempts');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cwail:quiz:final:attempts',
        JSON.stringify([attempt])
      );
    });

    it('should append to existing attempts', () => {
      const existingAttempt: QuizAttempt = {
        attemptId: 'existing-attempt',
        timestamp: '2023-01-01T00:00:00.000Z',
        score: 6,
        maxScore: 10,
        orderKey: 'existing-order'
      };

      const newAttempt: QuizAttempt = {
        attemptId: 'new-attempt',
        timestamp: '2023-01-02T00:00:00.000Z',
        score: 9,
        maxScore: 10,
        orderKey: 'new-order'
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify([existingAttempt]));

      saveAttempt(newAttempt);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cwail:quiz:final:attempts',
        JSON.stringify([existingAttempt, newAttempt])
      );
    });

    it('should retrieve attempts from localStorage', () => {
      const attempts: QuizAttempt[] = [
        {
          attemptId: 'attempt-1',
          timestamp: '2023-01-01T00:00:00.000Z',
          score: 7,
          maxScore: 10,
          orderKey: 'order-1'
        },
        {
          attemptId: 'attempt-2',
          timestamp: '2023-01-02T00:00:00.000Z',
          score: 9,
          maxScore: 10,
          orderKey: 'order-2'
        }
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(attempts));

      const retrievedAttempts = getAttempts();

      expect(localStorageMock.getItem).toHaveBeenCalledWith('cwail:quiz:final:attempts');
      expect(retrievedAttempts).toEqual(attempts);
    });

    it('should return empty array when no attempts exist', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const attempts = getAttempts();

      expect(attempts).toEqual([]);
    });
  });

  describe('certificate eligibility', () => {
    it('should set certificate eligibility to true', () => {
      setCertificateEligible(true);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cwail:cert:eligible',
        JSON.stringify(true)
      );
    });

    it('should set certificate eligibility to false', () => {
      setCertificateEligible(false);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cwail:cert:eligible',
        JSON.stringify(false)
      );
    });

    it('should retrieve certificate eligibility status', () => {
      localStorageMock.getItem.mockReturnValue('true');

      const eligible = isCertificateEligible();

      expect(localStorageMock.getItem).toHaveBeenCalledWith('cwail:cert:eligible');
      expect(eligible).toBe(true);
    });

    it('should return false when no eligibility status exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const eligible = isCertificateEligible();

      expect(eligible).toBe(false);
    });
  });

  describe('attempt order persistence', () => {
    it('should save attempt order', () => {
      const attemptId = 'test-attempt';
      const order = ['q1', 'q2', 'q3'];

      saveAttemptOrder(attemptId, order);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cwail:quiz:final:attemptOrder:test-attempt',
        JSON.stringify(order)
      );
    });

    it('should retrieve attempt order', () => {
      const attemptId = 'test-attempt';
      const order = ['q1', 'q2', 'q3'];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(order));

      const retrievedOrder = getAttemptOrder(attemptId);

      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'cwail:quiz:final:attemptOrder:test-attempt'
      );
      expect(retrievedOrder).toEqual(order);
    });

    it('should return empty array when no order exists', () => {
      const attemptId = 'non-existent-attempt';
      localStorageMock.getItem.mockReturnValue(null);

      const order = getAttemptOrder(attemptId);

      expect(order).toEqual([]);
    });
  });
});
