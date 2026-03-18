import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorApi";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="doctors-page">
      <h1 className="page-title">Our Doctors</h1>

      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            {/* Avatar container */}
            <div className="doctor-avatar"></div>

            <div className="doctor-info">
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-specialty">{doctor.speciality}</p>
              <p className="doctor-experience">{doctor.experience} years experience</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;