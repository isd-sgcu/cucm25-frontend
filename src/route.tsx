import { createBrowserRouter, Outlet } from "react-router-dom";
import Chore from "./page/Chore";
import JuniorSeniorLanding from "./page/juniorsenior/Landing";
import App from "./App";
import MainLayout from "./layout/MainLayout";
import JuniorSeniorLeaderboard from "./page/juniorsenior/Leaderboard";
import { JUNIOR_SENIOR_PATH } from "./utils/const";
import JuniorSeniorSendingGift from "./page/juniorsenior/SendingGift";
import JuniorSeniorHistory from "./page/juniorsenior/History";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: JUNIOR_SENIOR_PATH,
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { path: "", element: <JuniorSeniorLanding /> },
      { path: "leaderboard", element: <JuniorSeniorLeaderboard /> },
      { path: "questions", element: <JuniorSeniorSendingGift /> },
      { path: "history", element: <JuniorSeniorHistory /> },
    ],
  },
  { path: "/chore", element: <Chore /> },
]);
