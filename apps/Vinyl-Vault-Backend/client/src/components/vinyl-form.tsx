import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MarketplaceModal } from "@/components/marketplace-modal";
import { LocationPicker } from "@/components/location-picker";
import { PrintingOverlay } from "@/components/printing-overlay";
import { insertVinylSchema, vinylFormats, vinylGrades, type InsertVinyl, type Marketplace, type Vinyl, type OnlineSettings } from "@shared/schema";
import { Pencil, MapPin, Printer, Save, Minus, Plus, X, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VinylFormProps {
  initialData?: Vinyl;
  initialImage?: string;
  onSubmit: (data: InsertVinyl, isDraft: boolean) => Promise<void>;
  isSubmitting?: boolean;
  vinylId?: string;
  onPrintStart?: () => void;
  onPrintSuccess?: () => void;
}

const defaultLocations = ["Bin A", "Bin B", "Bin C", "Shelf 1", "Shelf 2", "New Arrivals", "Featured"];

export function VinylForm({ initialData, initialImage, onSubmit, isSubmitting, vinylId, onPrintStart, onPrintSuccess }: VinylFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage || null);
  const [marketplaceModalOpen, setMarketplaceModalOpen] = useState(false);
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);
  const [networkInfoOpen, setNetworkInfoOpen] = useState(false);
  const [printingOverlayOpen, setPrintingOverlayOpen] = useState(false);
  const [locations, setLocations] = useState<string[]>(defaultLocations);
  const [onlineSettings, setOnlineSettings] = useState<OnlineSettings>(
    initialData?.onlineSettings || { perMarketplace: {} }
  );

  const form = useForm<InsertVinyl>({
    resolver: zodResolver(insertVinylSchema),
    defaultValues: {
      artist: initialData?.artist || "",
      releaseTitle: initialData?.releaseTitle || "",
      label: initialData?.label || "",
      catalogNumber: initialData?.catalogNumber || "",
      format: initialData?.format,
      countryOfRelease: initialData?.countryOfRelease || "",
      yearOfRelease: initialData?.yearOfRelease || "",
      editionNotes: initialData?.editionNotes || "",
      matrixRunoutSideA: initialData?.matrixRunoutSideA || "",
      matrixRunoutSideB: initialData?.matrixRunoutSideB || "",
      additionalRunoutMarkings: initialData?.additionalRunoutMarkings || false,
      masteringIdentifiersPresent: initialData?.masteringIdentifiersPresent || false,
      mediaGrade: initialData?.mediaGrade,
      sleeveGrade: initialData?.sleeveGrade,
      playTested: initialData?.playTested || false,
      playbackIssues: initialData?.playbackIssues || false,
      playbackNotes: initialData?.playbackNotes || "",
      warpPresent: initialData?.warpPresent || false,
      warpAffectsPlay: initialData?.warpAffectsPlay || false,
      pressingDefectsPresent: initialData?.pressingDefectsPresent || false,
      originalInnerSleeveIncluded: initialData?.originalInnerSleeveIncluded || false,
      originalInsertsIncluded: initialData?.originalInsertsIncluded || false,
      seamSplitsPresent: initialData?.seamSplitsPresent || false,
      writingOrStickersOnSleeveOrLabels: initialData?.writingOrStickersOnSleeveOrLabels || false,
      sealedCopy: initialData?.sealedCopy || false,
      shrinkOriginal: initialData?.shrinkOriginal || false,
      sellerNotes: initialData?.sellerNotes || "",
      price: initialData?.price || "",
      inStore: initialData?.inStore || false,
      online: initialData?.online || false,
      holdForCustomer: initialData?.holdForCustomer || false,
      network: initialData?.network || false,
      quantity: initialData?.quantity || 1,
      location: initialData?.location || "",
      marketplaces: initialData?.marketplaces || [],
      imagePath: initialData?.imagePath || "",
      status: initialData?.status || "active",
    },
  });

  useEffect(() => {
    const storedImage = sessionStorage.getItem("vinyl-image");
    if (storedImage && !initialImage) {
      setImagePreview(storedImage);
    }
  }, [initialImage]);

  const handlePrint = async () => {
    const artist = form.watch("artist");
    const releaseTitle = form.watch("releaseTitle");
    
    if (!artist?.trim() || !releaseTitle?.trim()) {
      form.setError("artist", { message: "Artist and Release title are required to print" });
      return;
    }

    const data = form.getValues();
    if (imagePreview && !data.imagePath) {
      data.imagePath = imagePreview;
    }
    data.status = "active";
    data.onlineSettings = onlineSettings;
    
    setPrintingOverlayOpen(true);
    if (onPrintStart) onPrintStart();
    
    try {
      await onSubmit(data, false);
      // Keep the overlay visible for a minimum of 1.5 seconds
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPrintingOverlayOpen(false);
      if (onPrintSuccess) onPrintSuccess();
    } catch (error) {
      setPrintingOverlayOpen(false);
      // Error is handled in parent component
    }
  };

  const handleSaveAsDraft = async () => {
    const data = form.getValues();
    if (imagePreview && !data.imagePath) {
      data.imagePath = imagePreview;
    }
    data.status = "draft";
    data.onlineSettings = onlineSettings;
    // Don't validate artist/releaseTitle for drafts
    await onSubmit(data, true);
  };

  const removeImage = () => {
    setImagePreview(null);
    sessionStorage.removeItem("vinyl-image");
    form.setValue("imagePath", "");
  };

  const quantity = form.watch("quantity") ?? 1;
  const selectedMarketplaces = form.watch("marketplaces") ?? [];
  const selectedLocation = form.watch("location");
  const sealedCopy = form.watch("sealedCopy");
  const online = form.watch("online");

  return (
    <Form {...form}>
      <form className="flex flex-col min-h-0 flex-1">
        <div className="flex-1 overflow-y-auto px-4 pb-48">
          {imagePreview && (
            <div className="relative mb-6 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Vinyl preview"
                className="w-full aspect-square object-cover"
                data-testid="img-vinyl-preview"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={removeImage}
                data-testid="button-remove-image"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="space-y-6">
            <section>
              <p className="text-xs text-muted-foreground mb-4">Fields marked with <span className="text-destructive">*</span> are required.</p>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artist <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter artist name" data-testid="input-artist" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="releaseTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Release Title <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter release title" data-testid="input-release-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Label" data-testid="input-label" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="catalogNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catalog #</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Catalog #" data-testid="input-catalog" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Format</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-format">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vinylFormats.map((format) => (
                              <SelectItem key={format} value={format}>
                                {format}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearOfRelease"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Year" data-testid="input-year" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="countryOfRelease"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Country of release" data-testid="input-country" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="editionNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edition Notes</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Original pressing, Reissue, Promo" data-testid="input-edition" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section>
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Matrix / Runout
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="matrixRunoutSideA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Side A</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Exact transcription" data-testid="input-matrix-a" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="matrixRunoutSideB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Side B</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Exact transcription" data-testid="input-matrix-b" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-3">
                  <FormField
                    control={form.control}
                    name="additionalRunoutMarkings"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-additional-runout"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Additional runout markings or stamps</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="masteringIdentifiersPresent"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-mastering-ids"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Mastering or plant identifiers present</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Grading
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="mediaGrade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Media Grade</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-media-grade">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vinylGrades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sleeveGrade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sleeve Grade</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-sleeve-grade">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vinylGrades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Condition Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="playTested"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-play-tested"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Play tested</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="playbackIssues"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-playback-issues"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Playback issues</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="warpPresent"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-warp-present"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Warp present</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="warpAffectsPlay"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-warp-affects"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Warp affects play</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pressingDefectsPresent"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0 col-span-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-pressing-defects"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Pressing defects present</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="playbackNotes"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Playback Notes</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Brief playback notes" className="min-h-20" data-testid="textarea-playback-notes" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>

            <section>
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Sleeve & Packaging
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="originalInnerSleeveIncluded"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-inner-sleeve"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Original inner sleeve</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="originalInsertsIncluded"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-inserts"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Original inserts</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seamSplitsPresent"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-seam-splits"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Seam splits</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="writingOrStickersOnSleeveOrLabels"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-writing-stickers"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Writing/stickers</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sealedCopy"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-sealed"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">Sealed copy</FormLabel>
                    </FormItem>
                  )}
                />

                {sealedCopy && (
                  <FormField
                    control={form.control}
                    name="shrinkOriginal"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-shrink-original"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">Shrink original</FormLabel>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Pricing & Notes
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="$0.00" data-testid="input-price" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sellerNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seller Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Short, factual notes" className="min-h-20" data-testid="textarea-seller-notes" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </section>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 space-y-4 z-40 print:hidden">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <FormField
                control={form.control}
                name="inStore"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="checkbox-in-store"
                    />
                    <Label className="font-medium text-sm">In Store</Label>
                  </div>
                )}
              />

              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="online"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-online"
                      />
                      <Label className="font-medium text-sm">Online</Label>
                    </div>
                  )}
                />
                {online && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setMarketplaceModalOpen(true)}
                    data-testid="button-edit-marketplaces"
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                    {selectedMarketplaces.length > 0 && (
                      <span className="ml-1 text-xs">({selectedMarketplaces.length})</span>
                    )}
                  </Button>
                )}
              </div>

              <FormField
                control={form.control}
                name="holdForCustomer"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="checkbox-hold"
                    />
                    <Label className="font-medium text-sm">Hold</Label>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="network"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="checkbox-network"
                    />
                    <Label className="font-medium text-sm">Network</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={() => setNetworkInfoOpen(true)}
                      data-testid="button-network-info"
                    >
                      <Info className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Label className="font-medium text-sm">Qty:</Label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => form.setValue("quantity", Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-qty-minus"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-medium" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => form.setValue("quantity", quantity + 1)}
                    data-testid="button-qty-plus"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setLocationPickerOpen(true)}
                className="gap-1"
                data-testid="button-assign-location"
              >
                <MapPin className="h-4 w-4" />
                {selectedLocation || "Location"}
              </Button>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 gap-2"
                onClick={handleSaveAsDraft}
                disabled={isSubmitting}
                data-testid="button-save-draft"
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </Button>
              <Button
                type="button"
                className="flex-1 gap-2"
                onClick={handlePrint}
                disabled={isSubmitting}
                data-testid="button-print"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </div>

        <PrintingOverlay open={printingOverlayOpen} />

        <MarketplaceModal
          open={marketplaceModalOpen}
          onOpenChange={setMarketplaceModalOpen}
          selected={selectedMarketplaces}
          onSelectionChange={(m) => form.setValue("marketplaces", m)}
          vinylId={vinylId || initialData?.id}
          onlineSettings={onlineSettings}
          onSettingsChange={setOnlineSettings}
          defaultPrice={form.watch("price") || initialData?.price}
          defaultQuantity={form.watch("quantity") ?? initialData?.quantity ?? 1}
        />

        <LocationPicker
          open={locationPickerOpen}
          onOpenChange={setLocationPickerOpen}
          locations={locations}
          selectedLocation={selectedLocation || ""}
          onLocationSelect={(loc) => form.setValue("location", loc)}
          onAddLocation={(loc) => setLocations([...locations, loc])}
        />

        <Dialog open={networkInfoOpen} onOpenChange={setNetworkInfoOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Network</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                Network is a shared inventory feature that lets record shops browse vinyl listings from other shops and quickly connect with them. Users can search a large list of records by key identifiers, view which shop has a specific title, and send a direct request message.
              </p>
              <div>
                <p className="font-semibold text-foreground mb-2">Behavior</p>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li>If Network is checked when saving or printing, publish this vinyl into My Listings in the Network section.</li>
                  <li>If Network is unchecked, do not publish it to the Network.</li>
                  <li>If a record is already published and the user unchecks Network later and saves, remove it from My Listings in the Network section.</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
