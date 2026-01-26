import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface PrintingOverlayProps {
  open: boolean;
}

export function PrintingOverlay({ open }: PrintingOverlayProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <div className="fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center py-12 px-6 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
          <h2 className="text-lg font-semibold text-white mb-2">Printing label...</h2>
          <p className="text-sm text-white/80">Saving to inventory</p>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
