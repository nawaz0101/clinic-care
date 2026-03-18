//Controller for doctor related logic

import Doctor from "../models/Doctor.js";

//Create Doctor
//POST API/doctors

export const createDoctor = async(req,res)=>{
    try{
        const {name, speciality, experience, email, phone, availability} = req.body;

        const doctor = new Doctor({
            name,
            speciality,
            experience,
            email,
            phone,
            availability
        });

        const savedDoctor = await doctor.save();

        res.status(201).json(savedDoctor);
    }catch(error){
        res.status(500).json({
            message: "Error creating doctor",
            error: error.message
        });
    }
};

/* Get All Doctors
Get /api/doctors
*/

export const getDoctors = async(req,res)=>{
    try{
        const doctors = await Doctor.find();
        res.json(doctors);
    }catch(error){
        res.status(500).json({
            message:"Error fetching doctors",
            error:error.message
        });
    }
};

/*
Get single doctor
Get /api/doctor:id
*/

export const getDoctorById = async(req,res)=>{
    try{
        const doctor = await Doctor.findById(req.params.id);

        if(!doctor){
            return res.status(404).json({message:"Doctor not found"});
        }
        res.json(doctor);
    }catch(error){
        res.status(500).json({
            message:"Error fetching doctor",
            error:error.message
        });
    }
}

// Delete doctor
//Delete /api/doctor:id

export const deleteDoctor = async(req,res)=>{
    try{
        const doctor = await Doctor.findByIdAndDelete(req.params.id);

        if(!doctor){
            return res.status(404).json({message:"Doctor not found"});
        }
        res.json({message:"Doctor deleted successfully"});
    }catch(error){
        res.status(500).json({
            message:"Error deleting doctor",
            error:error.message
        });
    }
};

