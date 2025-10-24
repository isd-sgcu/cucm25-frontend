import { createBrowserRouter } from "react-router-dom";
import Chore from "./page/Chore";
import JuniorSeniorLanding from "./page/juniorsenior/Landing";
import App from "./App";
import MainLayout from "./layout/MainLayout";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/junior-senior",
    element: <MainLayout />,
    children: [
      { path: "", element: <JuniorSeniorLanding /> },
      { path: "*", element: <div>404 – Page Not Found</div> },
    ],
  },
  { path: "/chore", element: <Chore /> },
]);
