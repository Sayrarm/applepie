import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import {
    Home,
    Memories,
    Battle,
    Lore,
    Spacepedia,
    WorldUnderneath,
    MainStory,
    WuArticle,
    MsArticle,
    Anecdotes,
    AnArticle,
    CompanionBattleInfo,
    CardArticle,
    Banners,
    Calculator,
    About,
    FAQ,
    CharacterArticle,
    Characters,
    MyAccount
} from '@pages'
import { RedirectHandler } from "@hooks";

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
            { path: "my-account", element: <MyAccount /> },
            { path: "my-account/:navigation", element: <MyAccount /> },
            { path: "about", element: <About /> },
            { path: "faq", element: <FAQ /> },

        ],
    },
],
{
    basename: basename,
}
);