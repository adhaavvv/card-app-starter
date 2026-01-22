import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards } from "../services/api";

export default function EditCard() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [values, setValues] = useState({
    card_name: "",
    card_pic: "",
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  function handleChange(name, value) {
    setValues({ ...values, [name]: value });
  }

  async function loadCard() {
    setError("");
    setLoading(true);

    try {
      const cards = await getCards();

      const found = cards.find((c) => String(c.id) === String(id));

      if (!found) {
        throw new Error("Card not found");
      }

      setValues({
        card_name: found.card_name || "",
        card_pic: found.card_pic || "",
      });
    } catch (err) {
      setError(err.message || "Failed to load card");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCard();
  }, [id]);

  async function handleSubmit() {
    setError("");
    setBusy(true);

    const API_URL =
      process.env.REACT_APP_API_URL || "https://onlinecardwebappservice1.onrender.com/";

    try {
      const res = await fetch(API_URL + "/updatecard/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          card_name: values.card_name,
          card_pic: values.card_pic,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update card");
      }

      navigate("/cards");
    } catch (err) {
      setError(err.message || "Failed to update card");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <main>
        <h1>Edit Card</h1>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Edit Card</h1>

      <CardForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Save Changes"
      />

      <button type="button" onClick={() => navigate("/cards")} disabled={busy}>
        Back to Card List
      </button>
    </main>
  );
}
