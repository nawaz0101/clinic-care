import express from "express";
import {getDashboardStats, loginAdmin} from "../controllers/adminController.js"
import authMiddleware from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login",loginAdmin);
router.put("/change-password",authMiddleware,changePassword);
router.get("/stats", authMiddleware, getDashboardStats);

export default router;