import { Layout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Search, Store, Globe, Users } from "lucide-react";
import type { SalesLineItem, SalesOrder } from "@shared/schema";

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const channelConfig: Record<string, { label: string; icon: typeof Store }> = {
  inStore: { label: "In Store", icon: Store },
  online: { label: "Online", icon: Globe },
  network: { label: "Network", icon: Users },
};

export default function SoldItems() {
  const [search, setSearch] = useState("");

  const { data: items, isLoading } = useQuery<(SalesLineItem & { order: SalesOrder })[]>({
    queryKey: ["/api/sales/line-items", search],
  });

  const filteredItems = search
    ? items?.filter(
        (item) =>
          item.artist.toLowerCase().includes(search.toLowerCase()) ||
          item.releaseTitle.toLowerCase().includes(search.toLowerCase()) ||
          item.order.orderNumber.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  return (
    <Layout title="Sold Items" showBack backFallback="/sales">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b bg-background sticky top-0 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by artist, title, or order..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 bg-muted animate-pulse rounded-md" />
              ))}
            </div>
          ) : !filteredItems || filteredItems.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {search ? "No matching sold items found" : "No sold items yet"}
            </div>
          ) : (
            <div className="divide-y">
              {filteredItems.map((item) => {
                const channel = channelConfig[item.order.channel] || channelConfig.inStore;
                const ChannelIcon = channel.icon;
                
                return (
                  <Link
                    key={item.id}
                    href={`/sales/orders/${item.orderId}`}
                    className="block p-4 hover-elevate active-elevate-2"
                    data-testid={`row-item-${item.id}`}
                  >
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate" data-testid={`text-artist-${item.id}`}>
                          {item.artist}
                        </div>
                        <div className="text-sm text-muted-foreground truncate" data-testid={`text-title-${item.id}`}>
                          {item.releaseTitle}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.order.soldAt)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.order.orderNumber}
                          </Badge>
                          <Badge variant="secondary" className="text-xs gap-1">
                            <ChannelIcon className="h-3 w-3" />
                            {channel.label}
                          </Badge>
                          {item.order.marketplace && (
                            <Badge variant="secondary" className="text-xs">
                              {item.order.marketplace}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold" data-testid={`text-price-${item.id}`}>
                          {formatCurrency(item.lineTotalCents)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.quantity > 1
                            ? `${item.quantity} x ${formatCurrency(item.unitPriceCents)}`
                            : `Qty: ${item.quantity}`}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
