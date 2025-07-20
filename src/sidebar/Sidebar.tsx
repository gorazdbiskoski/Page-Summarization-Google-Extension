import { useEffect, useState } from "react";

const Sidebar = () => {
    const [summary, setSummary] = useState("Loading summary...");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(summary);
            console.log("Summary copied to clipboard!");
        } catch (err) {
            console.log("Failed to copy summary.");
            console.error(err);
        }
    };

    useEffect(() => {
        const listener: Parameters<typeof chrome.runtime.onMessage.addListener>[0] = (message) => {
            if (message.type === "SUMMARY_RESULT") {
                console.log("✅ Sidebar received summary:", message.payload);
                setSummary(message.payload || "No summary available.");
            }
        };

        chrome.runtime.onMessage.addListener(listener);
        return () => chrome.runtime.onMessage.removeListener(listener);
    }, []);

    const handleRegenerate = () => {
        setSummary("🔄 Regenerating summary...");
        setTimeout(() => setSummary("This is a regenerated summary of the page."), 1000);
    };

    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Page Summarizer</h1>

            <h2 className="sidebar-subtitle">Summary:</h2>
            <div className="summary-box">
                {summary}
            </div>

            <div className="button-row">
                <button className="action-button" onClick={handleCopy}>
                    Copy
                </button>
                <button className="action-button" onClick={handleRegenerate}>
                    Regenerate
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
