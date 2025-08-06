import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Trophy, Target, Zap, Star, Users } from "lucide-react";

export type BadgeType = 'gold' | 'silver' | 'bronze' | 'special';
export type BadgeCategory = 'learning' | 'streak' | 'challenge' | 'social' | 'achievement';

interface AchievementBadgeProps {
  type: BadgeType;
  category: BadgeCategory;
  title: string;
  description: string;
  earned?: boolean;
  earnedDate?: string;
  size?: 'sm' | 'md' | 'lg';
}

const categoryIcons = {
  learning: Award,
  streak: Zap,
  challenge: Target,
  social: Users,
  achievement: Trophy
};

const typeColors = {
  gold: 'text-gamify-gold bg-gamify-gold/10 border-gamify-gold/20',
  silver: 'text-gamify-silver bg-gamify-silver/10 border-gamify-silver/20',
  bronze: 'text-gamify-bronze bg-gamify-bronze/10 border-gamify-bronze/20',
  special: 'text-learnify-600 bg-learnify-100 border-learnify-200 dark:bg-learnify-900 dark:text-learnify-300'
};

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-20 w-20'
};

export function AchievementBadge({ 
  type, 
  category, 
  title, 
  description, 
  earned = false, 
  earnedDate,
  size = 'md' 
}: AchievementBadgeProps) {
  const Icon = categoryIcons[category];
  const colorClass = typeColors[type];
  const sizeClass = sizeClasses[size];

  const badgeContent = (
    <Card className={`${earned ? 'border-2' : 'border-2 border-dashed opacity-50'} transition-all hover:scale-105 cursor-pointer`}>
      <CardContent className="p-4 text-center">
        <div className={`${sizeClass} mx-auto rounded-full flex items-center justify-center mb-3 ${colorClass}`}>
          <Icon className="h-1/2 w-1/2" />
        </div>
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        {earned && earnedDate && (
          <Badge variant="secondary" className="mt-2 text-xs">
            Earned {earnedDate}
          </Badge>
        )}
        {!earned && (
          <Badge variant="outline" className="mt-2 text-xs">
            Not Earned
          </Badge>
        )}
      </CardContent>
    </Card>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-semibold">{title}</p>
            <p className="text-sm">{description}</p>
            {earned && earnedDate && (
              <p className="text-xs text-muted-foreground mt-1">Earned on {earnedDate}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
