import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Trophy, Users, Target, Bell, Search, Menu } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleNotificationClick = () => {
    toast({
      title: "Notifications 🔔",
      description: "You have 3 new notifications! Daily challenge completed, new badge earned, and friend request received.",
    });
  };

  const handleXPClick = () => {
    toast({
      title: "XP Progress 🌟",
      description: "1,247 XP earned! You're only 253 XP away from reaching Level 13. Keep learning!",
    });
  };

  const navItems = [
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Challenges", href: "/challenges", icon: Target },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Community", href: "/community", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-learnify-500 to-learnify-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
            <BookOpen className="h-5 w-5 text-white group-hover:animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-learnify-600 to-learnify-500 bg-clip-text text-transparent group-hover:from-learnify-500 group-hover:to-learnify-600 transition-all duration-300">
            Learnify
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "bg-learnify-100 text-learnify-700 dark:bg-learnify-900 dark:text-learnify-300"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side - Search, Notifications, User */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex hover:rotate-12 transition-transform duration-300"
            onClick={() => toast({ title: "Search 🔍", description: "Search feature coming soon! You'll be able to find courses, challenges, and community content." })}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:scale-110 transition-transform duration-300"
            onClick={handleNotificationClick}
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gamify-streak animate-pulse hover:animate-bounce cursor-pointer">
              3
            </Badge>
          </Button>

          {/* User XP Display */}
          <div
            className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gamify-xp/10 rounded-full hover:bg-gamify-xp/20 transition-all duration-300 cursor-pointer hover:scale-105"
            onClick={handleXPClick}
          >
            <div className="h-6 w-6 rounded-full bg-gamify-xp flex items-center justify-center hover:animate-spin transition-transform">
              <span className="text-xs font-bold text-white">XP</span>
            </div>
            <span className="text-sm font-medium text-gamify-xp">1,247</span>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-learnify-500 text-white">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container grid gap-2 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-learnify-100 text-learnify-700 dark:bg-learnify-900 dark:text-learnify-300"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
