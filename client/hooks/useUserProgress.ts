import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UserProgress {
  dailyGoal: {
    target: number;
    completed: number;
    percentage: number;
  };
  todayXP: number;
  weeklyXP: number;
  monthlyXP: number;
  totalBadges: number;
  newBadges: number;
  completedTasks: Array<{
    id: string;
    title: string;
    subject: string;
    completed: boolean;
  }>;
  pendingTasks: Array<{
    id: string;
    title: string;
    subject: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }>;
  subjects: Array<{
    id: string;
    name: string;
    progress: number;
    levelsCompleted: number;
    totalLevels: number;
  }>;
}

export function useUserProgress() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Generate dynamic user progress based on user data
  const userProgress = useMemo((): UserProgress => {
    if (!user) {
      return {
        dailyGoal: { target: 100, completed: 0, percentage: 0 },
        todayXP: 0,
        weeklyXP: 0,
        monthlyXP: 0,
        totalBadges: 0,
        newBadges: 0,
        completedTasks: [],
        pendingTasks: [],
        subjects: []
      };
    }

    // For new users (0 XP), start with 0 progress
    // For existing users, calculate dynamic values based on level and XP
    const isNewUser = user.xp === 0;
    const baseMultiplier = Math.max(1, user.level - 1);
    const todayXP = isNewUser ? 0 : Math.floor((user.xp * 0.1) + (baseMultiplier * 25));
    const weeklyXP = isNewUser ? 0 : Math.floor(todayXP * 4.5);
    const monthlyXP = isNewUser ? 0 : Math.floor(weeklyXP * 3.8);
    
    // Daily goal calculation
    const dailyTarget = 50 + (user.level * 10);
    const dailyCompleted = Math.min(dailyTarget, todayXP);
    const dailyPercentage = Math.round((dailyCompleted / dailyTarget) * 100);

    // Badges calculation
    const totalBadges = Math.floor(user.xp / 100) + user.level;
    const newBadges = Math.max(0, Math.floor((user.xp % 500) / 100));

    // Dynamic tasks based on user progress
    const mathProgress = Math.min(5, Math.floor(user.xp / 150));
    const scienceProgress = Math.min(4, Math.floor(user.xp / 200));
    const englishProgress = Math.min(4, Math.floor(user.xp / 180));

    // For brand new users, show at least one task to get started
    const isNewUser = user.xp === 0;

    const completedTasks = [
      ...(mathProgress >= 1 ? [{ id: 'math1', title: 'Complete Counting Forest', subject: 'Math', completed: true }] : []),
      ...(mathProgress >= 2 ? [{ id: 'math2', title: 'Master Addition Arena', subject: 'Math', completed: true }] : []),
      ...(scienceProgress >= 1 ? [{ id: 'sci1', title: 'Explore Nature Garden', subject: 'Science', completed: true }] : []),
      ...(englishProgress >= 1 ? [{ id: 'eng1', title: 'Alphabet Adventure', subject: 'English', completed: true }] : []),
    ];

    const pendingTasks = [
      // For new users, show starter tasks
      ...(isNewUser ? [
        { id: 'math1', title: 'Start Counting Forest', subject: 'Math', difficulty: 'Easy' as const },
        { id: 'sci1', title: 'Explore Nature Garden', subject: 'Science', difficulty: 'Easy' as const },
        { id: 'eng1', title: 'Begin Alphabet Adventure', subject: 'English', difficulty: 'Easy' as const }
      ] : [
        // For existing users, show progression tasks
        ...(mathProgress < 3 ? [{ id: 'math3', title: 'Escape Subtraction Swamp', subject: 'Math', difficulty: 'Medium' as const }] : []),
        ...(scienceProgress < 2 ? [{ id: 'sci2', title: 'Launch Space Station', subject: 'Science', difficulty: 'Easy' as const }] : []),
        ...(englishProgress < 2 ? [{ id: 'eng2', title: 'Cast Word Spells', subject: 'English', difficulty: 'Easy' as const }] : []),
      ]),
    ];

    const subjects = [
      {
        id: 'math',
        name: 'Math Kingdom',
        progress: (mathProgress / 5) * 100,
        levelsCompleted: mathProgress,
        totalLevels: 5
      },
      {
        id: 'science',
        name: 'Science Lab',
        progress: (scienceProgress / 4) * 100,
        levelsCompleted: scienceProgress,
        totalLevels: 4
      },
      {
        id: 'english',
        name: 'Word Wizard',
        progress: (englishProgress / 4) * 100,
        levelsCompleted: englishProgress,
        totalLevels: 4
      }
    ];

    return {
      dailyGoal: {
        target: dailyTarget,
        completed: dailyCompleted,
        percentage: dailyPercentage
      },
      todayXP,
      weeklyXP,
      monthlyXP,
      totalBadges,
      newBadges,
      completedTasks,
      pendingTasks,
      subjects
    };
  }, [user]);

  useEffect(() => {
    // Simulate loading time for backend fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [user]);

  // Simulate backend API calls
  const refreshUserProgress = async () => {
    setIsLoading(true);
    // In real app, this would fetch from backend
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  return {
    userProgress,
    isLoading,
    refreshUserProgress
  };
}
