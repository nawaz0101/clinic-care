//Routes related to doctor APIs

import express from "express";

import {
    createDoctor,
    getDoctors,
    getDoctorById,
    deleteDoctor
}from "../controllers/doctorController.js";

const router = express.Router();

/* Doctor API routes*/

router.post("/", createDoctor);
router.get("/",getDoctors);
router.get("/:id",getDoctorById);
router.delete("/:id",deleteDoctor);

export default router;