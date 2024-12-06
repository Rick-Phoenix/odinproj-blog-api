import { useState } from "react";
import { apiUrl } from "./utils.js";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return setError(responseData);
    }

    localStorage.setItem("JWT", responseData.token);
    navigate("/blog");
  }

  return (
    <>
      <h1>Log In</h1>
      <form action="" method="post" onSubmit={handleLogin}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Log In</button>
      </form>
      {error && <h3>{error}</h3>}
    </>
  );
}
