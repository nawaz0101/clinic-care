import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function AdminServices() {

  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");

  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async (e) => {
    e.preventDefault();

    if (!newService.trim()) return;

    try {

      await api.post("/services", { name: newService });

      setNewService("");

      fetchServices();

    } catch (error) {
      console.error("Failed to add service", error);
    }
  };

  const deleteService = async (id) => {

    const confirmDelete = window.confirm("Delete this service?");

    if (!confirmDelete) return;

    try {

      await api.delete(`/services/${id}`);

      fetchServices();

    } catch (error) {

      console.error("Failed to delete service", error);

    }
  };

  return (
    <div className="admin-dashboard-container">

      <h1 className="dashboard-title">Manage Services</h1>

      {/* Add Service */}

      <form onSubmit={addService} style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Service Name"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button type="submit" className="confirm-btn">
          Add Service
        </button>

      </form>

      {/* Services Table */}

      <div className="table-wrapper">

        <table className="appointments-table">

          <thead>
            <tr>
              <th>Service Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {services.map((service) => (
              <tr key={service._id}>

                <td>{service.name}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteService(service._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <br />

      <button onClick={() => navigate("/admin")}>
        Back to Dashboard
      </button>

    </div>
  );
}

export default AdminServices;