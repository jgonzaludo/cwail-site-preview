# CWAIL Final Quiz - Verification Guide

## Setup and Installation

```bash
npm install
npm run dev
```

## Verification Steps

### 1. Basic Quiz Access
1. Open browser to `http://localhost:5173/module/final-quiz`
2. Verify the quiz loads with 10 questions
3. Check that questions are randomized on each new attempt

### 2. Answer Persistence
1. Fill out some questions (don't complete all)
2. Refresh the page
3. Verify answers are preserved
4. Complete the remaining questions

### 3. Submit and Scoring
1. Submit the quiz with all questions answered
2. Check the score display (should show X/10 with percentage)
3. Verify pass/fail logic (8/10 = 80% required to pass)

### 4. LocalStorage Verification
Open browser DevTools → Application → Local Storage → `http://localhost:5173` and verify these keys exist:

#### After submitting quiz:
- `cwail:quiz:final:answers` - Contains current answers
- `cwail:quiz:final:attempts` - Array of attempt history
- `cwail:quiz:final:score` - Latest score summary
- `cwail:quiz:final:attemptOrder:{attemptId}` - Question order for specific attempt
- `cwail:quiz:final:latestOrder` - Latest question order

#### After passing (8+ correct):
- `cwail:cert:eligible` - Set to `true`
- `cwail:progress` - Should include `final_quiz` in completedSections

### 5. Retake Functionality
1. Click "Retake Quiz" button
2. Verify:
   - Answers are cleared (`cwail:quiz:final:answers` should be removed)
   - New randomized question order
   - Attempt history is preserved
   - Can answer and submit again

### 6. Question Type Testing

#### Multiple Choice Single (Questions 1, 2, 3, 4, 8, 9):
- Select one option per question
- Verify only one can be selected at a time

#### Check All (Questions 5, 10):
- Select multiple options
- Verify multiple selections are allowed
- Test that all correct options must be selected for points

#### Ordering (Question 6):
- Use up/down arrows to reorder items
- Verify items move correctly
- Test that exact sequence is required for points

#### Fill Blank (Question 7):
- Type answer in text input
- Test case-insensitive matching
- Test whitespace trimming

### 7. Results Display
1. After submission, verify:
   - Banner shows pass/fail status
   - Score is displayed prominently
   - Question review shows correct/incorrect for each
   - Correct answers are shown for incorrect responses
   - Certificate eligibility badge appears if passed

### 8. Accessibility Testing
1. Navigate using keyboard only (Tab, Enter, Space)
2. Verify focus indicators are visible
3. Check that ordering controls are keyboard accessible
4. Test screen reader compatibility with aria-labels

### 9. Run Tests
```bash
npm test
```

Verify these tests pass:
- `quizScoring.spec.ts` - Scoring logic tests
- `quizPersistence.spec.ts` - localStorage persistence tests

## Expected Behavior

### Scoring Rules
- Each question worth 1 point (10 total)
- Pass threshold: 8/10 (80%)
- Exact match required for all question types
- No partial credit

### Persistence Behavior
- Answers saved on every change
- Attempt history preserved across retakes
- Question order randomized per attempt
- Certificate eligibility persists after passing

### UI Behavior
- Real-time answer validation
- Clear visual feedback for correct/incorrect
- Responsive design works on mobile
- Dark mode support

## Troubleshooting

### Quiz Won't Load
- Check console for errors
- Verify `/module/final-quiz` route is registered
- Ensure all imports are correct

### Answers Not Persisting
- Check localStorage is available (not in private mode)
- Verify localStorage keys are prefixed with `cwail:`
- Check browser storage limits

### Scoring Issues
- Verify exact match logic for each question type
- Check that all questions have correct answers defined
- Test edge cases (empty answers, partial answers)

### Randomization Issues
- Verify Fisher-Yates shuffle implementation
- Check that each attempt gets new random order
- Ensure order is persisted per attempt
