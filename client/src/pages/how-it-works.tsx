import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, Map, Wrench, GraduationCap, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
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
        <section className="py-10 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
              Our Process
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We don't disrupt your business. We map how you already work, then build the systems to support it.
            </p>
            <div className="mt-8 md:hidden flex justify-center">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-lg hover:shadow-xl transition-all duration-300">
                    Contact Us Directly
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="audit" className="w-full max-w-4xl mx-auto">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-slate-100 p-1 rounded-full border border-slate-200 flex items-center">
                  <TabsTrigger value="audit" className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    1. Audit
                  </TabsTrigger>
                  <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                  <TabsTrigger value="map" className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    2. Map
                  </TabsTrigger>
                  <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                  <TabsTrigger value="build" className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    3. Build
                  </TabsTrigger>
                  <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                  <TabsTrigger value="train" className="rounded-full px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    4. Train
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 md:p-12 min-h-[400px]">
                <TabsContent value="audit" className="mt-0 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-primary mb-6">
                        <Search size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-4">Deep Dive Operations Audit</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        We meet with you and your team to learn exactly how your operation runs day to day. We watch the real workflow, track where repetitive tasks and mistakes happen, and pinpoint the time drains that slow everything down. Then we design a custom solution that removes busywork, saves hours each week, and fits how you already run the business.
                      </p>
                      <ul className="space-y-3">
                        <li className="text-sm font-medium text-slate-700">• Walk through your current process step by step and identify time wasters</li>
                        <li className="text-sm font-medium text-slate-700">• Spot repetitive busywork, handoffs, and where information gets lost</li>
                        <li className="text-sm font-medium text-slate-700">• Define the highest impact custom system to save time immediately</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-xl border border-slate-100 h-64 overflow-hidden shadow-sm">
                      <img
                        src="/audit-store-workflow.jpg"
                        alt="Deep dive operations audit in a record store"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="map" className="mt-0 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 mb-6">
                        <Map size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-4">Visualize the System Before We Build</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        Before we write code, we make the plan real. We demo and visualize the exact tools we will create, explain how they will work in your workflow, and show how the new system saves time by removing manual steps. We work back and forth with you to dial it in until it matches how you want to run the business, simple, clean, and custom.
                      </p>
                      <ul className="space-y-3">
                        <li className="text-sm font-medium text-slate-700">• Clear demo of the screens, flows, and automations you will get</li>
                        <li className="text-sm font-medium text-slate-700">• Review the plan with you and refine it until it feels perfect</li>
                        <li className="text-sm font-medium text-slate-700">• Confirm what gets tracked, who updates it, and what updates automatically to reduce admin time</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-xl border border-slate-100 h-64 overflow-hidden shadow-sm">
                      <img
                        src="/map-workflow-visualization.jpg"
                        alt="Visualizing the system workflow and tools"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="build" className="mt-0 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 mb-6">
                        <Wrench size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-4">Build and Test the System End to End</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        This is the heavy work. We build the system itself, coding the tools, connecting your software, and setting up automations that eliminate manual follow ups and duplicate entry. We test everything on real scenarios to make sure it runs reliably before it touches your live operation.
                      </p>
                      <ul className="space-y-3">
                        <li className="text-sm font-medium text-slate-700">• Develop the custom tools, dashboards, forms, and portals</li>
                        <li className="text-sm font-medium text-slate-700">• Connect your tools and data so everything stays in sync without double work</li>
                        <li className="text-sm font-medium text-slate-700">• Test real workflows and edge cases so it saves time without breaking</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-xl border border-slate-100 h-64 overflow-hidden shadow-sm">
                      <img
                        src="/build-system-coding.jpg"
                        alt="Building and coding the custom system"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="train" className="mt-0 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-700 mb-6">
                        <GraduationCap size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-4">Handoff, Migration, and Ongoing Support</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        We hand the system over cleanly and make adoption simple. The developers who built it train your team, help migrate your process, and stay available to ensure the time savings actually stick in daily operations. We also provide maintenance so the system stays reliable as you grow.
                      </p>
                      <ul className="space-y-3">
                        <li className="text-sm font-medium text-slate-700">• Developer led training with simple walkthroughs and documentation</li>
                        <li className="text-sm font-medium text-slate-700">• Help migrating from paper, spreadsheets, or old tools without downtime</li>
                        <li className="text-sm font-medium text-slate-700">• Standby support and maintenance to keep everything running smooth and efficient</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                          <CheckCircle2 size={32} />
                        </div>
                        <div className="font-semibold text-slate-700">System Live</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="mt-16 text-center">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-lg hover:shadow-xl transition-all duration-300">
                    Start your audit
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}
