import Header from "./components/Header.jsx";
import {Route, Routes} from "react-router-dom";
import Memories from "./pages/Memories.jsx";
import Characters from "./pages/Characters.jsx";
import Battle from "./pages/Battle.jsx";
import Lore from "./pages/Lore.jsx";
import Home from "./pages/Home.jsx";
import { FloatButton } from 'antd';


function App() {


    return (
        <>
            <div className="container">
                <Header/>

                {/* Контент меняется здесь */}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/memories" element={<Memories/>}/>
                    <Route path="/characters" element={<Characters/>}/>
                    <Route path="/battle" element={<Battle/>}/>
                    <Route path="/lore" element={<Lore/>}/>
                </Routes>

                <FloatButton.BackTop />
            </div>
        </>
    )
}

export default App
