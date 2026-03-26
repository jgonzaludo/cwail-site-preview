import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionNav from '../components/SectionNav';
import QuizQuestion from '../components/QuizQuestion';
import QuizResults from '../components/QuizResults';
import Toast from '../components/Toast';
import finalQuiz from '../data/finalQuiz';
import {
  Question,
  Answer,
  QuizAttempt,
  QuizScore,
  ScoreDetails,
  generateAttemptId,
  randomizeQuestionOrder,
  saveAttemptOrder,
  saveLatestOrder,
  getAttemptOrder,
  getLatestOrder,
  saveAnswers,
  getAnswers,
  saveAttempt,
  getAttempts,
  saveScore,
  getScore,
  setCertificateEligible,
  isCertificateEligible,
  clearAnswers,
  updateProgress,
  calculateFinalQuizScore
} from '../lib/quizScoring';

const QuizFinal: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer>({});
  const [currentAttemptId, setCurrentAttemptId] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<QuizScore | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    initializeQuiz();
  }, []);

  const initializeQuiz = () => {
    try {
      const existingAnswers = getAnswers();
      const latestScore = getScore();

      if (Object.keys(existingAnswers).length > 0 && !latestScore) {
        setAnswers(existingAnswers);
        setQuestions(finalQuiz);
        setCurrentAttemptId(generateAttemptId());
      } else {
        const randomizedQuestions = randomizeQuestionOrder(finalQuiz);
        const newAttemptId = generateAttemptId();
        const questionOrder = randomizedQuestions.map(q => q.id);
        
        setQuestions(randomizedQuestions);
        setCurrentAttemptId(newAttemptId);
        setAnswers({});
        clearAnswers();
        
        // Save the order for this attempt
        saveAttemptOrder(newAttemptId, questionOrder);
        saveLatestOrder(questionOrder);
      }
      
      // Load existing data
      setScore(latestScore);
      setAttempts(getAttempts());
      setSubmitted(!!latestScore);
      
    } catch (error) {
      console.error('Failed to initialize quiz:', error);
      setToastType('error');
      setToastMessage('Failed to load quiz. Please refresh the page.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: number | number[] | string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    // Validate all questions are answered
    const unansweredQuestions = questions.filter(q => answers[q.id] === undefined || answers[q.id] === '');
    
    if (unansweredQuestions.length > 0) {
      setToastType('error');
      setToastMessage(`Please answer all questions. ${unansweredQuestions.length} questions remain unanswered.`);
      setShowToast(true);
      return;
    }

    setSubmitting(true);
    try {
      // Calculate score
      const result = calculateFinalQuizScore(answers, questions);
      const passed = result.score >= 8;
      
      // Create attempt record
      const attempt: QuizAttempt = {
        attemptId: currentAttemptId,
        timestamp: new Date().toISOString(),
        score: result.score,
        maxScore: result.maxScore,
        orderKey: `cwail:quiz:final:attemptOrder:${currentAttemptId}`
      };
      
      // Create score record
      const scoreRecord: QuizScore = {
        score: result.score,
        maxScore: result.maxScore,
        passed,
        timestamp: new Date().toISOString(),
        attemptId: currentAttemptId
      };
      
      // Save data
      saveAttempt(attempt);
      saveScore(scoreRecord);
      setAttempts(getAttempts());
      
      if (passed) {
        setCertificateEligible(true);
        updateProgress();
      }

      setScore(scoreRecord);
      setSubmitted(true);
      setToastType('success');
      setToastMessage(passed ? 'Quiz completed successfully!' : 'Quiz completed. You can retake it to improve your score.');
      setShowToast(true);
      
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setToastType('error');
      setToastMessage('Failed to submit quiz. Please try again.');
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    // Generate new attempt with new randomized order
    const randomizedQuestions = randomizeQuestionOrder(finalQuiz);
    const newAttemptId = generateAttemptId();
    const questionOrder = randomizedQuestions.map(q => q.id);
    
    setQuestions(randomizedQuestions);
    setCurrentAttemptId(newAttemptId);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    
    // Save new order and clear answers
    saveAttemptOrder(newAttemptId, questionOrder);
    saveLatestOrder(questionOrder);
    clearAnswers();
    
    setToastType('success');
    setToastMessage('New quiz attempt started. Good luck!');
    setShowToast(true);
  };

  const getScoreDetails = (questionId: string): ScoreDetails | undefined => {
    if (!score) return undefined;
    const result = calculateFinalQuizScore(answers, questions);
    return result.details.find(d => d.questionId === questionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <SectionNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SectionNav />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="cwail-surface rounded-xl shadow-cwail dark:shadow-cwail-dark p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-cwail-ink mb-2">
              CWAIL Final Quiz
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Test your understanding of AI and writing. You need 8/10 correct answers to pass.
            </p>
          </div>

          {submitted && score ? (
            <div>
              <QuizResults
                score={score.score}
                maxScore={score.maxScore}
                passed={score.passed}
                attempts={attempts}
                onRetake={handleRetake}
                isCertificateEligible={isCertificateEligible()}
              />
              
              {/* Show questions with results */}
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Question Review
                </h3>
                {questions.map((question, index) => (
                  <QuizQuestion
                    key={question.id}
                    question={question}
                    answer={answers[question.id]}
                    onAnswerChange={handleAnswerChange}
                    showResults={true}
                    result={getScoreDetails(question.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-6 mb-8">
                {questions.map((question, index) => (
                  <QuizQuestion
                    key={question.id}
                    question={question}
                    answer={answers[question.id]}
                    onAnswerChange={handleAnswerChange}
                    showResults={false}
                  />
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Questions answered: {Object.keys(answers).length}/{questions.length}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || Object.keys(answers).length !== questions.length}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
                >
                  {submitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default QuizFinal;
