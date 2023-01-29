import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Play
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/stats" className="nav-link">
            Stats
          </Link>
        </li>
        <li className="nav-item" id="nav-item-last">
          <Link to="/settings" className="nav-link">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
