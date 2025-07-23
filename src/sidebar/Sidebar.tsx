import { useEffect, useState } from "react";

const Sidebar = () => {
    const [summary, setSummary] = useState("Loading summary...");
    const [animationIntervalId, setAnimationIntervalId] = useState<NodeJS.Timeout | null>(null);

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
                console.log("Sidebar received summary:", message.payload);
                setSummary(message.payload || "No summary available.");

                if (animationIntervalId) {
                    clearInterval(animationIntervalId);
                    setAnimationIntervalId(null);
                }

                setSummary(message.payload || "No summary available.");
            }
        };

        chrome.runtime.onMessage.addListener(listener);
        return () => chrome.runtime.onMessage.removeListener(listener);
    }, [animationIntervalId]);

    const handleRegenerate = () => {
        let dotCount = 0;
        const baseText = "Regenerating summary";

        // Start animation loop
        const intervalId = setInterval(() => {
            dotCount = (dotCount + 1) % 4; // cycles through 0,1,2,3
            const dots = ".".repeat(dotCount);
            setSummary(`${baseText}${dots}`);
        }, 500);

        setAnimationIntervalId(intervalId);

        // Send message to content script to regenerate summary
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab?.id) {
                chrome.tabs.sendMessage(activeTab.id, {
                    type: "REGENERATE_SUMMARY",
                });
            }
        });
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
