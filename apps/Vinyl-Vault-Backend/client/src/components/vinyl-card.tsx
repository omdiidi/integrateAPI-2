import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Store, Globe, Clock, MapPin, FileText, Pencil, Settings2 } from "lucide-react";
import { SiEbay, SiDiscogs, SiAmazon } from "react-icons/si";
import type { Vinyl, Marketplace } from "@shared/schema";
import { useLocation } from "wouter";

interface VinylCardProps {
  vinyl: Vinyl;
  showOnlineActions?: boolean;
}

const marketplaceIcons: Record<Marketplace, React.ComponentType<{ className?: string }>> = {
  eBay: SiEbay,
  Discogs: SiDiscogs,
  Amazon: SiAmazon,
};

export function VinylCard({ vinyl, showOnlineActions = false }: VinylCardProps) {
  const [, navigate] = useLocation();

  const handleCardClick = () => {
    navigate(`/vinyl/${vinyl.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${vinyl.id}`);
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/online-settings/${vinyl.id}`);
  };

  const marketplaces = vinyl.marketplaces ?? [];

  return (
    <Card 
      className="p-4 hover-elevate active-elevate-2 transition-transform active:scale-[0.99] border-l-4 cursor-pointer"
      style={{
        borderLeftColor: vinyl.status === "draft" 
          ? "hsl(var(--muted-foreground))" 
          : vinyl.holdForCustomer 
            ? "hsl(var(--chart-4))" 
            : "hsl(var(--primary))"
      }}
      onClick={handleCardClick}
      data-testid={`card-vinyl-${vinyl.id}`}
    >
      <div className="flex gap-3">
        {vinyl.imagePath && (
          <img
            src={vinyl.imagePath}
            alt={vinyl.releaseTitle}
            className="w-16 h-16 rounded-md object-cover shrink-0"
            data-testid={`img-vinyl-thumbnail-${vinyl.id}`}
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate" data-testid={`text-vinyl-artist-${vinyl.id}`}>
            {vinyl.artist}
          </h3>
          <p className="text-sm text-muted-foreground truncate" data-testid={`text-vinyl-title-${vinyl.id}`}>
            {vinyl.releaseTitle}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {vinyl.price && (
              <span className="font-semibold text-sm" data-testid={`text-vinyl-price-${vinyl.id}`}>
                {vinyl.price}
              </span>
            )}
            
            {vinyl.quantity > 1 && (
              <Badge variant="secondary" className="text-xs">
                x{vinyl.quantity}
              </Badge>
            )}

            {vinyl.status === "draft" && (
              <Badge variant="secondary" className="text-xs gap-1">
                <FileText className="h-3 w-3" />
                Draft
              </Badge>
            )}

            {vinyl.inStore && vinyl.status !== "draft" && !showOnlineActions && (
              <Badge variant="secondary" className="text-xs gap-1 bg-accent/20 text-accent-foreground">
                <Store className="h-3 w-3" />
                Store
              </Badge>
            )}

            {vinyl.online && vinyl.status !== "draft" && !showOnlineActions && (
              <Badge variant="secondary" className="text-xs gap-1 bg-chart-3/20">
                <Globe className="h-3 w-3" />
                Online
              </Badge>
            )}

            {vinyl.holdForCustomer && (
              <Badge variant="secondary" className="text-xs gap-1 bg-chart-4/20">
                <Clock className="h-3 w-3" />
                Hold
              </Badge>
            )}

            {vinyl.location && !showOnlineActions && (
              <Badge variant="outline" className="text-xs gap-1">
                <MapPin className="h-3 w-3" />
                {vinyl.location}
              </Badge>
            )}
          </div>

          {showOnlineActions && (
            <div className="flex flex-wrap items-center gap-1 mt-2">
              {marketplaces.length > 0 ? (
                marketplaces.map((mp) => {
                  const Icon = marketplaceIcons[mp];
                  return (
                    <Badge 
                      key={mp} 
                      variant="outline" 
                      className="text-xs gap-1 px-2"
                      data-testid={`badge-marketplace-${mp.toLowerCase()}-${vinyl.id}`}
                    >
                      <Icon className="h-3 w-3" />
                      {mp}
                    </Badge>
                  );
                })
              ) : (
                <span className="text-xs text-muted-foreground italic">
                  No marketplaces
                </span>
              )}
            </div>
          )}
        </div>

        {showOnlineActions && (
          <div className="flex flex-col gap-1 shrink-0">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 gap-1 text-xs"
              onClick={handleEditClick}
              data-testid={`button-edit-info-${vinyl.id}`}
            >
              <Pencil className="h-3 w-3" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 gap-1 text-xs"
              onClick={handleSettingsClick}
              data-testid={`button-online-settings-${vinyl.id}`}
            >
              <Settings2 className="h-3 w-3" />
              Settings
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
