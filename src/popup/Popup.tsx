
const Popup = () => {
    return (
        <div className="popup">
            <header className="popup-header">
                <img src="../../public/logo.png" alt="QuickRead Logo" className="logo"/>
                <div className="brand-text">
                    <h1>QuickRead</h1>
                    <p className="subtitle">Your instant webpage summarizer</p>
                </div>
            </header>

            <section className="popup-body">
                <h2 className="section-title">How to Use QuickRead</h2>
                <ol className="instructions">
                    <li> Visit any text-based webpage.</li>
                    <li>️ Click the <strong>QuickRead</strong> icon.</li>
                    <li> Right-click the icon and choose <em>“Open Side Panel”</em>.</li>
                    <li> Read the text summary.</li>
                </ol>
            </section>

            <footer className="popup-footer">
                <p className="note">
                    <span>
                        Need help?
                    </span>
                    <a href="https://github.com/gorazdbiskoski/Page-Summarization-Google-Extension" target="_blank">
                        View Docs
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default Popup;