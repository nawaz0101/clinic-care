// Services page
// Displays all medical services offered by the clinic

import { useEffect, useState } from "react";
import api from "../api/api";

import ServiceCard from "../components/Home/ui/ServiceCard";
import SectionTitle from "../components/Home/ui/SectionTitle";

function Services() {

  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {

      const res = await api.get("/services");

      setServices(res.data);

    } catch (error) {
      console.error("Failed to load services", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="services-container">

      {/* Page title */}
      <SectionTitle title="Our Services" />

      {/* Services grid */}
      <div className="services-grid">

        {services.length === 0 ? (
          <p>No services available</p>
        ) : (
          services.map((service) => (
            <ServiceCard
              key={service._id}
              title={service.name}
              description={service.description || "Professional medical service provided by our clinic."}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default Services;