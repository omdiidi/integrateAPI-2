import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="text-2xl font-bold font-heading tracking-tight text-primary flex items-center gap-2">
              IntegrateAPI
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      location === link.href ? "text-primary font-semibold" : "text-slate-600"
                    )}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
            <Link href="/contact">
              <Button variant="default" size="sm" className="bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                Contact us directly
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Layout - Logo centered on top, links spread below */}
        <div className="md:hidden flex flex-col gap-2">
          {/* Logo centered */}
          <div className="flex justify-center">
            <Link href="/">
              <a className="text-xl font-bold font-heading tracking-tight text-primary">
                IntegrateAPI
              </a>
            </Link>
          </div>

          {/* Nav links spread evenly */}
          <div className="flex justify-around items-center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className={cn(
                    "text-xs font-medium transition-colors hover:text-primary",
                    location === link.href ? "text-primary font-semibold" : "text-slate-600"
                  )}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
