import { useState } from "react";

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // сброс через 2 секунды
    } catch (err) {
      console.error("Error:", err);
      setCopied(false);
    }
  };

  return { copyToClipboard, copied };
};
