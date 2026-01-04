import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

// ============== DATA ARRAY - EDIT COPY HERE ==============
const FLOW_NODES = [
    {
        id: "add-item",
        label: "Add item",
        title: "Add Item",
        description: "Scan or manually enter a new item. Takes about 10 seconds with a barcode, 30 seconds without.",
        gridX: 0,
        gridY: 1,
        icon: "add-tag",
    },
    {
        id: "tag-organize",
        label: "Tag and organize",
        title: "Tag & Organize",
        description: "Add condition, price, and choose which channels to list on. Everything stays in sync automatically.",
        gridX: 1,
        gridY: 0,
        wide: true,
        icon: "checklist-tag",
    },
    {
        id: "in-store",
        label: "In store list",
        title: "In-Store List",
        description: "Your in-store inventory updates instantly. Print a QR label so customers can scan for more info.",
        gridX: 1,
        gridY: 2,
        icon: "store",
    },
    {
        id: "online",
        label: "Online listings",
        title: "Online Listings",
        description: "Push to Discogs, eBay, your website, or all three at once. One click, everywhere.",
        gridX: 2,
        gridY: 2,
        icon: "mobile-store",
    },
    {
        id: "sold",
        label: "Sold & auto sync",
        title: "Sold & Auto Sync",
        description: "When an item sells anywhere, it's removed from all channels automatically. No overselling.",
        gridX: 3,
        gridY: 1,
        icon: "checkmark-sync",
        showSoldPill: true,
    },
];

const ACCENT_COLOR = "#5E84EF";

// ============== SVG ICONS ==============
function AddTagIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
            <path
                d="M20 8L36 8C38.2 8 40 9.8 40 12V28L24 44L8 28V12C8 9.8 9.8 8 12 8H20"
                stroke={ACCENT_COLOR}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <circle cx="16" cy="16" r="3" fill={ACCENT_COLOR} />
            <path d="M28 16H36M32 12V20" stroke={ACCENT_COLOR} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

function ChecklistTagIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 48" fill="none" className={className}>
            <path d="M8 12L12 16L20 8" stroke={ACCENT_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 24L12 28L20 20" stroke={ACCENT_COLOR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 36L12 40L20 32" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="26" y="10" width="16" height="4" rx="2" fill="#E2E8F0" />
            <rect x="26" y="22" width="12" height="4" rx="2" fill="#E2E8F0" />
            <rect x="26" y="34" width="14" height="4" rx="2" fill="#E2E8F0" />
            <path d="M52 18L58 12C59.1 10.9 60 11 60 12.5V24C60 25.5 59.1 25.6 58 24.5L52 18.5V18Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="56" cy="18" r="2" fill={ACCENT_COLOR} />
        </svg>
    );
}

function StoreIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
            <rect x="8" y="8" width="32" height="10" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M8 18H40V38C40 39.1 39.1 40 38 40H10C8.9 40 8 39.1 8 38V18Z" fill="white" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M14 8V18" stroke={ACCENT_COLOR} strokeWidth="2" />
            <path d="M24 8V18" stroke={ACCENT_COLOR} strokeWidth="2" />
            <path d="M34 8V18" stroke={ACCENT_COLOR} strokeWidth="2" />
            <rect x="12" y="22" width="10" height="8" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            <rect x="26" y="26" width="10" height="14" rx="1" fill={ACCENT_COLOR} fillOpacity="0.2" stroke={ACCENT_COLOR} strokeWidth="1.5" />
            <circle cx="34" cy="33" r="1" fill={ACCENT_COLOR} />
        </svg>
    );
}

function MobileStoreIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
            <rect x="12" y="4" width="24" height="40" rx="4" fill="white" stroke="#94A3B8" strokeWidth="2" />
            <rect x="14" y="10" width="20" height="26" fill="#F8FAFC" />
            <rect x="17" y="14" width="14" height="5" rx="1" fill={ACCENT_COLOR} fillOpacity="0.3" />
            <path d="M19 14V19" stroke={ACCENT_COLOR} strokeWidth="1" />
            <path d="M24 14V19" stroke={ACCENT_COLOR} strokeWidth="1" />
            <path d="M29 14V19" stroke={ACCENT_COLOR} strokeWidth="1" />
            <rect x="17" y="19" width="14" height="12" fill="white" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="24" cy="40" r="2" stroke="#94A3B8" strokeWidth="1" fill="none" />
        </svg>
    );
}

function CheckmarkSyncIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
            <path d="M12 24L20 32L36 16" stroke={ACCENT_COLOR} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <g transform="translate(32, 32)">
                <path d="M2 8C2 4.7 4.7 2 8 2M14 8C14 11.3 11.3 14 8 14" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 0L8 2L5 4" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 12L8 14L11 16" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
}

