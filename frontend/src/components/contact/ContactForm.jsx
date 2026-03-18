// Contact form for patient inquiries

import { useState } from "react";
import InputField from "../Home/ui/InputField";
import Button from "../Home/ui/Button";

function ContactForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    console.log("Contact form data:", formData);

    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>

      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      {/* Message textarea */}
      <div style={styles.field}>
        <label>Message</label>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={styles.textarea}
        />
      </div>

      <Button text="Send Message" type="submit" />

    </form>
  );
}

const styles = {

  form: {
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "white"
  },

  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px"
  },

  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "100px"
  }

};

export default ContactForm;