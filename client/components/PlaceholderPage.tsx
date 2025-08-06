import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "./Layout";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function PlaceholderPage({ title, description, icon: Icon = Construction }: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="container py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-2 border-dashed border-muted-foreground/25">
            <CardHeader className="pb-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Icon className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-lg">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This page is currently under development. Continue prompting to have us build out 
                the specific features and functionality you'd like to see here.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="outline">
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/learn">
                    Start Learning
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
