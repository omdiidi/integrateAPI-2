import { z } from "zod";

export const vinylFormats = ["LP", "7 inch", "12 inch", "EP", "Single", "Box Set"] as const;
export type VinylFormat = typeof vinylFormats[number];

export const vinylGrades = [
  "Mint (M)",
  "Near Mint (NM)",
  "Very Good Plus (VG+)",
  "Very Good (VG)",
  "Good Plus (G+)",
  "Good (G)",
  "Fair (F)",
  "Poor (P)"
] as const;
export type VinylGrade = typeof vinylGrades[number];

export const marketplaces = ["eBay", "Discogs", "Amazon"] as const;
export type Marketplace = typeof marketplaces[number];

export const vinylStatuses = ["draft", "active", "sold"] as const;
export type VinylStatus = typeof vinylStatuses[number];

export interface MarketplaceSettings {
  status: "active" | "draft";
  priceOverride?: string;
  quantityOverride?: number;
  notes?: string;
}

export interface OnlineSettings {
  listingTitleOverride?: string;
  listingDescription?: string;
  sku?: string;
  shippingProfileName?: string;
  perMarketplace?: {
    eBay?: MarketplaceSettings;
    Discogs?: MarketplaceSettings;
    Amazon?: MarketplaceSettings;
  };
}

export interface Vinyl {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: VinylStatus;
  
  artist: string;
  releaseTitle: string;
  
  label?: string;
  catalogNumber?: string;
  format?: VinylFormat;
  countryOfRelease?: string;
  yearOfRelease?: string;
  editionNotes?: string;
  
  matrixRunoutSideA?: string;
  matrixRunoutSideB?: string;
  additionalRunoutMarkings?: boolean;
  masteringIdentifiersPresent?: boolean;
  
  mediaGrade?: VinylGrade;
  sleeveGrade?: VinylGrade;
  playTested?: boolean;
  playbackIssues?: boolean;
  playbackNotes?: string;
  warpPresent?: boolean;
  warpAffectsPlay?: boolean;
  pressingDefectsPresent?: boolean;
  
  originalInnerSleeveIncluded?: boolean;
  originalInsertsIncluded?: boolean;
  seamSplitsPresent?: boolean;
  writingOrStickersOnSleeveOrLabels?: boolean;
  sealedCopy?: boolean;
  shrinkOriginal?: boolean;
  
  sellerNotes?: string;
  price?: string;
  
  inStore: boolean;
  online: boolean;
  holdForCustomer: boolean;
  network: boolean;
  quantity: number;
  location?: string;
  marketplaces: Marketplace[];
  imagePath?: string;
  onlineSettings?: OnlineSettings;
}

export const onlineSettingsSchema = z.object({
  listingTitleOverride: z.string().optional(),
  listingDescription: z.string().optional(),
  sku: z.string().optional(),
  shippingProfileName: z.string().optional(),
  perMarketplace: z.object({
    eBay: z.object({
      status: z.enum(["active", "draft"]),
      priceOverride: z.string().optional(),
      quantityOverride: z.number().optional(),
      notes: z.string().optional(),
    }).optional(),
    Discogs: z.object({
      status: z.enum(["active", "draft"]),
      priceOverride: z.string().optional(),
      quantityOverride: z.number().optional(),
      notes: z.string().optional(),
    }).optional(),
    Amazon: z.object({
      status: z.enum(["active", "draft"]),
      priceOverride: z.string().optional(),
      quantityOverride: z.number().optional(),
      notes: z.string().optional(),
    }).optional(),
  }).optional(),
});

