import { useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, sendFormRequest } from "./utils.js";

export default function SignupPage() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const request = await sendFormRequest(e.target, "/users");

    const response = await request.json();

    if (Array.isArray(response)) {
      setSuccess(false);
      return setErrors([...response]);
    }

    setSuccess(true);
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form action="" onSubmit={handleSubmit} method="post">
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" required />
        <label htmlFor="passconfirm">Confirm Password: </label>
        <input type="password" name="passconfirm" id="passconfirm" required />
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" required />
        <button type="submit">Sign Up</button>
      </form>
      {errors.length > 0 && (
        <ul>
          <h3>Errors</h3>
          {errors.map((error) => {
            return <li key={error.msg}>{error.msg}</li>;
          })}
        </ul>
      )}
      {success && (
        <div>
          <h3>User signed up successfully.</h3>
          <Link to={"/login"}>Log In</Link>
        </div>
      )}
    </>
  );
}
