import { Readability } from "@mozilla/readability";

function extractReadableArticle(): string {
    const docClone = document.cloneNode(true) as Document;
    const reader = new Readability(docClone);
    const article = reader.parse();

    if (!article || !article.textContent) {
        console.warn("Readability could not parse this page.");
        return "";
    }

    return article.textContent.trim();
}

const readableText = extractReadableArticle();

console.log("📖 Readable content:", readableText);

chrome.runtime.sendMessage({
    type: "PAGE_TEXT",
    payload: readableText,
});
