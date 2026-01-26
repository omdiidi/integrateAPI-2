import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import Home from "@/pages/home";
import Scan from "@/pages/scan";
import AddVinyl from "@/pages/add-vinyl";
import Inventory from "@/pages/inventory";
import Drafts from "@/pages/drafts";
import VinylDetail from "@/pages/vinyl-detail";
import EditVinyl from "@/pages/edit-vinyl";
import OnlineSettings from "@/pages/online-settings";
import Network from "@/pages/network";
import NetworkDetail from "@/pages/network-detail";
import NetworkDM from "@/pages/network-dm";
import MyListings from "@/pages/my-listings";
import Sales from "@/pages/sales";
import SoldItems from "@/pages/sold-items";
import OrderDetail from "@/pages/order-detail";
import NotFound from "@/pages/not-found";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/scan" component={Scan} />
      <Route path="/add" component={AddVinyl} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/inventory/in-store" component={Inventory} />
      <Route path="/inventory/online" component={Inventory} />
      <Route path="/drafts" component={Drafts} />
      <Route path="/vinyl/:id" component={VinylDetail} />
      <Route path="/edit/:id" component={EditVinyl} />
      <Route path="/online-settings/:id" component={OnlineSettings} />
      <Route path="/network" component={Network} />
      <Route path="/network/my-listings" component={MyListings} />
      <Route path="/network/dm/:shopId/:listingId" component={NetworkDM} />
      <Route path="/network/:id" component={NetworkDetail} />
      <Route path="/sales" component={Sales} />
      <Route path="/sales/sold-items" component={SoldItems} />
      <Route path="/sales/orders/:id" component={OrderDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <Router base={baseUrl}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <AppRouter />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
