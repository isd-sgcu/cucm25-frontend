import { createBrowserRouter, Outlet } from 'react-router-dom'
import JuniorSeniorLanding from './page/juniorsenior/Landing'
import MainLayout from './layout/MainLayout'
import VerifyInformation from './page/auth/VerifyInformation'
import JuniorSeniorLeaderboard from './page/juniorsenior/Leaderboard'
import JuniorSeniorSendingGift from './page/juniorsenior/SendingGift'
import JuniorSeniorHistory from './page/juniorsenior/History'
import ModeratorLanding from "./page/moderator/Landing";
import AuthLanding from "./page/auth/Landing";
import SystemClosed from './page/auth/SystemClosed'
import ModeratorCreateActivity from "./page/moderator/ModeratorCreateActivity";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { path: '', element: <JuniorSeniorLanding /> },
      { path: 'leaderboard', element: <JuniorSeniorLeaderboard /> },
      { path: 'questions', element: <JuniorSeniorSendingGift /> },
      { path: 'history', element: <JuniorSeniorHistory /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "system-closed",
        element: <SystemClosed />
      },
      {
        path: "login",
        element: <AuthLanding />
      },
      {
        path: 'verify-information',
        element: <VerifyInformation />,
      },
    ],
  },
  {
    path: "/moderator",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [{
      path: "",
      element: <ModeratorLanding />,
    },
    {
      path: "create-activity",
      element: <ModeratorCreateActivity />
    }],
  }
]);
