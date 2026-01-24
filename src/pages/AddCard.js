import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";

export default function AddCard() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    card_name: "",
    card_pic: "",
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function handleChange(name, value) {
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit() {
    setError("");
    setBusy(true);

    const API_URL =
      process.env.REACT_APP_API_URL || "https://onlinecardwebappservice1.onrender.com";

    try {
      const res = await fetch(API_URL + "/addcard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          card_name: values.card_name,
          card_pic: values.card_pic,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add card");
      }

      navigate("/cards");
    } catch (err) {
      setError(err.message || "Failed to add card");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <h1>Add Card</h1>

      <CardForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Add Card"
      />

      <button type="button" onClick={() => navigate("/cards")} disabled={busy}>
        Back to Card List
      </button>
    </main>
  );
}
