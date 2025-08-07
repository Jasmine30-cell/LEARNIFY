import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface GameQuestion {
  id: string;
  question: string;
  options: string[] | number[];
  correctAnswer: string | number;
  hint?: string;
  explanation?: string;
}

interface GameState {
  currentQuestion: number;
  score: number;
  totalQuestions: number;
  wrongAttempts: number;
  maxAttempts: number;
  gameComplete: boolean;
  showCelebration: boolean;
  showIncorrectFeedback: boolean;
  isLevelUp: boolean;
  newLevel?: number;
}

export function useGameState(questions: GameQuestion[], maxAttempts = 3, levelId?: number, gameId?: string) {
  const { user, updateStats, markGameCompleted } = useAuth();
  
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    totalQuestions: questions.length,
    wrongAttempts: 0,
    maxAttempts,
    gameComplete: false,
    showCelebration: false,
    showIncorrectFeedback: false,
    isLevelUp: false
  });

  const [userAnswers, setUserAnswers] = useState<(string | number | null)[]>(
    new Array(questions.length).fill(null)
  );

  const checkAnswer = useCallback((selectedAnswer: string | number) => {
    const currentQ = questions[gameState.currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    if (isCorrect) {
      // Correct answer logic
      const oldLevel = user?.level || 1;
      const xpGained = 10;
      const coinsGained = 5;
      
      // Update user stats
      updateStats(xpGained, coinsGained);
      
      // Check if level up occurred
      const newXP = (user?.xp || 0) + xpGained;
      const newLevel = Math.floor(newXP / 500) + 1;
      const leveledUp = newLevel > oldLevel;
      
      setGameState(prev => ({
        ...prev,
        score: prev.score + 1,
        wrongAttempts: 0,
        showCelebration: true,
        isLevelUp: leveledUp,
        newLevel: leveledUp ? newLevel : undefined
      }));

      setUserAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[gameState.currentQuestion] = selectedAnswer;
        return newAnswers;
      });

      return { correct: true, xpGained, coinsGained, leveledUp, newLevel };
    } else {
      // Incorrect answer logic
      const newWrongAttempts = gameState.wrongAttempts + 1;
      
      setGameState(prev => ({
        ...prev,
        wrongAttempts: newWrongAttempts,
        showIncorrectFeedback: true
      }));

      return { 
        correct: false, 
        attempts: newWrongAttempts, 
        maxAttempts,
        showHint: newWrongAttempts >= 2
      };
    }
  }, [gameState.currentQuestion, gameState.wrongAttempts, questions, user, updateStats, maxAttempts]);

  const nextQuestion = useCallback(() => {
    if (gameState.currentQuestion < questions.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        wrongAttempts: 0,
        showCelebration: false,
        showIncorrectFeedback: false,
        isLevelUp: false
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        gameComplete: true,
        showCelebration: false,
        showIncorrectFeedback: false
      }));

      // Mark game as completed
      if (levelId && gameId) {
        markGameCompleted(levelId, gameId, gameState.score + 1); // +1 because score hasn't been updated yet
      }
    }
  }, [gameState.currentQuestion, gameState.score, questions.length, levelId, gameId, markGameCompleted]);

  const retryQuestion = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showIncorrectFeedback: false
    }));
  }, []);

  const showHint = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showIncorrectFeedback: false
    }));
    // Logic to show hint - could trigger a hint modal or reveal correct answer
    return {
      hint: questions[gameState.currentQuestion]?.hint,
      explanation: questions[gameState.currentQuestion]?.explanation,
      correctAnswer: questions[gameState.currentQuestion]?.correctAnswer
    };
  }, [gameState.currentQuestion, questions]);

  const resetGame = useCallback(() => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      totalQuestions: questions.length,
      wrongAttempts: 0,
      maxAttempts,
      gameComplete: false,
      showCelebration: false,
      showIncorrectFeedback: false,
      isLevelUp: false
    });
    setUserAnswers(new Array(questions.length).fill(null));
  }, [questions.length, maxAttempts]);

  const closeCelebration = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showCelebration: false,
      isLevelUp: false
    }));
    
    // Automatically move to next question after celebration
    setTimeout(() => {
      nextQuestion();
    }, 500);
  }, [nextQuestion]);

  const closeIncorrectFeedback = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showIncorrectFeedback: false
    }));
  }, []);

  return {
    gameState,
    userAnswers,
    currentQuestion: questions[gameState.currentQuestion],
    checkAnswer,
    nextQuestion,
    retryQuestion,
    showHint,
    resetGame,
    closeCelebration,
    closeIncorrectFeedback,
    progress: {
      completed: gameState.currentQuestion,
      total: questions.length,
      percentage: (gameState.currentQuestion / questions.length) * 100
    }
  };
}
