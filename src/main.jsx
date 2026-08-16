import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, TimezoneProvider } from "@components";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TimezoneProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TimezoneProvider>
  </StrictMode>,
);
