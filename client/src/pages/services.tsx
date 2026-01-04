import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Workflow, Database, Cable } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { DashboardMock } from "@/components/sections/DashboardMock";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-20"
      >
        {/* Header */}
        <section className="py-10 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
              Systems that run themselves.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We don't just "consult." We build and deploy the actual digital infrastructure your team needs to operate without friction.
            </p>
          </div>
        </section>

        {/* Service 1: Workflow Automation with Flow Diagram */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <FlowDiagram />
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wide uppercase mb-4">
                  <Workflow size={18} />
                  Workflow Automation
                </div>
                <h2 className="text-3xl font-bold font-heading text-primary mb-6">
                  Stop passing paper.
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  We turn manual checklists, paper forms, and email chains into digital workflows that track themselves.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-accent h-5 w-5" />
                    Digital intake & onboarding forms
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-accent h-5 w-5" />
                    Auto-assigned tasks & reminders
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-accent h-5 w-5" />
                    Approval routing (Quote → Invoice)
                  </li>
                </ul>
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-lg hover:shadow-xl transition-all duration-300">Get a workflow audit</Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service 2: Integrations */}
        <section className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wide uppercase mb-4">
                  <Cable size={18} />
                  Integrations
                </div>
                <h2 className="text-3xl font-bold font-heading text-primary mb-6">
                  Connect your disconnected tools.
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Your CRM should talk to your accounting software. We build the bridges so you don't have to copy-paste data.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-accent h-5 w-5" />
                    Sync POS/E-comm to QuickBooks/Xero
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-accent h-5 w-5" />
                    Automate customer notifications
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="text-accent h-5 w-5" />
                    Centralized client records
                  </li>
                </ul>
                <Link href="/contact">
                  <Button>Explore integrations</Button>
                </Link>
              </div>
              <div className="relative h-64 lg:h-80 w-full bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="flex items-center gap-8 z-10">
                  <div className="h-20 w-20 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center">
                    <span className="font-bold text-blue-600">App A</span>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <div className="h-1 w-16 bg-accent/20 rounded-full animate-pulse" />
                    <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center shadow-lg">
                      <Cable size={16} />
                    </div>
                    <div className="h-1 w-16 bg-accent/20 rounded-full animate-pulse" />
                  </div>
                  <div className="h-20 w-20 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-center">
                    <span className="font-bold text-emerald-600">App B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service 3: Dashboards with new mock */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                <DashboardMock />
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wide uppercase mb-4">
                  <Database size={18} />
                  Operational Dashboards
                </div>
                <h2 className="text-3xl font-bold font-heading text-primary mb-6">
                  Visibility without the busywork.
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  See exactly where every job, order, or patient is in your process at a glance. No more asking "what's the status of X?"
                </p>
                <Link href="/contact">
                  <Button>See example dashboards</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading mb-6">Ready to modernize?</h2>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-lg hover:shadow-xl transition-all duration-300">Contact us directly</Button>
              </motion.div>
            </Link>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}
