import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { useLocation } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  backFallback?: string;
  rightAction?: React.ReactNode;
}

export function useBackNavigation(fallbackRoute?: string) {
  const [, navigate] = useLocation();

  const handleBack = () => {
    // First, try to use browser history to go back
    window.history.back();
    
    // If no history is available, navigate to fallback route
    setTimeout(() => {
      const current = window.location.pathname;
      if (fallbackRoute && current !== fallbackRoute) {
        navigate(fallbackRoute);
      }
    }, 100);
  };

  return handleBack;
}

export function Layout({ children, title, showBack = false, backFallback = "/", rightAction }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const handleBack = useBackNavigation(backFallback);
  const [location] = useLocation();

  // Hide footer on network-related pages
  const isNetworkPage = location.startsWith("/network");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border flex items-center justify-between px-4 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {showBack && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          {title && (
            <h1 className="text-lg font-semibold truncate" data-testid="text-page-title">
              {title}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2">
          {rightAction}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!isNetworkPage && (
        <footer className="mt-auto border-t border-border p-4 bg-background/95 backdrop-blur">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto gap-2"
              onClick={() => window.open("https://integrateapi.ai/", "_blank")}
              data-testid="link-integrateapi-home"
            >Go Back To Site</Button>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto gap-2"
              onClick={() => window.open("https://integrateapi.ai/contact", "_blank")}
              data-testid="link-contact-us"
            >
              Contact us
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}
