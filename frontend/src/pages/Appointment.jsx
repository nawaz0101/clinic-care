import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorApi";
import axios from "axios";

function Appointment() {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    reason: ""
  });

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to load doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle input changes
  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  // Validate form before payment
  const validateForm = () => {

    if (
      !formData.patientName ||
      !formData.email ||
      !formData.phone ||
      !formData.doctor ||
      !formData.date
    ) {
      return "Please fill all required fields";
    }

    if (formData.phone.length < 10) {
      return "Phone number must be at least 10 digits";
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();

    selectedDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    if (selectedDate < today) {
      return "Appointment date cannot be in the past";
    }

    return null;
  };



  // MAIN PAYMENT FUNCTION
  const handlePayment = async (event) => {

    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {

      setLoading(true);

      // STEP 1: Create order from backend
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order"
      );

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency,

        name: "Clinic Appointment",

        description: "Doctor Consultation Fee",

        order_id: data.id,


        // STEP 2: Payment success handler
        handler: async function (response) {

          try {

            // STEP 3: Verify payment + create appointment
            const verifyResponse = await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              {
                ...response,
                appointmentData: formData
              }
            );

            if (verifyResponse.data.success) {

              setSuccessMessage(
                "Payment successful! Appointment booked."
              );

              setFormData({
                patientName: "",
                email: "",
                phone: "",
                doctor: "",
                date: "",
                reason: ""
              });

            }

          } catch (error) {

            console.error(error);

            setErrorMessage(
              "Payment verification failed. Please contact support."
            );

          }

        },

         modal: {
    ondismiss: function () {

      alert("Payment cancelled. Appointment not booked.");

    }
  }


      };


      // STEP 4: Open Razorpay popup
      const razor = new window.Razorpay(options);

      razor.open();

razor.on("payment.failed", function (response) {

  console.error("Payment Failed:", response.error);

  alert("Payment failed. Please try again.");

});

razor.open();

    } catch (error) {

      console.error("Payment error:", error);

      setErrorMessage("Payment initialization failed");

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="appointment-container">

      <h2 className="appointment-title">
        Book Appointment
      </h2>

      {successMessage && (
        <div className="message success">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="message error">
          {errorMessage}
        </div>
      )}

      <form className="appointment-form">

        <input
          name="patientName"
          className="form-input"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          className="form-input"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          className="form-input"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="doctor"
          className="form-input"
          value={formData.doctor}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>

          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name} — {doctor.speciality}
            </option>
          ))}

        </select>

        <input
          type="date"
          name="date"
          className="form-input"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          className="form-textarea"
          placeholder="Reason for visit (optional)"
          value={formData.reason}
          onChange={handleChange}
        />

        <button
          className="submit-button"
          disabled={loading}
          onClick={handlePayment}
        >
          {loading
            ? "Processing Payment..."
            : "Pay ₹100 & Book Appointment"}
        </button>

      </form>

    </div>
  );

}

export default Appointment;