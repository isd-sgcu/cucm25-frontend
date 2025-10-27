import { createBrowserRouter, Outlet } from "react-router-dom";
import Chore from "./page/Chore";
import JuniorSeniorLanding from "./page/juniorsenior/Landing";
import App from "./App";
import MainLayout from "./layout/MainLayout";
import JuniorSeniorLeaderboard from "./page/juniorsenior/Leaderboard";
import { JUNIOR_SENIOR_PATH } from "./utils/const";

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
    ],
  },
  { path: "/chore", element: <Chore /> },
]);
