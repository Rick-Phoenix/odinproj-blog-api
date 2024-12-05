import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./LoginPage.jsx";
import SignupPage from "./SignupPage.jsx";
import BlogHomepage from "./BlogHomepage.jsx";
import Error from "./Error.jsx";
import NewPostPage from "./NewPostPage.jsx";
import PostPage from "./PostPage.jsx";
import EditPost from "./EditPost.jsx";

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
  { path: "/write", element: <NewPostPage /> },
  { path: "/posts/:postId", element: <PostPage /> },
  { path: "/edit/:postId", element: <EditPost /> },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
