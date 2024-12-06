import { useNavigate, useParams } from "react-router-dom";
import { apiUrl, useFetch } from "./utils.js";
import { useRef } from "react";

export default function EditPost() {
  const { postId } = useParams();
  const post = useFetch(`/blog/posts/${postId}`);
  const navigate = useNavigate();

  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function submitPost(bool) {
    const formData = new FormData(formRef.current);
    const formObj = {
      ...Object.fromEntries(formData.entries()),
      published: bool,
    };

    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem("JWT");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    await fetch(`${apiUrl}/blog/admin/posts/${postId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(formObj),
    });

    navigate("/blog");
  }

  if (!post) return <h1>Loading...</h1>;

  return (
    <>
      <form action="" onSubmit={handleSubmit} ref={formRef}>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={post.title}
        />
        <textarea
          name="text"
          id="text"
          required
          defaultValue={post.text}
          autoFocus
        ></textarea>
        <button
          type="button"
          onClick={() => {
            submitPost(false);
          }}
        >
          {post.published ? "Save As Unpublished" : "Save draft"}
        </button>
        <button
          type="button"
          onClick={() => {
            submitPost(true);
          }}
        >
          {post.published ? "Save" : "Publish"}
        </button>
      </form>
    </>
  );
}
