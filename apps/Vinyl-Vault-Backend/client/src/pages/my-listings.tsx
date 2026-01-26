import { useState } from "react";
import { Layout } from "@/components/layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Disc3, Plus, Trash2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { NetworkListing, Vinyl } from "@shared/schema";

export default function MyListings() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVinylId, setSelectedVinylId] = useState<string>("");

  const { data: myListings, isLoading: loadingListings } = useQuery<NetworkListing[]>({
    queryKey: ["/api/network/my-listings"],
  });

  const { data: vinyls, isLoading: loadingVinyls } = useQuery<Vinyl[]>({
    queryKey: ["/api/vinyls"],
  });

  const availableVinyls = vinyls?.filter(
    (vinyl) => 
      vinyl.status === "active" && 
      !myListings?.some((listing) => listing.vinylId === vinyl.id)
  );

  const createMutation = useMutation({
    mutationFn: async (vinylId: string) => {
      return apiRequest("POST", "/api/network/listings", { vinylId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/network/my-listings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/network/listings"] });
      setDialogOpen(false);
      setSelectedVinylId("");
      toast({
        title: "Listed on network",
        description: "Your vinyl is now visible to other shops",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to list vinyl",
        variant: "destructive",
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/network/listings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/network/my-listings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/network/listings"] });
      toast({
        title: "Removed from network",
        description: "Your vinyl is no longer listed",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove listing",
        variant: "destructive",
      });
    },
  });

  const handleAdd = () => {
    if (selectedVinylId) {
      createMutation.mutate(selectedVinylId);
    }
  };

  const handleRemove = (id: string) => {
    removeMutation.mutate(id);
  };

  const isLoading = loadingListings || loadingVinyls;

  return (
    <Layout 
      title="My Listings" 
      showBack
      rightAction={
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setDialogOpen(true)}
          data-testid="button-add-listing"
        >
          <Plus className="h-5 w-5" />
        </Button>
      }
    >
      <div className="flex-1 flex flex-col px-4 py-4 max-w-2xl mx-auto w-full">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && myListings?.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <div className="bg-muted rounded-full p-6">
              <Disc3 className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1" data-testid="text-empty-title">
                No listings yet
              </h3>
              <p className="text-muted-foreground text-sm" data-testid="text-empty-subtitle">
                Add vinyl from your inventory to the network
              </p>
            </div>
            <Button 
              className="gap-2" 
              onClick={() => setDialogOpen(true)}
              data-testid="button-add-first-listing"
            >
              <Plus className="h-4 w-4" />
              Add Listing
            </Button>
          </div>
        )}

        {!isLoading && myListings && myListings.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-listing-count">
              {myListings.length} {myListings.length === 1 ? "listing" : "listings"}
            </p>
            {myListings.map((listing) => (
              <Card key={listing.id} data-testid={`card-listing-${listing.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate" data-testid={`text-artist-${listing.id}`}>
                        {listing.artist}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate" data-testid={`text-title-${listing.id}`}>
                        {listing.releaseTitle}
                      </p>
                      {listing.price && (
                        <p className="text-sm font-medium mt-1" data-testid={`text-price-${listing.id}`}>
                          {listing.price}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(listing.id)}
                      disabled={removeMutation.isPending}
                      data-testid={`button-remove-${listing.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Network</DialogTitle>
              <DialogDescription>
                Select a vinyl from your inventory to list on the network
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Select value={selectedVinylId} onValueChange={setSelectedVinylId}>
                <SelectTrigger data-testid="select-vinyl">
                  <SelectValue placeholder="Choose a vinyl..." />
                </SelectTrigger>
                <SelectContent>
                  {availableVinyls?.map((vinyl) => (
                    <SelectItem 
                      key={vinyl.id} 
                      value={vinyl.id}
                      data-testid={`option-vinyl-${vinyl.id}`}
                    >
                      {vinyl.artist} - {vinyl.releaseTitle}
                    </SelectItem>
                  ))}
                  {(!availableVinyls || availableVinyls.length === 0) && (
                    <SelectItem value="none" disabled>
                      No vinyl available to list
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={!selectedVinylId || createMutation.isPending}
                  data-testid="button-confirm-add"
                >
                  {createMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Add to Network"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
