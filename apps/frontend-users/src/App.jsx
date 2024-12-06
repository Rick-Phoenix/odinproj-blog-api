import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <h1>My super-duper-great blog app</h1>
      <div className="buttons">
        <Link to={"/login"}>
          <button type="button">Log In</button>
        </Link>
        <Link to={"/signup"}>
          <button type="button">Sign Up</button>
        </Link>
      </div>
    </>
  );
}

export default App;
