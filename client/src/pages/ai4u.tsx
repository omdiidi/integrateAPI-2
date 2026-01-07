import { useEffect } from "react";

/**
 * AI4U Hidden Page
 * 
 * This page embeds the AI4U student organization website as a full-viewport iframe.
 * It is hidden from the main navigation and includes noindex for search engines.
 * 
 * Access: https://integrateapi.ai/ai4u or https://ai4u.integrateapi.ai
 */
export default function AI4U() {
    useEffect(() => {
        // Set page title
        document.title = "AI4U - Student Organization";

        // Add noindex meta tag for this page only
        let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
        if (!metaRobots) {
            metaRobots = document.createElement("meta");
            metaRobots.name = "robots";
            document.head.appendChild(metaRobots);
        }
        metaRobots.content = "noindex, nofollow";

        // Hide any scrollbars on body to prevent double scrollbars
        document.body.style.overflow = "hidden";

        return () => {
            // Cleanup on unmount
            document.body.style.overflow = "";
            if (metaRobots) {
                metaRobots.content = "index, follow";
            }
        };
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                margin: 0,
                padding: 0,
                border: "none",
                overflow: "hidden",
            }}
        >
            <iframe
                src="/ai4u-embed/"
                title="AI4U Student Organization"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
        </div>
    );
}
