import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {

  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await getCards();
      setCards(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(card) {
    setBusy(true);
    try {
      await deleteCard(card.id);
      setCards(cards.filter((c) => c.id !== card.id));
    } catch (error) {
      setError(error.message)
    } finally {
      setBusy(false);
    }
  }

  return (
  <main>
    <h1>Card List</h1>
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDelete={handleDelete}
          disabled={busy}
        />
      ))}
    </div>
  </main>);
}
