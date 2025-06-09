
const Popup = () => {
    return (
        <div className="w-72 p-4 bg-white text-gray-800">
            <h1 className="text-xl font-bold mb-2 flex items-center gap-2">
                📄 Page Summarizer
            </h1>
            <p className="text-sm mb-4">
                Open a webpage to use the summarizer side panel.
            </p>
            <p className="text-xs text-gray-500">
                Click the extension icon on any webpage!
            </p>
        </div>
    );
}

export default Popup;