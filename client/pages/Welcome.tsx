import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  LogIn,
  UserPlus
} from "lucide-react";

export default function Welcome() {
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
    { label: "Active Learners", value: "50K+", icon: Users },
    { label: "Courses Available", value: "500+", icon: BookOpen },
    { label: "Rewards Earned", value: "$100K+", icon: Award },
    { label: "Daily Challenges", value: "1000+", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-learnify-500 to-learnify-600 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-learnify-600 to-learnify-500 bg-clip-text text-transparent">
              Learnify
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/signin">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button asChild className="bg-learnify-600 hover:bg-learnify-700">
              <Link to="/signup">
                <UserPlus className="h-4 w-4 mr-2" />
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-learnify-50 via-white to-learnify-100 dark:from-learnify-950 dark:via-background dark:to-learnify-900">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container relative py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-learnify-100 text-learnify-700 border-learnify-200 dark:bg-learnify-900 dark:text-learnify-300">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New: AI-Powered Learning Paths
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Learn, Earn, and{" "}
                  <span className="bg-gradient-to-r from-learnify-600 to-learnify-500 bg-clip-text text-transparent">
                    Level Up
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  Transform your learning journey into an exciting adventure. Complete challenges, 
                  earn rewards, and climb the leaderboards while mastering new skills.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-learnify-600 hover:bg-learnify-700">
                  <Link to="/signup">
                    <PlayCircle className="h-5 w-5 mr-2" />
                    Start Learning
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/signin">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="h-6 w-6 text-learnify-600" />
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              {/* Learning Dashboard Preview */}
              <Card className="bg-white/80 dark:bg-card/80 backdrop-blur-sm border-2 border-learnify-200 dark:border-learnify-800 shadow-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-learnify-600 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      Learning Progress
                    </CardTitle>
                    <Badge className="bg-gamify-gold/10 text-gamify-gold border-gamify-gold/20">
                      Level 12
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Goal</span>
                      <span>75% Complete</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-learnify-600 h-2 rounded-full w-3/4" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-gamify-xp/10 rounded-lg">
                      <div className="text-sm font-medium text-gamify-xp">+125 XP</div>
                      <div className="text-xs text-muted-foreground">Today</div>
                    </div>
                    <div className="text-center p-2 bg-gamify-streak/10 rounded-lg">
                      <div className="text-sm font-medium text-gamify-streak">7 Days</div>
                      <div className="text-xs text-muted-foreground">Streak</div>
                    </div>
                    <div className="text-center p-2 bg-gamify-gold/10 rounded-lg">
                      <div className="text-sm font-medium text-gamify-gold">3 New</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-gamify-xp" />
                      <span className="text-sm">Complete JavaScript Basics</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-gamify-xp" />
                      <span className="text-sm">Daily Coding Challenge</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Algorithm Practice</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Achievement */}
              <div className="absolute -top-4 -right-4 bg-gamify-gold text-white p-3 rounded-xl shadow-lg animate-bounce">
                <Award className="h-6 w-6" />
              </div>
            </div>
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
                <Card key={index} className="border-2 hover:border-learnify-200 dark:hover:border-learnify-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-learnify-500/10">
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br from-learnify-100 to-learnify-200 dark:from-learnify-900 dark:to-learnify-800 flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-learnify-600 to-learnify-500">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-learnify-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already earning rewards and leveling up their skills.
            Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-learnify-600 hover:bg-learnify-50">
              <Link to="/signup">
                <TrendingUp className="h-5 w-5 mr-2" />
                Start Your Journey
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-learnify-600">
              <Link to="/signin">
                Sign In
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2024 Learnify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
