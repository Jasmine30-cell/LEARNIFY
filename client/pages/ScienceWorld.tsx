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
  Rocket,
  Star,
  Trophy,
  Zap,
  Target,
  Play,
  Lock,
  Sparkles,
  Beaker,
  Leaf,
  Heart,
  FlaskConical,
  Microscope,
  Atom,
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

export default function ScienceWorld() {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const levels: Level[] = [
    {
      id: 1,
      name: "Nature Garden",
      theme: "🌱 Living World",
      description: "Identify animals, plants, and their habitats in this magical garden!",
      icon: Leaf,
      bgGradient: "from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950",
      difficulty: "Easy",
      xpReward: 120,
      completed: true,
      locked: false,
      stars: 3,
      miniGames: ["science-sprint", "build-habitat"]
    },
    {
      id: 2,
      name: "Space Station",
      theme: "🚀 Cosmic Explorer",
      description: "Answer questions about planets and stars to launch rockets into space!",
      icon: Rocket,
      bgGradient: "from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950",
      difficulty: "Easy",
      xpReward: 160,
      completed: true,
      locked: false,
      stars: 2,
      miniGames: ["science-sprint", "planet-puzzle"]
    },
    {
      id: 3,
      name: "Body Builder Lab",
      theme: "❤️ Human Body",
      description: "Match organs to functions and build the amazing human body!",
      icon: Heart,
      bgGradient: "from-red-100 to-pink-100 dark:from-red-950 dark:to-pink-950",
      difficulty: "Medium",
      xpReward: 200,
      completed: false,
      locked: false,
      stars: 0,
      miniGames: ["build-body", "organ-match"]
    },
    {
      id: 4,
      name: "Experiment Zone",
      theme: "⚗️ Matter Lab",
      description: "Learn about states of matter through exciting drag-drop experiments!",
      icon: FlaskConical,
      bgGradient: "from-purple-100 to-violet-100 dark:from-purple-950 dark:to-violet-950",
      difficulty: "Hard",
      xpReward: 250,
      completed: false,
      locked: true,
      stars: 0,
      miniGames: ["element-escape", "matter-mixer"]
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

            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="text-center bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950">
                <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">
                  Science Experiment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {currentGame === "planet-puzzle" && (
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">🪐</div>
                    <h3 className="text-xl font-bold">Solar System Challenge!</h3>
                    <p className="text-lg">Which planet is closest to the Sun?</p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {["Mercury", "Venus", "Earth", "Mars"].map((planet) => (
                        <Button
                          key={planet}
                          variant="outline"
                          size="lg"
                          className="h-16 text-lg hover:scale-105 transition-transform"
                        >
                          {planet}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {currentGame === "build-habitat" && (
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">🦁</div>
                    <h3 className="text-xl font-bold">Build the Perfect Habitat!</h3>
                    <p className="text-lg">Where does a lion live?</p>
                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                      {["🌊 Ocean", "🌲 Forest", "🏜️ Savanna"].map((habitat) => (
                        <Button
                          key={habitat}
                          variant="outline"
                          size="lg"
                          className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
                        >
                          <div className="text-2xl">{habitat.split(' ')[0]}</div>
                          <div>{habitat.split(' ')[1]}</div>
                        </Button>
                      ))}
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
                Back to Science World
              </Button>
            </div>

            <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className={`bg-gradient-to-r ${level.bgGradient}`}>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <level.icon className="h-8 w-8 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">
                      Level {level.id}: {level.name}
                    </CardTitle>
                    <CardDescription className="text-blue-600 dark:text-blue-500">
                      {level.theme}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {renderStars(level.stars)}
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
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
                        <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
                          <Microscope className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold mb-2">{gameId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => setCurrentGame(gameId)}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Start Experiment
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
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">Lab Adventures</h1>
                  <p className="text-muted-foreground">🔬 Explorer {user?.name}, discover the wonders of science!</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{completedLevels}</p>
                <p className="text-sm text-muted-foreground">Labs Complete</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-500">{totalStars}</p>
                <p className="text-sm text-muted-foreground">Discovery Stars</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{totalXP}</p>
                <p className="text-sm text-muted-foreground">Science XP</p>
              </div>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Research Progress</span>
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
                        : 'border-blue-300 dark:border-blue-700 hover:scale-105'
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
                          <LevelIcon className="h-6 w-6 text-blue-700 dark:text-blue-400" />
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
                      Lab {level.id}: {level.name}
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
                        <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
                          {level.completed ? 'Replay' : 'Explore'}
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
