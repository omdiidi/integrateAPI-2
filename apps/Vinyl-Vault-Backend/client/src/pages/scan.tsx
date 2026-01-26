import { Layout } from "@/components/layout";
import { Camera, ImageOff, FileText } from "lucide-react";
import { useLocation } from "wouter";

export default function Scan() {
  const [, navigate] = useLocation();

  const handleCameraClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          sessionStorage.setItem("vinyl-image", base64);
          navigate("/add");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleNoImage = () => {
    sessionStorage.removeItem("vinyl-image");
    navigate("/add");
  };

  const handleDrafts = () => {
    navigate("/drafts");
  };

  return (
    <Layout title="Scan" showBack backFallback="/">
      <div className="flex-1 flex flex-col px-4 py-6 max-w-2xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2" data-testid="text-scan-title">
            Add New Vinyl
          </h2>
          <p className="text-muted-foreground text-sm" data-testid="text-scan-subtitle">
            Choose how you want to start
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleCameraClick}
            className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col items-center justify-center gap-4 hover-elevate active-elevate-2 transition-transform active:scale-[0.98]"
            data-testid="button-use-camera"
          >
            <Camera className="h-16 w-16" />
            <div className="text-center">
              <div className="font-semibold text-lg">Use Camera</div>
              <div className="text-sm opacity-80">Take a photo of the vinyl</div>
            </div>
          </button>

          <button
            onClick={handleNoImage}
            className="bg-secondary text-secondary-foreground rounded-lg p-8 flex flex-col items-center justify-center gap-4 hover-elevate active-elevate-2 transition-transform active:scale-[0.98]"
            data-testid="button-no-image"
          >
            <ImageOff className="h-16 w-16" />
            <div className="text-center">
              <div className="font-semibold text-lg">No Image</div>
              <div className="text-sm opacity-80">Add vinyl details manually</div>
            </div>
          </button>

          <button
            onClick={handleDrafts}
            className="bg-muted text-muted-foreground rounded-lg p-8 flex flex-col items-center justify-center gap-4 hover-elevate active-elevate-2 transition-transform active:scale-[0.98]"
            data-testid="button-drafts"
          >
            <FileText className="h-16 w-16" />
            <div className="text-center">
              <div className="font-semibold text-lg">Drafts</div>
              <div className="text-sm opacity-80">View saved drafts</div>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
}
