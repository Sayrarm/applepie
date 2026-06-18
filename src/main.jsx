import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ThemeProvider} from "./components/ThemeChange.jsx";
import {TimezoneProvider} from "./components/TimezoneContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TimezoneProvider>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
        </TimezoneProvider>
    </StrictMode>,
)
