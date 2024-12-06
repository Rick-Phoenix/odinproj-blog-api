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
      <h1>Home sweet home, {user.username}</h1>
      <div className="buttons">
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
        <Link to={"/write"}>
          <button type="button">Create post</button>
        </Link>
      </div>

      {posts !== null ? (
        <ul className="postsGallery">
          {posts.map((post) => {
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
