import { useLocation } from "wouter";

export function useBackNavigation(fallbackRoute?: string) {
  const [, navigate] = useLocation();

  const handleBack = () => {
    // First, try to use browser history
    window.history.back();
    
    // If no history is available, navigate to fallback route or home
    setTimeout(() => {
      const current = window.location.pathname;
      const shouldNavigate = fallbackRoute && current !== fallbackRoute;
      
      if (shouldNavigate) {
        navigate(fallbackRoute);
      }
    }, 100);
  };

  return handleBack;
}
