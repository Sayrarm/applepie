import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { RedirectHandler } from "./hooks/RedirectHandler.jsx";
import Home from "./pages/main/Home.jsx";
import Memories from "./pages/memories/Memories.jsx";
import Battle from "./pages/battle/Battle.jsx";
import Lore from "./pages/lore/Lore.jsx";
import Spacepedia from "./pages/lore/Spacepedia.jsx";
import WorldUnderneath from "./pages/lore/WorldUnderneath.jsx";
import MainStory from "./pages/lore/MainStory.jsx";
import WuArticle from "./pages/lore/WuArticle.jsx";
import MsArticle from "./pages/lore/MsArticle.jsx";
import Anecdotes from "./pages/lore/Anecdotes.jsx";
import AnArticle from "./pages/lore/AnArticle.jsx";
import CompanionBattleInfo from "./pages/battle/CompanionBattleInfo.jsx";
import CardArticle from "./pages/memories/CardArticle.jsx";
import Banners from "./pages/banners/Banners.jsx";
import Calculator from "./pages/calculator/Calculator.jsx";
import About from "./pages/about/About.jsx";
import FAQ from "./pages/faq/FAQ.jsx";
import CharacterArticle from "./pages/lore/CharacterArticle.jsx";
import Characters from "./pages/lore/Characters.jsx";

const basename = import.meta.env.BASE_URL;

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <RedirectHandler />
                <Layout />
            </>
        ),
        children: [
            { index: true, element: <Home /> },
            { path: "memories/:cardId", element: <CardArticle /> },
            { path: "memories", element: <Memories /> },
            { path: "battle", element: <Battle /> },
            { path: "banners-history", element: <Banners /> },
            { path: "battle/:articleLink", element: <CompanionBattleInfo /> },
            { path: "lore", element: <Lore /> },
            { path: "spacepedia", element: <Spacepedia /> },
            { path: "spacepedia/:navigation", element: <Spacepedia /> },
            { path: "world-underneath", element: <WorldUnderneath /> },
            { path: "world-underneath/:articleLink", element: <WuArticle /> },
            { path: "main-story", element: <MainStory /> },
            { path: "main-story/:articleLink", element: <MsArticle /> },
            { path: "characters", element: <Characters /> },
            { path: "characters/:articleLink", element: <CharacterArticle /> },
            { path: "anecdotes", element: <Anecdotes /> },
            { path: "anecdotes/:articleLink", element: <AnArticle /> },
            { path: "calculator", element: <Calculator /> },
            { path: "calculator/:navigation", element: <Calculator /> },
            { path: "about", element: <About /> },
            { path: "faq", element: <FAQ /> },

        ],
    },
],
{
    basename: basename,
}
);