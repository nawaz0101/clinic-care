import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function AdminDoctors() {

  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    speciality: "",
    experience: "",
    email: "",
    phone: "",
    availability: ""
  });

  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addDoctor = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        ...form,
        availability: form.availability
          ? form.availability.split(",").map(day => day.trim())
          : []
      };

      await api.post("/doctors", payload);

      setForm({
        name: "",
        speciality: "",
        experience: "",
        email: "",
        phone: "",
        availability: ""
      });

      fetchDoctors();

    } catch (error) {
      console.error("Error adding doctor", error);
    }
  };

  const deleteDoctor = async (id) => {

    const confirmDelete = window.confirm("Delete this doctor?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor", error);
    }
  };

  return (
    <div className="admin-dashboard-container">

      <h1>Manage Doctors</h1>

      {/* Add Doctor Form */}

      <form onSubmit={addDoctor} style={{marginBottom:"20px"}}>

        <input
          name="name"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="speciality"
          placeholder="Speciality"
          value={form.speciality}
          onChange={handleChange}
          required
        />

        <input
          name="experience"
          placeholder="Experience (years)"
          value={form.experience}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="availability"
          placeholder="Availability (Mon,Tue,Wed)"
          value={form.availability}
          onChange={handleChange}
        />

        <button type="submit">Add Doctor</button>

      </form>


      {/* Doctors Table */}

      <table className="appointments-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Speciality</th>
            <th>Experience</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {doctors.map((doctor) => (

            <tr key={doctor._id}>

              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>{doctor.experience} yrs</td>
              <td>{doctor.availability?.join(", ")}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteDoctor(doctor._id)}
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <br />

      <button onClick={() => navigate("/admin")}>
        Back to Dashboard
      </button>

    </div>
  );
}

export default AdminDoctors;