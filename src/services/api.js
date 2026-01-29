const API_URL = process.env.REACT_APP_API_URL || "";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Helper: handle JSON + show backend error messages
async function handleResponse(res) {
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // not JSON
  }

  if (res.status === 401) {
    // token missing/expired -> force logout
    localStorage.removeItem("token");
  }

  if (!res.ok) {
    throw new Error(data.error || data.message || text || `HTTP ${res.status}`);
  }

  return data;
}

export async function register(credentials) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
}


export async function login(credentials) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res); // returns { token }
}

export async function getCards() {
  const res = await fetch(`${API_URL}/allcards`);
  return handleResponse(res);
}

export async function addCard(card) {
  const res = await fetch(`${API_URL}/addcard`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(card),
  });
  return handleResponse(res);
}

export async function updateCard(id, card) {
  const res = await fetch(`${API_URL}/updatecard/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() }, // ✅ add token
    body: JSON.stringify(card),
  });
  return handleResponse(res);
}

export async function deleteCard(id) {
  const res = await fetch(`${API_URL}/deletecard/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() }, // ✅ add token
  });
  return handleResponse(res);
}