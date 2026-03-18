// About page for clinic website
// Displays information about the clinic, mission, and expertise

import SectionTitle from "../components/Home/ui/SectionTitle";

function About() {
  return (
    <div style={styles.container}>

      {/* Page title */}
      <SectionTitle title="About Our Clinic" />

      {/* Clinic introduction */}
      <section style={styles.section}>
        <p>
          Our clinic is dedicated to providing high-quality medical care
          with experienced doctors and modern healthcare facilities.
          We focus on patient comfort, accurate diagnosis, and
          effective treatment.
        </p>
      </section>

      {/* Mission section */}
      <section style={styles.section}>
        <h3>Our Mission</h3>

        <p>
          Our mission is to deliver reliable and affordable healthcare
          services while maintaining the highest medical standards.
        </p>
      </section>

      {/* Why choose us */}
      <section style={styles.section}>
        <h3>Why Choose Our Clinic</h3>

        <ul style={styles.list}>
          <li>Experienced medical professionals</li>
          <li>Modern medical equipment</li>
          <li>Patient-focused care</li>
          <li>Convenient online appointment system</li>
        </ul>
      </section>

    </div>
  );
}

const styles = {

  container: {
    padding: "40px 20px",
    maxWidth: "900px",
    margin: "auto"
  },

  section: {
    marginBottom: "30px",
    lineHeight: "1.6"
  },

  list: {
    marginTop: "10px",
    paddingLeft: "20px"
  }

};

export default About;