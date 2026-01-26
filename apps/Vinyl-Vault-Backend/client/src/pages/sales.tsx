import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { DollarSign, Package, ShoppingCart, TrendingUp, List } from "lucide-react";
import type { SalesStats, SalesLineItem, SalesOrder } from "@shared/schema";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DateRange = "7" | "30" | "90" | "all";

const rangeLabels: Record<DateRange, string> = {
  "7": "7 Days",
  "30": "30 Days",
  "90": "90 Days",
  "all": "All Time",
};

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const channelLabels: Record<string, string> = {
  inStore: "In Store",
  online: "Online",
  network: "Network",
};

function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Sales() {
  const [range, setRange] = useState<DateRange>("30");

  const { data: stats, isLoading: statsLoading } = useQuery<SalesStats>({
    queryKey: ["/api/sales/stats", range],
  });

  const { data: recentItems, isLoading: itemsLoading } = useQuery<
    (SalesLineItem & { order: SalesOrder })[]
  >({
    queryKey: ["/api/sales/line-items"],
  });

  const recentPreview = recentItems?.slice(0, 10) || [];

  const revenueChartData = stats?.revenueByDay.map((d) => ({
    date: formatDate(d.date),
    revenue: d.revenue / 100,
  })) || [];

  const topArtistsData = stats?.topArtists.slice(0, 5).map((a) => ({
    name: a.artist.length > 15 ? a.artist.substring(0, 15) + "..." : a.artist,
    revenue: a.revenue / 100,
  })) || [];

  const channelData = stats?.salesByChannel.map((c) => ({
    name: channelLabels[c.channel] || c.channel,
    value: c.count,
    revenue: c.revenue / 100,
  })) || [];

  return (
    <Layout
      title="Sales Dashboard"
      showBack
    >
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-1">
            {(Object.keys(rangeLabels) as DateRange[]).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={range === r ? "default" : "outline"}
                onClick={() => setRange(r)}
                data-testid={`button-range-${r}`}
              >
                {rangeLabels[r]}
              </Button>
            ))}
          </div>
          <Link href="/sales/sold-items">
            <Button variant="default" data-testid="button-sold-items">
              <List className="h-4 w-4 mr-2" />
              Sold Items
            </Button>
          </Link>
        </div>

        {statsLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="h-16 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <DollarSign className="h-4 w-4" />
                  Total Revenue
                </div>
                <div className="text-2xl font-bold mt-1" data-testid="text-total-revenue">
                  {formatCurrency(stats?.totalRevenue || 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Package className="h-4 w-4" />
                  Units Sold
                </div>
                <div className="text-2xl font-bold mt-1" data-testid="text-units-sold">
                  {stats?.unitsSold || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <ShoppingCart className="h-4 w-4" />
                  Orders
                </div>
                <div className="text-2xl font-bold mt-1" data-testid="text-orders-count">
                  {stats?.ordersCount || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <TrendingUp className="h-4 w-4" />
                  Avg Order
                </div>
                <div className="text-2xl font-bold mt-1" data-testid="text-avg-order">
                  {formatCurrency(stats?.avgOrderValue || 0)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} className="text-muted-foreground" />
                  <YAxis tick={{ fontSize: 10 }} className="text-muted-foreground" tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
                    contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Top Artists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topArtistsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `$${v}`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
                      contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sales by Channel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {channelData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string, props: any) => [
                        `${value} orders ($${props.payload.revenue.toFixed(2)})`,
                        name,
                      ]}
                      contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-base">Recent Sales</CardTitle>
            <Link href="/sales/sold-items">
              <Button size="sm" variant="ghost" data-testid="link-view-all">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {itemsLoading ? (
              <div className="p-4">
                <div className="h-32 bg-muted animate-pulse rounded" />
              </div>
            ) : recentPreview.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No sales yet
              </div>
            ) : (
              <div className="divide-y">
                {recentPreview.map((item) => (
                  <Link
                    key={item.id}
                    href={`/sales/orders/${item.orderId}`}
                    className="block p-3 hover-elevate active-elevate-2"
                    data-testid={`row-sale-${item.id}`}
                  >
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{item.artist}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {item.releaseTitle}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(item.order.soldAt)} - {item.order.orderNumber}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-medium">
                          {formatCurrency(item.lineTotalCents)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
