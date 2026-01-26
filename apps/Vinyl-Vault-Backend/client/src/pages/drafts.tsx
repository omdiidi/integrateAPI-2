import { Layout } from "@/components/layout";
import { VinylCard } from "@/components/vinyl-card";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Disc3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Vinyl } from "@shared/schema";

export default function Drafts() {
  const { data: vinyls, isLoading, error } = useQuery<Vinyl[]>({
    queryKey: ["/api/vinyls"],
  });

  const draftVinyls = vinyls?.filter((vinyl) => vinyl.status === "draft") || [];

  return (
    <Layout 
      title="Drafts" 
      showBack
      backFallback="/"
      rightAction={
        <Link href="/scan" className="inline-flex">
          <Button variant="ghost" size="icon" data-testid="button-add-from-drafts" asChild>
            <span>
              <Plus className="h-5 w-5" />
            </span>
          </Button>
        </Link>
      }
    >
      <div className="flex-1 flex flex-col px-4 py-4 max-w-2xl mx-auto w-full">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <p className="text-muted-foreground" data-testid="text-error">
              Failed to load drafts
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !error && draftVinyls.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <div className="bg-muted rounded-full p-6">
              <Disc3 className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1" data-testid="text-empty-title">
                No drafts yet
              </h3>
              <p className="text-muted-foreground text-sm" data-testid="text-empty-subtitle">
                Start adding a vinyl and save it as a draft
              </p>
            </div>
            <Link href="/scan" className="inline-flex">
              <Button className="gap-2" data-testid="button-create-first-draft" asChild>
                <span>
                  <Plus className="h-4 w-4" />
                  Add Vinyl
                </span>
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && !error && draftVinyls.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-draft-count">
              {draftVinyls.length} {draftVinyls.length === 1 ? "draft" : "drafts"}
            </p>
            {draftVinyls.map((vinyl) => (
              <VinylCard 
                key={vinyl.id} 
                vinyl={vinyl}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
