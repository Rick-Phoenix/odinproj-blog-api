import { apiUrl } from "./utils.js";

export default function LoginPage() {
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(apiUrl);
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    const request = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await request.json();
    console.log(response);
  }

  return (
    <>
      <h1>Log In</h1>
      <form action="" method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}
