import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.js";

export const loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};

//Dashboard statisticts

export const getDashboardStats = async (req, res) => {
  try {

    const totalAppointments = await Appointment.countDocuments();

    const pending = await Appointment.countDocuments({ status: "pending" });

    const confirmed = await Appointment.countDocuments({ status: "confirmed" });

    const cancelled = await Appointment.countDocuments({ status: "cancelled" });

    res.json({
      totalAppointments,
      pending,
      confirmed,
      cancelled
    });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }
};

//Change password API

export const changePassword = async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin.id);

    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};