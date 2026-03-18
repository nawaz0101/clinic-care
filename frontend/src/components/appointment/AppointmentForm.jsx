// Appointment booking form
// This component collects patient information for scheduling appointments

import { useState } from "react";
import InputField from "../Home/ui/InputField";
import Button from "../Home/ui/Button";

function AppointmentForm() {

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    reason: ""
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

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    // For now we just log the data
    console.log("Appointment Data:", formData);

    alert("Appointment request submitted!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      reason: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>

      <InputField
        label="Patient Name"
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

      <InputField
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <InputField
        label="Appointment Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      {/* Reason text area */}
      <div style={styles.field}>
        <label>Reason for Visit</label>

        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          style={styles.textarea}
        />
      </div>

      <Button text="Submit Appointment" type="submit" />

    </form>
  );
}

const styles = {
  form: {
    maxWidth: "500px",
    margin: "auto",
    padding: "30px",
    background: "white",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },

  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px"
  },

  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  }
};

export default AppointmentForm;