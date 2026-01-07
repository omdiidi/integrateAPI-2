import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
    Globe,
    CreditCard,
    QrCode,
    Share2,
    LayoutDashboard,
    Zap,
    Monitor,
    Settings,
    ChevronRight,
    Check,
    Package,
    Search,
    RefreshCw,
    Users,
    Printer,
    History,
    Bell,
    FileText,
    Tablet,
    Wrench
} from "lucide-react";

// Deliverable data
const deliverables = [
    {
        id: "website",
        title: "Website Connected to Inventory",
        icon: Globe,
        description: "We build a clean customer facing site that pulls from live inventory, so what customers see is always current without manual updates.",
        points: ["Live availability", "Fast browsing and search", "Auto updates when items change"],
        previewCards: [
            { icon: Package, label: "Inventory Item", detail: "Synced in real-time" },
            { icon: Globe, label: "Live Storefront", detail: "Always current" },
            { icon: Search, label: "Search & Filter", detail: "Fast browsing" },
            { icon: RefreshCw, label: "Auto Sync", detail: "No manual updates" }
        ]
    },
    {
        id: "pos",
        title: "POS Setup and Integration",
        icon: CreditCard,
        description: "We set up a POS that fits the business and connect it to inventory so sales update stock instantly and nothing gets missed.",
        points: ["In store sales sync", "Simple workflows for staff", "Clean records for reporting"],
        previewCards: [
            { icon: CreditCard, label: "Point of Sale", detail: "Connected to inventory" },
            { icon: RefreshCw, label: "Instant Sync", detail: "Sales update stock" },
            { icon: Users, label: "Staff Workflow", detail: "Simple and fast" },
            { icon: FileText, label: "Clean Records", detail: "Ready for reporting" }
        ]
    },
    {
        id: "barcoding",
        title: "Barcoding and QR Labeling",
        icon: QrCode,
        description: "We implement barcode or QR labels so every item can be scanned in seconds to pull the record, confirm details, and update status.",
        points: ["Print labels from the dashboard", "Scan to open item record", "Reduce lookup time at checkout"],
        previewCards: [
            { icon: Printer, label: "Label Printing", detail: "From dashboard" },
            { icon: QrCode, label: "QR/Barcode", detail: "Scan any item" },
            { icon: Search, label: "Instant Lookup", detail: "Seconds not minutes" },
            { icon: Check, label: "Status Update", detail: "Scan to change" }
        ]
    },
    {
        id: "multichannel",
        title: "Multi Channel Listings and Auto De-listing",
        icon: Share2,
        description: "We enable per item channel control so an item can be listed in store only, online, or across multiple channels, then automatically removed everywhere when it sells.",
        points: ["Channel toggles per item", "Prevent double selling", "Always accurate listings"],
        previewCards: [
            { icon: Share2, label: "Multi Channel", detail: "List anywhere" },
            { icon: Settings, label: "Per Item Control", detail: "Toggle channels" },
            { icon: RefreshCw, label: "Auto De-list", detail: "When sold" },
            { icon: Check, label: "No Double Sells", detail: "Always accurate" }
        ]
    },
    {
        id: "dashboard",
        title: "Inventory Dashboard and Activity Logs",
        icon: LayoutDashboard,
        description: "We provide an internal dashboard to add items, manage status, and track every change with a clear audit trail.",
        points: ["Searchable inventory", "Status tracking", "Who changed what and when"],
        previewCards: [
            { icon: LayoutDashboard, label: "Dashboard", detail: "Central control" },
            { icon: Search, label: "Searchable", detail: "Find anything fast" },
            { icon: History, label: "Activity Log", detail: "Full audit trail" },
            { icon: Users, label: "User Tracking", detail: "Who did what" }
        ]
    },
    {
        id: "automation",
        title: "Automation and Reporting",
        icon: Zap,
        description: "We automate repetitive work like syncing records, sending updates, and generating clear snapshots so the owner can see what matters without digging.",
        points: ["Sync and notifications", "Basic reporting snapshots", "Less admin time"],
        previewCards: [
            { icon: Zap, label: "Automations", detail: "Set and forget" },
            { icon: Bell, label: "Notifications", detail: "Stay informed" },
            { icon: FileText, label: "Reports", detail: "Clear snapshots" },
            { icon: RefreshCw, label: "Auto Sync", detail: "Always current" }
        ]
    },
    {
        id: "hardware",
        title: "Hardware and Onboarding Setup",
        icon: Monitor,
        description: "We help set up the in store workflow end to end so staff can use it immediately and consistently.",
        points: ["Printer and label workflow setup", "iPad or kiosk style usage where needed", "Staff onboarding and workflow tuning"],
        previewCards: [
            { icon: Printer, label: "Printer Setup", detail: "Ready to print" },
            { icon: Tablet, label: "iPad/Kiosk", detail: "Where needed" },
            { icon: Users, label: "Staff Training", detail: "Quick onboarding" },
            { icon: Wrench, label: "Workflow Tuning", detail: "Fits your flow" }
        ]
    },
    {
        id: "custom",
        title: "Custom Workflow Fit and Ongoing Improvements",
        icon: Settings,
        description: "We tailor the system to how the business actually runs and iterate based on real feedback after launch.",
        points: ["Custom fields and statuses", "Workflow refinements", "Ongoing support and updates"],
        previewCards: [
            { icon: Settings, label: "Custom Config", detail: "Fits your needs" },
            { icon: Wrench, label: "Refinements", detail: "Based on feedback" },
            { icon: RefreshCw, label: "Updates", detail: "Ongoing support" },
            { icon: Check, label: "Your Workflow", detail: "Not ours" }
        ]
    }
];

