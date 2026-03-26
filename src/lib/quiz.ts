import { storage } from './storage';
import { markCompleted } from './progress';

export interface Question {
  id: string;
  type: 'multipleChoiceSingle' | 'multipleChoiceMultiple' | 'shortAnswer' | 'likert' | 'code';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface QuizResult {
  score: number;
  maxScore: number;
  details: {
    id: string;
    points: number;
    earned: number;
    correct: boolean;
  }[];
  timestamp: string;
}

/** Builds answer payloads that match each question's keyed correct answers (for demo / verification flows). */
export function buildCorrectAnswersForQuestions(questions: Question[]): Answer[] {
  const out: Answer[] = [];
  for (const q of questions) {
    switch (q.type) {
      case 'multipleChoiceSingle':
        if (typeof q.correctAnswer === 'string') {
          out.push({ questionId: q.id, value: q.correctAnswer });
        }
        break;
      case 'multipleChoiceMultiple':
        if (Array.isArray(q.correctAnswer)) {
          out.push({ questionId: q.id, value: [...q.correctAnswer] });
        } else if (typeof q.correctAnswer === 'string') {
          out.push({ questionId: q.id, value: [q.correctAnswer] });
        }
        break;
      case 'shortAnswer':
        out.push({ questionId: q.id, value: String(q.correctAnswer ?? '') });
        break;
      case 'likert':
        out.push({ questionId: q.id, value: q.options?.[0] ?? '' });
        break;
      case 'code':
        out.push({ questionId: q.id, value: '—' });
        break;
      default:
        break;
    }
  }
  return out;
}

export function calculateScore(answers: Answer[], questions: Question[]): QuizResult {
  const details: QuizResult['details'] = [];
  let totalEarned = 0;
  let totalMax = 0;

  for (const question of questions) {
    const answer = answers.find(a => a.questionId === question.id);
    let earned = 0;
    let correct = false;

    if (answer && answer.value !== undefined && answer.value !== null) {
      switch (question.type) {
        case 'multipleChoiceSingle':
          correct = answer.value === question.correctAnswer;
          earned = correct ? 1 : 0;
          break;

        case 'multipleChoiceMultiple': {
          const raw = Array.isArray(answer.value) ? answer.value : [answer.value];
          const answerArray = raw.filter((v): v is string => typeof v === 'string');
          const correctAnswer = question.correctAnswer;
          if (!correctAnswer) {
            correct = false;
            earned = 0;
            break;
          }
          const correctArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
          const hasAllCorrect = correctArray.every(c => answerArray.includes(c));
          const hasIncorrect = answerArray.some(ans => !correctArray.includes(ans));
          correct = hasAllCorrect && !hasIncorrect;
          earned = correct ? 1 : 0;
          break;
        }

        case 'shortAnswer': {
          const answerText = String(answer.value).toLowerCase().trim();
          const correctText = String(question.correctAnswer || '').toLowerCase().trim();
          correct = answerText === correctText;
          earned = correct ? 1 : 0;
          break;
        }

        case 'likert':
          correct = true;
          earned = 1;
          break;

        case 'code':
          correct = String(answer.value).trim().length > 0;
          earned = correct ? 1 : 0;
          break;

        default:
          correct = false;
          earned = 0;
          break;
      }
    }

    details.push({
      id: question.id,
      points: 1,
      earned,
      correct
    });

    totalEarned += earned;
    totalMax += 1;
  }

  return {
    score: totalEarned,
    maxScore: totalMax,
    details,
    timestamp: new Date().toISOString()
  };
}

export function saveQuizAnswers(moduleId: string, answers: Answer[]): void {
  storage.set(`cwail:answers:${moduleId}`, answers);
}

export function saveQuizResult(moduleId: string, result: QuizResult): void {
  storage.set(`cwail:scores:${moduleId}`, result);
}

export function getQuizAnswers(moduleId: string): Answer[] {
  return storage.get(`cwail:answers:${moduleId}`, []);
}

export function getQuizResult(moduleId: string): QuizResult | null {
  return storage.get(`cwail:scores:${moduleId}`, null);
}

export function isQuizCompleted(moduleId: string): boolean {
  const result = getQuizResult(moduleId);
  return result !== null;
}

export function markQuizCompleted(moduleId: string): void {
  markCompleted(moduleId);
}
