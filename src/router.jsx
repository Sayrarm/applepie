import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Memories from "./pages/Memories";
import Characters from "./pages/Characters";
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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Layout будет содержать Header, Footer и ScrollRestoration
        children: [
            { index: true, element: <Home /> },
            {
                path: "memories",
                element: (
                    <CardProvider>
                        <Memories />
                    </CardProvider>
                ),
            },
            { path: "characters", element: <Characters /> },
            { path: "battle", element: <Battle /> },
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
        ],
    },
]);