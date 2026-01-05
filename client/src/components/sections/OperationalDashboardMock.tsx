import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Package, Warehouse, TrendingUp } from "lucide-react";

// Check for debug mode via query parameter
function useDebugMode() {
    const [debug, setDebug] = useState(false);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setDebug(params.get("debug") === "1");
    }, []);
    return debug;
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    iconBg: string;
    iconColor: string;
}

function StatCard({ icon, label, value, iconBg, iconColor }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-100 p-3 md:p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
                <span className={iconColor}>{icon}</span>
            </div>
            <div className="min-w-0">
                <div className="text-[10px] md:text-xs text-slate-500 truncate">{label}</div>
                <div className="text-sm md:text-lg font-bold text-slate-800 truncate">{value}</div>
            </div>
        </div>
    );
}

// Line chart as SVG
function RevenueChart() {
    const points = [
        { x: 20, y: 80 },
        { x: 60, y: 70 },
        { x: 100, y: 65 },
        { x: 140, y: 50 },
        { x: 180, y: 35 },
        { x: 220, y: 20 },
    ];

    const pathD = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
    const areaD = pathD + ` L 220 100 L 20 100 Z`;

    return (
        <div className="bg-white rounded-xl border border-slate-100 p-3 md:p-4 shadow-sm">
            <h4 className="text-xs md:text-sm font-semibold text-slate-700 mb-2 md:mb-3">Revenue Growth (Last 6 Months)</h4>
            <svg viewBox="0 0 240 110" className="w-full h-20 md:h-28" preserveAspectRatio="xMidYMid meet">
                {/* Gradient fill */}
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#007AFF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#007AFF" stopOpacity="0.05" />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="20" y1="100" x2="220" y2="100" stroke="#e2e8f0" strokeWidth="1" />

                {/* Area fill */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Line */}
                <path d={pathD} fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Dots */}
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#007AFF" />
                ))}

                {/* Labels */}
                <text x="20" y="108" fill="#94a3b8" fontSize="8" textAnchor="middle">Jan</text>
                <text x="60" y="108" fill="#94a3b8" fontSize="8" textAnchor="middle">Feb</text>
                <text x="100" y="108" fill="#94a3b8" fontSize="8" textAnchor="middle">Mar</text>
                <text x="140" y="108" fill="#94a3b8" fontSize="8" textAnchor="middle">Apr</text>
                <text x="180" y="108" fill="#94a3b8" fontSize="8" textAnchor="middle">May</text>
                <text x="220" y="108" fill="#94a3b8" fontSize="8" textAnchor="middle">Jun</text>
            </svg>
        </div>
    );
}

