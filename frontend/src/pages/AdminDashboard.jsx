import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [stats, setStats] = useState({
    totalAppointments: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });

  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  //Function to fetch stats

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  // Fetch and sort appointments
  const fetchAppointments = async () => {
    try {
      const response = await api.get(`/appointments?page=${page}&limit=10`);

      setAppointments(response.data.appointments);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchStats();
    fetchServices();
  }, [page]);

  // Filter appointments
  useEffect(() => {
    let filtered = [...appointments];

    if (search) {
      filtered = filtered.filter((appointment) =>
        appointment.patientName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === statusFilter,
      );
    }

    setFilteredAppointments(filtered);
  }, [appointments, search, statusFilter]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/appointments/${id}`, { status });

      fetchAppointments();
      fetchStats();
    } catch (error) {
      console.error("Failed to update appointment", error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);

      fetchAppointments();
      fetchStats();
    } catch (error) {
      console.error("Failed to delete appointment", error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  if (loading) {
    return <h2 className="loading-text">Loading appointments...</h2>;
  }

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

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total</h3>
          <p>{stats.totalAppointments}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="stat-card">
          <h3>Confirmed</h3>
          <p>{stats.confirmed}</p>
        </div>

        <div className="stat-card">
          <h3>Cancelled</h3>
          <p>{stats.cancelled}</p>
        </div>
      </div>

      <h3 className="section-title">Manage Appointments</h3>

      {/* Search + Filter */}
      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Email</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No appointments found
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.doctor?.name}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>

                  <td className={`status ${appointment.status}`}>
                    {appointment.status}
                  </td>

                  <td className="actions">
                    <button
                      className="confirm-btn"
                      onClick={() => updateStatus(appointment._id, "confirmed")}
                    >
                      Confirm
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() => updateStatus(appointment._id, "cancelled")}
                    >
                      Cancel
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteAppointment(appointment._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <div className="admin-links">
  <a href="/change-password" className="admin-link">
    Change Password
  </a>
  <a href="/admin-doctors" className="admin-link">
    Manage Doctors
  </a>
  <a href="/admin-services" className="admin-link">
    Manage Services
  </a>
</div>

    </div>
  );
}

export default AdminDashboard;
