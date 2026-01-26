import { Layout } from "@/components/layout";
import { VinylForm } from "@/components/vinyl-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { InsertVinyl } from "@shared/schema";

export default function AddVinyl() {
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const createMutation = useMutation({
    mutationFn: async (data: InsertVinyl) => {
      try {
        const response = await apiRequest("POST", "/api/vinyls", data);
        const vinyl = await (response as Response).json();
        
        // Handle network listing
        if (data.network && data.status !== "draft") {
          try {
            await apiRequest("POST", "/api/network/listings", { vinylId: vinyl.id });
            queryClient.invalidateQueries({ queryKey: ["/api/network/listings"] });
            queryClient.invalidateQueries({ queryKey: ["/api/network/my-listings"] });
          } catch (error) {
            console.error("Failed to create network listing:", error);
          }
        }
        
        return vinyl;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vinyls"] });
      sessionStorage.removeItem("vinyl-image");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message?.replace(/^400:\s*/, "") || "Failed to save vinyl",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (data: InsertVinyl, isDraft: boolean) => {
    try {
      await createMutation.mutateAsync(data);
      
      if (!isDraft) {
        // For print flow, don't show toast - the navigation will happen automatically
        navigate("/");
      } else {
        toast({
          title: "Draft saved",
          description: "Your vinyl has been saved as a draft",
        });
        navigate("/drafts");
      }
    } catch (error) {
      // Error handled in mutation onError
    }
  };

  const handlePrintSuccess = () => {
    navigate("/");
  };

  return (
    <Layout title="Add Vinyl" showBack backFallback="/scan">
      <VinylForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} onPrintSuccess={handlePrintSuccess} />
    </Layout>
  );
}
