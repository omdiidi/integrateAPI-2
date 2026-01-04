import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Disc3, Store, Armchair, Wrench, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UseCases() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const cases = [
    {
      title: "Independent Vinyl Stores",
      subtitle: "Custom Inventory Infrastructure",
      icon: <Disc3 size={24} className="text-violet-500" />,
      problem: "Most independent record stores track inventory on paper, spreadsheets, or memory. New vinyl arrives constantly, used records rotate fast, and nothing stays in sync. Staff writes things down and inventory quickly becomes unreliable.",
      solution: [
        "We built a custom back-end inventory system designed specifically for vinyl stores.",
        "Each record is QR-labeled and tied to a single inventory record. When a vinyl is listed or sold, inventory updates everywhere automatically - including marketplaces like eBay, Amazon, and Discogs. If it sells in one place, it is removed everywhere else. No double entry. No overselling.",
        "We also built a simple internal UI so staff can add records in seconds, even with minimal tech experience.",
        "On top of that, we added a private inventory network. Stores can selectively share inventory and wholesale records directly between each other when sourcing rare pressings.",
        "This was not off-the-shelf software. It was built around how vinyl stores actually operate day to day."
      ],
      results: [
        "Accurate inventory with no manual tracking.",
        "Faster buying, selling, and sourcing.",
        "Clear visibility without changing how the business runs."
      ],
      color: "bg-violet-50",
      hoverColor: "hover:bg-violet-100",
      borderColor: "border-violet-200"
    },
    {
      title: "Local Retail",
      subtitle: "Online Pickup",
      icon: <Store size={24} className="text-emerald-500" />,
      problem: "Products exist only in-store. No website. No way for customers to browse or order ahead. Sales stop when the door closes.",
      solution: [
        "We build a clean website with a connected product catalog and online ordering for in-store pickup. Inventory stays synced automatically between the store and the site, so nothing needs to be managed twice.",
        "Customers can browse, order, and pick up on their schedule. Owners manage everything from one system.",
        "We handle the full setup - products, website, ordering flow, and integrations."
      ],
      results: [
        "More sales without more labor.",
        "Customers arrive ready to buy.",
        "A modern presence without added complexity."
      ],
      color: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100",
      borderColor: "border-emerald-200"
    },
    {
      title: "Upholstery and Repair Shops",
      subtitle: "Customer Job Tracking",
      icon: <Armchair size={24} className="text-amber-500" />,
      problem: "Customers constantly call to check job status. Staff spends hours answering the same questions instead of doing the work.",
      solution: [
        "We built a custom customer portal where clients can track job progress in real time, similar to package tracking.",
        "Status updates, photos, notes, and order details are all visible in one place. On the back end, the system is tailored to how the shop already works. No generic templates.",
        "We also connect the public website to the same system so everything stays in sync."
      ],
      results: [
        "Fewer interruptions.",
        "Less time on the phone.",
        "Clear communication that builds trust."
      ],
      color: "bg-amber-50",
      hoverColor: "hover:bg-amber-100",
      borderColor: "border-amber-200"
    },
    {
      title: "Handyman and Contractor Services",
      subtitle: "Invoicing and Follow-Ups",
      icon: <Wrench size={24} className="text-blue-500" />,
      problem: "Invoices are inconsistent. Records are scattered across texts, emails, and notes. Past customers are rarely followed up with.",
      solution: [
        "We built a custom invoicing system that generates clean PDF invoices and sends them automatically.",
        "Every job and customer is stored in a structured database. Invoices and job details are logged and synced to Google Sheets for organized records and audit readiness.",
        "We also automated follow-ups. Customers receive personalized check-in emails and texts months after a job based on the work that was done."
      ],
      results: [
        "Faster invoicing and cleaner records.",
        "Less admin work.",
        "More repeat business without extra effort."
      ],
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      borderColor: "border-blue-200"
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    setExpandedIndex(index);
  };

  const handleMouseLeave = () => {
    setExpandedIndex(null);
  };

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
        <section className="py-4 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
              Use Cases
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              These are real systems built to match how each business runs day to day. No two builds are the same, and every workflow is designed around real constraints and habits.
            </p>
          </div>
        </section>

        <section className="py-6">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="grid grid-cols-1 gap-2">
              {cases.map((item, i) => {
                const isExpanded = expandedIndex === i;
                return (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className={`rounded-lg border ${item.borderColor} overflow-hidden cursor-pointer transition-all duration-300 ${isExpanded
                      ? 'shadow-md scale-[1.005] border-opacity-100'
                      : 'shadow-sm hover:shadow-md border-opacity-60'
                      }`}
                    onClick={() => toggleExpand(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Preview Header - Always Visible */}
                    <div className={`p-3 ${item.color} ${!isExpanded ? item.hoverColor : ''} transition-all duration-300 ${isExpanded ? 'bg-opacity-100' : 'bg-opacity-80'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-white p-1.5 rounded-md shadow-sm">
                            {item.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-bold text-primary">{item.title}</h3>
                              {i === 0 && (
                                <Link href="/demo">
                                  <a
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#007AFF] text-white text-xs font-medium rounded-lg hover:bg-[#0062CC] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                  >
                                    View Demo
                                  </a>
                                </Link>
                              )}
                            </div>
                            <p className="text-slate-600 text-xs font-medium">{item.subtitle}</p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </motion.div>
                      </div>

                      {/* Problem Preview - Always Visible */}
                      <div className="mt-2 pt-2 border-t border-slate-200/50">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">The Problem</h4>
                        <p className="text-slate-700 text-xs leading-relaxed">{item.problem}</p>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 bg-white space-y-3">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">The Solution</h4>
                              <div className="space-y-1.5">
                                {item.solution.map((paragraph, j) => (
                                  <motion.p
                                    key={j}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: j * 0.05 }}
                                    className="text-slate-700 text-xs leading-relaxed"
                                  >
                                    {paragraph}
                                  </motion.p>
                                ))}
                              </div>
                            </div>
                            <div className="border-t border-slate-100 pt-3">
                              <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-1.5">The Result</h4>
                              <ul className="space-y-1">
                                {item.results.map((result, k) => (
                                  <motion.li
                                    key={k}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 + k * 0.05 }}
                                    className="text-xs font-medium text-primary flex items-start gap-2">
                                    <span className="text-accent mt-0.5">•</span>
                                    {result}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold font-heading text-primary mb-8">Do you have similar problems?</h2>
          <Link href="/contact">
            <Button size="lg">Let's fix them <ArrowRight className="ml-2 w-4 h-4" /></Button>
          </Link>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}
