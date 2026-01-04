import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Check, Layers, User, Package, ClipboardList, Zap, Mail, Phone, RotateCcw } from "lucide-react";

// Flip Card Component
function FlipCard({
  frontContent,
  backContent,
  className = "",
  delay = 0
}: {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`${className} cursor-pointer`}
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white rounded-xl shadow-lg border border-slate-100 p-4 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {frontContent}
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-accent/10 to-blue-50 rounded-xl shadow-lg border border-accent/20 p-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {backContent}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-2 md:pt-20 overflow-hidden bg-[#f8fafc]">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient z-0" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 grid-bg opacity-40 z-0 pointer-events-none" />

      {/* Diagonal Clip - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white z-10" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl -mt-12 md:mt-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-200 text-xs font-medium text-slate-600 mb-3 md:mb-6 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Now taking new projects - Q1 openings
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-primary leading-[1.1] mb-6 tracking-tight">
              Calm your business chaos with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">smart systems.</span>
            </h1>

            <p className="text-lg text-slate-600 mb-4 md:mb-8 leading-relaxed">
              We replace manual busywork with simple digital systems that teams actually use. Modernize your operations without changing who you are.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-lg hover:shadow-xl transition-all duration-300">
                    Contact us directly
                  </Button>
                </motion.div>
              </Link>
              <Link href="/use-cases">
                <Button variant="outline" size="lg" className="bg-white/50 backdrop-blur-sm border-slate-200 hover:bg-white">
                  See use cases <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Animated Workflow Diagram */}
          <div className="relative h-[420px] md:h-[480px] w-full hidden md:block">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 480">
                <defs>
                  <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="400" height="480" fill="url(#heroGrid)" />
              </svg>
            </div>

            {/* Custom Workflow Badge */}
            <Link href="/contact">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-50 text-accent font-semibold text-sm px-4 py-2 rounded-xl border border-blue-100 shadow-sm z-30 cursor-pointer"
              >
                Custom Workflow
              </motion.div>
            </Link>

            {/* Click hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 flex items-center gap-1 z-30"
            >
              <RotateCcw size={10} /> Click cards to flip
            </motion.div>

            {/* Inventory Module Card - TOP LEFT */}
            <FlipCard
              delay={0.3}
              className="absolute top-16 left-4 w-52 h-32 z-20"
              frontContent={
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inventory</span>
                    <Package size={14} className="text-accent" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 p-1 bg-blue-50/60 rounded-lg">
                      <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-accent">A1</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-slate-700 truncate">Steel Brackets</div>
                        <div className="text-[9px] text-slate-400">Stock: 142</div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"
                      />
                    </div>
                    <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-lg">
                      <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-amber-600">B3</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-slate-700 truncate">Copper Wire</div>
                        <div className="text-[9px] text-amber-500 truncate">Low: 12</div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"
                      />
                    </div>
                  </div>
                </>
              }
              backContent={
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={14} className="text-accent" />
                    <span className="text-xs font-bold text-accent uppercase">What We Build</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-0">
                    Custom inventory tracking with real-time stock alerts, reorder automation, and barcode scanning.
                  </p>
                </>
              }
            />

            {/* Job Tracker Card - TOP RIGHT */}
            <FlipCard
              delay={0.4}
              className="absolute top-16 right-4 w-52 h-32 z-20"
              frontContent={
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Job Tracker</span>
                    <ClipboardList size={14} className="text-accent" />
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-4">
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-7 h-7 bg-accent rounded-full flex items-center justify-center mb-1"
                      >
                        <Check size={14} className="text-white" />
                      </motion.div>
                      <span className="text-[9px] text-slate-400 font-medium">3 Done</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-accent/30 relative">
                      <motion.div
                        animate={{ x: [0, 30, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-3 h-0.5 bg-accent rounded-full"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        className="w-7 h-7 bg-accent rounded-full flex items-center justify-center mb-1"
                      >
                        <span className="text-[11px] text-white font-bold">2</span>
                      </motion.div>
                      <span className="text-[9px] text-slate-400 font-medium">Active</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-slate-200" />
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center mb-1 border border-slate-200">
                        <span className="text-[11px] text-slate-400 font-bold">5</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-medium">Queue</span>
                    </div>
                  </div>
                </>
              }
              backContent={
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList size={14} className="text-accent" />
                    <span className="text-xs font-bold text-accent uppercase">What We Build</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Visual job boards with drag-drop workflows, automatic status updates, and mobile check-ins for field teams.
                  </p>
                </>
              }
            />

            {/* Central Sync Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl border-2 border-blue-100 flex items-center justify-center z-30"
            >
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.div>

            {/* Connecting Lines SVG - Redesigned for symmetry */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 480">
              {/* Top-left to center (Inventory) */}
              <motion.path
                d="M 130 112 Q 165 200 200 240"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              {/* Top-right to center (Job Tracker) */}
              <motion.path
                d="M 270 112 Q 235 200 200 240"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
              {/* Center to bottom-left (Customer) */}
              <motion.path
                d="M 200 240 Q 165 320 130 368"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
              {/* Center to bottom-right (Automation) */}
              <motion.path
                d="M 200 240 Q 235 320 270 368"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              />
            </svg>

            {/* Customer Record Card - BOTTOM LEFT */}
            <FlipCard
              delay={0.5}
              className="absolute bottom-16 left-4 w-52 h-32 z-20"
              frontContent={
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</span>
                    <User size={14} className="text-accent" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-9 h-9 bg-gradient-to-br from-accent/20 to-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-accent">
                      JD
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium text-slate-700">Jane Doe</div>
                      <div className="text-[9px] text-slate-400">Premium Client</div>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                      <Mail size={9} /> jane@example.com
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                      <Phone size={9} /> (555) 123-4567
                    </div>
                  </div>
                  <div className="mt-1 text-[9px] text-emerald-500 font-medium truncate">● Last order: 2 days ago</div>
                </>
              }
              backContent={
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={14} className="text-accent" />
                    <span className="text-xs font-bold text-accent uppercase">What We Build</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-0">
                    Custom CRM databases that consolidate spreadsheets into one searchable system with order history and automated follow-ups.
                  </p>
                </>
              }
            />

            {/* Automation Card - BOTTOM RIGHT */}
            <FlipCard
              delay={0.6}
              className="absolute bottom-16 right-4 w-52 h-32 z-20"
              frontContent={
                <>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Automation</span>
                    <Layers size={14} className="text-accent" />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                      <Layers size={20} className="text-accent" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <motion.div
                        animate={{ x: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-0.5 bg-accent rounded-full"
                      />
                      <div className="w-2 h-2 bg-accent/30 rounded-full border border-accent" />
                    </div>
                    <span className="text-[10px] text-emerald-500 font-medium">● 24 tasks saved/week</span>
                  </div>
                </>
              }
              backContent={
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Layers size={14} className="text-accent" />
                    <span className="text-xs font-bold text-accent uppercase">What We Build</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Automated workflows for invoice reminders, report generation, and data syncing between apps.
                  </p>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
