import { createContext, useContext, useState } from "react";

const HighlightContext = createContext({
    highlightedStat: null,
    setHighlightedStat: () => {},
});

export function HighlightProvider({ children }) {
    const [highlightedStat, setHighlightedStat] = useState(null);
    return (
        <HighlightContext.Provider value={{ highlightedStat, setHighlightedStat }}>
            {children}
        </HighlightContext.Provider>
    );
}

export function useHighlight() {
    return useContext(HighlightContext);
}