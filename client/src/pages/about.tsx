import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Check } from "lucide-react";

export default function About() {
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
        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            {/* Header Section */}
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-2">
                About IntegrateAPI
              </h1>

              <div className="space-y-2 text-slate-600">
                <p className="text-lg leading-relaxed">
                  IntegrateAPI was started by two college students who grew up around real businesses and spent years learning how modern systems actually work.
                </p>
                <p className="text-lg leading-relaxed">
                  We are Omid and Nick. While studying engineering, business, and information systems, we saw the same issue everywhere: strong local businesses running on paper, memory, and disconnected tools. Owners were working hard, but their systems were slowing them down.
                </p>
              </div>
            </div>

            {/* Philosophy Section */}
            <div className="mb-4 pt-2 border-t border-slate-50">
              <div className="space-y-2 text-slate-600">
                <p className="text-lg leading-relaxed">
                  We did not come from a startup first mindset. We came from watching businesses operate day to day. We understand how trust is built, how decisions get made, and why systems need to fit how a business already runs.
                </p>
                <p className="text-lg leading-relaxed">
                  Instead of forcing generic software, we take the time to learn your workflow and build a custom system around it.
                </p>
              </div>
            </div>

            {/* Specializations Section */}
            <div className="mb-4 pt-2 border-t border-slate-50">
              <h3 className="text-xl font-bold font-heading text-primary mb-2 tracking-tight">
                We specialize in:
              </h3>
              <ul className="grid grid-cols-1 gap-0.5">
                {[
                  "Workflow automation and digitization",
                  "Custom internal tools and dashboards",
                  "System integration between existing tools",
                  "Practical software teams actually use"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-slate-600"
                  >
                    <div className="mt-1.5 h-4 w-4 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-[#007AFF]" />
                    </div>
                    <span className="text-lg leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Pilot Program & Closing Section */}
            <div className="pt-2 border-t border-slate-50">
              <div className="space-y-2 text-slate-600">
                <p className="text-lg leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100/50">
                  Right now, we are launching pilot programs with a small number of local businesses. This lets us stay hands on, iterate quickly, and make sure each system delivers real time savings and clarity. Our reputation is built one business at a time, so doing the job right matters.
                </p>

                <p className="text-lg leading-relaxed">
                  We are not here to sell hype or change how you run your company. Our goal is simple: remove friction, save time, and give you systems that quietly support your operation in the background.
                </p>

                <p className="text-lg leading-relaxed font-medium text-slate-700">
                  If you are tired of paperwork, manual tracking, or tools that do not talk to each other, we would love to learn how your business works.
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}
