import { useState } from "react";
import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Disc3, List } from "lucide-react";
import { Link } from "wouter";
import type { NetworkListingWithShop } from "@shared/schema";

export default function Network() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: listings, isLoading, error } = useQuery<NetworkListingWithShop[]>({
    queryKey: ["/api/network/listings"],
  });

  const filteredListings = listings?.filter((listing) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      listing.artist.toLowerCase().includes(query) ||
      listing.releaseTitle.toLowerCase().includes(query) ||
      listing.label?.toLowerCase().includes(query) ||
      listing.catalogNumber?.toLowerCase().includes(query) ||
      listing.format?.toLowerCase().includes(query)
    );
  });

  return (
    <Layout 
      title="Network" 
      showBack
      rightAction={
        <Link href="/network/my-listings">
          <Button data-testid="button-my-listings">
            <List className="h-4 w-4 mr-2" />
            My Listings
          </Button>
        </Link>
      }
    >
      <div className="flex-1 flex flex-col px-4 py-4 max-w-2xl mx-auto w-full">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artist, title, label, catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-network-search"
          />
        </div>

        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <p className="text-muted-foreground" data-testid="text-error">
              Failed to load network listings
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !error && filteredListings?.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <div className="bg-muted rounded-full p-6">
              <Disc3 className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1" data-testid="text-empty-title">
                No listings found
              </h3>
              <p className="text-muted-foreground text-sm" data-testid="text-empty-subtitle">
                {searchQuery ? "Try a different search term" : "No vinyl available in the network"}
              </p>
            </div>
          </div>
        )}

        {!isLoading && !error && filteredListings && filteredListings.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-listing-count">
              {filteredListings.length} {filteredListings.length === 1 ? "listing" : "listings"}
            </p>
            {filteredListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/network/${listing.id}`}
                className="block"
              >
                <div
                  className="bg-card border rounded-lg p-4 hover-elevate active-elevate-2"
                  data-testid={`card-listing-${listing.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate" data-testid={`text-artist-${listing.id}`}>
                        {listing.artist}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate" data-testid={`text-title-${listing.id}`}>
                        {listing.releaseTitle}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {listing.price && (
                          <span className="text-sm font-medium" data-testid={`text-price-${listing.id}`}>
                            {listing.price}
                          </span>
                        )}
                        <Badge variant="secondary" className="text-xs" data-testid={`badge-shop-${listing.id}`}>
                          {listing.shop.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
