import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionNav from '../components/SectionNav';
import Toast from '../components/Toast';
import { getAllRequiredSections, isCompleted } from '../lib/progress';
import { 
  calculateScore,
  buildCorrectAnswersForQuestions,
  saveQuizAnswers, 
  saveQuizResult, 
  getQuizAnswers, 
  getQuizResult,
  markQuizCompleted,
  type Question,
  type Answer,
  type Quiz,
  type QuizResult
} from '../lib/quiz';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // Check if all required sections are completed
    const requiredSections = getAllRequiredSections();
    const allCompleted = requiredSections.every(sectionId => isCompleted(sectionId));
    
    if (!allCompleted) {
      // Find the first incomplete section and redirect there
      const firstIncomplete = requiredSections.find(sectionId => !isCompleted(sectionId));
      if (firstIncomplete) {
        navigate(`/course/${firstIncomplete}`);
      } else {
        navigate('/course/introduction');
      }
      return;
    }

    // Load quiz data
    loadQuiz();
  }, [navigate]);

  const loadQuiz = async () => {
    try {
      const response = await fetch('/content/quiz.json');
      const quizData = await response.json();
      
      // Shuffle questions for each new quiz attempt
      const shuffledQuestions = [...quizData.questions].sort(() => Math.random() - 0.5);
      const shuffledQuiz = { ...quizData, questions: shuffledQuestions };
      
      setQuiz(shuffledQuiz);
      
      // Load existing answers and results
      const existingAnswers = getQuizAnswers(quizData.id);
      const existingResult = getQuizResult(quizData.id);
      
      setAnswers(existingAnswers);
      setResult(existingResult);
    } catch (error) {
      console.error('Failed to load quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== questionId);
      return [...filtered, { questionId, value }];
    });
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    setSubmitting(true);
    try {
      if (answers.length !== quiz.questions.length) {
        throw new Error(`Please answer all questions. ${answers.length}/${quiz.questions.length} answered.`);
      }

      const quizResult = calculateScore(answers, quiz.questions);

      saveQuizAnswers(quiz.id, answers);
      saveQuizResult(quiz.id, quizResult);
      markQuizCompleted(quiz.id);

      setResult(quizResult);
      setToastType('success');
      setToastMessage('Quiz submitted successfully!');
      setShowToast(true);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setToastType('error');
      setToastMessage(`Failed to submit quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePerfectScoreSubmit = () => {
    if (!quiz || result) return;

    setSubmitting(true);
    try {
      const perfectAnswers = buildCorrectAnswersForQuestions(quiz.questions);
      if (perfectAnswers.length !== quiz.questions.length) {
        throw new Error('Could not build answers for all questions.');
      }

      const quizResult = calculateScore(perfectAnswers, quiz.questions);

      saveQuizAnswers(quiz.id, perfectAnswers);
      saveQuizResult(quiz.id, quizResult);
      markQuizCompleted(quiz.id);

      setAnswers(perfectAnswers);
      setResult(quizResult);
      setToastType('success');
      setToastMessage(`Submitted with all correct answers: ${quizResult.score}/${quizResult.maxScore}.`);
      setShowToast(true);
    } catch (error) {
      console.error('Perfect score submit failed:', error);
      setToastType('error');
      setToastMessage(
        `Could not apply perfect score: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question: Question, index: number) => {
    const answer = answers.find(a => a.questionId === question.id);
    const resultDetail = result?.details.find(d => d.id === question.id);

    return (
      <div key={question.id} className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Question {index + 1}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            1 point
          </span>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {question.question}
        </p>

        {question.type === 'multipleChoiceSingle' && (
          <div className="space-y-4">
            {question.options?.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answer?.value === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  disabled={!!result}
                  className="mt-1 h-5 w-5 min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] text-blue-600 focus:ring-blue-500 border-gray-300 flex-shrink-0"
                  style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', maxWidth: '20px', maxHeight: '20px' }}
                />
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'multipleChoiceMultiple' && (
          <div className="space-y-4">
            {question.options?.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Array.isArray(answer?.value) ? answer.value.includes(option) : false}
                  onChange={(e) => {
                    const currentValues = Array.isArray(answer?.value) ? answer.value : [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleAnswerChange(question.id, newValues);
                  }}
                  disabled={!!result}
                  className="mt-1 h-5 w-5 min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                  style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', maxWidth: '20px', maxHeight: '20px' }}
                />
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'shortAnswer' && (
          <input
            type="text"
            value={String(answer?.value || '')}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            disabled={!!result}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your answer..."
          />
        )}

        {question.type === 'likert' && (
          <div className="flex space-x-4">
            {question.options?.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answer?.value === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  disabled={!!result}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'code' && (
          <textarea
            value={String(answer?.value || '')}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            disabled={!!result}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="Enter your response..."
          />
        )}

        {resultDetail && (
          <div className={`mt-4 p-3 rounded-lg ${
            resultDetail.correct 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-semibold ${
                resultDetail.correct 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {resultDetail.correct ? '✓ Correct' : '✗ Incorrect'}
              </span>
              <span className={`text-sm font-medium ${
                resultDetail.correct 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {resultDetail.earned}/{resultDetail.points} points
              </span>
            </div>
            {question.explanation && (
              <p className={`text-sm ${
                resultDetail.correct 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {question.explanation}
              </p>
            )}
          </div>
        )}
      </div>
    );
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

  if (!quiz) {
    return (
      <div className="min-h-screen">
        <SectionNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">Failed to load quiz.</p>
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
          <h1 className="text-3xl font-display font-bold text-cwail-ink mb-8">
            {quiz.title}
          </h1>
            
            {result ? (
              <div className="text-center py-8">
                <div className={`p-6 rounded-lg border mb-8 ${
                  result.score >= 8 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}>
                  <h2 className={`text-2xl font-semibold mb-2 ${
                    result.score >= 8 
                      ? 'text-green-900 dark:text-green-100' 
                      : 'text-red-900 dark:text-red-100'
                  }`}>
                    {result.score >= 8 ? 'Quiz Passed!' : 'Quiz Not Passed'}
                  </h2>
                  <p className={`mb-4 ${
                    result.score >= 8 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    You scored {result.score} out of {result.maxScore} points
                  </p>
                  <div className={`text-3xl font-bold ${
                    result.score >= 8 
                      ? 'text-green-900 dark:text-green-100' 
                      : 'text-red-900 dark:text-red-100'
                  }`}>
                    {Math.round((result.score / result.maxScore) * 100)}%
                  </div>
                  <p className={`text-sm mt-2 ${
                    result.score >= 8 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {result.score >= 8 
                      ? 'Congratulations! You have successfully completed the quiz.' 
                      : 'You need 8/10 (80%) to pass.'}
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {quiz.questions.map((question, index) => renderQuestion(question, index))}
                </div>
                
                <div className="flex justify-center space-x-4">
                  {result.score < 8 && (
                    <button
                      onClick={() => {
                        setResult(null);
                        setAnswers([]);
                        setToastType('success');
                        setToastMessage('New quiz attempt started. Good luck!');
                        setShowToast(true);
                      }}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Retake Quiz
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-4 mb-8">
                  {quiz.questions.map((question, index) => renderQuestion(question, index))}
                </div>
                
                <div className="flex flex-col items-stretch sm:items-end gap-3 w-full">
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                    Questions answered: {answers.length}/{quiz.questions.length}
                  </div>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-end">
                    <button
                      type="button"
                      onClick={handlePerfectScoreSubmit}
                      disabled={submitting}
                      className="inline-flex items-center justify-center px-6 py-3 border-2 border-cwail-accent2 text-cwail-accent2 hover:bg-cwail-accent2/10 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cwail-accent2 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Submit perfect score ({quiz.questions.length}/{quiz.questions.length})
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting || answers.length !== quiz.questions.length}
                      className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
                    >
                      {submitting ? 'Submitting...' : 'Submit Quiz'}
                    </button>
                  </div>
                  <p className="text-xs text-cwail-muted text-right max-w-md ml-auto">
                    &ldquo;Submit perfect score&rdquo; fills every question with the correct choices and saves a passing result—same as getting every item right.
                  </p>
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

export default QuizPage;