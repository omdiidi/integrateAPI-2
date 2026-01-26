import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams } from "wouter";
import { Loader2, Pencil, Trash2, ShoppingCart, Store, Globe, Clock, MapPin, Check, X } from "lucide-react";
import { SiEbay, SiAmazon, SiDiscogs } from "react-icons/si";
import type { Vinyl } from "@shared/schema";

export default function VinylDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [editPriceMode, setEditPriceMode] = useState(false);
  const [newPrice, setNewPrice] = useState<string>("");

  const { data: vinyl, isLoading, error } = useQuery<Vinyl>({
    queryKey: ["/api/vinyls", id],
    queryFn: async () => {
      const res = await fetch(`/api/vinyls/${id}`);
      if (!res.ok) throw new Error("Failed to fetch vinyl");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", `/api/vinyls/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls"] });
      toast({ title: "Vinyl deleted", description: "The record has been removed from inventory" });
      navigate("/inventory");
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const soldMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", `/api/vinyls/${id}/sold`);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls"] });
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls", id] });
      toast({ 
        title: "Marked as sold", 
        description: vinyl && vinyl.quantity > 1 
          ? `Quantity reduced. ${vinyl.quantity - 1} remaining.`
          : "Record removed from inventory"
      });
      if (vinyl && vinyl.quantity <= 1) {
        navigate("/inventory");
      }
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const priceMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("PATCH", `/api/vinyls/${id}`, { price: newPrice });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls"] });
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls", id] });
      toast({ title: "Price updated", description: `Price changed to ${newPrice}` });
      setEditPriceMode(false);
      setNewPrice("");
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const BooleanField = ({ label, value }: { label: string; value?: boolean }) => (
    <div className="flex items-center gap-2">
      {value ? (
        <Check className="h-4 w-4 text-accent" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={value ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );

  const getMarketplaceIcon = (marketplace: string) => {
    switch (marketplace.toLowerCase()) {
      case "ebay":
        return <SiEbay className="h-6 w-6" />;
      case "amazon":
        return <SiAmazon className="h-6 w-6" />;
      case "discogs":
        return <SiDiscogs className="h-6 w-6" />;
      default:
        return <Globe className="h-6 w-6 text-muted-foreground" />;
    }
  };

  if (isLoading) {
    return (
      <Layout title="Loading..." showBack backFallback="/inventory">
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error || !vinyl) {
    return (
      <Layout title="Error" showBack backFallback="/inventory">
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12 px-4">
          <p className="text-muted-foreground">Failed to load vinyl details</p>
          <Button variant="outline" onClick={() => navigate("/inventory")}>
            Back to Inventory
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={vinyl.artist}
      showBack
      backFallback="/inventory"
      rightAction={
        <Button 
          onClick={() => navigate(`/edit/${vinyl.id}`)}
          data-testid="button-edit"
          className="gap-2"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      }
    >
      <div className="flex-1 flex flex-col pb-32">
        <div className="px-4 py-4 max-w-2xl mx-auto w-full space-y-6">
          {vinyl.imagePath && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={vinyl.imagePath}
                alt={vinyl.releaseTitle}
                className="w-full aspect-square object-cover"
                data-testid="img-vinyl-detail"
              />
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold" data-testid="text-detail-artist">
                {vinyl.artist}
              </h1>
              <p className="text-lg text-muted-foreground" data-testid="text-detail-title">
                {vinyl.releaseTitle}
              </p>
            </div>
            {vinyl.marketplaces && vinyl.marketplaces.length > 0 && (
              <div className="flex gap-3 items-start pt-1">
                {vinyl.marketplaces.map((marketplace) => (
                  <div
                    key={marketplace}
                    className="p-2 rounded-md bg-muted hover-elevate transition-colors"
                    title={marketplace}
                    data-testid={`marketplace-logo-${marketplace.toLowerCase()}`}
                  >
                    {getMarketplaceIcon(marketplace)}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {vinyl.status === "draft" && (
              <Badge variant="secondary">Draft</Badge>
            )}
            {vinyl.inStore && vinyl.status !== "draft" && (
              <Badge variant="secondary" className="gap-1">
                <Store className="h-3 w-3" />
                In Store
              </Badge>
            )}
            {vinyl.online && vinyl.status !== "draft" && (
              <Badge variant="secondary" className="gap-1">
                <Globe className="h-3 w-3" />
                Online
              </Badge>
            )}
            {vinyl.holdForCustomer && (
              <Badge variant="secondary" className="gap-1 bg-chart-4/20">
                <Clock className="h-3 w-3" />
                Hold
              </Badge>
            )}
            {vinyl.location && (
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3 w-3" />
                {vinyl.location}
              </Badge>
            )}
            {vinyl.quantity > 1 && (
              <Badge variant="secondary">x{vinyl.quantity}</Badge>
            )}
          </div>

          {vinyl.price && (
            <div className="flex items-center gap-3">
              {editPriceMode ? (
                <>
                  <Input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder={vinyl.price}
                    className="w-32"
                    data-testid="input-edit-price"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    onClick={() => priceMutation.mutate()}
                    disabled={priceMutation.isPending || !newPrice}
                    data-testid="button-save-price"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditPriceMode(false);
                      setNewPrice("");
                    }}
                    disabled={priceMutation.isPending}
                    data-testid="button-cancel-price"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-primary" data-testid="text-detail-price">
                    {vinyl.price}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditPriceMode(true);
                      setNewPrice(vinyl.price || "");
                    }}
                    data-testid="button-edit-price"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          )}

          <Separator />

          <Card className="p-4">
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
              Release Info
            </h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {vinyl.label && (
                <>
                  <span className="text-muted-foreground">Label</span>
                  <span>{vinyl.label}</span>
                </>
              )}
              {vinyl.catalogNumber && (
                <>
                  <span className="text-muted-foreground">Catalog #</span>
                  <span>{vinyl.catalogNumber}</span>
                </>
              )}
              {vinyl.format && (
                <>
                  <span className="text-muted-foreground">Format</span>
                  <span>{vinyl.format}</span>
                </>
              )}
              {vinyl.countryOfRelease && (
                <>
                  <span className="text-muted-foreground">Country</span>
                  <span>{vinyl.countryOfRelease}</span>
                </>
              )}
              {vinyl.yearOfRelease && (
                <>
                  <span className="text-muted-foreground">Year</span>
                  <span>{vinyl.yearOfRelease}</span>
                </>
              )}
              {vinyl.editionNotes && (
                <>
                  <span className="text-muted-foreground">Edition</span>
                  <span>{vinyl.editionNotes}</span>
                </>
              )}
            </div>
          </Card>

          {(vinyl.matrixRunoutSideA || vinyl.matrixRunoutSideB) && (
            <Card className="p-4">
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
                Matrix / Runout
              </h3>
              <div className="space-y-2 text-sm">
                {vinyl.matrixRunoutSideA && (
                  <div>
                    <span className="text-muted-foreground">Side A: </span>
                    <span className="font-mono">{vinyl.matrixRunoutSideA}</span>
                  </div>
                )}
                {vinyl.matrixRunoutSideB && (
                  <div>
                    <span className="text-muted-foreground">Side B: </span>
                    <span className="font-mono">{vinyl.matrixRunoutSideB}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-1 mt-3">
                  <BooleanField label="Additional runout markings" value={vinyl.additionalRunoutMarkings} />
                  <BooleanField label="Mastering identifiers present" value={vinyl.masteringIdentifiersPresent} />
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4">
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
              Grading & Condition
            </h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
              {vinyl.mediaGrade && (
                <>
                  <span className="text-muted-foreground">Media</span>
                  <span>{vinyl.mediaGrade}</span>
                </>
              )}
              {vinyl.sleeveGrade && (
                <>
                  <span className="text-muted-foreground">Sleeve</span>
                  <span>{vinyl.sleeveGrade}</span>
                </>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <BooleanField label="Play tested" value={vinyl.playTested} />
              <BooleanField label="Playback issues" value={vinyl.playbackIssues} />
              <BooleanField label="Warp present" value={vinyl.warpPresent} />
              <BooleanField label="Warp affects play" value={vinyl.warpAffectsPlay} />
              <BooleanField label="Pressing defects" value={vinyl.pressingDefectsPresent} />
            </div>
            {vinyl.playbackNotes && (
              <div className="mt-3 text-sm">
                <span className="text-muted-foreground">Notes: </span>
                <span>{vinyl.playbackNotes}</span>
              </div>
            )}
          </Card>

          <Card className="p-4">
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
              Sleeve & Packaging
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <BooleanField label="Original inner sleeve" value={vinyl.originalInnerSleeveIncluded} />
              <BooleanField label="Original inserts" value={vinyl.originalInsertsIncluded} />
              <BooleanField label="Seam splits" value={vinyl.seamSplitsPresent} />
              <BooleanField label="Writing/stickers" value={vinyl.writingOrStickersOnSleeveOrLabels} />
              <BooleanField label="Sealed copy" value={vinyl.sealedCopy} />
              {vinyl.sealedCopy && (
                <BooleanField label="Shrink original" value={vinyl.shrinkOriginal} />
              )}
            </div>
          </Card>

          {vinyl.sellerNotes && (
            <Card className="p-4">
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
                Seller Notes
              </h3>
              <p className="text-sm">{vinyl.sellerNotes}</p>
            </Card>
          )}

          {vinyl.marketplaces && vinyl.marketplaces.length > 0 && (
            <Card className="p-4">
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
                Marketplaces
              </h3>
              <div className="flex flex-wrap gap-2">
                {vinyl.marketplaces.map((mp) => (
                  <Badge key={mp} variant="secondary">{mp}</Badge>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button 
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => navigate(`/edit/${id}`)}
            data-testid="button-edit"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="flex-1 gap-2"
                data-testid="button-delete"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this vinyl?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove the vinyl from your inventory.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate()}
                  className="bg-destructive text-destructive-foreground"
                  data-testid="button-confirm-delete"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {vinyl.status !== "draft" && (
            <Button 
              className="flex-1 gap-2"
              onClick={() => soldMutation.mutate()}
              disabled={soldMutation.isPending}
              data-testid="button-sold"
            >
              {soldMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
              Sold
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