// Bar chart for Sales by Channel
function ChannelChart() {
    const channels = [
        { name: "In-Store", height: 60, color: "#007AFF" },
        { name: "Online", height: 85, color: "#007AFF" },
        { name: "Network", height: 70, color: "#007AFF" },
    ];

    return (
        <div className="bg-white rounded-xl border border-slate-100 p-3 md:p-4 shadow-sm">
            <h4 className="text-xs md:text-sm font-semibold text-slate-700 mb-2 md:mb-3">Sales by Channel</h4>
            <div className="flex items-end justify-around h-20 md:h-28 gap-2 md:gap-4 px-2">
                {channels.map((ch, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                        <div
                            className="w-full max-w-[40px] md:max-w-[50px] rounded-t-md transition-all duration-500"
                            style={{
                                height: `${ch.height}%`,
                                backgroundColor: ch.color,
                                opacity: 0.7 + i * 0.1,
                            }}
                        />
                        <span className="text-[8px] md:text-[10px] text-slate-500 mt-1 text-center">{ch.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Recent Activity Table
function ActivityTable() {
    const activities = [
        { item: "Ergonomic Office Chair", channel: "Online", status: "Sold", price: "$349.00", date: "Jun 15, 2025" },
        { item: "Wireless Noise-Canceling Headphones", channel: "In-Store", status: "Pending", price: "$199.50", date: "Jun 14, 2025" },
        { item: "Smart Home Security Camera", channel: "Network", status: "Shipped", price: "$129.99", date: "Jun 14, 2025" },
        { item: "Professional Chef's Knife Set", channel: "Online", status: "Sold", price: "$249.00", date: "Jun 13, 2025" },
        { item: "Portable SSD 1TB", channel: "In-Store", status: "Processing", price: "$89.99", date: "Jun 13, 2025" },
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case "Sold":
                return "bg-emerald-100 text-emerald-700";
            case "Pending":
                return "bg-amber-100 text-amber-700";
            case "Shipped":
                return "bg-blue-100 text-blue-700";
            case "Processing":
                return "bg-purple-100 text-purple-700";
            default:
                return "bg-slate-100 text-slate-600";
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-100 p-3 md:p-4 shadow-sm overflow-hidden">
            <h4 className="text-xs md:text-sm font-semibold text-slate-700 mb-2 md:mb-3">Recent Activity</h4>
            <div className="overflow-x-auto -mx-3 md:mx-0">
                <table className="w-full text-left min-w-[280px]">
                    <thead>
                        <tr className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wide border-b border-slate-100">
                            <th className="pb-2 pl-3 md:pl-0 font-medium">Item Name</th>
                            <th className="pb-2 font-medium hidden md:table-cell">Channel</th>
                            <th className="pb-2 font-medium">Status</th>
                            <th className="pb-2 font-medium hidden sm:table-cell">Price</th>
                            <th className="pb-2 pr-3 md:pr-0 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((a, i) => (
                            <tr key={i} className="text-[10px] md:text-xs text-slate-600 border-b border-slate-50 last:border-0">
                                <td className="py-2 pl-3 md:pl-0 pr-2 truncate max-w-[100px] md:max-w-[180px]">{a.item}</td>
                                <td className="py-2 hidden md:table-cell">{a.channel}</td>
                                <td className="py-2">
                                    <span className={`px-1.5 md:px-2 py-0.5 rounded text-[8px] md:text-[9px] font-medium ${getStatusClass(a.status)}`}>
                                        {a.status}
                                    </span>
                                </td>
                                <td className="py-2 hidden sm:table-cell">{a.price}</td>
                                <td className="py-2 pr-3 md:pr-0 text-slate-500 whitespace-nowrap">{a.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Business Overview Panel
function BusinessOverview() {
    return (
        <div className="bg-white rounded-xl border border-slate-100 p-3 md:p-4 shadow-sm h-full">
            <h4 className="text-xs md:text-sm font-bold text-slate-800 mb-2 md:mb-3">Business Overview</h4>
            <p className="text-[10px] md:text-xs text-slate-600 leading-relaxed mb-3 md:mb-4">
                "Sales are trending upward this month, with online listings driving the majority of growth. Inventory turnover remains healthy and demand is strongest for mid-priced items."
            </p>

            {/* Metrics */}
            <div className="space-y-2 md:space-y-3">
                <div>
                    <div className="flex justify-between text-[9px] md:text-[10px] text-slate-600 mb-1">
                        <span>Online Growth:</span>
                        <span className="font-medium">75%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#007AFF] rounded-full" style={{ width: "75%" }} />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-[9px] md:text-[10px] text-slate-600 mb-1">
                        <span>Inventory Turnover:</span>
                        <span className="font-medium text-emerald-600">Healthy</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "65%" }} />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-[9px] md:text-[10px] text-slate-600 mb-1">
                        <span>Mid-Priced Demand:</span>
                        <span className="font-medium">High</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#007AFF] rounded-full" style={{ width: "85%" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function OperationalDashboardMock() {
    const debug = useDebugMode();
    const debugClass = debug ? "outline outline-2 outline-red-500" : "";

    const stats: StatCardProps[] = [
        { icon: <DollarSign size={18} />, label: "Total Revenue:", value: "$124,850", iconBg: "bg-blue-50", iconColor: "text-[#007AFF]" },
        { icon: <ShoppingCart size={18} />, label: "Monthly Sales:", value: "1,284", iconBg: "bg-blue-50", iconColor: "text-[#007AFF]" },
        { icon: <Package size={18} />, label: "Active Listings:", value: "642", iconBg: "bg-blue-50", iconColor: "text-[#007AFF]" },
        { icon: <Warehouse size={18} />, label: "Inventory Value:", value: "$312,400", iconBg: "bg-blue-50", iconColor: "text-[#007AFF]" },
    ];

    return (
        <div className={`w-full max-w-[800px] mx-auto ${debugClass}`}>
            {/* Dashboard Container */}
            <div className={`bg-slate-50 rounded-2xl border border-slate-200 p-3 md:p-4 lg:p-5 shadow-xl ${debugClass}`}>

                {/* Stat Cards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">

                    {/* Left Column: Charts */}
                    <div className="lg:col-span-2 space-y-3 md:space-y-4">
                        {/* Charts Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <RevenueChart />
                            <ChannelChart />
                        </div>

                        {/* Activity Table */}
                        <ActivityTable />
                    </div>

                    {/* Right Column: Business Overview */}
                    <div className="lg:col-span-1">
                        <BusinessOverview />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OperationalDashboardMock;
