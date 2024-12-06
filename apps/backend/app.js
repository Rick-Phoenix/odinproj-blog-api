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
  createComment,
  deleteComment,
  deletePost,
  getPosts,
  getSinglePost,
  updateComment,
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
app.post("/blog/admin/posts", submitPost);
app.post("/blog/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { text, userId } = req.body;

  const comment = await createComment(text, +postId, +userId);
  res.json(comment);
});

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

app.delete("/blog/admin/posts/:postId", async (req, res) => {
  const post = deletePost(+req.params.postId);
  res.json(post);
});

app.delete("/blog/posts/:postId/comments/:commentId", async (req, res) => {
  const comment = deleteComment(+req.params.commentId);
  res.json(comment);
});

app.put("/blog/admin/posts/:postId", async (req, res) => {
  const { title, text, published } = req.body;
  const post = updatePost(+req.params.postId, title, text, published);
  res.json(post);
});

app.put("/blog/posts/:postId/comments/:commentId", async (req, res) => {
  const { text } = req.body;
  const comment = updateComment(+req.params.commentId, text);

  res.json(comment);
});

app.listen(3000);
