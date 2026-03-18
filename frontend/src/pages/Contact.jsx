// Contact page for clinic

import ContactForm from "../components/contact/ContactForm";
import SectionTitle from "../components/Home/ui/SectionTitle";

function Contact() {
  return (
    <div style={styles.container}>

      <SectionTitle title="Contact Us" />

      <div style={styles.grid}>

        {/* Clinic Information */}
        <div>

          <h3>Clinic Information</h3>

          <p><strong>Address:</strong> 123 Health Street, City</p>

          <p><strong>Phone:</strong> +91 9876543210</p>

          <p><strong>Email:</strong> clinic@email.com</p>

          <p><strong>Timings:</strong> Mon - Sat : 9AM - 7PM</p>

          {/* Google Map */}
          <div style={{ marginTop: "20px" }}>
            <iframe
              title="clinic-map"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=bangalore&output=embed"
            ></iframe>
          </div>

        </div>

        {/* Contact Form */}
        <ContactForm />

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "40px 20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px"
  }

};

export default Contact;