export const baseVinylSchema = z.object({
  artist: z.string().optional(),
  releaseTitle: z.string().optional(),
  
  label: z.string().optional(),
  catalogNumber: z.string().optional(),
  format: z.enum(vinylFormats).optional(),
  countryOfRelease: z.string().optional(),
  yearOfRelease: z.string().optional(),
  editionNotes: z.string().optional(),
  
  matrixRunoutSideA: z.string().optional(),
  matrixRunoutSideB: z.string().optional(),
  additionalRunoutMarkings: z.boolean().optional(),
  masteringIdentifiersPresent: z.boolean().optional(),
  
  mediaGrade: z.enum(vinylGrades).optional(),
  sleeveGrade: z.enum(vinylGrades).optional(),
  playTested: z.boolean().optional(),
  playbackIssues: z.boolean().optional(),
  playbackNotes: z.string().optional(),
  warpPresent: z.boolean().optional(),
  warpAffectsPlay: z.boolean().optional(),
  pressingDefectsPresent: z.boolean().optional(),
  
  originalInnerSleeveIncluded: z.boolean().optional(),
  originalInsertsIncluded: z.boolean().optional(),
  seamSplitsPresent: z.boolean().optional(),
  writingOrStickersOnSleeveOrLabels: z.boolean().optional(),
  sealedCopy: z.boolean().optional(),
  shrinkOriginal: z.boolean().optional(),
  
  sellerNotes: z.string().optional(),
  price: z.string().optional(),
  
  inStore: z.boolean().optional(),
  online: z.boolean().optional(),
  holdForCustomer: z.boolean().optional(),
  network: z.boolean().optional(),
  quantity: z.number().min(1).optional(),
  location: z.string().optional(),
  marketplaces: z.array(z.enum(marketplaces)).optional(),
  imagePath: z.string().optional(),
  status: z.enum(vinylStatuses).optional(),
  onlineSettings: onlineSettingsSchema.optional(),
});

export const insertVinylSchema = baseVinylSchema.refine(
  (data) => {
    if (data.status === "active" || !data.status) {
      return !!(data.artist?.trim() && data.releaseTitle?.trim());
    }
    return true;
  },
  {
    message: "Artist and Release title are required for active records",
    path: ["artist"],
  }
);

export type InsertVinyl = z.infer<typeof insertVinylSchema>;

export interface Location {
  id: string;
  name: string;
}

// Network feature types
export interface Shop {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface NetworkListing {
  id: string;
  shopId: string;
  artist: string;
  releaseTitle: string;
  label?: string;
  catalogNumber?: string;
  format?: VinylFormat;
  price?: string;
  createdAt: string;
  vinylId?: string; // References local vinyl if from this shop
}

export interface NetworkListingWithShop extends NetworkListing {
  shop: Shop;
}

export interface Message {
  id: string;
  threadId: string;
  shopId: string;
  networkListingId: string;
  content: string;
  isFromMe: boolean;
  createdAt: string;
}

export interface MessageThread {
  id: string;
  shopId: string;
  networkListingId: string;
  messages: Message[];
}

export const insertNetworkListingSchema = z.object({
  vinylId: z.string(),
});

export type InsertNetworkListing = z.infer<typeof insertNetworkListingSchema>;

export const insertMessageSchema = z.object({
  threadId: z.string().optional(),
  shopId: z.string(),
  networkListingId: z.string(),
  content: z.string().min(1, "Message is required"),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Sales types
export const salesChannels = ["inStore", "online", "network"] as const;
export type SalesChannel = typeof salesChannels[number];

export interface SalesLineItem {
  id: string;
  orderId: string;
  vinylId?: string;
  artist: string;
  releaseTitle: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  soldAt: string;
  channel: SalesChannel;
  marketplace?: string;
  buyerName?: string;
  buyerEmail?: string;
  totalCents: number;
  lineItems?: SalesLineItem[];
}

export interface SalesStats {
  totalRevenue: number;
  unitsSold: number;
  ordersCount: number;
  avgOrderValue: number;
  revenueByDay: { date: string; revenue: number }[];
  topArtists: { artist: string; revenue: number }[];
  salesByChannel: { channel: SalesChannel; count: number; revenue: number }[];
}

export const insertSalesOrderSchema = z.object({
  channel: z.enum(salesChannels),
  marketplace: z.string().optional(),
  buyerName: z.string().optional(),
  buyerEmail: z.string().optional(),
  lineItems: z.array(z.object({
    vinylId: z.string().optional(),
    artist: z.string(),
    releaseTitle: z.string(),
    quantity: z.number().min(1),
    unitPriceCents: z.number(),
  })),
});

export type InsertSalesOrder = z.infer<typeof insertSalesOrderSchema>;
