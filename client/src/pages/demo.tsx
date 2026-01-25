import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback, useRef } from "react";
import { Disc3, Camera, ImageOff, Sparkles, MapPin, Printer, Save, Minus, Plus, Info, Play, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEMO_URL = "https://vinyl-vault-backend--u1599608.replit.app/";
const VIDEO_ID = "oKyK83O2SU8";

// Hook to detect prefers-reduced-motion
function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
}

function YouTubeVideoSection() {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePlay();
        }
    }, [handlePlay]);

    return (
        <div className="w-full px-4 pt-24 pb-4">
            <div className="w-full max-w-4xl mx-auto">
                <div
                    className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
                    style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}
                >
                    {!isPlaying ? (
                        <div
                            role="button"
                            tabIndex={0}
                            aria-label="Click to play video with sound"
                            onClick={handlePlay}
                            onKeyDown={handleKeyDown}
                            className="absolute inset-0 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-[#007AFF]/50 rounded-2xl"
                        >
                            {/* Thumbnail */}
                            <img
                                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                                alt="Video thumbnail"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                            {/* Play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                                    <Play className="w-8 h-8 md:w-10 md:h-10 text-[#007AFF] ml-1" fill="currentColor" />
                                </div>
                            </div>

                            {/* Hint text */}
                            <div className="absolute bottom-4 left-0 right-0 text-center">
                                <span className="inline-block px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                                    Click to view video
                                </span>
                            </div>
                        </div>
                    ) : (
                        <iframe
                            className="absolute inset-0 w-full h-full rounded-2xl"
                            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                            title="Demo Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function VideoGuidanceCallout() {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <div className="w-full px-4 pb-6">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center">
                    {/* Upward arrow pointing to video */}
                    <div
                        className={`text-[#007AFF] mb-2 ${!prefersReducedMotion ? 'animate-bounce' : ''}`}
                        aria-hidden="true"
                    >
                        <ChevronUp className="w-6 h-6" />
                    </div>
                    {/* Instruction text */}
                    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
                        <p className="text-slate-700 text-sm md:text-base font-medium">
                            <span className="text-[#007AFF] font-semibold">Step 1</span> — Watch the short video above (click the play button)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getSourceMessage(src: string | null): string {
    switch (src) {
        case "qr":
            return "You scanned a QR code, perfect! You are in the right place.";
        case "email":
            return "You came from an email, great! You are in the right place.";
        case "card":
            return "You came from a card, awesome! You are in the right place.";
        default:
            return "If you came from a card or email, you are in the right place. You can click around safely.";
    }
}

export default function Demo() {
    const [sourceMessage, setSourceMessage] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        setIsClient(true);
        window.scrollTo(0, 0);

        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const src = params.get("src");
            setSourceMessage(getSourceMessage(src));
        }
    }, []);

    const handleViewDemo = () => {
        window.open(DEMO_URL, "_blank", "noopener,noreferrer");
    };

    const handleExpand = useCallback(() => {
        if (!isExpanded) setIsExpanded(true);
    }, [isExpanded]);

    const handleMouseEnter = useCallback(() => {
        if (!isExpanded && !hoverTimerRef.current) {
            hoverTimerRef.current = setTimeout(() => {
                setIsExpanded(true);
                hoverTimerRef.current = null;
            }, 1000);
        }
    }, [isExpanded]);

    const handleMouseLeave = useCallback(() => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleExpand();
        }
    }, [handleExpand]);

    // Ensure content renders on both server and client
    if (!isClient) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
                <Navbar />
                <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
                    <div className="w-full max-w-lg animate-pulse">
                        <div className="bg-slate-200 rounded-2xl h-32 mb-6" />
                        <div className="bg-slate-100 rounded-2xl h-96" />
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
            <Navbar />
            <YouTubeVideoSection />
            <VideoGuidanceCallout />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 flex items-center justify-center px-4 pt-4 pb-12"
            >
                <div className="w-full max-w-lg">
                    <AnimatePresence mode="wait">
                        {!isExpanded ? (
                            <motion.button
                                key="collapsed-card"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                onClick={handleExpand}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-gradient-to-r from-[#007AFF] to-[#5856D6] rounded-2xl p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-all group text-left"
                                aria-expanded={isExpanded}
                                aria-controls="demo-content"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">
                                            <Disc3 className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <h2 className="text-2xl font-bold text-white">Live Demo</h2>
                                            <p className="text-white/90 text-sm mt-1">
                                                <span className="font-semibold text-white">Step 2</span> — Open the walkthrough, then click View Demo.
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronDown className="h-6 w-6 text-white/80 group-hover:translate-y-0.5 transition-transform" />
                                </div>
                            </motion.button>
                        ) : (
                            <motion.div
                                key="expanded-content"
                                id="demo-content"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: prefersReducedMotion ? 0 : 0.5,
                                    ease: [0.25, 1, 0.5, 1]
                                }}
                            >
                                {/* Header Card */}
                                <div className="bg-gradient-to-r from-[#007AFF] to-[#5856D6] rounded-2xl p-6 mb-6 shadow-xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">
                                            <Disc3 className="h-6 w-6 text-white" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-white">
                                            Welcome to the Live Demo
                                        </h1>
                                    </div>
                                    <p className="text-white/90 text-sm leading-relaxed">
                                        {sourceMessage}
                                    </p>
                                </div>

                                {/* Instructions Card */}
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-4 md:p-6 space-y-3 md:space-y-5 text-sm md:text-base">
                                    <p className="text-slate-600">
                                        This shows the day-to-day loop for a record shop. <strong>Start by clicking the Scan tile.</strong>
                                    </p>

                                    {/* Step 1: Image or No Image */}
                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-3">
                                        <p className="font-medium text-slate-800">
                                            👉 When you click <span className="text-[#007AFF] font-semibold">Scan</span>, you'll see two options:
                                        </p>
                                        <div className="flex gap-3">
                                            <div className="flex-1 bg-white rounded-lg p-3 border border-slate-200 text-center hover:border-[#007AFF] hover:shadow-md transition-all cursor-pointer">
                                                <Camera className="h-5 w-5 mx-auto mb-1.5 text-[#007AFF]" />
                                                <p className="text-sm font-medium text-slate-700">Image</p>
                                                <p className="text-xs text-slate-500">Use camera</p>
                                            </div>
                                            <div className="flex-1 bg-white rounded-lg p-3 border border-slate-200 text-center hover:border-[#5856D6] hover:shadow-md transition-all cursor-pointer">
                                                <ImageOff className="h-5 w-5 mx-auto mb-1.5 text-[#5856D6]" />
                                                <p className="text-sm font-medium text-slate-700">No Image</p>
                                                <p className="text-xs text-slate-500">Enter manually</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            Choose <strong>No Image</strong> if you don't have a camera.
                                        </p>
                                    </div>

                                    {/* Step 2: After entering details - Reference UI */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                                        <p className="font-medium text-slate-800 mb-3">
                                            👉 After entering record details, you'll see this panel:
                                        </p>

                                        {/* Mock UI - Checkboxes */}
                                        <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                                            {/* Channels */}
                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <div className="w-5 h-5 rounded border-2 border-[#7C3AED] flex items-center justify-center">
                                                        <div className="w-2.5 h-2.5 rounded-sm bg-[#7C3AED]" />
                                                    </div>
                                                    <span className="text-slate-700">In Store</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <div className="w-5 h-5 rounded border-2 border-slate-300" />
                                                    <span className="text-slate-600">Online</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <div className="w-5 h-5 rounded border-2 border-slate-300" />
                                                    <span className="text-slate-600">Hold</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <div className="w-5 h-5 rounded border-2 border-slate-300" />
                                                    <span className="text-slate-600">Network</span>
                                                </label>
                                                <Info className="w-4 h-4 text-slate-400" />
                                            </div>

                                            {/* Quantity & Location */}
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="text-slate-600">Qty:</span>
                                                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                                                    <button className="px-2.5 py-1.5 hover:bg-slate-50 text-slate-400">
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="px-4 py-1.5 text-slate-800 font-medium border-x border-slate-200">1</span>
                                                    <button className="px-2.5 py-1.5 hover:bg-slate-50 text-slate-400">
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span>Location</span>
                                                </button>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex gap-2">
                                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50">
                                                    <Save className="w-4 h-4" />
                                                    Save as Draft
                                                </button>
                                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white rounded-lg text-sm font-medium hover:bg-[#6D28D9]">
                                                    <Printer className="w-4 h-4" />
                                                    Print
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-500 mt-3">
                                            Users choose where the record is listed: <strong>In Store</strong> (in-store database only), <strong>Online</strong> (also listed on your website), or <strong>Network</strong> (shared database with other stores). <strong>Print</strong> creates a QR label.
                                        </p>
                                    </div>

                                    {/* Quick Overview */}
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">The full loop:</p>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <span className="w-5 h-5 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-xs font-bold">1</span>
                                            <span>Scan → add a record and print a QR label</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <span className="w-5 h-5 rounded-full bg-[#5856D6] text-white flex items-center justify-center text-xs font-bold">2</span>
                                            <span>Fill out info → choose where to list record (in store, online, network)</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <span className="w-5 h-5 rounded-full bg-[#34C759] text-white flex items-center justify-center text-xs font-bold">3</span>
                                            <span>Sold → scan QR or mark sold, removed automatically from system</span>
                                        </div>
                                    </div>

                                    {/* Note */}
                                    <p className="text-sm text-slate-400 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        For full automation, we connect this to a modern POS like Square.
                                    </p>

                                    {/* View Demo Button - Big and Full Width */}
                                    <div className="pt-4">
                                        <Button
                                            onClick={handleViewDemo}
                                            className="w-full bg-[#007AFF] hover:bg-[#0062CC] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-16 text-xl font-bold rounded-xl"
                                        >
                                            View Demo
                                        </Button>
                                    </div>

                                    {/* Learn More Button */}
                                    <div className="pt-8 flex justify-center">
                                        <motion.a
                                            href="/services"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#007AFF] to-[#5856D6] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                        >
                                            Learn more about us
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.main>
        </div>
    );
}
