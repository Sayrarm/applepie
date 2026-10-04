import {createBrowserRouter, Navigate} from "react-router-dom";
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
  MyAccount,
  OptimizerNavigation
} from "@pages";
import { RedirectHandler } from "@hooks";
import {MemoryOptimizer, MemoryUpCalculator, ProtocoreCalculator, Showcase, TeamOptimizer} from "@components";

const basename = import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  [
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
        { path: "lore/spacepedia", element: <Spacepedia /> },
        { path: "lore/spacepedia/:navigation", element: <Spacepedia /> },
        { path: "lore/world-underneath", element: <WorldUnderneath /> },
        { path: "lore/world-underneath/:articleLink", element: <WuArticle /> },
        { path: "lore/main-story", element: <MainStory /> },
        { path: "lore/main-story/:articleLink", element: <MsArticle /> },
        { path: "lore/characters", element: <Characters /> },
        { path: "lore/characters/:articleLink", element: <CharacterArticle /> },
        { path: "lore/anecdotes", element: <Anecdotes /> },
        { path: "lore/anecdotes/:articleLink", element: <AnArticle /> },
        {
          path: "calculator",
          element: <Calculator />,
          children: [
            { index: true, element: <Navigate to="showcase" replace /> },
            { path: "showcase", element: <Showcase /> },
            {
              path: "optimizer",
              element: <OptimizerNavigation />,
              children: [
                { index: true, element: <Navigate to="team-optimizer" replace /> },
                { path: "team-optimizer", element: <TeamOptimizer /> },
                { path: "memory-optimizer", element: <MemoryOptimizer /> },
              ],
            },
            { path: "protocore-calculator", element: <ProtocoreCalculator /> },
            { path: "memory-calculator", element: <MemoryUpCalculator /> },
          ],
        },
        { path: "my-account", element: <MyAccount /> },
        { path: "my-account/:navigation", element: <MyAccount /> },
        { path: "about", element: <About /> },
        { path: "faq", element: <FAQ /> },
      ],
    },
  ],
  {
    basename: basename,
  },
);
