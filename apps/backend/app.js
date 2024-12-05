import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import {
  signUpValidationChain,
  validateLogin,
  checkAuthorization,
  checkAdmin,
  submitPost,
} from "./controllers/controllers.js";
import {
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
} from "./prisma/queries.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  })
);

app.use("/blog", checkAuthorization);
app.use("/blog/admin", checkAdmin);

app.post("/users", signUpValidationChain);
app.post("/login", validateLogin);

app.get("/blog", (req, res) => {
  res.json(req.user);
});

app.get("/blog/posts", async (req, res) => {
  const posts = await getPosts();
  res.json(posts);
});

app.get("/blog/posts/:postId", async (req, res) => {
  const post = await getSinglePost(+req.params.postId);
  res.json(post);
});

app.post("/blog/admin/posts", submitPost);
app.delete("/blog/admin/posts/:postId", async (req, res) => {
  const post = deletePost(+req.params.postId);
  res.json(post);
});
app.put("/blog/admin/posts/:postId", async (req, res) => {
  const { title, text, published } = req.body;
  const post = updatePost(+req.params.postId, title, text, published);
  res.json(post);
});

app.listen(3000);
