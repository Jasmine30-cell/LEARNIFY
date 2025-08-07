import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Users,
  Target,
  Star,
  TrendingUp,
  Zap,
  Award,
  PlayCircle,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Gamepad2,
  Brain,
  Puzzle,
  Sword,
  Joystick,
  Bot,
  Lightbulb
} from "lucide-react";
import { useState, useEffect } from "react";
import { useInteractiveToasts } from "@/components/InteractiveToast";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Index() {
  const [animationKey, setAnimationKey] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [customGame, setCustomGame] = useState({
    subject: '',
    topic: '',
    genre: ''
  });
  const [isGeneratingGame, setIsGeneratingGame] = useState(false);
  const { showFeatureToast, showStatToast, showAchievementToast } = useInteractiveToasts();
  const { user } = useAuth();
  const { userProgress, isLoading } = useUserProgress();

  const handleFloatingAchievementClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setAnimationKey(prev => prev + 1);
    showAchievementToast(newCount);

    // Trigger a fun animation
    setTimeout(() => {
      setAnimationKey(prev => prev + 1);
    }, 500);
  };

  const handleFeatureCardClick = (featureName: string) => {
    showFeatureToast(featureName);
  };

  const handleStatClick = (statName: string) => {
    showStatToast(statName);
  };

  const handleDashboardItemClick = (itemType: string) => {
    const messages = {
      'xp': `🌟 Amazing ${user?.name}! You've earned ${userProgress.todayXP} XP today. Keep it up!`,
      'streak': `🔥 Fantastic ${user?.streak}-day streak! You're on fire - keep learning!`,
      'badges': `🏆 You've earned ${userProgress.totalBadges} badges total with ${userProgress.newBadges} new ones!`,
      'progress': `📊 You're ${userProgress.dailyGoal.percentage}% complete with today's goal. Almost there!`,
      'completed-task': '✅ Task completed! Your dedication is paying off.',
      'pending-task': '⏳ Ready for your next challenge? Let\'s keep learning!'
    };

    showFeatureToast(messages[itemType as keyof typeof messages] || 'Feature coming soon!');
  };

  const handleCustomGameChange = (field: string, value: string) => {
    setCustomGame(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateGame = async () => {
    if (!customGame.subject || !customGame.topic || !customGame.genre) {
      showFeatureToast('Please fill in all fields to generate your custom game!');
      return;
    }

    setIsGeneratingGame(true);

    // Simulate game generation
    setTimeout(() => {
      setIsGeneratingGame(false);
      showFeatureToast(`🎮 Awesome! Generated a ${customGame.genre} about "${customGame.topic}" in ${customGame.subject}! Game coming soon...`);

      // Reset form
      setCustomGame({ subject: '', topic: '', genre: '' });
    }, 2000);
  };

  const gameGenres = [
    { value: 'adventure', label: '🎮 Adventure Quest', icon: Gamepad2 },
    { value: 'puzzle', label: '🧩 Puzzle Game', icon: Puzzle },
    { value: 'quiz', label: '⚔️ Quiz Battle', icon: Sword },
    { value: 'arcade', label: '🕹️ Arcade Platformer', icon: Joystick },
    { value: 'logic', label: '🧠 Logic Challenge', icon: Brain }
  ];

  const aiSuggestions = [
    { subject: 'Space Science', topic: 'Black Holes', genre: 'Adventure Quest' },
    { subject: 'Mathematics', topic: 'Geometry', genre: 'Puzzle Game' },
    { subject: 'History', topic: 'Ancient Egypt', genre: 'Adventure Quest' },
    { subject: 'Programming', topic: 'Python Basics', genre: 'Logic Challenge' },
    { subject: 'Biology', topic: 'Ocean Life', genre: 'Adventure Quest' }
  ];
  const features = [
    {
      icon: Target,
      title: "Daily Challenges",
      description: "Complete daily learning challenges and earn XP, badges, and rewards that keep you motivated.",
      color: "text-gamify-xp"
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Level up your knowledge with achievements, leaderboards, and progression systems.",
      color: "text-gamify-gold"
    },
    {
      icon: Users,
      title: "Social Learning",
      description: "Join study groups, compete with friends, and learn together in our vibrant community.",
      color: "text-learnify-600"
    },
    {
      icon: Zap,
      title: "Instant Rewards",
      description: "Earn real rewards for your learning achievements - gift cards, certifications, and more.",
      color: "text-gamify-streak"
    }
  ];

  const stats = [
    { label: "Your XP This Week", value: `${userProgress.weeklyXP}`, icon: TrendingUp },
    { label: "Subjects Learning", value: `${userProgress.subjects.filter(s => s.progress > 0).length}`, icon: BookOpen },
    { label: "Total Badges", value: `${userProgress.totalBadges}`, icon: Award },
    { label: "Completed Tasks", value: `${userProgress.completedTasks.length}`, icon: Target }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      content: "Learnify made learning addictive! I've completed 15 courses and earned over $500 in rewards.",
      avatar: "SC",
      xp: "2,450 XP"
    },
    {
      name: "Mike Rodriguez",
      role: "Marketing Manager",
      content: "The gamification aspect keeps me motivated. I love competing with my colleagues!",
      avatar: "MR",
      xp: "1,890 XP"
    },
    {
      name: "Emma Thompson",
      role: "UX Designer",
      content: "Best learning platform ever! The daily challenges are perfectly bite-sized.",
      avatar: "ET",
      xp: "3,120 XP"
    }
  ];

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-learnify-50 via-white to-learnify-100 dark:from-learnify-950 dark:via-background dark:to-learnify-900">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container relative py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                {user && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Welcome back,</span>
                    <span className="text-lg font-semibold text-learnify-600">{user.name}!</span>
                    {userProgress.newBadges > 0 && (
                      <span className="text-xs bg-gamify-gold/10 text-gamify-gold px-2 py-1 rounded-full animate-pulse">
                        🏆 {userProgress.newBadges} new badge{userProgress.newBadges > 1 ? 's' : ''}!
                      </span>
                    )}
                  </div>
                )}
                <Badge className="bg-learnify-100 text-learnify-700 border-learnify-200 dark:bg-learnify-900 dark:text-learnify-300">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New: AI-Powered Learning Paths
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  {userProgress.completedTasks.length > 0 ? 'Continue Your Journey' : 'Start Your Adventure'}{" "}
                  <span className="bg-gradient-to-r from-learnify-600 to-learnify-500 bg-clip-text text-transparent">
                    and Level Up!
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  {userProgress.completedTasks.length > 0
                    ? `You're doing amazing! You've completed ${userProgress.completedTasks.length} tasks and earned ${userProgress.totalBadges} badges. Keep up the great work!`
                    : "Transform your learning journey into an exciting adventure. Complete challenges, earn rewards, and climb the leaderboards while mastering new skills."
                  }
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-learnify-600 hover:bg-learnify-700">
                  <Link to="/learn">
                    <PlayCircle className="h-5 w-5 mr-2" />
                    Start Learning
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/challenges">
                    <Trophy className="h-5 w-5 mr-2" />
                    View Challenges
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="text-center cursor-pointer group hover:scale-110 transition-transform duration-300"
                      onClick={() => handleStatClick(stat.label)}
                    >
                      <div className="flex justify-center mb-2">
                        <Icon className="h-6 w-6 text-learnify-600 group-hover:text-learnify-500 group-hover:animate-bounce transition-colors" />
                      </div>
                      <div className="text-2xl font-bold group-hover:text-learnify-600 transition-colors">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Subjects Progress Overview */}
              {userProgress.subjects.some(s => s.progress > 0) && (
                <div className="mt-8 space-y-3">
                  <h3 className="text-lg font-semibold text-center">Your Learning Journey</h3>
                  {userProgress.subjects.map((subject) => (
                    subject.progress > 0 && (
                      <div key={subject.id} className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{subject.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {subject.levelsCompleted}/{subject.totalLevels} levels
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-learnify-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              {/* Learning Dashboard Preview */}
              <Card className="bg-white/80 dark:bg-card/80 backdrop-blur-sm border-2 border-learnify-200 dark:border-learnify-800 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-pointer group">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-learnify-600 mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading your progress...</p>
                  </div>
                ) : (
                  <>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-learnify-600 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-white" />
                          </div>
                          {user?.name ? `${user.name.split(' ')[0]}'s Progress` : "Today's Progress"}
                        </CardTitle>
                        <Badge className="bg-gamify-gold/10 text-gamify-gold border-gamify-gold/20">
                          Level {user?.level || 12}
                        </Badge>
                      </div>
                    </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Goal</span>
                      <span>{userProgress.dailyGoal.percentage}% Complete</span>
                    </div>
                    <div
                      className="w-full bg-muted rounded-full h-2 cursor-pointer hover:h-3 transition-all duration-300"
                      onClick={() => handleDashboardItemClick('progress')}
                    >
                      <div
                        className="bg-learnify-600 h-2 rounded-full hover:h-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-learnify-500 hover:to-learnify-700"
                        style={{ width: `${userProgress.dailyGoal.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{userProgress.dailyGoal.completed} XP</span>
                      <span>{userProgress.dailyGoal.target} XP Goal</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="text-center p-2 bg-gamify-xp/10 rounded-lg hover:bg-gamify-xp/20 transition-all duration-300 cursor-pointer hover:scale-105"
                      onClick={() => handleDashboardItemClick('xp')}
                    >
                      <div className="text-sm font-medium text-gamify-xp">+{userProgress.todayXP} XP</div>
                      <div className="text-xs text-muted-foreground">Today</div>
                    </div>
                    <div
                      className="text-center p-2 bg-gamify-streak/10 rounded-lg hover:bg-gamify-streak/20 transition-all duration-300 cursor-pointer hover:scale-105"
                      onClick={() => handleDashboardItemClick('streak')}
                    >
                      <div className="text-sm font-medium text-gamify-streak">{user?.streak || 0} Days</div>
                      <div className="text-xs text-muted-foreground">Streak</div>
                    </div>
                    <div
                      className="text-center p-2 bg-gamify-gold/10 rounded-lg hover:bg-gamify-gold/20 transition-all duration-300 cursor-pointer hover:scale-105"
                      onClick={() => handleDashboardItemClick('badges')}
                    >
                      <div className="text-sm font-medium text-gamify-gold">{userProgress.newBadges} New</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {userProgress.completedTasks.slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg hover:bg-gamify-xp/10 transition-all duration-300 cursor-pointer hover:scale-102"
                        onClick={() => handleDashboardItemClick('completed-task')}
                      >
                        <CheckCircle className="h-4 w-4 text-gamify-xp" />
                        <span className="text-sm">{task.title}</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded ml-auto">{task.subject}</span>
                      </div>
                    ))}
                    {userProgress.pendingTasks.slice(0, 1).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg hover:bg-learnify-100 dark:hover:bg-learnify-900 transition-all duration-300 cursor-pointer hover:scale-102"
                        onClick={() => handleDashboardItemClick('pending-task')}
                      >
                        <Target className="h-4 w-4 text-muted-foreground hover:text-learnify-600" />
                        <span className="text-sm text-muted-foreground hover:text-learnify-600">{task.title}</span>
                        <span className={`text-xs px-2 py-1 rounded ml-auto ${
                          task.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          task.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {task.difficulty}
                        </span>
                      </div>
                    ))}
                    {userProgress.completedTasks.length === 0 && userProgress.pendingTasks.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <Target className="h-6 w-6 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Start learning to see your progress!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                  </>
                )}
              </Card>

              {/* Floating Achievement */}
              <div
                className="absolute -top-4 -right-4 bg-gamify-gold text-white p-3 rounded-xl shadow-lg animate-bounce hover:animate-spin cursor-pointer transition-all duration-300 hover:scale-125"
                onClick={handleFloatingAchievementClick}
                key={animationKey}
              >
                <Award className="h-6 w-6" />
                {clickCount > 0 && (
                  <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {clickCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Game Creation Section */}
      <section className="py-16 bg-gradient-to-br from-learnify-50 to-blue-50 dark:from-learnify-950 dark:to-blue-950">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-learnify-500 to-blue-500 flex items-center justify-center animate-pulse">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-learnify-600 to-blue-600 bg-clip-text text-transparent">
                Create Your Own Learning Game
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Design a personalized learning experience! Choose any subject, pick a topic, and select your favorite game style.
              Our AI will create a custom game just for you.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-learnify-200 dark:border-learnify-800 shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  {/* Column 1: Subject */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="h-8 w-8 text-green-600" />
                      </div>
                      <Label htmlFor="subject" className="text-lg font-semibold text-green-700 dark:text-green-400">
                        🔷 What do you want to learn?
                      </Label>
                    </div>
                    <Input
                      id="subject"
                      placeholder="e.g., Python, Photosynthesis, Ancient History"
                      value={customGame.subject}
                      onChange={(e) => handleCustomGameChange('subject', e.target.value)}
                      className="text-center border-green-200 dark:border-green-800 focus:border-green-400 focus:ring-green-400"
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      Examples: "Python", "Photosynthesis", "Ancient History", "Typing Skills"
                    </div>
                  </div>

                  {/* Column 2: Topic */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 flex items-center justify-center mx-auto mb-3">
                        <Target className="h-8 w-8 text-blue-600" />
                      </div>
                      <Label htmlFor="topic" className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                        🔷 What specific topic?
                      </Label>
                    </div>
                    <Input
                      id="topic"
                      placeholder="e.g., Loops, Respiration, World War II"
                      value={customGame.topic}
                      onChange={(e) => handleCustomGameChange('topic', e.target.value)}
                      className="text-center border-blue-200 dark:border-blue-800 focus:border-blue-400 focus:ring-blue-400"
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      Examples: "Loops", "Respiration", "World War II", "Basic Grammar"
                    </div>
                  </div>

                  {/* Column 3: Game Genre */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center mx-auto mb-3">
                        <Gamepad2 className="h-8 w-8 text-purple-600" />
                      </div>
                      <Label className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                        🔷 Select Game Genre
                      </Label>
                    </div>
                    <Select value={customGame.genre} onValueChange={(value) => handleCustomGameChange('genre', value)}>
                      <SelectTrigger className="border-purple-200 dark:border-purple-800 focus:border-purple-400 focus:ring-purple-400">
                        <SelectValue placeholder="Choose your game style" />
                      </SelectTrigger>
                      <SelectContent>
                        {gameGenres.map((genre) => {
                          const Icon = genre.icon;
                          return (
                            <SelectItem key={genre.value} value={genre.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {genre.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-muted-foreground text-center">
                      Pick the style that excites you most!
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center mb-8">
                  <Button
                    size="lg"
                    onClick={handleGenerateGame}
                    disabled={isGeneratingGame || !customGame.subject || !customGame.topic || !customGame.genre}
                    className="bg-gradient-to-r from-learnify-600 to-blue-600 hover:from-learnify-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {isGeneratingGame ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Generating Your Game...
                      </>
                    ) : (
                      <>
                        <Gamepad2 className="h-5 w-5 mr-3" />
                        🎮 Generate & Play Game
                      </>
                    )}
                  </Button>
                </div>

                {/* AI Suggestions Panel */}
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bot className="h-5 w-5 text-yellow-600" />
                      💬 AI Learning Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white/60 dark:bg-black/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:bg-white/80 dark:hover:bg-black/40 transition-all duration-200 cursor-pointer group"
                          onClick={() => {
                            setCustomGame({
                              subject: suggestion.subject,
                              topic: suggestion.topic,
                              genre: suggestion.genre.toLowerCase().split(' ')[1] || 'adventure'
                            });
                            showFeatureToast(`🤖 Great choice! Try "${suggestion.topic}" as a ${suggestion.genre}!`);
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Lightbulb className="h-4 w-4 text-yellow-600 group-hover:animate-pulse" />
                            <span className="font-medium text-sm">{suggestion.subject}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            "{suggestion.topic}" as {suggestion.genre}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
                        🤖 "Want to try 'Black Holes' as an Adventure Quest today?"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Learnify?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've revolutionized learning by making it engaging, rewarding, and social.
              Join thousands of learners who are already earning while they learn.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-learnify-200 dark:hover:border-learnify-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-learnify-500/10 cursor-pointer group"
                  onClick={() => handleFeatureCardClick(feature.title)}
                >
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br from-learnify-100 to-learnify-200 dark:from-learnify-900 dark:to-learnify-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${feature.color} group-hover:animate-pulse`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-learnify-600 transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our Learners Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join the community of successful learners who are achieving their goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 hover:border-learnify-200 dark:hover:border-learnify-800 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-learnify-600 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.xp}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{testimonial.role}</p>
                      <p className="text-sm">{testimonial.content}</p>
                      <div className="flex items-center gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-gamify-gold text-gamify-gold hover:scale-125 transition-transform duration-200 cursor-pointer" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-learnify-600 to-learnify-500 hover:from-learnify-500 hover:to-learnify-600 transition-all duration-1000">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-learnify-100 mb-8 max-w-2xl mx-auto hover:text-white transition-colors duration-300">
            Join thousands of learners who are already earning rewards and leveling up their skills.
            Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-learnify-600 hover:bg-learnify-50 hover:shadow-2xl hover:shadow-white/25">
              <Link to="/learn">
                <TrendingUp className="h-5 w-5 mr-2" />
                Start Your Journey
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-learnify-600 hover:shadow-2xl hover:shadow-white/25">
              <Link to="/leaderboard">
                View Leaderboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
