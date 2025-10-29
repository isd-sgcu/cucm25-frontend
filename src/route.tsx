import { createBrowserRouter, Outlet } from "react-router-dom";
import Chore from "./page/Chore";
import JuniorSeniorLanding from "./page/juniorsenior/Landing";
import App from "./App";
import MainLayout from "./layout/MainLayout";
import VerifyInformation from "./page/auth/VerifyInformation";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "auth",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "verify-information",
        element: <VerifyInformation />
      }
    ],
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
