import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useGameState } from "@/hooks/useGameState";
import { CelebrationOverlay, IncorrectFeedback, FloatingReward } from "@/components/CelebrationAnimations";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Crown,
  Star,
  Trophy,
  Zap,
  Target,
  Play,
  Lock,
  Sparkles,
  Castle,
  TreePine,
  Mountain,
  Sword,
  Shield,
  Coins,
  Clock,
  CheckCircle,
  X
} from "lucide-react";

interface Level {
  id: number;
  name: string;
  theme: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgGradient: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xpReward: number;
  completed: boolean;
  locked: boolean;
  stars: number;
  miniGames: string[];
}

interface MiniGame {
  id: string;
  name: string;
  description: string;
  type: "monster-match" | "treasure-hunt" | "time-attack";
  icon: React.ComponentType<{ className?: string }>;
}

const mathQuestions = {
  "monster-match": [
    {
      id: "mm1",
      question: "What is 7 + 5?",
      options: [10, 12, 13, 15],
      correctAnswer: 12,
      hint: "Count up from 7: 8, 9, 10, 11, 12",
      explanation: "7 + 5 = 12. You can count up from 7 or break it down as 7 + 3 + 2 = 10 + 2 = 12"
    },
    {
      id: "mm2",
      question: "What is 9 + 6?",
      options: [14, 15, 16, 17],
      correctAnswer: 15,
      hint: "Make 10 first: 9 + 1 = 10, then add the remaining 5",
      explanation: "9 + 6 = 15. You can think of it as 9 + 1 + 5 = 10 + 5 = 15"
    }
  ],
  "treasure-hunt": [
    {
      id: "th1",
      question: "Which chest contains the answer to 15 - 8?",
      options: [6, 7, 9],
      correctAnswer: 7,
      hint: "Count back from 15 or think: what number plus 8 equals 15?",
      explanation: "15 - 8 = 7. You can count back: 15, 14, 13, 12, 11, 10, 9, 8... that's 7 steps back!"
    }
  ],
  "time-attack": [
    {
      id: "ta1",
      question: "4 × 3 = ?",
      options: [12, 10, 14, 16],
      correctAnswer: 12,
      hint: "Think of 4 groups of 3, or 3 + 3 + 3 + 3",
      explanation: "4 × 3 = 12. This means 4 groups of 3: 3 + 3 + 3 + 3 = 12"
    }
  ]
};

