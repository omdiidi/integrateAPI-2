import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Box, Zap, Share2, Layers, Cpu, Cloud } from "lucide-react";

export function ModularSolutions() {
  return (
    <section className="py-6 md:py-12 bg-slate-50 border-b border-slate-100 relative overflow-hidden snap-start">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-6 -mt-16">
              Your tools should work together, not get in your way.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We study how your business actually runs, then connect your existing tools of choice into a system that feels natural to use all built around for you. No forced platforms. No generic setups. Just clean, reliable workflows built around your operation.
            </p>
            <Link href="/services">
              <Button className="rounded-full pl-6 pr-4 py-6 text-base bg-white text-primary border border-slate-200 hover:border-primary hover:bg-slate-50 shadow-sm transition-all group">
                Explore integrations
                <span className="ml-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight size={16} />
                </span>
              </Button>
            </Link>
          </div>

          {/* Right Network Visualization */}
          <div className="relative h-[400px] w-full flex items-center justify-center">
            {/* Center Hub */}
            <div className="relative z-20 h-24 w-24 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center animate-pulse">
              <div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center text-white">
                <span className="font-bold text-xl">API</span>
              </div>
            </div>

            {/* Orbiting Icons */}
            <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "60s" }}>
              {[
                { icon: <Box size={20} />, angle: 0, color: "bg-blue-100 text-blue-600" },
                { icon: <Zap size={20} />, angle: 60, color: "bg-amber-100 text-amber-600" },
                { icon: <Share2 size={20} />, angle: 120, color: "bg-purple-100 text-purple-600" },
                { icon: <Layers size={20} />, angle: 180, color: "bg-emerald-100 text-emerald-600" },
                { icon: <Cpu size={20} />, angle: 240, color: "bg-red-100 text-red-600" },
                { icon: <Cloud size={20} />, angle: 300, color: "bg-cyan-100 text-cyan-600" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-xl shadow-md border border-white flex items-center justify-center ${item.color}`}
                  style={{
                    transform: `rotate(${item.angle}deg) translate(140px) rotate(-${item.angle}deg)`
                  }}
                >
                  {item.icon}
                </div>
              ))}
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full z-10 text-slate-200 pointer-events-none">
              <circle cx="50%" cy="50%" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="currentColor" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="80%" y2="65%" stroke="currentColor" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="20%" y2="65%" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
