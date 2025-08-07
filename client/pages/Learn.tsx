import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Microscope, 
  BookOpen, 
  Crown, 
  Star, 
  Trophy,
  Zap,
  Target,
  Play,
  Lock,
  Sparkles,
  Rocket,
  Wand2,
  Castle,
  FlaskConical,
  Scroll
} from "lucide-react";

interface Subject {
  id: string;
  name: string;
  theme: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgGradient: string;
  textColor: string;
  borderColor: string;
  levels: number;
  completedLevels: number;
  xpEarned: number;
  totalXP: number;
  character: string;
  characterIcon: React.ComponentType<{ className?: string }>;
}

export default function Learn() {
  const { user } = useAuth();
  const { userProgress } = useUserProgress();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Map actual user progress to subject display data
  const subjects: Subject[] = [
    {
      id: "math",
      name: "Math Kingdom Quest",
      theme: "🏰 Medieval Kingdom",
      description: "Solve math problems to defeat monsters, build castles, and unlock magical items!",
      icon: Calculator,
      bgGradient: "from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950",
      textColor: "text-orange-700 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-800",
      levels: userProgress.subjects.find(s => s.id === 'math')?.totalLevels || 5,
      completedLevels: userProgress.subjects.find(s => s.id === 'math')?.levelsCompleted || 0,
      xpEarned: Math.floor((userProgress.subjects.find(s => s.id === 'math')?.progress || 0) * 7.5), // Convert percentage to XP
      totalXP: 750,
      character: "Math Knight",
      characterIcon: Crown
    },
    {
      id: "science",
      name: "Lab Adventures",
      theme: "🚀 Sci-Fi Laboratory",
      description: "Become a mini-scientist exploring nature, space, and the human body!",
      icon: Microscope,
      bgGradient: "from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950",
      textColor: "text-blue-700 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
      levels: userProgress.subjects.find(s => s.id === 'science')?.totalLevels || 4,
      completedLevels: userProgress.subjects.find(s => s.id === 'science')?.levelsCompleted || 0,
      xpEarned: Math.floor((userProgress.subjects.find(s => s.id === 'science')?.progress || 0) * 6.0), // Convert percentage to XP
      totalXP: 600,
      character: "Science Explorer",
      characterIcon: Rocket
    },
    {
      id: "english",
      name: "Word Wizard's Land",
      theme: "✨ Magical Kingdom",
      description: "Help the Word Wizard fix broken books, spells, and solve magical riddles!",
      icon: BookOpen,
      bgGradient: "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950",
      textColor: "text-purple-700 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800",
      levels: userProgress.subjects.find(s => s.id === 'english')?.totalLevels || 4,
      completedLevels: userProgress.subjects.find(s => s.id === 'english')?.levelsCompleted || 0,
      xpEarned: Math.floor((userProgress.subjects.find(s => s.id === 'english')?.progress || 0) * 5.0), // Convert percentage to XP
      totalXP: 500,
      character: "Word Wizard",
      characterIcon: Wand2
    }
  ];

  const totalXPEarned = user?.xp || 0; // Use actual user XP
  const totalPossibleXP = subjects.reduce((sum, subject) => sum + subject.totalXP, 0);
  const overallProgress = totalPossibleXP > 0 ? (totalXPEarned / totalPossibleXP) * 100 : 0;

  return (
    <Layout>
      <div className="container py-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-learnify-500 to-learnify-600 flex items-center justify-center animate-bounce">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-learnify-600 to-learnify-500 bg-clip-text text-transparent">
              Learning Adventure
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-4">
            Welcome back, <span className="font-semibold text-learnify-600">{user?.name}!</span> Choose your learning world and start your quest!
          </p>
          
          {/* Overall Progress */}
          <Card className="max-w-md mx-auto mb-6">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <h3 className="font-semibold mb-2">Your Learning Journey</h3>
                <div className="text-3xl font-bold text-learnify-600 mb-1">{user?.xp || 0} XP</div>
                <p className="text-sm text-muted-foreground">Total Experience Points</p>
              </div>
              <Progress value={Math.min(100, overallProgress)} className="h-3 mb-2" />
              <p className="text-xs text-muted-foreground text-center">
                {Math.round(Math.min(100, overallProgress))}% Complete • Level {user?.level || 1} Learner
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Subject Worlds Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            const CharacterIcon = subject.characterIcon;
            const progress = (subject.xpEarned / subject.totalXP) * 100;
            
            return (
              <Card 
                key={subject.id}
                className={`${subject.borderColor} border-2 hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden relative`}
                onClick={() => setSelectedSubject(subject.id)}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${subject.bgGradient} opacity-20`} />
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${subject.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className={`h-8 w-8 ${subject.textColor}`} />
                    </div>
                    <div className="text-right">
                      <Badge className={`${subject.textColor} ${subject.bgGradient} border-0`}>
                        Level {subject.completedLevels + 1}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-learnify-600 transition-colors">
                    {subject.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {subject.theme}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {subject.description}
                  </p>

                  {/* Character */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${subject.bgGradient} flex items-center justify-center`}>
                      <CharacterIcon className={`h-4 w-4 ${subject.textColor}`} />
                    </div>
                    <span className="text-sm font-medium">{subject.character}</span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{subject.completedLevels}/{subject.levels} Levels</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{subject.xpEarned} XP</span>
                      </div>
                      <Button 
                        size="sm" 
                        className={`${subject.textColor} ${subject.bgGradient} border-0 hover:scale-105 transition-transform`}
                        asChild
                      >
                        <Link to={`/learn/${subject.id}`}>
                          <Play className="h-4 w-4 mr-1" />
                          Play
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>

                {/* Floating Achievement */}
                {subject.completedLevels > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <div className="h-8 w-8 bg-gamify-gold rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Daily Challenges Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-gamify-xp" />
              Daily Learning Challenges
            </CardTitle>
            <CardDescription>
              Complete these fun challenges to earn bonus XP and special rewards!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-700 dark:text-orange-400">Math Challenge</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Solve 5 addition problems</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-orange-600 border-orange-300">+50 XP</Badge>
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-100">
                    Start
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-700 dark:text-blue-400">Science Quiz</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Name 3 planets in our solar system</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-blue-600 border-blue-300">+30 XP</Badge>
                  <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
                    Start
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Scroll className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-700 dark:text-purple-400">Word Quest</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Spell 3 magical words correctly</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-purple-600 border-purple-300">+40 XP</Badge>
                  <Button size="sm" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
                    Start
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="h-10 w-10 rounded-lg bg-learnify-100 dark:bg-learnify-900 flex items-center justify-center mr-3">
                <Trophy className="h-5 w-5 text-learnify-600" />
              </div>
              <div>
                <p className="text-lg font-bold">{userProgress.subjects.reduce((sum, s) => sum + s.levelsCompleted, 0)}</p>
                <p className="text-xs text-muted-foreground">Levels Complete</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4">
              <div className="h-10 w-10 rounded-lg bg-gamify-xp/10 flex items-center justify-center mr-3">
                <Zap className="h-5 w-5 text-gamify-xp" />
              </div>
              <div>
                <p className="text-lg font-bold">{totalXPEarned}</p>
                <p className="text-xs text-muted-foreground">XP Earned</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4">
              <div className="h-10 w-10 rounded-lg bg-gamify-gold/10 flex items-center justify-center mr-3">
                <Star className="h-5 w-5 text-gamify-gold" />
              </div>
              <div>
                <p className="text-lg font-bold">12</p>
                <p className="text-xs text-muted-foreground">Badges Earned</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4">
              <div className="h-10 w-10 rounded-lg bg-gamify-streak/10 flex items-center justify-center mr-3">
                <Target className="h-5 w-5 text-gamify-streak" />
              </div>
              <div>
                <p className="text-lg font-bold">{user?.streak || 0}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