export function WhatWeDeliver() {
    const [activeId, setActiveId] = useState(deliverables[0].id);
    const activeDeliverable = deliverables.find(d => d.id === activeId)!;

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    const sectionVariants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: prefersReducedMotion ? 0 : i * 0.1,
                duration: 0.4
            }
        }),
        exit: {
            opacity: 0,
            y: prefersReducedMotion ? 0 : -10,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="pt-6 pb-16 md:pt-10 md:pb-20 bg-white"
        >
            <div className="container mx-auto px-4 md:px-6">
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
                            What We Deliver
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            We connect your website, POS, and inventory tracking into one workflow so listings, sales, and records stay accurate without extra admin work.
                        </p>
                    </div>

                    {/* Buttons - stacked on mobile, inline on desktop */}
                    <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                        <Link href="/demo">
                            <Button className="w-full sm:w-auto bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-lg hover:shadow-xl transition-all duration-300">
                                See a Demo
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="w-full sm:w-auto border-slate-200 text-slate-700 hover:text-primary hover:border-primary transition-all duration-300">
                                Talk to Us
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Interactive Delivery Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Left: Interactive List */}
                    <div className="space-y-2">
                        {deliverables.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeId === item.id;

                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => setActiveId(item.id)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${isActive
                                        ? "bg-white border-[#007AFF] shadow-lg"
                                        : "bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-md"
                                        }`}
                                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.01 }}
                                    whileTap={{ scale: prefersReducedMotion ? 1 : 0.99 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2.5 rounded-lg flex-shrink-0 transition-colors duration-300 ${isActive ? "bg-[#007AFF]/10 text-[#007AFF]" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                                            }`}>
                                            <Icon size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className={`font-semibold transition-colors duration-300 ${isActive ? "text-primary" : "text-slate-700 group-hover:text-primary"
                                                    }`}>
                                                    {item.title}
                                                </h3>
                                                <ChevronRight className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${isActive ? "text-[#007AFF] rotate-90" : "text-slate-400 group-hover:text-slate-600"
                                                    }`} />
                                            </div>

                                            {/* Expandable content */}
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-sm text-slate-600 mt-2 mb-3 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                        <ul className="space-y-1.5">
                                                            {item.points.map((point, idx) => (
                                                                <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                                                                    <Check className="h-3.5 w-3.5 text-[#007AFF] flex-shrink-0" />
                                                                    {point}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Right: Preview Cards */}
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-[#007AFF]/10 rounded-lg">
                                    <activeDeliverable.icon className="h-5 w-5 text-[#007AFF]" />
                                </div>
                                <h3 className="font-semibold text-primary">{activeDeliverable.title}</h3>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeId}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="grid grid-cols-2 gap-3 md:gap-4"
                                >
                                    {activeDeliverable.previewCards.map((card, idx) => {
                                        const CardIcon = card.icon;
                                        return (
                                            <motion.div
                                                key={`${activeId}-${idx}`}
                                                custom={idx}
                                                variants={cardVariants}
                                                className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                                                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-1.5 bg-slate-50 rounded-md">
                                                        <CardIcon className="h-4 w-4 text-slate-600" />
                                                    </div>
                                                    <span className="font-medium text-sm text-slate-800">{card.label}</span>
                                                </div>
                                                <p className="text-xs text-slate-500">{card.detail}</p>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>

                            {/* Visual indicator */}
                            <div className="mt-6 pt-4 border-t border-slate-200">
                                <p className="text-xs text-slate-500 text-center">
                                    Select a deliverable to see preview
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Us Button */}
                <div className="mt-12 text-center">
                    <Link href="/contact">
                        <Button size="lg" className="bg-[#007AFF] text-white hover:bg-[#0062CC] shadow-lg hover:shadow-xl transition-all duration-300">
                            Contact Us
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.section>
    );
}
