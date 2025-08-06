import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar?: string;
  xp: number;
  weeklyXP: number;
  isCurrentUser?: boolean;
}

interface LeaderboardCardProps {
  title: string;
  entries: LeaderboardEntry[];
  timeframe?: 'weekly' | 'monthly' | 'alltime';
}

export function LeaderboardCard({ title, entries, timeframe = 'weekly' }: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 text-gamify-gold" />;
      case 2:
        return <Medal className="h-4 w-4 text-gamify-silver" />;
      case 3:
        return <Award className="h-4 w-4 text-gamify-bronze" />;
      default:
        return <span className="text-sm font-medium text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gamify-gold/10 text-gamify-gold border-gamify-gold/20';
      case 2:
        return 'bg-gamify-silver/10 text-gamify-silver border-gamify-silver/20';
      case 3:
        return 'bg-gamify-bronze/10 text-gamify-bronze border-gamify-bronze/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-learnify-600" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground capitalize">{timeframe} rankings</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              entry.isCurrentUser 
                ? 'bg-learnify-50 dark:bg-learnify-950 border border-learnify-200 dark:border-learnify-800' 
                : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-center w-8">
              {getRankIcon(entry.rank)}
            </div>

            <Avatar className="h-8 w-8">
              <AvatarImage src={entry.avatar} alt={entry.name} />
              <AvatarFallback className="text-xs">
                {entry.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {entry.name}
                {entry.isCurrentUser && (
                  <span className="text-learnify-600 ml-1">(You)</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.xp.toLocaleString()} XP total
              </p>
            </div>

            <div className="text-right">
              <Badge className={getRankBadgeColor(entry.rank)}>
                +{entry.weeklyXP}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">this week</p>
            </div>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No rankings available yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
