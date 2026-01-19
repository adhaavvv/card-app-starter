import { Link } from "react-router-dom";

export default function Home() {
    /* TODO: Design and complete the Home page
    - display instructions
    - link to Cards page
    - style as a landing page */

  return (
    <main>
      <h1>Welcome to Card App by cmi</h1>
      
      <section>
        <h2>Instructions:</h2>
        <ol>
          <li>Go to "Card List" to view all your cards</li>
          <li>Go to "Add Card" to create new cards</li>
          <li>Use the navbar to navigate between pages</li>
        </ol>
      </section>
      
      <section>
        <h2>Quick Links:</h2>
        <div>
          <Link to="/cards">
            <button>View Card List</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
