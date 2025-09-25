import { storage } from './storage';

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

export function calculateScore(answers: Answer[], questions: Question[]): QuizResult {
  const details: QuizResult['details'] = [];
  let totalEarned = 0;
  let totalMax = 0;

  for (const question of questions) {
    console.log('Processing question:', question.id, 'type:', question.type, 'correctAnswer:', question.correctAnswer);
    const answer = answers.find(a => a.questionId === question.id);
    console.log('Found answer:', answer);
    let earned = 0;
    let correct = false;

    if (answer && answer.value !== undefined && answer.value !== null) {
      switch (question.type) {
        case 'multipleChoiceSingle':
          correct = answer.value === question.correctAnswer;
          earned = correct ? 1 : 0;
          break;
        
        case 'multipleChoiceMultiple':
          console.log('Processing multiple choice multiple:', { answerValue: answer.value, correctAnswer: question.correctAnswer });
          const answerArray = Array.isArray(answer.value) ? answer.value : [answer.value];
          const correctAnswer = question.correctAnswer;
          if (!correctAnswer) {
            console.log('No correct answer found for question:', question.id);
            correct = false;
            earned = 0;
            break;
          }
          const correctArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
          console.log('Answer array:', answerArray, 'Correct array:', correctArray);
          // Check if all correct answers are selected and no incorrect ones
          const hasAllCorrect = correctArray.every(correct => answerArray.includes(correct));
          const hasIncorrect = answerArray.some(ans => !correctArray.includes(ans));
          correct = hasAllCorrect && !hasIncorrect;
          earned = correct ? 1 : 0;
          console.log('Result:', { hasAllCorrect, hasIncorrect, correct, earned });
          break;
        
        case 'shortAnswer':
          // Case-insensitive, trimmed comparison
          const answerText = String(answer.value).toLowerCase().trim();
          const correctText = String(question.correctAnswer || '').toLowerCase().trim();
          correct = answerText === correctText;
          earned = correct ? 1 : 0;
          break;
        
        case 'likert':
          // For likert scale, we'll accept any answer as correct (participation points)
          correct = true;
          earned = 1;
          break;
        
        case 'code':
          // Code questions are marked as submitted if any answer is provided
          correct = String(answer.value).trim().length > 0;
          earned = correct ? 1 : 0;
          break;
        
        default:
          // Handle unknown question types gracefully
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
  const progress = storage.get('cwail:progress', { completedSections: [] });
  if (!progress.completedSections.includes(moduleId)) {
    progress.completedSections.push(moduleId);
    storage.set('cwail:progress', progress);
  }
}
