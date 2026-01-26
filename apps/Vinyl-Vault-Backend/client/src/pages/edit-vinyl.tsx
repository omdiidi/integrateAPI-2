import { Layout } from "@/components/layout";
import { VinylForm } from "@/components/vinyl-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams } from "wouter";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { InsertVinyl, Vinyl } from "@shared/schema";

export default function EditVinyl() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: vinyl, isLoading, error } = useQuery<Vinyl>({
    queryKey: ["/api/vinyls", id],
    queryFn: async () => {
      const res = await fetch(`/api/vinyls/${id}`);
      if (!res.ok) throw new Error("Failed to fetch vinyl");
      return res.json();
    },
  });

  const [isPrinting, setIsPrinting] = useState(false);

  const updateMutation = useMutation({
    mutationFn: async (data: InsertVinyl) => {
      const updated = await apiRequest("PATCH", `/api/vinyls/${id}`, data);
      
      // Handle network listing changes
      if (vinyl) {
        const wasNetworked = vinyl.network;
        const isNetworked = data.network && data.status !== "draft";
        
        if (!wasNetworked && isNetworked) {
          // User checked Network - create listing
          try {
            await apiRequest("POST", "/api/network/listings", { vinylId: id });
            queryClient.invalidateQueries({ queryKey: ["/api/network/listings"] });
            queryClient.invalidateQueries({ queryKey: ["/api/network/my-listings"] });
          } catch (error) {
            console.error("Failed to create network listing:", error);
          }
        } else if (wasNetworked && !isNetworked) {
          // User unchecked Network - find and remove the listing
          try {
            const myListings = await fetch("/api/network/my-listings").then(r => r.json());
            const listing = myListings.find((l: any) => l.vinylId === id);
            if (listing) {
              await apiRequest("DELETE", `/api/network/listings/${listing.id}`);
              queryClient.invalidateQueries({ queryKey: ["/api/network/listings"] });
              queryClient.invalidateQueries({ queryKey: ["/api/network/my-listings"] });
            }
          } catch (error) {
            console.error("Failed to remove network listing:", error);
          }
        }
      }
      
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls"] });
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls", id] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update vinyl",
        variant: "destructive",
      });
      setIsPrinting(false);
    },
  });

  const handleSubmit = async (data: InsertVinyl, isDraft: boolean) => {
    try {
      await updateMutation.mutateAsync(data);
      
      if (isDraft) {
        toast({
          title: "Vinyl updated",
          description: "Saved as draft",
        });
        navigate("/drafts");
      } else if (!isPrinting) {
        toast({
          title: "Vinyl updated",
          description: "Changes saved successfully",
        });
        navigate(`/vinyl/${id}`);
      }
      // If printing, handlePrintSuccess will navigate to /
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handlePrintStart = () => {
    setIsPrinting(true);
  };

  const handlePrintSuccess = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <Layout title="Loading..." showBack backFallback={`/vinyl/${id}`}>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error || !vinyl) {
    return (
      <Layout title="Error" showBack backFallback={`/vinyl/${id}`}>
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
    <Layout title="Edit Vinyl" showBack backFallback={`/vinyl/${id}`}>
      <VinylForm 
        initialData={vinyl}
        initialImage={vinyl.imagePath}
        onSubmit={handleSubmit} 
        isSubmitting={updateMutation.isPending}
        vinylId={id}
        onPrintStart={handlePrintStart}
        onPrintSuccess={handlePrintSuccess}
      />
    </Layout>
  );
}
