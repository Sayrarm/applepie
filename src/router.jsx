import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { RedirectHandler } from "./components/RedirectHandler";
import Home from "./pages/Home";
import Memories from "./pages/Memories";
import Battle from "./pages/Battle";
import Lore from "./pages/Lore";
import Spacepedia from "./pages/Spacepedia";
import WorldUnderneath from "./pages/WorldUnderneath";
import MainStory from "./pages/MainStory";
import WuArticle from "./pages/WuArticle";
import MsArticle from "./pages/MsArticle";
import Anecdotes from "./pages/Anecdotes";
import AnArticle from "./pages/AnArticle";
import CompanionBattleInfo from "./pages/CompanionBattleInfo";
import { CardProvider } from "./components/CardProvider";
import CardArticle from "./pages/CardArticle.jsx";
import Banners from "./pages/Banners.jsx";
import Calculator from "./pages/Calculator.jsx";

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
            {
                path: "memories",
                element: (
                    <CardProvider>
                        <Memories />
                    </CardProvider>
                ),
            },
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
            { path: "anecdotes", element: <Anecdotes /> },
            { path: "anecdotes/:articleLink", element: <AnArticle /> },
            { path: "calculator", element: <Calculator /> },

        ],
    },
],
{
    basename: basename,
}
);