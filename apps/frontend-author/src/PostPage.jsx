import { useNavigate, useParams } from "react-router-dom";
import { apiUrl, formatDate, sendFormRequest, useFetch } from "./utils.js";
import { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";

export default function PostPage() {
  const { postId } = useParams();
  const post = useFetch(`/blog/posts/${postId}`);
  const user = useFetch("/blog");
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    if (post) setComments([...post.comments]);
  }, [post]);

  function handleEdit() {
    navigate(`/edit/${postId}`);
  }

  async function handleNewComment(e) {
    e.preventDefault();

    const response = await sendFormRequest(
      e.target,
      `/blog/posts/${postId}/comments`
    );

    const newComment = await response.json();
    setComments([...comments, newComment]);
    e.target.reset();
  }

  async function deleteComment(commentId) {
    const conf = window.confirm("Are you sure?");
    if (!conf) return;
    const token = localStorage.getItem("JWT");

    const response = await fetch(
      `${apiUrl}/blog/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComments([...comments.filter((comment) => comment.id !== commentId)]);
  }

  async function editComment(e, commentId) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());

    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem("JWT");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    await fetch(`${apiUrl}/blog/posts/${postId}/comments/${commentId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(formObj),
    });

    setComments((previousComments) => {
      const updatedComments = previousComments.map((comment) =>
        comment.id === commentId ? { ...comment, text: formObj.text } : comment
      );

      return updatedComments;
    });
    setEditingCommentId(null);
  }

  async function handleDeletePost() {
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
            <button type="button" onClick={handleDeletePost}>
              Delete
            </button>
          </div>
          {comments.length === 0 ? (
            <h3>No comments have been published yet.</h3>
          ) : (
            <ul className="commentsList">
              {comments.map((comment) => {
                return (
                  <li key={comment.id}>
                    {editingCommentId !== comment.id ? (
                      <>
                        {" "}
                        {comment.user.username}: {comment.text}{" "}
                        <button
                          type="button"
                          onClick={() => {
                            deleteComment(comment.id);
                          }}
                        >
                          <BsX />
                        </button>
                        {comment.userId === user.userId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCommentId(comment.id);
                            }}
                          >
                            {" "}
                            <BsPencil />{" "}
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {" "}
                        <form
                          action=""
                          onSubmit={(e) => {
                            editComment(e, comment.id);
                          }}
                        >
                          <input
                            type="text"
                            defaultValue={comment.text}
                            name="text"
                            required
                          />{" "}
                          <button type="submit">
                            <BsCheck />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCommentId(null);
                            }}
                          >
                            {" "}
                            <BsX />{" "}
                          </button>
                        </form>{" "}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <form action="" onSubmit={handleNewComment}>
            <input
              type="text"
              name="text"
              id="comment"
              placeholder="Add a comment..."
              required
            />
            <input type="hidden" name="userId" value={"1"} />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
