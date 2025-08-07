import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { useInteractiveToasts } from "@/components/InteractiveToast";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function Index() {
  const [animationKey, setAnimationKey] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const { showFeatureToast, showStatToast, showAchievementToast } = useInteractiveToasts();
  const { user } = useAuth();

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
      'xp': '🌟 Great job! Keep earning XP to level up and unlock new features!',
      'streak': '🔥 Amazing streak! Don\'t break the chain - learn something new today!',
      'badges': '🏆 You\'ve earned 3 new badges! Check your profile to see them all.',
      'progress': '📊 You\'re 75% complete with today\'s goal. Just a little more to go!',
      'completed-task': '✅ Task already completed! Great work on staying consistent.',
      'pending-task': '⏳ Ready to tackle this challenge? Click to get started!'
    };

    showFeatureToast(messages[itemType as keyof typeof messages] || 'Feature coming soon!');
  };
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
                  </div>
                )}
                <Badge className="bg-learnify-100 text-learnify-700 border-learnify-200 dark:bg-learnify-900 dark:text-learnify-300">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New: AI-Powered Learning Paths
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  {user ? 'Continue Your Journey' : 'Learn, Earn, and'}{" "}
                  <span className="bg-gradient-to-r from-learnify-600 to-learnify-500 bg-clip-text text-transparent">
                    {user ? 'and Level Up!' : 'Level Up'}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  Transform your learning journey into an exciting adventure. Complete challenges, 
                  earn rewards, and climb the leaderboards while mastering new skills.
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
            </div>

            <div className="relative">
              {/* Learning Dashboard Preview */}
              <Card className="bg-white/80 dark:bg-card/80 backdrop-blur-sm border-2 border-learnify-200 dark:border-learnify-800 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-pointer group">
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
                      <span>75% Complete</span>
                    </div>
                    <div
                      className="w-full bg-muted rounded-full h-2 cursor-pointer hover:h-3 transition-all duration-300"
                      onClick={() => handleDashboardItemClick('progress')}
                    >
                      <div className="bg-learnify-600 h-2 rounded-full w-3/4 hover:h-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-learnify-500 hover:to-learnify-700" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="text-center p-2 bg-gamify-xp/10 rounded-lg hover:bg-gamify-xp/20 transition-all duration-300 cursor-pointer hover:scale-105"
                      onClick={() => handleDashboardItemClick('xp')}
                    >
                      <div className="text-sm font-medium text-gamify-xp">+125 XP</div>
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
                      <div className="text-sm font-medium text-gamify-gold">3 New</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div
                      className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg hover:bg-gamify-xp/10 transition-all duration-300 cursor-pointer hover:scale-102"
                      onClick={() => handleDashboardItemClick('completed-task')}
                    >
                      <CheckCircle className="h-4 w-4 text-gamify-xp" />
                      <span className="text-sm">Complete JavaScript Basics</span>
                    </div>
                    <div
                      className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg hover:bg-gamify-xp/10 transition-all duration-300 cursor-pointer hover:scale-102"
                      onClick={() => handleDashboardItemClick('completed-task')}
                    >
                      <CheckCircle className="h-4 w-4 text-gamify-xp" />
                      <span className="text-sm">Daily Coding Challenge</span>
                    </div>
                    <div
                      className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg hover:bg-learnify-100 dark:hover:bg-learnify-900 transition-all duration-300 cursor-pointer hover:scale-102"
                      onClick={() => handleDashboardItemClick('pending-task')}
                    >
                      <Target className="h-4 w-4 text-muted-foreground hover:text-learnify-600" />
                      <span className="text-sm text-muted-foreground hover:text-learnify-600">Algorithm Practice</span>
                    </div>
                  </div>
                </CardContent>
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
