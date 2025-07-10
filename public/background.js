chrome.runtime.onInstalled.addListener(() => {
    console.log("Page Summarizer Extension Installed!")
});

const OPENAI_API_KEY = "API_KEY";

chrome.runtime.onMessage.addListener(async (message) => {
    console.log("Background received message:", message);
    if (message.type === "PAGE_TEXT") {
        const text = message.payload;
        if (!text) return;

        console.log("Received text for summarization:", text.slice(0, 200));

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant that summarizes text concisely.",
                        },
                        {
                            role: "user",
                            content: `Summarize the following text:\n\n${text}`,
                        },
                    ],
                    max_tokens: 300,
                    temperature: 0.5,
                }),
            });

            const data = await response.json();
            console.log("OpenAI API response:", data);

            const summary = data.choices?.[0]?.message?.content ?? null;

            if (!summary) {
                console.warn("No summary found in API response");
            }

            chrome.runtime.sendMessage({
                type: "SUMMARY_RESULT",
                payload: summary || "No summary available.",
            });
        } catch (error) {
            console.error("Error fetching summary:", error);
            chrome.runtime.sendMessage({
                type: "SUMMARY_RESULT",
                payload: "Error generating summary.",
            });
        }
    }
});

