import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu open/close on mobile
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        Prime Care Clinic
      </Link>

      {/* Hamburger icon */}
      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/doctors" onClick={() => setMenuOpen(false)}>Doctors</Link>
        </li>
        <li>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        </li>
        <li>
          <Link to="/appointment" onClick={() => setMenuOpen(false)}>Appointment</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;