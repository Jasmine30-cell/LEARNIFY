import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { 
  ArrowLeft,
  Wand2,
  Star,
  Trophy,
  Zap,
  Target,
  Play,
  Lock,
  Sparkles,
  BookOpen,
  PenTool,
  Type,
  ScrollText,
  Feather,
  Lightbulb,
  CheckCircle,
  Clock
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

export default function EnglishWorld() {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const levels: Level[] = [
    {
      id: 1,
      name: "Alphabet Adventure",
      theme: "🔤 Letter Land",
      description: "Master letter identification and tracing with magical alphabet friends!",
      icon: Type,
      bgGradient: "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950",
      difficulty: "Easy",
      xpReward: 100,
      completed: true,
      locked: false,
      stars: 3,
      miniGames: ["letter-hunt", "alphabet-trace"]
    },
    {
      id: 2,
      name: "Spell the Spell",
      theme: "✨ Magic Words",
      description: "Cast powerful spells by spelling common words correctly!",
      icon: Wand2,
      bgGradient: "from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950",
      difficulty: "Easy",
      xpReward: 150,
      completed: false,
      locked: false,
      stars: 0,
      miniGames: ["spelling-bee", "word-craft"]
    },
    {
      id: 3,
      name: "Grammar Grove",
      theme: "🌳 Sentence Forest",
      description: "Fix broken sentences and punctuation to unlock magical doors!",
      icon: PenTool,
      bgGradient: "from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950",
      difficulty: "Medium",
      xpReward: 200,
      completed: false,
      locked: true,
      stars: 0,
      miniGames: ["sentence-fixer", "punctuation-power"]
    },
    {
      id: 4,
      name: "Story Land",
      theme: "📚 Tale Kingdom",
      description: "Read enchanting stories and answer comprehension questions!",
      icon: ScrollText,
      bgGradient: "from-orange-100 to-yellow-100 dark:from-orange-950 dark:to-yellow-950",
      difficulty: "Medium",
      xpReward: 250,
      completed: false,
      locked: true,
      stars: 0,
      miniGames: ["story-quest", "character-match"]
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
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentGame(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Level
              </Button>
            </div>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="text-center bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950">
                <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">
                  Word Magic Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {currentGame === "spelling-bee" && (
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">🐝</div>
                    <h3 className="text-xl font-bold">Spelling Bee Battle!</h3>
                    <p className="text-lg">How do you spell the word for a large gray animal with a trunk?</p>
                    <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                      {["ELEFANT", "ELEPHANT", "ELIPHANT", "ELEFENT"].map((word) => (
                        <Button
                          key={word}
                          variant="outline"
                          size="lg"
                          className="h-16 text-lg hover:scale-105 transition-transform"
                        >
                          {word}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {currentGame === "letter-hunt" && (
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold">Magic Letter Hunt!</h3>
                    <p className="text-lg">Find the letter that comes after 'M'</p>
                    <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
                      {["L", "N", "O", "P"].map((letter) => (
                        <Button
                          key={letter}
                          variant="outline"
                          size="lg"
                          className="h-20 text-2xl font-bold hover:scale-105 transition-transform"
                        >
                          {letter}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {currentGame === "sentence-fixer" && (
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">🔧</div>
                    <h3 className="text-xl font-bold">Fix the Broken Sentence!</h3>
                    <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg">
                      <p className="text-lg mb-4">the cat is sleeping on the mat</p>
                      <p className="text-sm text-muted-foreground mb-4">What's missing?</p>
                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        {["Capital letter", "Period", "Comma", "Question mark"].map((fix) => (
                          <Button
                            key={fix}
                            variant="outline"
                            className="h-12 hover:scale-105 transition-transform"
                          >
                            {fix}
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
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedLevel(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Word Wizard's Land
              </Button>
            </div>

            <Card className="mb-8 border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className={`bg-gradient-to-r ${level.bgGradient}`}>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <level.icon className="h-8 w-8 text-purple-700 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">
                      Chapter {level.id}: {level.name}
                    </CardTitle>
                    <CardDescription className="text-purple-600 dark:text-purple-500">
                      {level.theme}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {renderStars(level.stars)}
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                      +{level.xpReward} XP
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg mb-6">{level.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {level.miniGames.map((gameId) => (
                    <Card key={gameId} className="hover:scale-105 transition-transform cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-3">
                          <Feather className="h-6 w-6 text-purple-600" />
                        </div>
                        <h4 className="font-semibold mb-2">{gameId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => setCurrentGame(gameId)}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Cast Spell
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button variant="outline" asChild className="mb-4">
                <Link to="/learn" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Learning Hub
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Wand2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">Word Wizard's Land</h1>
                  <p className="text-muted-foreground">✨ Apprentice {user?.name}, master the magic of words!</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">{completedLevels}</p>
                <p className="text-sm text-muted-foreground">Chapters Complete</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-500">{totalStars}</p>
                <p className="text-sm text-muted-foreground">Magic Stars</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{totalXP}</p>
                <p className="text-sm text-muted-foreground">Word XP</p>
              </div>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Spell Book Progress</span>
                <span className="text-sm text-muted-foreground">{completedLevels}/{levels.length} Complete</span>
              </div>
              <Progress value={(completedLevels / levels.length) * 100} className="h-3" />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
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
                        : 'border-purple-300 dark:border-purple-700 hover:scale-105'
                  }`}
                  onClick={() => !level.locked && setSelectedLevel(level.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${level.bgGradient} opacity-20`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${level.bgGradient} flex items-center justify-center shadow-lg`}>
                        {level.locked ? (
                          <Lock className="h-6 w-6 text-gray-500" />
                        ) : (
                          <LevelIcon className="h-6 w-6 text-purple-700 dark:text-purple-400" />
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
                      Chapter {level.id}: {level.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {level.theme}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
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
                        <Button size="sm" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
                          {level.completed ? 'Reread' : 'Begin'}
                        </Button>
                      )}
                    </div>
                  </CardContent>

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
