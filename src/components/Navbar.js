import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar__brand">Card App</div>
      <nav className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/cards"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Cards
        </NavLink>
        <NavLink
          to="/cards/new"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add Card
        </NavLink>
        {token ? (
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}


// import { NavLink } from "react-router-dom";

// export default function Navbar() {
//   /* TODO: Complete the navbar 
//     - add links to CardList and AddCard pages 
//     - style as a navbar UI */

//     return (
//     <header>
//       <strong>Card App</strong>
//       <nav>
//         <NavLink to="/" end>
//           Home
//         </NavLink>
//         <NavLink to="/cards">
//           Card List
//         </NavLink>
//         <NavLink to="/cards/new">
//           Add Card
//         </NavLink>
//       </nav>
//     </header>
//   );
// }

