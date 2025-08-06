import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Zap } from "lucide-react";

export function useInteractiveToasts() {
  const { toast } = useToast();

  const showFeatureToast = (featureName: string) => {
    const predefinedMessages = {
      "Daily Challenges": "🎯 Daily challenges unlock at level 3! Keep learning to unlock this feature.",
      "Gamified Learning": "🏆 Gamification features coming soon! Earn your first badge to preview.",
      "Social Learning": "👥 Connect with other learners! Join our community to get started.",
      "Instant Rewards": "⚡ Rewards available after completing your first course!"
    };

    // Check if it's a predefined feature or a custom message
    const isCustomMessage = !predefinedMessages.hasOwnProperty(featureName);
    const description = isCustomMessage ? featureName : predefinedMessages[featureName as keyof typeof predefinedMessages];
    const title = isCustomMessage ? "Dashboard Interaction" : featureName;

    toast({
      title: title,
      description: description || "Feature coming soon!",
      action: (
        <Button variant="outline" size="sm">
          {isCustomMessage ? "Got it!" : "Learn More"}
        </Button>
      ),
    });
  };

  const showStatToast = (statName: string) => {
    const messages = {
      "Active Learners": "🌟 Join 50,000+ active learners worldwide!",
      "Courses Available": "📚 Choose from 500+ expert-created courses.",
      "Rewards Earned": "💰 Over $100K in rewards distributed to learners!",
      "Daily Challenges": "🎯 1000+ challenges updated daily!"
    };

    toast({
      title: "Amazing Stats!",
      description: messages[statName as keyof typeof messages] || "Impressive numbers!",
    });
  };

  const showAchievementToast = (clickCount: number) => {
    if (clickCount === 1) {
      toast({
        title: "Achievement Unlocked! 🏆",
        description: "Curious Learner - You clicked your first achievement!",
      });
    } else if (clickCount === 5) {
      toast({
        title: "Super Clicker! ⚡",
        description: "You've clicked the achievement 5 times! Your enthusiasm is showing!",
      });
    } else if (clickCount === 10) {
      toast({
        title: "Achievement Master! 🌟",
        description: "10 clicks! You're definitely ready to start your learning journey!",
      });
    }
  };

  return {
    showFeatureToast,
    showStatToast,
    showAchievementToast
  };
}
