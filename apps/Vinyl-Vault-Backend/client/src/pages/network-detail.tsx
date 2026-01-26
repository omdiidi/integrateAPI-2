import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Phone, Mail, Store, MessageCircle } from "lucide-react";
import { useParams, useLocation } from "wouter";
import type { NetworkListingWithShop } from "@shared/schema";

export default function NetworkDetail() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const { data: listing, isLoading, error } = useQuery<NetworkListingWithShop>({
    queryKey: ["/api/network/listings", params.id],
  });

  const handleRequest = () => {
    if (listing) {
      navigate(`/network/dm/${listing.shop.id}/${listing.id}`);
    }
  };

  if (isLoading) {
    return (
      <Layout title="Loading..." showBack backFallback="/network">
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error || !listing) {
    return (
      <Layout title="Error" showBack backFallback="/network">
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12 px-4">
          <p className="text-muted-foreground" data-testid="text-error">
            Failed to load listing
          </p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Vinyl Details" showBack backFallback="/network">
      <div className="flex-1 flex flex-col px-4 py-4 max-w-2xl mx-auto w-full pb-32">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1" data-testid="text-artist">
              {listing.artist}
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-title">
              {listing.releaseTitle}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {listing.price && (
              <span className="text-xl font-semibold" data-testid="text-price">
                {listing.price}
              </span>
            )}
            {listing.format && (
              <Badge variant="secondary" data-testid="badge-format">
                {listing.format}
              </Badge>
            )}
          </div>

          {(listing.label || listing.catalogNumber) && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Release Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {listing.label && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Label</span>
                    <span data-testid="text-label">{listing.label}</span>
                  </div>
                )}
                {listing.catalogNumber && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Catalog #</span>
                    <span data-testid="text-catalog">{listing.catalogNumber}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Store className="h-4 w-4" />
                Available at
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <h3 className="font-semibold text-lg" data-testid="text-shop-name">
                {listing.shop.name}
              </h3>
              <div className="space-y-2">
                <a 
                  href={`tel:${listing.shop.phone}`} 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-phone"
                >
                  <Phone className="h-4 w-4" />
                  <span>{listing.shop.phone}</span>
                </a>
                <a 
                  href={`mailto:${listing.shop.email}`} 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-email"
                >
                  <Mail className="h-4 w-4" />
                  <span>{listing.shop.email}</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <div className="max-w-2xl mx-auto">
            <Button 
              className="w-full gap-2" 
              size="lg"
              onClick={handleRequest}
              data-testid="button-request"
            >
              <MessageCircle className="h-5 w-5" />
              Request
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
