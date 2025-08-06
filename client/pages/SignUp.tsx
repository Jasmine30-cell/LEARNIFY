import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Mail, Lock, User, Eye, EyeOff, Sparkles, Trophy, Target } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const success = await signUp(formData.name, formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Welcome to Learnify! 🎉",
          description: "Your account has been created successfully. Start your learning journey!",
        });
        navigate("/");
      } else {
        setErrors({ general: "Failed to create account. Please try again." });
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
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
          <p className="text-muted-foreground mt-2">Transform your learning journey</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Join thousands of learners earning while they learn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Benefits Preview */}
              <div className="bg-learnify-50 dark:bg-learnify-950 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-learnify-600" />
                  What you'll get:
                </h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-3 w-3 text-gamify-gold" />
                    <span>Earn XP and badges for learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3 text-gamify-xp" />
                    <span>Daily challenges and rewards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3 w-3 text-learnify-600" />
                    <span>Access to 500+ courses</span>
                  </div>
                </div>
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
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link
                to="/signin"
                className="text-learnify-600 hover:text-learnify-700 font-medium hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}
