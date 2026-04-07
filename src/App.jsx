import Header from "./components/Header.jsx";
import {Route, Routes} from "react-router-dom";
import Memories from "./pages/Memories.jsx";
import Characters from "./pages/Characters.jsx";
import HunterContest from "./pages/HunterContest.jsx";
import Lore from "./pages/Lore.jsx";
import Home from "./pages/Home.jsx";


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
                    <Route path="/hunter-contest" element={<HunterContest/>}/>
                    <Route path="/lore" element={<Lore/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
