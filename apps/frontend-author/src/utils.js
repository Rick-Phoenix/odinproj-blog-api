import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const apiUrl = import.meta.env.VITE_API_URL;

export function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export function useFetch(route) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("JWT");
      const response = await fetch(`${apiUrl}${route}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return navigate(`/error/${response.status}`);
      const responseData = await response.json();
      if (Array.isArray(responseData)) return setData([...responseData]);
      setData({ ...responseData });
    };

    fetchData();
  }, [route, navigate]);

  return data;
}

export async function sendFormRequest(form, url) {
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("JWT");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${apiUrl}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return response;
}
