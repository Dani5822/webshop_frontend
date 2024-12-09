// src/api.ts
const API_URL = "http://localhost:3000/auth";

export const register = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return response.json();
};

export const fetchProducts = async (page: number, limit: number) => {
  const response = await fetch(`http://localhost:3000/products`, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page, limit }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

