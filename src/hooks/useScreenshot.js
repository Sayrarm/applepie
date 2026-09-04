import { useState, useCallback } from 'react';
import { toPng } from "html-to-image";

export const useScreenshot = () => {
    const [isCapturing, setIsCapturing] = useState(false);

    const captureScreenshot = useCallback(async (element, teamName) => {
        if (!element) return;

        setIsCapturing(true);

        try {
            element.style.padding = "1px";

            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 3,
                backgroundColor: "var(--bg-primary)",
                cacheBust: true,
                width: element.scrollWidth,
                height: element.scrollHeight,
                filter: (node) => {
                    return (
                        !node.classList?.contains("modal") && !node.closest?.(".modal")
                    );
                },
            });

            element.style.padding = "0";

            const link = document.createElement("a");
            link.download = `${teamName}_${new Date().toISOString().slice(0, 10)}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Error capturing screenshot:", error);
            alert("Failed to capture screenshot. Please try again.");
            if (element) {
                element.style.padding = "0";
            }
        } finally {
            setIsCapturing(false);
        }
    }, []);

    return { isCapturing, captureScreenshot };
};