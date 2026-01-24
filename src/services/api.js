/**
 * API Service (Create React App)
 *
 * 1) Create `.env` at project root
 * 2) Set: REACT_APP_API_URL=https://YOUR-BACKEND.onrender.com
 * 3) Restart `npm start`
 */
const API_URL = process.env.REACT_APP_API_URL || "";

/**
 * TODO: If your backend routes differ, update the paths here.
 * Required endpoints:
 * - GET    /allcards
 * - POST   /addcard
 * - PUT    /updatecard/:id
 * - DELETE /deletecard/:id
 */

export async function getCards() {
  // GET /allcards (provided as reference)
  const res = await fetch(`${API_URL}/allcards`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function addCard(card) {
  try {
    const response = await fetch("/addcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_name: card.card_name,
        card_pic: card.card_pic,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add card");
    }

    return data; // success message from backend
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
}


export async function updateCard(id, card) {
  try {
    const response = await fetch(`/updatecard/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_name: card.card_name,
        card_pic: card.card_pic,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update card");
    }

    return data; // success message from backend
  } catch (error) {
    console.error("Error updating card:", error);
    throw error;
  }
}

export async function deleteCard(id) {
  try {
    const response = await fetch(`/deletecard/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete card");
    }

    return data; // success message from backend
  } catch (error) { 
    console.error("Error deleting card:", error);
    throw error;
  }
}
