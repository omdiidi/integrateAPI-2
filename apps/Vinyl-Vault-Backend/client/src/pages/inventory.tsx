import { Layout } from "@/components/layout";
import { VinylCard } from "@/components/vinyl-card";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Disc3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import type { Vinyl } from "@shared/schema";

type FilterType = "all" | "in-store" | "online";

export default function Inventory() {
  const [matchInStore] = useRoute("/inventory/in-store");
  const [matchOnline] = useRoute("/inventory/online");
  
  const filter: FilterType = matchInStore ? "in-store" : matchOnline ? "online" : "all";

  const title = filter === "in-store" 
    ? "In Store Inventory" 
    : filter === "online" 
      ? "Online Inventory" 
      : "All Inventory";

  const queryParams = new URLSearchParams();
  if (filter === "in-store") queryParams.set("inStore", "true");
  if (filter === "online") queryParams.set("online", "true");
  if (filter !== "all") queryParams.set("status", "active");

  const { data: vinyls, isLoading, error } = useQuery<Vinyl[]>({
    queryKey: ["/api/vinyls"],
  });

  const filteredVinyls = vinyls?.filter((vinyl) => {
    if (filter === "in-store") {
      return vinyl.inStore && vinyl.status !== "draft";
    }
    if (filter === "online") {
      return vinyl.online && vinyl.status !== "draft";
    }
    return true;
  });

  return (
    <Layout 
      title={title} 
      showBack
      backFallback="/"
      rightAction={
        <Link href="/scan" className="inline-flex">
          <Button variant="ghost" size="icon" data-testid="button-add-from-inventory" asChild>
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
              Failed to load inventory
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !error && filteredVinyls?.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <div className="bg-muted rounded-full p-6">
              <Disc3 className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1" data-testid="text-empty-title">
                No vinyl found
              </h3>
              <p className="text-muted-foreground text-sm" data-testid="text-empty-subtitle">
                {filter === "all" 
                  ? "Add your first vinyl to get started" 
                  : `No vinyl in ${filter === "in-store" ? "store" : "online"} inventory`}
              </p>
            </div>
            <Link href="/scan" className="inline-flex">
              <Button className="gap-2" data-testid="button-add-first-vinyl" asChild>
                <span>
                  <Plus className="h-4 w-4" />
                  Add Vinyl
                </span>
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && !error && filteredVinyls && filteredVinyls.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-vinyl-count">
              {filteredVinyls.length} {filteredVinyls.length === 1 ? "record" : "records"}
            </p>
            {filteredVinyls.map((vinyl) => (
              <VinylCard 
                key={vinyl.id} 
                vinyl={vinyl} 
                showOnlineActions={filter === "online"}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
