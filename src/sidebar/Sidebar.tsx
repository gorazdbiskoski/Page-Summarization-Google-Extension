import { useState } from "react";

const Sidebar = () => {
    const [summary, setSummary] = useState("Loading summary...");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(summary);
            alert("Summary copied to clipboard!");
        } catch (err) {
            alert("Failed to copy summary.");
            console.error(err);
        }
    };

    const handleRegenerate = () => {
        setSummary("🔄 Regenerating summary...");
        setTimeout(() => setSummary("This is a regenerated summary of the page."), 1000);
    };

    return (
        <div className="w-80 h-screen p-4 bg-white text-gray-900 flex flex-col border-l border-gray-300 shadow-lg">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">📄 Page Summarizer</h1>

            <h2 className="font-semibold mb-2 text-gray-700">🔎 Summary:</h2>
            <div className="flex-1 overflow-auto text-sm bg-gray-100 p-2 rounded">{summary}</div>

            <div className="mt-4 flex gap-2">
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleCopy}
                >
                    📋 Copy
                </button>
                <button
                    className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                    onClick={handleRegenerate}
                >
                    ♻️ Regenerate
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
