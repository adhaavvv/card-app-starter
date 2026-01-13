import { NavLink } from "react-router-dom";

export default function Navbar() {
  /* TODO: Complete the navbar 
    - add links to CardList and AddCard pages 
    - style as a navbar UI */

  return (
    <header>
      <strong>Card App</strong>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
      </nav>
    </header>
  );
}
