import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, FileText, Settings, Database, FileInput, Zap, Calendar } from "lucide-react";
import { OperationalDashboardMock } from "./OperationalDashboardMock";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  label: string;
  points: string[];
  align?: "left" | "right";
  index: number;
}

export function FeatureSplit() {
  const features: FeatureProps[] = [
    {
      title: "Workflow Digitization",
      description: "Stop passing physical papers around. We turn your checklists, forms, and approval processes into digital workflows that track themselves.",
      label: "Eliminate Paperwork",
      icon: <FileText size={20} />,
      points: ["Digital intake forms", "Auto-assigned tasks", "Instant status updates"],
      align: "left",
      index: 0
    },
    {
      title: "Tool Integrations",
      description: "Your scheduling tool should talk to your CRM, and your CRM should talk to your invoicing. We bridge the gaps so you don't have to copy-paste data.",
      label: "Connect Everything",
      icon: <Settings size={20} />,
      points: ["Sync POS with Accounting", "Automate customer emails", "Centralized client records"],
      align: "right",
      index: 1
    },
    {
      title: "Operational Dashboards",
      description: "Get visibility without the busywork. See exactly where every job, order, or patient is in your process at a glance.",
      label: "Real-time Clarity",
      icon: <Database size={20} />,
      points: ["Live project tracking", "Revenue forecasting", "Team capacity planning"],
      align: "left",
      index: 2
    }
  ];

  return (
    <div className="bg-white">
      {features.map((feature, i) => (
        <FeatureSection key={i} {...feature} />
      ))}
    </div>
  );
}

