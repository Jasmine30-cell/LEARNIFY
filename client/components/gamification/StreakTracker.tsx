import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Calendar } from "lucide-react";

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  lastActivity?: string;
}

export function StreakTracker({ currentStreak, longestStreak, lastActivity }: StreakTrackerProps) {
  const streakDays = Array.from({ length: 7 }, (_, i) => {
    const isActive = i < currentStreak % 7;
    const dayNumber = i + 1;
    return { day: dayNumber, active: isActive };
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-gamify-streak" />
          Learning Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gamify-streak">{currentStreak}</div>
          <p className="text-sm text-muted-foreground">Days in a row</p>
          {longestStreak > currentStreak && (
            <p className="text-xs text-muted-foreground mt-1">
              Best: {longestStreak} days
            </p>
          )}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {streakDays.map((day, index) => (
            <div
              key={index}
              className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                day.active
                  ? 'bg-gamify-streak text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {day.day}
            </div>
          ))}
        </div>

        {lastActivity && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last activity: {lastActivity}</span>
          </div>
        )}

        <div className="flex justify-center">
          <Badge 
            className={`${
              currentStreak >= 7 
                ? 'bg-gamify-streak/10 text-gamify-streak border-gamify-streak/20' 
                : 'bg-muted/50 text-muted-foreground'
            }`}
          >
            {currentStreak >= 7 ? '🔥 On Fire!' : 'Keep going!'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
