//Routes for appointment APIs

import express from "express";

import {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    deleteAppointment
} from "../controllers/appointmentController.js";

const router = express.Router();

//Appointment routes

router.post("/", createAppointment);

router.get("/",getAppointments);

router.get("/:id", getAppointmentById);

router.patch("/:id", updateAppointmentStatus);

router.delete("/:id", deleteAppointment);

export default router;