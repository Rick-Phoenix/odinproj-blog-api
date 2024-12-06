import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <h1>My super-duper-great blog app</h1>
      <h2>Blog Author Control Panel</h2>
      <div className="buttons">
        <Link to={"/login"}>
          <button type="button">Log In</button>
        </Link>
      </div>
    </>
  );
}

export default App;
