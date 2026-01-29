import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

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

  async function handleSubmit(e) {
    e?.preventDefault();
    setError("");
    setBusy(true);
    try {
      await addCard(values);
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
