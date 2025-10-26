import { createBrowserRouter, Outlet } from "react-router-dom";
import Chore from "./page/Chore";
import JuniorSeniorLanding from "./page/juniorsenior/Landing";
import App from "./App";
import MainLayout from "./layout/MainLayout";
import AuthLanding from "./page/auth/Landing";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/auth",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [{ path: "", element: <AuthLanding /> }],
  },
  {
    path: "/junior-senior",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [{ path: "", element: <JuniorSeniorLanding /> }],
  },
  { path: "/chore", element: <Chore /> },
]);
