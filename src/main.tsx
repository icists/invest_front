import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import LoginPage from "./pages/LoginPage";
import InvestPage from "./pages/InvestPage";
import MyPage from "./pages/MyPage";
import EventPage from "./pages/EventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <EventPage />,
      },
      {
        path: "/me",
        element: <MyPage />,
      },
      {
        path: "/invest",
        element: <InvestPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
