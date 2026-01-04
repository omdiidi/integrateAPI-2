import { useState, useEffect } from "react";

const ACCENT_COLOR = "#5E84EF";

export function DashboardMock() {
    const [reducedMotion, setReducedMotion] = useState(false);
    const [dotPosition, setDotPosition] = useState(0);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Animate dot along chart line
    useEffect(() => {
        if (reducedMotion) return;
        const interval = setInterval(() => {
            setDotPosition((prev) => (prev + 1) % 5);
        }, 2000);
        return () => clearInterval(interval);
    }, [reducedMotion]);

    const chartPoints = [
        { x: 20, y: 70 },
        { x: 80, y: 45 },
        { x: 140, y: 55 },
        { x: 200, y: 30 },
        { x: 260, y: 20 },
    ];

    const pathD = chartPoints
        .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
        .join(" ");

    return (
        <div className="relative">
            {/* Main Dashboard Card */}
            <div
                className="relative rounded-2xl shadow-2xl overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    padding: "32px",
                    maxWidth: "420px",
                }}
            >
                {/* Animated gradient background */}
                {!reducedMotion && (
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: `linear-gradient(45deg, ${ACCENT_COLOR}20, transparent, ${ACCENT_COLOR}10)`,
                            backgroundSize: "200% 200%",
                            animation: "gradientMove 8s ease infinite",
                        }}
                    />
                )}

                {/* Content */}
                <div className="relative z-10">
                    {/* Top Metric */}
                    <div className="mb-6">
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Revenue</div>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-bold text-white">$124,500</span>
                            <span
                                className="text-emerald-400 text-sm font-medium flex items-center gap-1 pb-1"
                                style={{
                                    animation: reducedMotion ? "none" : "pulse 2s ease-in-out infinite",
                                }}
                            >
                                ↑ 12%
                            </span>
                        </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
                        <div className="text-xs text-slate-500 mb-2">Weekly Activity</div>
                        <svg width="280" height="80" className="w-full" viewBox="0 0 280 80">
                            {/* Grid lines */}
                            <line x1="0" y1="80" x2="280" y2="80" stroke="#334155" strokeWidth="1" />

                            {/* Chart line */}
                            <path
                                d={pathD}
                                fill="none"
                                stroke={ACCENT_COLOR}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity="0.8"
                            />

                            {/* Static dots */}
                            {chartPoints.map((p, i) => (
                                <circle
                                    key={i}
                                    cx={p.x}
                                    cy={p.y}
                                    r={i === dotPosition ? 6 : 4}
                                    fill={i === dotPosition ? ACCENT_COLOR : "#475569"}
                                    className="transition-all duration-500"
                                />
                            ))}

                            {/* Labels */}
                            <text x="20" y="78" fill="#64748b" fontSize="8">Mon</text>
                            <text x="80" y="78" fill="#64748b" fontSize="8">Tue</text>
                            <text x="140" y="78" fill="#64748b" fontSize="8">Wed</text>
                            <text x="200" y="78" fill="#64748b" fontSize="8">Thu</text>
                            <text x="260" y="78" fill="#64748b" fontSize="8">Fri</text>
                        </svg>
                    </div>

                    {/* Ghost Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                            <div className="text-xs text-slate-500 mb-1">Open Jobs</div>
                            <div className="text-lg font-semibold text-slate-300">12</div>
                        </div>
                        <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                            <div className="text-xs text-slate-500 mb-1">Inventory Updates</div>
                            <div className="text-lg font-semibold text-slate-300">47</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for animations */}
            <style>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
        </div>
    );
}

export default DashboardMock;
