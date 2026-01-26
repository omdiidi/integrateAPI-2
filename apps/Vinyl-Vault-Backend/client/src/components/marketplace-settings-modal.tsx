import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiEbay, SiDiscogs, SiAmazon } from "react-icons/si";
import type { Marketplace, MarketplaceSettings } from "@shared/schema";

interface MarketplaceSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  marketplace: Marketplace | null;
  settings: MarketplaceSettings | undefined;
  onSave: (marketplace: Marketplace, settings: MarketplaceSettings) => void;
  defaultPrice?: string;
  defaultQuantity?: number;
}

const marketplaceIcons: Record<Marketplace, React.ComponentType<{ className?: string }>> = {
  eBay: SiEbay,
  Discogs: SiDiscogs,
  Amazon: SiAmazon,
};

export function MarketplaceSettingsModal({
  open,
  onOpenChange,
  marketplace,
  settings,
  onSave,
  defaultPrice,
  defaultQuantity,
}: MarketplaceSettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<MarketplaceSettings>({
    status: "active",
    priceOverride: "",
    quantityOverride: undefined,
    notes: "",
  });

  useEffect(() => {
    if (settings) {
      setLocalSettings({
        status: settings.status || "active",
        priceOverride: settings.priceOverride || "",
        quantityOverride: settings.quantityOverride,
        notes: settings.notes || "",
      });
    } else {
      setLocalSettings({
        status: "active",
        priceOverride: "",
        quantityOverride: undefined,
        notes: "",
      });
    }
  }, [settings, marketplace, open]);

  const handleSave = () => {
    if (marketplace) {
      onSave(marketplace, localSettings);
      onOpenChange(false);
    }
  };

  if (!marketplace) return null;

  const Icon = marketplaceIcons[marketplace];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" data-testid={`text-settings-title-${marketplace}`}>
            <Icon className="h-5 w-5" />
            {marketplace} Settings
          </DialogTitle>
          <DialogDescription>
            Configure listing settings for {marketplace}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={localSettings.status}
              onValueChange={(value: "active" | "draft") => 
                setLocalSettings({ ...localSettings, status: value })
              }
            >
              <SelectTrigger data-testid={`select-mp-status-${marketplace}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priceOverride">Price Override</Label>
            <Input
              id="priceOverride"
              value={localSettings.priceOverride || ""}
              onChange={(e) => setLocalSettings({ ...localSettings, priceOverride: e.target.value })}
              placeholder={defaultPrice || "Use default price"}
              data-testid={`input-mp-price-${marketplace}`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank to use default price
            </p>
          </div>

          <div>
            <Label htmlFor="quantityOverride">Quantity Override</Label>
            <Input
              id="quantityOverride"
              type="number"
              min="0"
              value={localSettings.quantityOverride ?? ""}
              onChange={(e) => 
                setLocalSettings({ 
                  ...localSettings, 
                  quantityOverride: e.target.value ? parseInt(e.target.value) : undefined 
                })
              }
              placeholder={defaultQuantity ? String(defaultQuantity) : "Use default quantity"}
              data-testid={`input-mp-qty-${marketplace}`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank to use default quantity
            </p>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={localSettings.notes || ""}
              onChange={(e) => setLocalSettings({ ...localSettings, notes: e.target.value })}
              placeholder="Marketplace-specific notes..."
              rows={3}
              data-testid={`input-mp-notes-${marketplace}`}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1"
            data-testid="button-mp-settings-cancel"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="flex-1"
            data-testid="button-mp-settings-save"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
