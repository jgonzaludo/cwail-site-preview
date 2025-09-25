import { storage } from './storage';

export interface Question {
  id: string;
  type: 'mcq-single' | 'check-all' | 'ordering' | 'fill-blank';
  prompt: string;
  choices: string[];
  correct: {
    correctIndex?: number;
    correctSet?: number[];
    correctOrder?: number[];
    text?: string;
  };
}

export interface Answer {
  [questionId: string]: number | number[] | string;
}

export interface QuizAttempt {
  attemptId: string;
  timestamp: string;
  score: number;
  maxScore: number;
  orderKey: string;
}

export interface QuizScore {
  score: number;
  maxScore: number;
  passed: boolean;
  timestamp: string;
  attemptId: string;
}

export interface ScoreDetails {
  questionId: string;
  correct: boolean;
  earned: number;
  maxPoints: number;
}

export function generateAttemptId(): string {
  return `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function randomizeQuestionOrder(questions: Question[]): Question[] {
  return shuffleArray(questions);
}

export function saveAttemptOrder(attemptId: string, order: string[]): void {
  storage.set(`cwail:quiz:final:attemptOrder:${attemptId}`, order);
}

export function saveLatestOrder(order: string[]): void {
  storage.set(`cwail:quiz:final:latestOrder`, order);
}

export function getAttemptOrder(attemptId: string): string[] {
  return storage.get(`cwail:quiz:final:attemptOrder:${attemptId}`, []);
}

export function getLatestOrder(): string[] {
  return storage.get(`cwail:quiz:final:latestOrder`, []);
}

export function saveAnswers(answers: Answer): void {
  storage.set(`cwail:quiz:final:answers`, answers);
}

export function getAnswers(): Answer {
  return storage.get(`cwail:quiz:final:answers`, {});
}

export function saveAttempt(attempt: QuizAttempt): void {
  const attempts = storage.get(`cwail:quiz:final:attempts`, []);
  attempts.push(attempt);
  storage.set(`cwail:quiz:final:attempts`, attempts);
}

export function getAttempts(): QuizAttempt[] {
  return storage.get(`cwail:quiz:final:attempts`, []);
}

export function saveScore(score: QuizScore): void {
  storage.set(`cwail:quiz:final:score`, score);
}

export function getScore(): QuizScore | null {
  return storage.get(`cwail:quiz:final:score`, null);
}

export function setCertificateEligible(eligible: boolean): void {
  storage.set(`cwail:cert:eligible`, eligible);
}

export function isCertificateEligible(): boolean {
  return storage.get(`cwail:cert:eligible`, false);
}

export function clearAnswers(): void {
  storage.remove(`cwail:quiz:final:answers`);
}

export function updateProgress(): void {
  const progress = storage.get('cwail:progress', { completedSections: [] });
  if (!progress.completedSections.includes('final_quiz')) {
    progress.completedSections.push('final_quiz');
    storage.set('cwail:progress', progress);
  }
}

export function calculateFinalQuizScore(
  answers: Answer, 
  questions: Question[]
): { score: number; maxScore: number; details: ScoreDetails[] } {
  const details: ScoreDetails[] = [];
  let totalEarned = 0;
  let totalMax = 0;

  for (const question of questions) {
    const answer = answers[question.id];
    let earned = 0;
    let correct = false;

    if (answer !== undefined) {
      switch (question.type) {
        case 'mcq-single':
          correct = answer === question.correct.correctIndex;
          earned = correct ? 1 : 0;
          break;

        case 'check-all':
          const answerArray = Array.isArray(answer) ? answer : [answer];
          const correctArray = question.correct.correctSet || [];
          // Exact set match required
          const answerSet = new Set(answerArray.sort());
          const correctSet = new Set(correctArray.sort());
          correct = answerSet.size === correctSet.size && 
                   [...answerSet].every(val => correctSet.has(val));
          earned = correct ? 1 : 0;
          break;

        case 'ordering':
          const answerOrder = Array.isArray(answer) ? answer : [answer];
          const correctOrder = question.correct.correctOrder || [];
          // Exact sequence match required
          correct = answerOrder.length === correctOrder.length &&
                   answerOrder.every((val, index) => val === correctOrder[index]);
          earned = correct ? 1 : 0;
          break;

        case 'fill-blank':
          const answerText = String(answer).toLowerCase().trim().replace(/\s+/g, ' ');
          const correctText = String(question.correct.text || '').toLowerCase().trim().replace(/\s+/g, ' ');
          correct = answerText === correctText;
          earned = correct ? 1 : 0;
          break;
      }
    }

    details.push({
      questionId: question.id,
      correct,
      earned,
      maxPoints: 1
    });

    totalEarned += earned;
    totalMax += 1;
  }

  return {
    score: totalEarned,
    maxScore: totalMax,
    details
  };
}
