import Header from "./components/Header.jsx";
import {Route, Routes} from "react-router-dom";
import Memories from "./pages/Memories.jsx";
import Characters from "./pages/Characters.jsx";
import Battle from "./pages/Battle.jsx";
import Lore from "./pages/Lore.jsx";
import Home from "./pages/Home.jsx";
import Spacepedia from "./pages/Spacepedia.jsx";
import WorldUnderneath from "./pages/WorldUnderneath.jsx";
import MainStory from "./pages/MainStory.jsx";
import { FloatButton } from 'antd';
import WuArticle from "./pages/WuArticle.jsx";


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
                    <Route path="/spacepedia" element={<Spacepedia/>}/>
                    <Route path="/world-underneath" element={<WorldUnderneath/>}/>
                    <Route path="/world-underneath/:articleLink" element={<WuArticle />} />
                    <Route path="/main-story" element={<MainStory/>}/>
                    <Route path="/spacepedia/:navigation" element={<Spacepedia />} />
                </Routes>

                <FloatButton.BackTop />
            </div>
        </>
    )
}

export default App
