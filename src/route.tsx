import { createBrowserRouter, Outlet } from "react-router-dom";
import Chore from "./page/Chore";
import JuniorSeniorLanding from "./page/juniorsenior/Landing";
import App from "./App";
import MainLayout from "./layout/MainLayout";
import ModeratorLanding from "./page/moderator/Landing";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/junior-senior",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [{ path: "", element: <JuniorSeniorLanding /> }],
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
    }],
  },
  { path: "/chore", element: <Chore /> },
]);
