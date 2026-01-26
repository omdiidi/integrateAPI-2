import { Layout } from "@/components/layout";
import { Disc3, Store, Globe, Archive, Users, DollarSign } from "lucide-react";
import { Link } from "wouter";

const navItems = [
  {
    title: "Scan",
    description: "Add new vinyl",
    icon: Disc3,
    href: "/scan",
    color: "bg-primary text-primary-foreground",
    testId: "button-scan",
  },
  {
    title: "In Store",
    description: "View inventory",
    icon: Store,
    href: "/inventory/in-store",
    color: "bg-accent text-accent-foreground",
    testId: "button-in-store",
  },
  {
    title: "Online",
    description: "View inventory",
    icon: Globe,
    href: "/inventory/online",
    color: "bg-chart-3 text-white dark:text-white",
    testId: "button-online",
  },
  {
    title: "All Inventory",
    description: "View all records",
    icon: Archive,
    href: "/inventory",
    color: "bg-chart-4 text-foreground dark:text-foreground",
    testId: "button-inventory",
  },
  {
    title: "Network",
    description: "Shop network",
    icon: Users,
    href: "/network",
    color: "bg-chart-5 text-foreground dark:text-foreground",
    testId: "button-network",
  },
  {
    title: "Sales",
    description: "View dashboard",
    icon: DollarSign,
    href: "/sales",
    color: "bg-chart-2 text-white dark:text-white",
    testId: "button-sales",
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="flex-1 flex flex-col px-4 py-6 max-w-2xl mx-auto w-full">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Disc3 className="h-10 w-10 text-primary" />
            <h1 className="text-2xl font-bold" data-testid="text-app-title">
              Vinyl Shop
            </h1>
          </div>
          <p className="text-muted-foreground text-sm" data-testid="text-app-subtitle">
            Inventory Management
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 content-start">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${item.color} rounded-lg p-6 min-h-32 flex flex-col items-center justify-center gap-3 hover-elevate active-elevate-2 transition-transform active:scale-[0.98]`}
              data-testid={item.testId}
            >
              <item.icon className="h-12 w-12" />
              <div className="text-center">
                <div className="font-semibold text-base">{item.title}</div>
                <div className="text-xs opacity-80">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
