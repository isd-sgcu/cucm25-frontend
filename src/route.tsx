import { createBrowserRouter, Outlet } from 'react-router-dom'
import Chore from './page/Chore'
import JuniorSeniorLanding from './page/juniorsenior/Landing'
import App from './App'
import MainLayout from './layout/MainLayout'
import VerifyInformation from './page/auth/VerifyInformation'
import ModeratorCreateActivity from "./page/moderator/ModeratorCreateActivity";

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
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
  {
    path: '/junior-senior',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [{ path: '', element: <JuniorSeniorLanding /> }],
  },
  {
    path: "/moderator",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { path: "create-activity", element: <ModeratorCreateActivity /> },
    ],
  },
  { path: "/chore", element: <Chore /> },
]);
