import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  TrendingUp, 
  Zap, 
  Target,
  Users,
  Star,
  Flame
} from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  level: number;
  xp: number;
  weeklyXP: number;
  monthlyXP: number;
  avatar?: string;
  streak: number;
  badges: number;
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  // Generate dynamic leaderboard based on current user's level
  const generateLeaderboard = useMemo((): LeaderboardUser[] => {
    if (!user) return [];

    const baseUsers: Omit<LeaderboardUser, 'id' | 'isCurrentUser'>[] = [
      {
        name: "Alex Chen",
        level: Math.max(1, user.level + 2),
        xp: (user.xp || 0) + 850,
        weeklyXP: 420,
        monthlyXP: 1680,
        streak: 15,
        badges: 28,
        avatar: undefined
      },
      {
        name: "Maria Rodriguez",
        level: Math.max(1, user.level + 1),
        xp: (user.xp || 0) + 520,
        weeklyXP: 380,
        monthlyXP: 1520,
        streak: 12,
        badges: 22,
        avatar: undefined
      },
      {
        name: user.name || "You",
        level: user.level || 1,
        xp: user.xp || 0,
        weeklyXP: 350,
        monthlyXP: 1400,
        streak: user.streak || 0,
        badges: 18,
        avatar: user.avatar
      },
      {
        name: "David Kim",
        level: Math.max(1, user.level - 1),
        xp: Math.max(0, (user.xp || 0) - 180),
        weeklyXP: 290,
        monthlyXP: 1160,
        streak: 8,
        badges: 15,
        avatar: undefined
      },
      {
        name: "Sarah Johnson",
        level: Math.max(1, user.level - 1),
        xp: Math.max(0, (user.xp || 0) - 320),
        weeklyXP: 275,
        monthlyXP: 1100,
        streak: 6,
        badges: 14,
        avatar: undefined
      },
      {
        name: "Mike Wilson",
        level: Math.max(1, user.level - 2),
        xp: Math.max(0, (user.xp || 0) - 450),
        weeklyXP: 240,
        monthlyXP: 960,
        streak: 4,
        badges: 12,
        avatar: undefined
      },
      {
        name: "Lisa Zhang",
        level: Math.max(1, user.level - 2),
        xp: Math.max(0, (user.xp || 0) - 600),
        weeklyXP: 210,
        monthlyXP: 840,
        streak: 3,
        badges: 10,
        avatar: undefined
      },
      {
        name: "Tom Anderson",
        level: Math.max(1, user.level - 3),
        xp: Math.max(0, (user.xp || 0) - 750),
        weeklyXP: 180,
        monthlyXP: 720,
        streak: 2,
        badges: 8,
        avatar: undefined
      }
    ];

    // Sort by the selected period and add rankings
    const sortKey = selectedPeriod === 'weekly' ? 'weeklyXP' : 
                   selectedPeriod === 'monthly' ? 'monthlyXP' : 'xp';
    
    const sortedUsers = baseUsers
      .sort((a, b) => b[sortKey] - a[sortKey])
      .map((user, index) => ({
        ...user,
        id: `user-${index}`,
        isCurrentUser: user.name === (user?.name || "You")
      }));

    return sortedUsers;
  }, [user, selectedPeriod]);

  const currentUserRank = useMemo(() => {
    return generateLeaderboard.findIndex(u => u.isCurrentUser) + 1;
  }, [generateLeaderboard]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400';
      case 2:
        return 'bg-gray-400/10 text-gray-700 border-gray-400/20 dark:text-gray-400';
      case 3:
        return 'bg-amber-600/10 text-amber-700 border-amber-600/20 dark:text-amber-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPeriodXP = (user: LeaderboardUser) => {
    switch (selectedPeriod) {
      case 'weekly':
        return user.weeklyXP;
      case 'monthly':
        return user.monthlyXP;
      case 'alltime':
        return user.xp;
      default:
        return user.weeklyXP;
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-gamify-gold" />
            Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with fellow learners and climb the rankings! You're currently ranked #{currentUserRank}.
          </p>
        </div>

        {/* User Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="h-12 w-12 rounded-lg bg-learnify-100 dark:bg-learnify-900 flex items-center justify-center mr-3">
                <TrendingUp className="h-6 w-6 text-learnify-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">#{currentUserRank}</p>
                <p className="text-sm text-muted-foreground">Your Rank</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4">
              <div className="h-12 w-12 rounded-lg bg-gamify-xp/10 flex items-center justify-center mr-3">
                <Zap className="h-6 w-6 text-gamify-xp" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user?.xp?.toLocaleString() || '0'}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4">
              <div className="h-12 w-12 rounded-lg bg-gamify-streak/10 flex items-center justify-center mr-3">
                <Flame className="h-6 w-6 text-gamify-streak" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user?.streak || 0}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4">
              <div className="h-12 w-12 rounded-lg bg-gamify-gold/10 flex items-center justify-center mr-3">
                <Award className="h-6 w-6 text-gamify-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user?.level || 1}</p>
                <p className="text-sm text-muted-foreground">Your Level</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Global Rankings
              </div>
              <Badge variant="secondary">{generateLeaderboard.length} Active Learners</Badge>
            </CardTitle>
            <CardDescription>
              See how you stack up against other learners in the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as any)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
                <TabsTrigger value="alltime">All Time</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedPeriod} className="space-y-4">
                {generateLeaderboard.map((leaderUser, index) => {
                  const rank = index + 1;
                  const periodXP = getPeriodXP(leaderUser);
                  
                  return (
                    <div
                      key={leaderUser.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-102 ${
                        leaderUser.isCurrentUser 
                          ? 'bg-learnify-50 dark:bg-learnify-950 border-2 border-learnify-200 dark:border-learnify-800 shadow-lg' 
                          : 'hover:bg-muted/50 border border-transparent hover:border-muted-foreground/20'
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={leaderUser.avatar || "/placeholder.svg"} alt={leaderUser.name} />
                        <AvatarFallback className="bg-learnify-500 text-white">
                          {leaderUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold truncate">
                            {leaderUser.name}
                            {leaderUser.isCurrentUser && (
                              <span className="text-learnify-600 ml-2">(You)</span>
                            )}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            Level {leaderUser.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            {leaderUser.streak} day streak
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {leaderUser.badges} badges
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRankBadgeColor(rank)}`}>
                          +{periodXP.toLocaleString()} XP
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedPeriod === 'alltime' ? 'total' : `this ${selectedPeriod.slice(0, -2)}`}
                        </p>
                      </div>

                      {/* Special Effects for Top 3 */}
                      {rank <= 3 && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>

            {/* Challenge Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-learnify-50 to-learnify-100 dark:from-learnify-950 dark:to-learnify-900 rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Ready to Climb Higher?</h3>
                <p className="text-muted-foreground mb-4">
                  Complete more challenges and earn XP to improve your ranking!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-learnify-600 hover:bg-learnify-700">
                    <Target className="h-4 w-4 mr-2" />
                    View Challenges
                  </Button>
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Join Community
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
