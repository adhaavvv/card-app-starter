export default function CardForm({
  values,
  onChange,
  onSubmit,
  busy,
  error,
  submitText,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    onChange(name, value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="card_name">Card Name:</label>
        <input
          type="text"
          id="card_name"
          name="card_name"
          value={values.card_name || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="card_pic">Card Picture URL:</label>
        <input
          type="text"
          id="card_pic"
          name="card_pic"
          value={values.card_pic || ""}
          onChange={handleChange}
          required
        />
      </div>

      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}

      <button type="submit" disabled={busy}>
        {busy ? "Submitting..." : submitText}
      </button>
    </form>
  );
}