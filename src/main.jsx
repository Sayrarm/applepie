import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ThemeProvider} from "@components/header/ThemeChange.jsx";
import {TimezoneProvider} from "@components/header/TimezoneContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TimezoneProvider>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
        </TimezoneProvider>
    </StrictMode>,
)
