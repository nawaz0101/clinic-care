// Hero section for the home page
// This is the first section which users see when they visit the website

import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Your Health is Our Priority</h1>

        <p className="hero-text">
          Professional medical care from experienced doctors.
          Book your appointment easily online.
        </p>

        {/* CTA Button */}
        <Link to="/appointment">
          <button className="hero-button">Book Appointment</button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;