import { useFetch } from "./utils.js";
import { Link, useNavigate } from "react-router-dom";

export default function BlogHomepage() {
  const navigate = useNavigate();
  const user = useFetch("/blog");
  const posts = useFetch("/blog/posts");

  function handleLogout() {
    localStorage.removeItem("JWT");
    navigate("/");
  }

  if (!user) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Super Duper Great Blog {user.username}</h1>
      <div className="buttons">
        <span>
          Currently logged in as <b>{user.username}</b>
        </span>
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {posts !== null ? (
        <ul className="postsGallery">
          {posts.map((post) => {
            if (post.published)
              return (
                <li key={post.id}>
                  <Link to={`/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                    <p>{post.text}</p>
                  </Link>
                </li>
              );
          })}
        </ul>
      ) : (
        <h3>
          There are no posts yet. Click the button above to make a new one!
        </h3>
      )}
    </>
  );
}
