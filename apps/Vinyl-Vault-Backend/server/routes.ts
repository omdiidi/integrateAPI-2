import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVinylSchema, baseVinylSchema, insertNetworkListingSchema, insertMessageSchema, insertSalesOrderSchema } from "../shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all vinyls with optional filters
  app.get("/api/vinyls", async (req, res) => {
    try {
      let vinyls = await storage.getAllVinyls();
      
      const { inStore, online, status } = req.query;
      
      if (inStore === "true") {
        vinyls = vinyls.filter(v => v.inStore);
      }
      if (online === "true") {
        vinyls = vinyls.filter(v => v.online);
      }
      if (status && typeof status === "string") {
        vinyls = vinyls.filter(v => v.status === status);
      }
      
      res.json(vinyls);
    } catch (error) {
      console.error("Error fetching vinyls:", error);
      res.status(500).json({ error: "Failed to fetch vinyls" });
    }
  });

  // Get single vinyl by ID
  app.get("/api/vinyls/:id", async (req, res) => {
    try {
      const vinyl = await storage.getVinylById(req.params.id);
      if (!vinyl) {
        return res.status(404).json({ error: "Vinyl not found" });
      }
      res.json(vinyl);
    } catch (error) {
      console.error("Error fetching vinyl:", error);
      res.status(500).json({ error: "Failed to fetch vinyl" });
    }
  });

  // Create new vinyl
  app.post("/api/vinyls", async (req, res) => {
    try {
      const result = insertVinylSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.toString() });
      }
      
      const vinyl = await storage.createVinyl(result.data);
      res.status(201).json(vinyl);
    } catch (error) {
      console.error("Error creating vinyl:", error);
      res.status(500).json({ error: "Failed to create vinyl" });
    }
  });

  // Update vinyl
  app.patch("/api/vinyls/:id", async (req, res) => {
    try {
      const result = baseVinylSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      const vinyl = await storage.updateVinyl(req.params.id, result.data);
      if (!vinyl) {
        return res.status(404).json({ error: "Vinyl not found" });
      }
      res.json(vinyl);
    } catch (error) {
      console.error("Error updating vinyl:", error);
      res.status(500).json({ error: "Failed to update vinyl" });
    }
  });

  // Delete vinyl
  app.delete("/api/vinyls/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteVinyl(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Vinyl not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting vinyl:", error);
      res.status(500).json({ error: "Failed to delete vinyl" });
    }
  });

  // Mark as sold (decrement quantity or remove) and create sales record
  app.post("/api/vinyls/:id/sold", async (req, res) => {
    try {
      const existingVinyl = await storage.getVinylById(req.params.id);
      if (!existingVinyl) {
        return res.status(404).json({ error: "Vinyl not found" });
      }
      
      // Create sales order with snapshot of vinyl data if price exists
      const priceStr = existingVinyl.price || "";
      const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
      const unitPriceCents = isNaN(priceNum) ? 0 : Math.round(priceNum * 100);
      
      // Only create sales record if we have valid data
      if (unitPriceCents > 0 && existingVinyl.artist && existingVinyl.releaseTitle) {
        await storage.createSalesOrder({
          channel: existingVinyl.online ? "online" : "inStore",
          marketplace: existingVinyl.online && existingVinyl.marketplaces?.length ? existingVinyl.marketplaces[0] : undefined,
          lineItems: [{
            vinylId: existingVinyl.id,
            artist: existingVinyl.artist,
            releaseTitle: existingVinyl.releaseTitle,
            quantity: 1,
            unitPriceCents,
          }],
        });
      }
      
      const vinyl = await storage.markSold(req.params.id);
      res.json(vinyl);
    } catch (error) {
      console.error("Error marking vinyl as sold:", error);
      res.status(500).json({ error: "Failed to mark vinyl as sold" });
    }
  });

  // Network API routes
  
  // Get all network listings
  app.get("/api/network/listings", async (req, res) => {
    try {
      const listings = await storage.getAllNetworkListings();
      res.json(listings);
    } catch (error) {
      console.error("Error fetching network listings:", error);
      res.status(500).json({ error: "Failed to fetch network listings" });
    }
  });

  // Get single network listing
  app.get("/api/network/listings/:id", async (req, res) => {
    try {
      const listing = await storage.getNetworkListingById(req.params.id);
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      res.json(listing);
    } catch (error) {
      console.error("Error fetching network listing:", error);
      res.status(500).json({ error: "Failed to fetch network listing" });
    }
  });

  // Get my network listings
  app.get("/api/network/my-listings", async (req, res) => {
    try {
      const listings = await storage.getMyNetworkListings();
      res.json(listings);
    } catch (error) {
      console.error("Error fetching my network listings:", error);
      res.status(500).json({ error: "Failed to fetch my network listings" });
    }
  });

  // Create network listing from vinyl
  app.post("/api/network/listings", async (req, res) => {
    try {
      const result = insertNetworkListingSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.message });
      }
      
      const listing = await storage.createNetworkListing(result.data.vinylId);
      res.status(201).json(listing);
    } catch (error) {
      console.error("Error creating network listing:", error);
      res.status(500).json({ error: "Failed to create network listing" });
    }
  });

  // Remove network listing
  app.delete("/api/network/listings/:id", async (req, res) => {
    try {
      const deleted = await storage.removeNetworkListing(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Listing not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error removing network listing:", error);
      res.status(500).json({ error: "Failed to remove network listing" });
    }
  });

  // Get all shops
  app.get("/api/network/shops", async (req, res) => {
    try {
      const shops = await storage.getAllShops();
      res.json(shops);
    } catch (error) {
      console.error("Error fetching shops:", error);
      res.status(500).json({ error: "Failed to fetch shops" });
    }
  });

  // Get message thread
  app.get("/api/network/messages/:shopId/:listingId", async (req, res) => {
    try {
      const thread = await storage.getOrCreateMessageThread(
        req.params.shopId,
        req.params.listingId
      );
      res.json(thread);
    } catch (error) {
      console.error("Error fetching message thread:", error);
      res.status(500).json({ error: "Failed to fetch message thread" });
    }
  });

  // Send message
  app.post("/api/network/messages", async (req, res) => {
    try {
      const result = insertMessageSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.message });
      }
      
      const message = await storage.sendMessage(result.data);
      res.status(201).json(message);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Sales API routes
  
  // Get all sales orders
  app.get("/api/sales/orders", async (req, res) => {
    try {
      const { startDate, endDate, search } = req.query;
      const orders = await storage.getAllSalesOrders({
        startDate: startDate as string | undefined,
        endDate: endDate as string | undefined,
        search: search as string | undefined,
      });
      res.json(orders);
    } catch (error) {
      console.error("Error fetching sales orders:", error);
      res.status(500).json({ error: "Failed to fetch sales orders" });
    }
  });

  // Get single sales order
  app.get("/api/sales/orders/:id", async (req, res) => {
    try {
      const order = await storage.getSalesOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching sales order:", error);
      res.status(500).json({ error: "Failed to fetch sales order" });
    }
  });

  // Get all sales line items
  app.get("/api/sales/line-items", async (req, res) => {
    try {
      const { startDate, endDate, search } = req.query;
      const items = await storage.getAllSalesLineItems({
        startDate: startDate as string | undefined,
        endDate: endDate as string | undefined,
        search: search as string | undefined,
      });
      res.json(items);
    } catch (error) {
      console.error("Error fetching sales line items:", error);
      res.status(500).json({ error: "Failed to fetch sales line items" });
    }
  });

  // Get sales stats (with optional range parameter)
  app.get("/api/sales/stats", async (req, res) => {
    try {
      const rangeParam = (req.query.range as string) || '30';
      const validRanges = ['7', '30', '90', 'all'];
      const range = validRanges.includes(rangeParam) ? (rangeParam as '7' | '30' | '90' | 'all') : '30';
      const stats = await storage.getSalesStats(range);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching sales stats:", error);
      res.status(500).json({ error: "Failed to fetch sales stats" });
    }
  });

  // Get sales stats by range parameter
  app.get("/api/sales/stats/:range", async (req, res) => {
    try {
      const rangeParam = req.params.range as string;
      const validRanges = ['7', '30', '90', 'all'];
      const range = validRanges.includes(rangeParam) ? (rangeParam as '7' | '30' | '90' | 'all') : '30';
      const stats = await storage.getSalesStats(range);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching sales stats:", error);
      res.status(500).json({ error: "Failed to fetch sales stats" });
    }
  });

  // Create sales order
  app.post("/api/sales/orders", async (req, res) => {
    try {
      const result = insertSalesOrderSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.message });
      }
      
      const order = await storage.createSalesOrder(result.data);
      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating sales order:", error);
      res.status(500).json({ error: "Failed to create sales order" });
    }
  });

  return httpServer;
}