function getIcon(iconName: string, className: string) {
    switch (iconName) {
        case "add-tag": return <AddTagIcon className={className} />;
        case "checklist-tag": return <ChecklistTagIcon className={className} />;
        case "store": return <StoreIcon className={className} />;
        case "mobile-store": return <MobileStoreIcon className={className} />;
        case "checkmark-sync": return <CheckmarkSyncIcon className={className} />;
        default: return null;
    }
}

// ============== TOOLTIP ==============
interface TooltipProps {
    node: typeof FLOW_NODES[0];
    anchorRect: DOMRect | null;
    containerRect: DOMRect | null;
    onClose: () => void;
    isPinned: boolean;
}

function Tooltip({ node, anchorRect, containerRect, onClose, isPinned }: TooltipProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (isPinned && ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        }
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isPinned, onClose]);

    if (!anchorRect || !containerRect) return null;

    // Position tooltip above the node
    const left = anchorRect.left - containerRect.left + anchorRect.width / 2;
    const top = anchorRect.top - containerRect.top - 8;

    return (
        <div
            ref={ref}
            role="tooltip"
            className="absolute z-50 bg-white rounded-xl shadow-xl border border-slate-200 p-4 w-56 pointer-events-auto"
            style={{
                left,
                top,
                transform: "translate(-50%, -100%)",
            }}
        >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-3 h-3 bg-white border-r border-b border-slate-200 transform rotate-45 -translate-y-1.5" />
            </div>
            <h4 className="font-semibold text-slate-800 mb-1 text-sm">{node.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{node.description}</p>
            {isPinned && (
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 text-xs"
                    aria-label="Close tooltip"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

// ============== MAIN COMPONENT ==============
export function FlowDiagram() {
    const [activeNode, setActiveNode] = useState<typeof FLOW_NODES[0] | null>(null);
    const [pinnedNode, setPinnedNode] = useState<typeof FLOW_NODES[0] | null>(null);
    const [activeRect, setActiveRect] = useState<DOMRect | null>(null);
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
    const [reducedMotion, setReducedMotion] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const updateContainerRect = useCallback(() => {
        if (containerRef.current) {
            setContainerRect(containerRef.current.getBoundingClientRect());
        }
    }, []);

    useEffect(() => {
        updateContainerRect();
        window.addEventListener("resize", updateContainerRect);
        window.addEventListener("scroll", updateContainerRect);
        return () => {
            window.removeEventListener("resize", updateContainerRect);
            window.removeEventListener("scroll", updateContainerRect);
        };
    }, [updateContainerRect]);

    const handleNodeHover = useCallback((node: typeof FLOW_NODES[0] | null, nodeEl: HTMLDivElement | null) => {
        if (!pinnedNode) {
            setActiveNode(node);
            if (node && nodeEl) {
                setActiveRect(nodeEl.getBoundingClientRect());
            } else {
                setActiveRect(null);
            }
        }
    }, [pinnedNode]);

    const handleNodeClick = useCallback((node: typeof FLOW_NODES[0], nodeEl: HTMLDivElement) => {
        if (pinnedNode?.id === node.id) {
            setPinnedNode(null);
            setActiveNode(null);
            setActiveRect(null);
        } else {
            setPinnedNode(node);
            setActiveNode(node);
            setActiveRect(nodeEl.getBoundingClientRect());
        }
    }, [pinnedNode]);

    const currentNode = pinnedNode || activeNode;

    // Grid-based layout
    const nodeSize = 90;
    const wideNodeWidth = 140;
    const gap = 30;
    const gridWidth = 4 * nodeSize + 3 * gap;
    const gridHeight = 3 * nodeSize + 2 * gap;

    return (
        <div className="flex justify-center w-full">
            <div
                ref={containerRef}
                className="relative"
                style={{
                    width: gridWidth,
                    height: gridHeight + 60,
                    background: `
            linear-gradient(to right, #E2E8F0 1px, transparent 1px),
            linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    backgroundColor: "white",
                    borderRadius: 16,
                }}
            >
                {/* SVG Connectors */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Connector: Add Item → Tag */}
                    <path
                        d={`M ${nodeSize} ${nodeSize + gap + nodeSize / 2} 
                Q ${nodeSize + gap / 2} ${gap + nodeSize / 2}, ${nodeSize + gap} ${gap + nodeSize / 2}`}
                        fill="none"
                        stroke={ACCENT_COLOR}
                        strokeWidth={3}
                        strokeOpacity={0.4}
                        strokeLinecap="round"
                    />

                    {/* Connector: Tag → In Store */}
                    <path
                        d={`M ${nodeSize + gap + wideNodeWidth / 3} ${gap + nodeSize} 
                L ${nodeSize + gap + nodeSize / 2} ${2 * (nodeSize + gap)}`}
                        fill="none"
                        stroke={ACCENT_COLOR}
                        strokeWidth={3}
                        strokeOpacity={0.4}
                        strokeLinecap="round"
                    />

                    {/* Connector: Tag → Online */}
                    <path
                        d={`M ${nodeSize + gap + wideNodeWidth * 2 / 3} ${gap + nodeSize} 
                L ${2 * (nodeSize + gap) + nodeSize / 2} ${2 * (nodeSize + gap)}`}
                        fill="none"
                        stroke={ACCENT_COLOR}
                        strokeWidth={3}
                        strokeOpacity={0.4}
                        strokeLinecap="round"
                    />

                    {/* Connector: In Store → Sold */}
                    <path
                        d={`M ${nodeSize + gap + nodeSize} ${2 * (nodeSize + gap) + nodeSize / 2} 
                Q ${2.5 * (nodeSize + gap)} ${2 * (nodeSize + gap) + nodeSize}, 
                  ${3 * (nodeSize + gap)} ${nodeSize + gap + nodeSize / 2}`}
                        fill="none"
                        stroke={ACCENT_COLOR}
                        strokeWidth={3}
                        strokeOpacity={0.4}
                        strokeLinecap="round"
                    />

                    {/* Connector: Online → Sold */}
                    <path
                        d={`M ${2 * (nodeSize + gap) + nodeSize} ${2 * (nodeSize + gap) + nodeSize / 2} 
                Q ${2.8 * (nodeSize + gap)} ${2 * (nodeSize + gap) + nodeSize / 2}, 
                  ${3 * (nodeSize + gap)} ${nodeSize + gap + nodeSize / 2 + 20}`}
                        fill="none"
                        stroke={ACCENT_COLOR}
                        strokeWidth={3}
                        strokeOpacity={0.4}
                        strokeLinecap="round"
                    />

                    {/* Traveling dots */}
                    {!reducedMotion && (
                        <>
                            <circle r="4" fill={ACCENT_COLOR} opacity="0.8">
                                <animate attributeName="opacity" values="0;0.8;0.8;0" dur="4s" repeatCount="indefinite" />
                                <animateMotion
                                    dur="4s"
                                    repeatCount="indefinite"
                                    path={`M ${nodeSize} ${nodeSize + gap + nodeSize / 2} Q ${nodeSize + gap / 2} ${gap + nodeSize / 2}, ${nodeSize + gap} ${gap + nodeSize / 2}`}
                                />
                            </circle>
                        </>
                    )}
                </svg>

                {/* Nodes */}
                {FLOW_NODES.map((node) => {
                    const x = node.gridX * (nodeSize + gap);
                    const y = node.gridY * (nodeSize + gap);
                    const width = node.wide ? wideNodeWidth : nodeSize;
                    const isActive = currentNode?.id === node.id;

                    return (
                        <div
                            key={node.id}
                            ref={(el) => {
                                if (el) nodeRefs.current.set(node.id, el);
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`${node.label}: ${node.description}`}
                            className={cn(
                                "absolute bg-white rounded-2xl border-2 cursor-pointer transition-all duration-200",
                                "shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E84EF]",
                                isActive ? "border-[#5E84EF] shadow-lg" : "border-slate-200 hover:border-[#5E84EF]/50"
                            )}
                            style={{
                                left: x,
                                top: y,
                                width,
                                height: nodeSize,
                            }}
                            onMouseEnter={(e) => handleNodeHover(node, e.currentTarget)}
                            onMouseLeave={() => handleNodeHover(null, null)}
                            onFocus={(e) => handleNodeHover(node, e.currentTarget)}
                            onBlur={() => handleNodeHover(null, null)}
                            onClick={(e) => handleNodeClick(node, e.currentTarget)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleNodeClick(node, e.currentTarget as HTMLDivElement);
                                }
                            }}
                        >
                            <div className="w-full h-full flex items-center justify-center p-3">
                                {getIcon(node.icon, "w-10 h-10")}
                            </div>

                            {/* SOLD Pill */}
                            {node.showSoldPill && (
                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-600 flex items-center gap-1.5 whitespace-nowrap">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    SOLD
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Tooltip */}
                {currentNode && (
                    <Tooltip
                        node={currentNode}
                        anchorRect={activeRect}
                        containerRect={containerRect}
                        onClose={() => {
                            setPinnedNode(null);
                            setActiveNode(null);
                            setActiveRect(null);
                        }}
                        isPinned={!!pinnedNode}
                    />
                )}
            </div>
        </div>
    );
}

export default FlowDiagram;
