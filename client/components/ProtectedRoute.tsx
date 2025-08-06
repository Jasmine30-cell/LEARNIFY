import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-learnify-50 via-white to-learnify-100 dark:from-learnify-950 dark:via-background dark:to-learnify-900 flex items-center justify-center">
        <Card className="border-2 shadow-xl">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-learnify-500 to-learnify-600 flex items-center justify-center mb-4 animate-pulse">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-learnify-600 mb-4"></div>
            <p className="text-muted-foreground text-center">
              Loading your learning journey...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect to welcome page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }

  // Render the protected content
  return <>{children}</>;
}

// Public route wrapper - redirects to main app if already authenticated
interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-learnify-50 via-white to-learnify-100 dark:from-learnify-950 dark:via-background dark:to-learnify-900 flex items-center justify-center">
        <Card className="border-2 shadow-xl">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-learnify-500 to-learnify-600 flex items-center justify-center mb-4 animate-pulse">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-learnify-600 mb-4"></div>
            <p className="text-muted-foreground text-center">
              Checking your authentication...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect to main app if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render the public content (sign-in/sign-up pages)
  return <>{children}</>;
}
