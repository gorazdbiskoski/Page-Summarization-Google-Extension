import React from 'react'
import ReactDOM from 'react-dom/client'

function SidePanel() {
    return (
        <div style={{ padding: '10px' }}>
            <h1>Page Summarizer</h1>
            <p>Summary will appear here...</p>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SidePanel />
    </React.StrictMode>
)
