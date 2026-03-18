import { useEffect, useState } from "react";
import api from "../../api/api";

function DoctorsPreview() {

  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");

      // show only first 3 doctors for preview
      setDoctors(res.data.slice(0, 3));

    } catch (error) {
      console.error("Failed to load doctors", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section className="doctors-preview">
      <h2 className="doctors-title">Our Doctors</h2>

      <div className="doctors-grid">

        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p>{doctor.speciality}</p>
            <p>{doctor.experience}Years</p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default DoctorsPreview;