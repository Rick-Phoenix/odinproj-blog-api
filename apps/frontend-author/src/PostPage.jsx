import { useNavigate, useParams } from "react-router-dom";
import { apiUrl, formatDate, useFetch } from "./utils.js";

export default function PostPage() {
  const { postId } = useParams();
  const post = useFetch(`/blog/posts/${postId}`);
  const navigate = useNavigate();

  function handleEdit() {
    navigate(`/edit/${postId}`);
  }

  async function handleDelete() {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) return;

    const token = localStorage.getItem("JWT");

    const response = await fetch(`${apiUrl}/blog/admin/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate("/blog");
  }

  return (
    <>
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <p>{post.text}</p>
          <p>
            {post.published ? "Published" : "Created"} on:{" "}
            {formatDate(new Date(post.createdAt))}
          </p>
          <p>Last updated on: {formatDate(new Date(post.updatedAt))}</p>
          <div className="buttons">
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