export default function MathWorld() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [showHintModal, setShowHintModal] = useState(false);
  const [hintData, setHintData] = useState<{hint?: string; explanation?: string; correctAnswer?: string | number} | null>(null);
  const [floatingRewards, setFloatingRewards] = useState<Array<{id: string; type: 'xp' | 'coins'; amount: number; x: number; y: number}>>([]);

  const currentQuestions = currentGame ? mathQuestions[currentGame as keyof typeof mathQuestions] || [] : [];
  const gameState = useGameState(currentQuestions, 3);

  const levels: Level[] = [
    {
      id: 1,
      name: "Counting Forest",
      theme: "🌲 Enchanted Forest",
      description: "Count apples, coins, and magical stars to help forest creatures!",
      icon: TreePine,
      bgGradient: "from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950",
      difficulty: "Easy",
      xpReward: 100,
      completed: true,
      locked: false,
      stars: 3,
      miniGames: ["monster-match", "treasure-hunt"]
    },
    {
      id: 2,
      name: "Addition Arena", 
      theme: "⚔️ Battle Arena",
      description: "Solve addition problems to defeat monsters and save the kingdom!",
      icon: Sword,
      bgGradient: "from-red-100 to-orange-100 dark:from-red-950 dark:to-orange-950",
      difficulty: "Easy",
      xpReward: 150,
      completed: true,
      locked: false,
      stars: 2,
      miniGames: ["monster-match", "time-attack"]
    },
    {
      id: 3,
      name: "Subtraction Swamp",
      theme: "🐸 Mystical Swamp", 
      description: "Escape the swamp by solving subtraction puzzles and avoiding traps!",
      icon: Shield,
      bgGradient: "from-teal-100 to-cyan-100 dark:from-teal-950 dark:to-cyan-950",
      difficulty: "Medium",
      xpReward: 200,
      completed: true,
      locked: false,
      stars: 1,
      miniGames: ["treasure-hunt", "time-attack"]
    },
    {
      id: 4,
      name: "Multiplication Mountains",
      theme: "⛰️ Dragon's Peak",
      description: "Climb the treacherous peaks using multiplication facts to reach the dragon's lair!",
      icon: Mountain,
      bgGradient: "from-slate-100 to-gray-100 dark:from-slate-950 dark:to-gray-950",
      difficulty: "Medium",
      xpReward: 250,
      completed: false,
      locked: false,
      stars: 0,
      miniGames: ["monster-match", "treasure-hunt", "time-attack"]
    },
    {
      id: 5,
      name: "Division Dungeon",
      theme: "🏰 Royal Castle",
      description: "Unlock the castle doors using division clues to rescue the Math Princess!",
      icon: Castle,
      bgGradient: "from-purple-100 to-violet-100 dark:from-purple-950 dark:to-violet-950",
      difficulty: "Hard",
      xpReward: 300,
      completed: false,
      locked: true,
      stars: 0,
      miniGames: ["monster-match", "treasure-hunt", "time-attack"]
    }
  ];

  const miniGames: MiniGame[] = [
    {
      id: "monster-match",
      name: "Monster Match",
      description: "Solve problems to defeat monsters!",
      type: "monster-match",
      icon: Sword
    },
    {
      id: "treasure-hunt", 
      name: "Treasure Hunt",
      description: "Find the correct answer among distractions!",
      type: "treasure-hunt",
      icon: Coins
    },
    {
      id: "time-attack",
      name: "Time Attack",
      description: "Speed-based math questions with XP boosts!",
      type: "time-attack",
      icon: Clock
    }
  ];

  const completedLevels = levels.filter(l => l.completed).length;
  const totalStars = levels.reduce((sum, l) => sum + l.stars, 0);
  const totalXP = levels.filter(l => l.completed).reduce((sum, l) => sum + l.xpReward, 0);

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3].map((star) => (
          <Star 
            key={star}
            className={`h-4 w-4 ${star <= count ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  if (currentGame) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            {/* Game Header */}
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentGame(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Level
              </Button>
              <div className="flex items-center gap-4">
                <Badge className="bg-gamify-gold/10 text-gamify-gold border-gamify-gold/20">
                  Score: {gameScore}
                </Badge>
                <Badge className="bg-gamify-xp/10 text-gamify-xp border-gamify-xp/20">
                  XP: +{gameScore * 10}
                </Badge>
              </div>
            </div>

            {/* Mini Game Content */}
            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardHeader className="text-center bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950">
                <CardTitle className="text-2xl text-orange-700 dark:text-orange-400">
                  {miniGames.find(g => g.id === currentGame)?.name}
                </CardTitle>
                <CardDescription>
                  {miniGames.find(g => g.id === currentGame)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {currentGame === "monster-match" && (
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">🐉</div>
                    <h3 className="text-xl font-bold">Defeat the Dragon!</h3>
                    <p className="text-lg">What is 7 + 5?</p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {[10, 12, 13, 15].map((answer) => (
                        <Button
                          key={answer}
                          variant="outline"
                          size="lg"
                          className="h-16 text-xl hover:scale-105 transition-transform"
                          onClick={() => {
                            if (answer === 12) {
                              setGameScore(prev => prev + 1);
                              // Show success animation
                            }
                          }}
                        >
                          {answer}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {currentGame === "treasure-hunt" && (
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">💎</div>
                    <h3 className="text-xl font-bold">Find the Treasure!</h3>
                    <p className="text-lg">Which chest contains the answer to 15 - 8?</p>
                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                      {[6, 7, 9].map((answer, index) => (
                        <Button
                          key={answer}
                          variant="outline"
                          size="lg"
                          className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
                          onClick={() => {
                            if (answer === 7) {
                              setGameScore(prev => prev + 1);
                            }
                          }}
                        >
                          <div className="text-2xl">📦</div>
                          <div>{answer}</div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {currentGame === "time-attack" && (
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Clock className="h-6 w-6 text-orange-600" />
                      <span className="text-xl font-bold text-orange-600">0:30</span>
                    </div>
                    <h3 className="text-xl font-bold">Speed Challenge!</h3>
                    <p className="text-lg">Answer as many as you can before time runs out!</p>
                    <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg">
                      <p className="text-2xl font-bold mb-4">4 × 3 = ?</p>
                      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                        {[12, 10, 14, 16].map((answer) => (
                          <Button
                            key={answer}
                            variant="outline"
                            className="h-12 hover:scale-105 transition-transform"
                            onClick={() => {
                              if (answer === 12) {
                                setGameScore(prev => prev + 1);
                              }
                            }}
                          >
                            {answer}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (selectedLevel) {
    const level = levels.find(l => l.id === selectedLevel);
    if (!level) return null;

    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            {/* Level Header */}
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedLevel(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Math World
              </Button>
              <Badge className={`${level.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : level.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {level.difficulty}
              </Badge>
            </div>

            {/* Level Details */}
            <Card className="mb-8 border-2 border-orange-200 dark:border-orange-800">
              <CardHeader className={`bg-gradient-to-r ${level.bgGradient}`}>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <level.icon className="h-8 w-8 text-orange-700 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-orange-700 dark:text-orange-400">
                      Level {level.id}: {level.name}
                    </CardTitle>
                    <CardDescription className="text-orange-600 dark:text-orange-500">
                      {level.theme}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {renderStars(level.stars)}
                    <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                      +{level.xpReward} XP
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg mb-6">{level.description}</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {level.miniGames.map((gameId) => {
                    const game = miniGames.find(g => g.id === gameId);
                    if (!game) return null;
                    
                    const GameIcon = game.icon;
                    return (
                      <Card key={game.id} className="hover:scale-105 transition-transform cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center mx-auto mb-3">
                            <GameIcon className="h-6 w-6 text-orange-600" />
                          </div>
                          <h4 className="font-semibold mb-2">{game.name}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                          <Button 
                            size="sm" 
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={() => setCurrentGame(game.id)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Play
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button variant="outline" asChild className="mb-4">
                <Link to="/learn" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Learning Hub
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-orange-700 dark:text-orange-400">Math Kingdom Quest</h1>
                  <p className="text-muted-foreground">⚔️ Brave knight {user?.name}, defend the mathematical realm!</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-orange-600">{completedLevels}</p>
                <p className="text-sm text-muted-foreground">Levels Complete</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-500">{totalStars}</p>
                <p className="text-sm text-muted-foreground">Stars Earned</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{totalXP}</p>
                <p className="text-sm text-muted-foreground">XP Earned</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Kingdom Progress</span>
                <span className="text-sm text-muted-foreground">{completedLevels}/{levels.length} Complete</span>
              </div>
              <Progress value={(completedLevels / levels.length) * 100} className="h-3" />
            </CardContent>
          </Card>

          {/* Levels Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => {
              const LevelIcon = level.icon;
              return (
                <Card 
                  key={level.id}
                  className={`border-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    level.locked 
                      ? 'border-gray-300 dark:border-gray-700 opacity-60' 
                      : level.completed 
                        ? 'border-green-300 dark:border-green-700 hover:scale-105' 
                        : 'border-orange-300 dark:border-orange-700 hover:scale-105'
                  }`}
                  onClick={() => !level.locked && setSelectedLevel(level.id)}
                >
                  {/* Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${level.bgGradient} opacity-20`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${level.bgGradient} flex items-center justify-center shadow-lg`}>
                        {level.locked ? (
                          <Lock className="h-6 w-6 text-gray-500" />
                        ) : (
                          <LevelIcon className="h-6 w-6 text-orange-700 dark:text-orange-400" />
                        )}
                      </div>
                      <div className="text-right">
                        {level.completed && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            {renderStars(level.stars)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <CardTitle className={`text-lg ${level.locked ? 'text-gray-500' : ''}`}>
                      Level {level.id}: {level.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {level.theme}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {level.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={`${
                          level.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400' :
                          level.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400'
                        }`}>
                          {level.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground">+{level.xpReward} XP</span>
                      </div>
                      
                      {!level.locked && (
                        <Button size="sm" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-100">
                          {level.completed ? 'Replay' : 'Start'}
                        </Button>
                      )}
                    </div>
                  </CardContent>

                  {/* Achievement Badge */}
                  {level.completed && (
                    <div className="absolute -top-2 -right-2">
                      <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
