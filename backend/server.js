//Main backend server

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoute.js"
import paymentRoutes from "./routes/paymentRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

//Load environment variables

//connect Database
connectDB();

//Create express app
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//API routes--------------------------------//

app.use("/api/doctors",doctorRoutes)
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/services",serviceRoutes);

//Test route
app.get("/", (req,res)=>{
    res.send("Clinic API is running...");
});

//Define server port
const PORT = process.env.PORT || 5000;


//Start server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
