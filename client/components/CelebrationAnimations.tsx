import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Coins, Zap, Trophy, Sparkles, Crown } from 'lucide-react';

interface CelebrationProps {
  show: boolean;
  xpGained: number;
  coinsGained: number;
  onComplete: () => void;
  isLevelUp?: boolean;
  newLevel?: number;
}

export function CelebrationOverlay({ 
  show, 
  xpGained, 
  coinsGained, 
  onComplete, 
  isLevelUp = false,
  newLevel 
}: CelebrationProps) {
  const [phase, setPhase] = useState<'confetti' | 'stats' | 'levelup' | 'complete'>('confetti');

  useEffect(() => {
    if (!show) return;
    
    const timer1 = setTimeout(() => setPhase('stats'), 1000);
    const timer2 = setTimeout(() => {
      if (isLevelUp) {
        setPhase('levelup');
      } else {
        setPhase('complete');
      }
    }, 2500);
    const timer3 = setTimeout(() => {
      if (isLevelUp) {
        setPhase('complete');
      }
    }, 4000);
    const timer4 = setTimeout(() => {
      onComplete();
    }, isLevelUp ? 5000 : 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [show, isLevelUp, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Confetti Animation */}
      {phase === 'confetti' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {Math.random() > 0.5 ? (
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              ) : (
                <Sparkles className="h-4 w-4 text-purple-500" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Celebration Card */}
      <Card className="w-full max-w-md mx-4 border-4 border-yellow-400 shadow-2xl animate-pulse">
        <CardContent className="p-8 text-center">
          {phase === 'confetti' && (
            <div className="space-y-4">
              <div className="text-6xl animate-bounce">🎉</div>
              <h1 className="text-3xl font-bold text-green-600">Correct!</h1>
              <p className="text-lg text-muted-foreground">Amazing work!</p>
            </div>
          )}

          {phase === 'stats' && (
            <div className="space-y-6">
              <div className="text-4xl">✨</div>
              <h2 className="text-2xl font-bold text-green-600">Rewards Earned!</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gamify-xp/10 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="h-6 w-6 text-gamify-xp" />
                    <span className="text-2xl font-bold text-gamify-xp animate-bounce">+{xpGained}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">XP Gained</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coins className="h-6 w-6 text-yellow-600" />
                    <span className="text-2xl font-bold text-yellow-600 animate-bounce">+{coinsGained}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Coins</p>
                </div>
              </div>
            </div>
          )}

          {phase === 'levelup' && isLevelUp && (
            <div className="space-y-6">
              <div className="text-6xl animate-spin">👑</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                LEVEL UP!
              </h2>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-6 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="h-8 w-8 text-yellow-600" />
                  <span className="text-4xl font-bold text-yellow-600">Level {newLevel}</span>
                </div>
                <p className="text-lg text-muted-foreground">You've reached a new level!</p>
              </div>
            </div>
          )}

          {phase === 'complete' && (
            <div className="space-y-4">
              <div className="text-4xl">🌟</div>
              <h3 className="text-xl font-bold text-green-600">Keep Learning!</h3>
              <p className="text-muted-foreground">You're doing amazing!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface IncorrectFeedbackProps {
  show: boolean;
  attempts: number;
  maxAttempts: number;
  onRetry: () => void;
  onHint: () => void;
  onClose: () => void;
}

export function IncorrectFeedback({ 
  show, 
  attempts, 
  maxAttempts, 
  onRetry, 
  onHint, 
  onClose 
}: IncorrectFeedbackProps) {
  if (!show) return null;

  const isLastAttempt = attempts >= maxAttempts;
  const encouragementMessages = [
    "Not quite right, but you're learning!",
    "Close! Give it another try!",
    "Learning is all about trying again!",
    "Don't worry, practice makes perfect!"
  ];
  
  const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 border-2 border-orange-300 shadow-xl">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">🤔</div>
          <h3 className="text-xl font-semibold mb-2 text-orange-700 dark:text-orange-400">
            Oops! Not quite right
          </h3>
          <p className="text-muted-foreground mb-4">{randomMessage}</p>
          
          <Badge variant="outline" className="mb-4">
            Attempt {attempts} of {maxAttempts}
          </Badge>

          <div className="space-y-3">
            {!isLastAttempt ? (
              <div className="flex gap-3">
                <button
                  onClick={onRetry}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Try Again
                </button>
                {attempts >= 2 && (
                  <button
                    onClick={onHint}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    💡 Get Hint
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  You've used all your attempts. Here's a hint to help you learn!
                </p>
                <button
                  onClick={onHint}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  💡 Show Answer & Explanation
                </button>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Continue Learning
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface FloatingRewardProps {
  show: boolean;
  type: 'xp' | 'coins';
  amount: number;
  x: number;
  y: number;
}

export function FloatingReward({ show, type, amount, x, y }: FloatingRewardProps) {
  if (!show) return null;

  return (
    <div
      className="fixed pointer-events-none z-40 animate-bounce"
      style={{
        left: x,
        top: y,
        animation: 'float-up 2s ease-out forwards'
      }}
    >
      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-white font-bold text-sm shadow-lg ${
        type === 'xp' ? 'bg-gamify-xp' : 'bg-yellow-500'
      }`}>
        {type === 'xp' ? (
          <Zap className="h-4 w-4" />
        ) : (
          <Coins className="h-4 w-4" />
        )}
        <span>+{amount}</span>
      </div>
      
      <style>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
