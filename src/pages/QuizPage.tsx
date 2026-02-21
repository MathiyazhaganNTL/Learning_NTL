import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle,
  Trophy,
  Star,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockQuizzes } from '@/data/mockData';
import { cn } from '@/lib/utils';

type QuizState = 'intro' | 'question' | 'result';

const NEXT_RANK_POINTS = 100; // fallback if badge not available
export default function QuizPage() {
  const { courseId, quizId } = useParams();
  const [state, setState] = useState<QuizState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [attemptNumber] = useState(1);

  // Points popup state
  const [showPointsPopup, setShowPointsPopup] = useState(false);
  const [pointsJustEarned, setPointsJustEarned] = useState(0);

  // Course completion button state
  const [courseCompleted, setCourseCompleted] = useState(false);

  // For points and badge logic
  const { user, currentBadge, nextBadge } = useAuth();
  const [currentPoints, setCurrentPoints] = useState(user?.totalPoints || 0);

  const quiz = mockQuizzes.find((q) => q.id === quizId);

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Quiz not found</h1>
          <Button asChild>
            <Link to={`/course/${courseId}`}>Back to Course</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question) => {
      const selected = selectedAnswers[question.id] || [];
      const isCorrect = 
        selected.length === question.correctOptionIds.length &&
        selected.every((id) => question.correctOptionIds.includes(id));
      if (isCorrect) correct++;
    });
    return correct;
  };

  const getPointsEarned = () => {
    const score = calculateScore();
    const percentage = (score / totalQuestions) * 100;
    if (percentage < 50) return 0;
    
    switch (attemptNumber) {
      case 1: return quiz.rewardConfig.firstAttempt;
      case 2: return quiz.rewardConfig.secondAttempt;
      case 3: return quiz.rewardConfig.thirdAttempt;
      default: return quiz.rewardConfig.fourthPlusAttempt;
    }
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: [optionId],
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setState('result');
      // Show points popup if quiz is passed
      const score = calculateScore();
      const percentage = (score / totalQuestions) * 100;
      const pointsEarned = getPointsEarned();
      if (percentage >= 50 && pointsEarned > 0) {
        setPointsJustEarned(pointsEarned);
        setShowPointsPopup(true);
        setCurrentPoints((prev) => prev + pointsEarned);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (state === 'intro') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-lg text-center">
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full gradient-primary">
            <Star className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="mb-4 text-3xl font-bold">{quiz.title}</h1>
          <p className="mb-8 text-muted-foreground">
            Test your knowledge with {totalQuestions} questions. 
            Complete the quiz to earn up to {quiz.rewardConfig.firstAttempt} points!
          </p>
          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 font-semibold">Points Reward System</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="font-medium">1st Attempt</p>
                <p className="text-2xl font-bold text-primary">{quiz.rewardConfig.firstAttempt} pts</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="font-medium">2nd Attempt</p>
                <p className="text-2xl font-bold text-primary">{quiz.rewardConfig.secondAttempt} pts</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="font-medium">3rd Attempt</p>
                <p className="text-2xl font-bold text-primary">{quiz.rewardConfig.thirdAttempt} pts</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="font-medium">4th+ Attempt</p>
                <p className="text-2xl font-bold text-primary">{quiz.rewardConfig.fourthPlusAttempt} pts</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" asChild>
              <Link to={`/course/${courseId}/learn`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button className="flex-1" onClick={() => setState('question')}>
              Start Quiz
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'result') {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    const pointsEarned = getPointsEarned();
    const isPassing = percentage >= 50;

    return (
      <>
        {/* Points Popup Modal */}
        <Dialog open={showPointsPopup} onOpenChange={setShowPointsPopup}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="mb-2 text-2xl font-bold">Bingo! You have earned!</DialogTitle>
            </DialogHeader>
            <div className="mb-4 text-lg font-semibold text-primary">You earned {pointsJustEarned} points</div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{currentPoints} points</span>
                <span>{nextBadge?.requiredPoints || NEXT_RANK_POINTS} Points</span>
              </div>
              <Progress value={Math.min((currentPoints / (nextBadge?.requiredPoints || NEXT_RANK_POINTS)) * 100, 100)} />
            </div>
            <div className="mb-4 text-center text-muted-foreground">Reach the next rank to gain more points.</div>
            {/* Close button handled by DialogClose */}
          </DialogContent>
        </Dialog>

        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-lg text-center">
            <div className={cn(
              "mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full",
              isPassing ? "gradient-success" : "bg-destructive"
            )}>
              {isPassing ? (
                <Trophy className="h-12 w-12 text-success-foreground" />
              ) : (
                <XCircle className="h-12 w-12 text-destructive-foreground" />
              )}
            </div>
            <h1 className="mb-2 text-3xl font-bold">
              {isPassing ? 'Congratulations!' : 'Keep Trying!'}
            </h1>
            <p className="mb-8 text-muted-foreground">
              {isPassing
                ? "You've successfully completed the quiz!"
                : "You need at least 50% to pass. Try again!"}
            </p>
            {/* Score */}
            <div className="mb-8 rounded-xl border border-border bg-card p-6">
              <div className="mb-6 text-center">
                <p className="text-sm text-muted-foreground">Your Score</p>
                <p className="text-5xl font-bold">{percentage}%</p>
                <p className="text-muted-foreground">{score} of {totalQuestions} correct</p>
              </div>
              {/* Points Earned */}
              {isPassing && (
                <div className="animate-points-pop rounded-lg gradient-primary p-4 text-primary-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-lg font-semibold">+{pointsEarned} Points Earned!</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" asChild>
                <Link to={`/course/${courseId}/learn`}>
                  Back to Course
                </Link>
              </Button>
              {!isPassing && (
                <Button
                  className="flex-1"
                  onClick={() => {
                    setState('intro');
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers({});
                  }}
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      {/* Question */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <h2 className="mb-8 text-center text-2xl font-semibold">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswers[currentQuestion.id]?.includes(option.id);

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground"
                  )}>
                    {isSelected && <CheckCircle className="h-5 w-5" />}
                  </div>
                  <span className="text-lg">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card p-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion.id]?.length}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Submit' : 'Next'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
