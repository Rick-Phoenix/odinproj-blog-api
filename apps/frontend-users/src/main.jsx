import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx";
import BlogHomepage from "./BlogHomepage.jsx";
import Error from "./Error.jsx";
import PostPage from "./PostPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/blog",
    element: <BlogHomepage />,
  },
  { path: "/error/:errCode", element: <Error /> },
  { path: "/posts/:postId", element: <PostPage /> },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
