import { Route, Switch } from "wouter";
import Home from "@/pages/home";
import Services from "@/pages/services";
import HowItWorks from "@/pages/how-it-works";
import UseCases from "@/pages/use-cases";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Demo from "@/pages/demo";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

export function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/use-cases" component={UseCases} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/demo" component={Demo} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    );
}

