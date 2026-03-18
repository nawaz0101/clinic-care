import { useEffect, useState } from "react";
import api from "../../api/api";

function ServicesPreview() {

  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {

      const res = await api.get("/services");

      setServices(res.data.slice(0,4));

    } catch (error) {
      console.error("Failed to load services", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section className="services-preview">
      <h2 className="services-title">Our Services</h2>

      <div className="services-preview-grid">

        {services.map((service) => (
          <div key={service._id} className="services-preview-card">
            <h3>{service.name}</h3>
          </div>
        ))}

      </div>
    </section>
  );
}

export default ServicesPreview;