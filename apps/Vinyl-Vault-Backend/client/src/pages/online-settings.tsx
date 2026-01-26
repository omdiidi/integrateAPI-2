import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Globe, AlertCircle } from "lucide-react";
import { SiEbay, SiDiscogs, SiAmazon } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Vinyl, OnlineSettings, Marketplace, MarketplaceSettings } from "@shared/schema";

const marketplaceIcons: Record<Marketplace, typeof SiEbay> = {
  eBay: SiEbay,
  Discogs: SiDiscogs,
  Amazon: SiAmazon,
};

export default function OnlineSettingsPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const { data: vinyl, isLoading } = useQuery<Vinyl>({
    queryKey: ["/api/vinyls", id],
  });

  const [settings, setSettings] = useState<OnlineSettings>({
    listingTitleOverride: "",
    listingDescription: "",
    sku: "",
    shippingProfileName: "",
    perMarketplace: {},
  });

  useEffect(() => {
    if (vinyl?.onlineSettings) {
      setSettings({
        listingTitleOverride: vinyl.onlineSettings.listingTitleOverride || "",
        listingDescription: vinyl.onlineSettings.listingDescription || "",
        sku: vinyl.onlineSettings.sku || "",
        shippingProfileName: vinyl.onlineSettings.shippingProfileName || "",
        perMarketplace: vinyl.onlineSettings.perMarketplace || {},
      });
    }
  }, [vinyl]);

  const updateMutation = useMutation({
    mutationFn: async (data: { onlineSettings: OnlineSettings }) => {
      return apiRequest("PATCH", `/api/vinyls/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls"] });
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls", id] });
      toast({ title: "Settings saved", description: "Online settings have been updated." });
      navigate("/inventory/online");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    },
  });

  const handleSave = () => {
    updateMutation.mutate({ onlineSettings: settings });
  };

  const updateMarketplaceSetting = (
    marketplace: Marketplace,
    field: keyof MarketplaceSettings,
    value: string | number
  ) => {
    setSettings((prev) => ({
      ...prev,
      perMarketplace: {
        ...prev.perMarketplace,
        [marketplace]: {
          status: "active" as const,
          ...prev.perMarketplace?.[marketplace],
          [field]: value,
        },
      },
    }));
  };

  const selectedMarketplaces = vinyl?.marketplaces || [];

  if (isLoading) {
    return (
      <Layout title="Loading..." showBack backFallback="/inventory/online">
        <div className="p-4 text-center text-muted-foreground">Loading...</div>
      </Layout>
    );
  }

  if (!vinyl) {
    return (
      <Layout title="Not Found" showBack backFallback="/inventory/online">
        <div className="p-4 text-center text-muted-foreground">Vinyl not found</div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Online Settings"
      showBack
      backFallback="/inventory/online"
      rightAction={
        <Button onClick={handleSave} disabled={updateMutation.isPending} data-testid="button-save-settings">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      }
    >
      <div className="p-4 space-y-6 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-semibold" data-testid="text-vinyl-artist">{vinyl.artist}</h2>
            <p className="text-sm text-muted-foreground" data-testid="text-vinyl-title">{vinyl.releaseTitle}</p>
          </div>
        </div>

        {selectedMarketplaces.length === 0 && (
          <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  No marketplaces selected
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Select at least one marketplace to enable per-marketplace fields. You can still edit general online settings below.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">General Settings</h3>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="listingTitle">Listing Title Override</Label>
              <Input
                id="listingTitle"
                value={settings.listingTitleOverride || ""}
                onChange={(e) => setSettings({ ...settings, listingTitleOverride: e.target.value })}
                placeholder={`${vinyl.artist} - ${vinyl.releaseTitle}`}
                data-testid="input-listing-title"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave blank to use default: Artist - Release Title
              </p>
            </div>

            <div>
              <Label htmlFor="description">Listing Description</Label>
              <Textarea
                id="description"
                value={settings.listingDescription || ""}
                onChange={(e) => setSettings({ ...settings, listingDescription: e.target.value })}
                placeholder="Describe the vinyl condition, pressing details, etc."
                rows={4}
                data-testid="input-listing-description"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={settings.sku || ""}
                  onChange={(e) => setSettings({ ...settings, sku: e.target.value })}
                  placeholder="Your internal SKU"
                  data-testid="input-sku"
                />
              </div>
              <div>
                <Label htmlFor="shipping">Shipping Profile</Label>
                <Input
                  id="shipping"
                  value={settings.shippingProfileName || ""}
                  onChange={(e) => setSettings({ ...settings, shippingProfileName: e.target.value })}
                  placeholder="e.g., Standard Vinyl"
                  data-testid="input-shipping-profile"
                />
              </div>
            </div>
          </div>
        </div>

        {selectedMarketplaces.length > 0 && (
          <>
            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Per-Marketplace Settings</h3>
              
              {selectedMarketplaces.map((marketplace) => {
                const Icon = marketplaceIcons[marketplace];
                const mpSettings = settings.perMarketplace?.[marketplace] || { status: "active" as const };
                
                return (
                  <Card key={marketplace} className="p-4" data-testid={`card-marketplace-${marketplace}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{marketplace}</span>
                      <Badge 
                        variant={mpSettings.status === "active" ? "default" : "secondary"}
                        className="ml-auto"
                      >
                        {mpSettings.status || "active"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label>Status</Label>
                        <Select
                          value={mpSettings.status || "active"}
                          onValueChange={(value) => updateMarketplaceSetting(marketplace, "status", value)}
                        >
                          <SelectTrigger data-testid={`select-status-${marketplace}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Price Override</Label>
                          <Input
                            value={mpSettings.priceOverride || ""}
                            onChange={(e) => updateMarketplaceSetting(marketplace, "priceOverride", e.target.value)}
                            placeholder={vinyl.price || "$0.00"}
                            data-testid={`input-price-${marketplace}`}
                          />
                        </div>
                        <div>
                          <Label>Qty Override</Label>
                          <Input
                            type="number"
                            value={mpSettings.quantityOverride || ""}
                            onChange={(e) => updateMarketplaceSetting(marketplace, "quantityOverride", parseInt(e.target.value) || 0)}
                            placeholder={String(vinyl.quantity)}
                            data-testid={`input-qty-${marketplace}`}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Notes</Label>
                        <Textarea
                          value={mpSettings.notes || ""}
                          onChange={(e) => updateMarketplaceSetting(marketplace, "notes", e.target.value)}
                          placeholder="Marketplace-specific notes"
                          rows={2}
                          data-testid={`input-notes-${marketplace}`}
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
