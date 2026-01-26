import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { marketplaces, type Marketplace, type OnlineSettings, type MarketplaceSettings } from "@shared/schema";
import { SiEbay, SiDiscogs, SiAmazon } from "react-icons/si";
import { Settings2, Pencil } from "lucide-react";
import { useLocation } from "wouter";
import { MarketplaceSettingsModal } from "./marketplace-settings-modal";

interface MarketplaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: Marketplace[];
  onSelectionChange: (marketplaces: Marketplace[]) => void;
  vinylId?: string;
  onlineSettings?: OnlineSettings;
  onSettingsChange?: (settings: OnlineSettings) => void;
  defaultPrice?: string;
  defaultQuantity?: number;
}

const marketplaceIcons: Record<Marketplace, React.ComponentType<{ className?: string }>> = {
  eBay: SiEbay,
  Discogs: SiDiscogs,
  Amazon: SiAmazon,
};

export function MarketplaceModal({
  open,
  onOpenChange,
  selected,
  onSelectionChange,
  vinylId,
  onlineSettings,
  onSettingsChange,
  defaultPrice,
  defaultQuantity,
}: MarketplaceModalProps) {
  const [, navigate] = useLocation();
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [editingMarketplace, setEditingMarketplace] = useState<Marketplace | null>(null);

  const toggleMarketplace = (marketplace: Marketplace) => {
    if (selected.includes(marketplace)) {
      onSelectionChange(selected.filter((m) => m !== marketplace));
    } else {
      onSelectionChange([...selected, marketplace]);
    }
  };

  const handleAdvancedSettings = () => {
    onOpenChange(false);
    if (vinylId) {
      navigate(`/online-settings/${vinylId}`);
    }
  };

  const handleEditMarketplace = (e: React.MouseEvent, marketplace: Marketplace) => {
    e.stopPropagation();
    setEditingMarketplace(marketplace);
    setSettingsModalOpen(true);
  };

  const handleSaveMarketplaceSettings = (marketplace: Marketplace, settings: MarketplaceSettings) => {
    if (onSettingsChange) {
      const newSettings: OnlineSettings = {
        ...onlineSettings,
        perMarketplace: {
          ...onlineSettings?.perMarketplace,
          [marketplace]: settings,
        },
      };
      onSettingsChange(newSettings);
    }
    setSettingsModalOpen(false);
    setEditingMarketplace(null);
  };

  const getMarketplaceSettings = (marketplace: Marketplace): MarketplaceSettings | undefined => {
    return onlineSettings?.perMarketplace?.[marketplace];
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle data-testid="text-marketplace-title">Select Marketplaces</DialogTitle>
            <DialogDescription>Choose where to list this vinyl online</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {marketplaces.map((marketplace) => {
              const Icon = marketplaceIcons[marketplace];
              const isChecked = selected.includes(marketplace);
              return (
                <div
                  key={marketplace}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover-elevate cursor-pointer"
                  onClick={() => toggleMarketplace(marketplace)}
                  data-testid={`checkbox-marketplace-${marketplace.toLowerCase()}`}
                >
                  <Checkbox
                    checked={isChecked}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMarketplace(marketplace);
                    }}
                  />
                  <Icon className="h-5 w-5" />
                  <span className="font-medium flex-1">{marketplace}</span>
                  {isChecked && onSettingsChange && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2 gap-1 text-xs shrink-0"
                      onClick={(e) => handleEditMarketplace(e, marketplace)}
                      data-testid={`button-edit-marketplace-${marketplace.toLowerCase()}`}
                    >
                      <Pencil className="h-3 w-3" />
                      Edit info
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          
          {vinylId && (
            <Button 
              variant="outline"
              onClick={handleAdvancedSettings}
              className="w-full gap-2"
              data-testid="button-advanced-settings"
            >
              <Settings2 className="h-4 w-4" />
              Advanced online settings
            </Button>
          )}
          
          <Button 
            onClick={() => onOpenChange(false)} 
            className="w-full"
            data-testid="button-marketplace-done"
          >
            Done
          </Button>
        </DialogContent>
      </Dialog>

      <MarketplaceSettingsModal
        open={settingsModalOpen}
        onOpenChange={setSettingsModalOpen}
        marketplace={editingMarketplace}
        settings={editingMarketplace ? getMarketplaceSettings(editingMarketplace) : undefined}
        onSave={handleSaveMarketplaceSettings}
        defaultPrice={defaultPrice}
        defaultQuantity={defaultQuantity}
      />
    </>
  );
}
