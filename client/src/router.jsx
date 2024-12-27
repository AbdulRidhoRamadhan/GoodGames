import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddGame from "./pages/AddGame";
import UpdateGame from "./pages/UpdateGame";
import Popular from "./pages/Popular";
import Chatbot from "./pages/ChatBot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader() {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/games/:id",
        element: <Detail />,
      },
      {
        path: "/create",
        element: <AddGame />,
      },
      {
        path: "/update/:id",
        element: <UpdateGame />,
      },
      {
        path: "/popular",
        element: <Popular />,
      },
      {
        path: "/chatbot",
        element: <Chatbot />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    loader() {
      if (localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader() {
      if (localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
  },
]);

export default router;