function FeatureSection({ title, description, label, icon, points, align, index }: FeatureProps) {
  return (
    <section className={`py-12 md:py-16 overflow-hidden ${index % 2 === 1 ? "bg-slate-50/50" : "bg-white"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex flex-col gap-16 items-center ${align === "right" ? "lg:flex-row-reverse" : "lg:flex-row"}`}>

          {/* Text Content */}
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wide uppercase mb-4">
              <span className="p-1.5 bg-accent/10 rounded-md">{icon}</span>
              {label}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
              {title}
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {description}
            </p>

            <ul className="space-y-4 mb-8">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-accent h-5 w-5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            <Link href="/how-it-works">
              <Button variant="outline" className="rounded-full border-slate-200 text-slate-700 hover:text-primary hover:border-primary">
                See how it works <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Graphic Content - Abstract UI */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            {/* Index 2 (Operational Dashboard) gets special treatment - no aspect ratio constraint */}
            {index === 2 ? (
              <OperationalDashboardMock />
            ) : (
              <div className={`relative aspect-[4/3] rounded-2xl p-8 overflow-hidden transition-all duration-500 ${index === 0 ? "" : "bg-white shadow-xl border border-slate-100 group hover:shadow-2xl"}`}>
                {index !== 0 && <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />}

                {/* Mock UI Elements based on index/type */}
                {index === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative h-full w-full flex items-center justify-center p-8"
                  >
                    {/* Subtle background grid */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    {/* Connection Lines SVG - positioned behind everything */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 300">
                      {/* Intake to Hub (left side, centered with Customers ~150) */}
                      <motion.path
                        d="M 85 150 Q 115 150 140 150"
                        stroke="#007AFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                      {/* Automations to Hub (right side, aligned with Jobs ~75) */}
                      <motion.path
                        d="M 315 75 Q 285 75 260 75"
                        stroke="#007AFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                      {/* Scheduling to Hub (right side, aligned with Invoices ~225) */}
                      <motion.path
                        d="M 315 225 Q 285 225 260 225"
                        stroke="#007AFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </svg>

                    {/* Left Chip - Intake (aligned with Customers section ~50% height) */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md px-3 py-2 flex items-center gap-2 border border-slate-100 z-10"
                    >
                      <FileInput size={16} className="text-slate-600" />
                      <span className="text-xs font-medium text-slate-700">Intake</span>
                    </motion.div>

                    {/* Right Top Chip - Automations (aligned with Jobs section ~25% height) */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="absolute right-4 top-[22%] bg-white rounded-lg shadow-md px-3 py-2 flex items-center gap-2 border border-slate-100 z-10"
                    >
                      <Zap size={16} className="text-slate-600" />
                      <span className="text-xs font-medium text-slate-700">Automations</span>
                    </motion.div>

                    {/* Right Bottom Chip - Scheduling (aligned with Invoices section ~75% height) */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute right-4 bottom-[22%] bg-white rounded-lg shadow-md px-3 py-2 flex items-center gap-2 border border-slate-100 z-10"
                    >
                      <Calendar size={16} className="text-slate-600" />
                      <span className="text-xs font-medium text-slate-700">Scheduling</span>
                    </motion.div>

                    {/* Central Operations Hub Panel */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative bg-white rounded-xl shadow-lg border border-slate-100 px-5 py-4 max-w-[240px] w-full z-20"
                    >
                      {/* Header */}
                      <div className="text-center mb-4 pb-3 border-b border-slate-100">
                        <h3 className="text-sm font-semibold text-slate-700">Operations Hub</h3>
                      </div>

                      {/* Jobs Section */}
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-3 h-3 rounded bg-slate-100 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm" />
                          </div>
                          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Jobs</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] py-1.5">
                          <span className="text-slate-600">Job 0184 - In progress</span>
                          <span className="px-2 py-0.5 bg-[#007AFF]/10 text-[#007AFF] rounded-full text-[9px] font-medium">In progress</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] py-1.5">
                          <span className="text-slate-600">Job 0185 - Waiting on parts</span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[9px] font-medium">Queued</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] py-1.5">
                          <span className="text-slate-600">Job 0186 - Ready for pickup</span>
                          <span className="px-2 py-0.5 bg-[#007AFF]/10 text-[#007AFF] rounded-full text-[9px] font-medium flex items-center gap-1">
                            Complete <CheckCircle2 size={10} />
                          </span>
                        </div>
                      </div>

                      {/* Customers Section */}
                      <div className="mb-4 space-y-2">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-3 h-3 rounded bg-slate-100 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                          </div>
                          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Customers</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] py-1.5">
                          <span className="text-slate-600">New lead - Captured</span>
                          <span className="px-2 py-0.5 bg-[#007AFF]/10 text-[#007AFF] rounded-full text-[9px] font-medium">Captured</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] py-1.5">
                          <span className="text-slate-600">Estimate sent - Open</span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[9px] font-medium">Open</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] py-1.5">
                          <span className="text-slate-600">Approved - Scheduled</span>
                          <span className="px-2 py-0.5 bg-[#007AFF]/10 text-[#007AFF] rounded-full text-[9px] font-medium">Complete</span>
                        </div>
                      </div>

                      {/* Invoices Section */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-3 h-3 rounded bg-slate-100 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-slate-400" />
                          </div>
                          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Invoices</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] py-1.5">
                          <span className="text-slate-600">Invoice 1042 - Sent</span>
                          <span className="px-2 py-0.5 bg-[#007AFF]/10 text-[#007AFF] rounded-full text-[9px] font-medium">Sent</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] py-1.5">
                          <span className="text-slate-600">Invoice 1043 - Paid</span>
                          <span className="px-2 py-0.5 bg-[#007AFF]/10 text-[#007AFF] rounded-full text-[9px] font-medium flex items-center gap-1">
                            Paid <CheckCircle2 size={10} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {index === 1 && (
                  <div className="relative h-full w-full flex items-center justify-center">
                    {/* Central Hub */}
                    <div className="absolute z-10 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                        <Settings size={20} />
                      </div>
                      <div className="h-2 w-16 bg-slate-200 rounded" />
                    </div>

                    {/* Satellites */}
                    <div className="absolute top-4 left-4 p-3 bg-slate-50 rounded-lg border border-slate-100 transform -rotate-6">
                      <div className="h-6 w-6 bg-blue-100 rounded mb-1" />
                      <div className="h-1.5 w-10 bg-slate-200 rounded" />
                    </div>

                    <div className="absolute bottom-8 right-8 p-3 bg-slate-50 rounded-lg border border-slate-100 transform rotate-3">
                      <div className="h-6 w-6 bg-green-100 rounded mb-1" />
                      <div className="h-1.5 w-10 bg-slate-200 rounded" />
                    </div>

                    {/* Connecting Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none text-slate-200 z-0">
                      <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                      <line x1="70%" y1="70%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
