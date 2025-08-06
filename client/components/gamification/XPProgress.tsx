import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp } from "lucide-react";

interface XPProgressProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  showDetails?: boolean;
}

export function XPProgress({ currentXP, nextLevelXP, level, showDetails = true }: XPProgressProps) {
  const progressPercentage = (currentXP / nextLevelXP) * 100;
  const remainingXP = nextLevelXP - currentXP;

  return (
    <div className="space-y-3">
      {showDetails && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gamify-xp flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Level {level}</p>
              <p className="text-xs text-muted-foreground">{remainingXP} XP to next level</p>
            </div>
          </div>
          <Badge className="bg-gamify-xp/10 text-gamify-xp border-gamify-xp/20">
            <TrendingUp className="h-3 w-3 mr-1" />
            {currentXP.toLocaleString()} XP
          </Badge>
        </div>
      )}
      
      <div className="space-y-2">
        <Progress 
          value={progressPercentage} 
          className="h-2"
          // Custom styling for XP progress
          style={{
            background: 'hsl(var(--muted))'
          }}
        />
        {showDetails && (
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{currentXP.toLocaleString()} XP</span>
            <span>{nextLevelXP.toLocaleString()} XP</span>
          </div>
        )}
      </div>
    </div>
  );
}
