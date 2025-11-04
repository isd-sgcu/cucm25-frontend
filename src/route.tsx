import { createBrowserRouter, Outlet } from 'react-router-dom'
import JuniorSeniorLanding from './page/juniorsenior/Landing'
import MainLayout from './layout/MainLayout'
import VerifyInformation from './page/auth/VerifyInformation'
import JuniorSeniorLeaderboard from './page/juniorsenior/Leaderboard'
import JuniorSeniorSendingGift from './page/juniorsenior/SendingGift'
import JuniorSeniorHistory from './page/juniorsenior/History'
import AuthLanding from "./page/auth/Landing";

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
  { path: '/', element: <App /> },
  {
    path: "/auth",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "login",
        element: <AuthLanding />
      }
    ],
  },
  {
    path: 'auth',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: 'verify-information',
        element: <VerifyInformation />,
      },
    ],
  },
])
