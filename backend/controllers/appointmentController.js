// Appointment controller
// Handles appointment related business logic

import Appointment from "../models/Appointment.js";

/*
----------------------------------------
Create Appointment
----------------------------------------
POST /api/appointments
*/
export const createAppointment = async (req, res) => {

  try {

    const {
      patientName,
      email,
      phone,
      doctor,
      date,
      reason
    } = req.body;

    const appointment = new Appointment({
      patientName,
      email,
      phone,
      doctor,
      date,
      reason
    });

    const savedAppointment = await appointment.save();

    res.status(201).json(savedAppointment);

  } catch (error) {

    res.status(500).json({
      message: "Error booking appointment",
      error: error.message
    });

  }

};


/*
----------------------------------------
Get All Appointments
----------------------------------------
GET /api/appointments with pagination logic
*/
export const getAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const total = await Appointment.countDocuments();

    const appointments = await Appointment.find()
      .populate("doctor")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      appointments,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalAppointments: total
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message
    });
  }
};


/*
----------------------------------------
Get Single Appointment
----------------------------------------
GET /api/appointments/:id
*/
export const getAppointmentById = async (req, res) => {

  try {

    const appointment = await Appointment
      .findById(req.params.id)
      .populate("doctor");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching appointment",
      error: error.message
    });

  }

};


/*
----------------------------------------
Update Appointment Status
----------------------------------------
PATCH /api/appointments/:id
*/
export const updateAppointmentStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);

  } catch (error) {

    res.status(500).json({
      message: "Error updating appointment",
      error: error.message
    });

  }

};


/*
----------------------------------------
Delete Appointment
----------------------------------------
DELETE /api/appointments/:id
*/
export const deleteAppointment = async (req, res) => {

  try {

    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting appointment",
      error: error.message
    });

  }

};