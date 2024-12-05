import { useNavigate } from "react-router-dom";
import { apiUrl, sendFormRequest } from "./utils.js";
import { useRef } from "react";

export default function NewPostPage() {
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

    await fetch(`${apiUrl}/blog/admin/posts`, {
      method: "POST",
      headers,
      body: JSON.stringify(formObj),
    });

    navigate("/blog");
  }

  return (
    <>
      <h1>Write a new post</h1>
      <form action="" method="post" onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" required />
        <textarea name="text" id="editor" autoFocus required></textarea>
        <div className="buttons">
          <button
            type="button"
            onClick={() => {
              submitPost(false);
            }}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => {
              submitPost(true);
            }}
          >
            Publish
          </button>
        </div>
      </form>
    </>
  );
}
