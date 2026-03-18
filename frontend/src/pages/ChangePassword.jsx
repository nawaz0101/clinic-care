import { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/admin/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Password updated successfully");
    } catch {
      alert("Failed to update password");
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="change-password-title">Change Password</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <input
          type="password"
          className="change-password-input"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          className="change-password-input"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit" className="change-password-button">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;