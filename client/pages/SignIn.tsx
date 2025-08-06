import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const success = await signIn(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Welcome back! 🎉",
          description: "You've successfully signed in. Continue your learning journey!",
        });
        navigate("/");
      } else {
        setErrors({ general: "Invalid email or password. Please try again." });
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (typeof value === 'string' && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleDemoLogin = async () => {
    setFormData({
      email: "demo@learnify.com",
      password: "demo123",
      rememberMe: false
    });
    setIsSubmitting(true);
    
    try {
      const success = await signIn("demo@learnify.com", "demo123");
      
      if (success) {
        toast({
          title: "Demo Account Activated! 🚀",
          description: "Welcome to Learnify! Explore all features with our demo account.",
        });
        navigate("/");
      }
    } catch (error) {
      setErrors({ general: "Demo login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-learnify-50 via-white to-learnify-100 dark:from-learnify-950 dark:via-background dark:to-learnify-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-learnify-500 to-learnify-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-learnify-600 to-learnify-500 bg-clip-text text-transparent">
              Learnify
            </span>
          </Link>
          <p className="text-muted-foreground mt-2">Welcome back to your learning journey</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Continue your gamified learning adventure
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Demo Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full mb-4 border-learnify-200 hover:bg-learnify-50"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Try Demo Account
            </Button>

            <Separator className="my-4" />

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-learnify-600 hover:text-learnify-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                />
                <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                  Remember me for 30 days
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-learnify-600 hover:bg-learnify-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-learnify-600 hover:text-learnify-700 font-medium hover:underline"
              >
                Create one now
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="mt-6 border-dashed border-learnify-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-semibold text-sm mb-3">Ready to continue your journey?</h4>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="text-center">
                  <div className="h-8 w-8 bg-gamify-xp/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <span className="text-gamify-xp font-bold text-xs">XP</span>
                  </div>
                  <span className="text-muted-foreground">Earn Points</span>
                </div>
                <div className="text-center">
                  <div className="h-8 w-8 bg-gamify-gold/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <span className="text-gamify-gold">🏆</span>
                  </div>
                  <span className="text-muted-foreground">Win Badges</span>
                </div>
                <div className="text-center">
                  <div className="h-8 w-8 bg-gamify-streak/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <span className="text-gamify-streak">🔥</span>
                  </div>
                  <span className="text-muted-foreground">Build Streaks</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
