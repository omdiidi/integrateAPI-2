import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Store, Globe, Users, Calendar, Hash, User, Mail } from "lucide-react";
import type { SalesOrder } from "@shared/schema";

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const channelConfig: Record<string, { label: string; icon: typeof Store }> = {
  inStore: { label: "In Store", icon: Store },
  online: { label: "Online", icon: Globe },
  network: { label: "Network", icon: Users },
};

export default function OrderDetail() {
  const [, params] = useRoute("/sales/orders/:id");
  const orderId = params?.id;

  const { data: order, isLoading } = useQuery<SalesOrder>({
    queryKey: ["/api/sales/orders", orderId],
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <Layout title="Order Details" showBack backFallback="/sales/sold-items">
        <div className="p-4 space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-md" />
          <div className="h-64 bg-muted animate-pulse rounded-md" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout title="Order Details" showBack backFallback="/sales/sold-items">
        <div className="p-8 text-center text-muted-foreground">
          Order not found
        </div>
      </Layout>
    );
  }

  const channel = channelConfig[order.channel] || channelConfig.inStore;
  const ChannelIcon = channel.icon;

  return (
    <Layout title="Order Details" showBack backFallback="/sales/sold-items">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-lg" data-testid="text-order-number">
                {order.orderNumber}
              </CardTitle>
              <Badge variant="secondary" className="gap-1">
                <ChannelIcon className="h-3 w-3" />
                {channel.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span data-testid="text-date">{formatDateTime(order.soldAt)}</span>
            </div>

            {order.marketplace && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>Marketplace: {order.marketplace}</span>
              </div>
            )}

            {order.buyerName && (
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span data-testid="text-buyer-name">{order.buyerName}</span>
              </div>
            )}

            {order.buyerEmail && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span data-testid="text-buyer-email">{order.buyerEmail}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Line Items</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {order.lineItems?.map((item) => (
                <div key={item.id} className="p-4" data-testid={`row-line-item-${item.id}`}>
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{item.artist}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {item.releaseTitle}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-medium">{formatCurrency(item.lineTotalCents)}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.quantity} x {formatCurrency(item.unitPriceCents)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-bold" data-testid="text-order-total">
                {formatCurrency(order.totalCents)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
