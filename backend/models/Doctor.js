//Doctor model
//Defines the structure for doctor documents in mongoDB\

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },

        speciality:{
            type: String,
            required: true
        },
        experience:{
            type: Number,
            required: true
        },
        email:{
            type: String,
        },
        phone:{
            type: String
        },
        availability:{
            type:[String], //example: ["Monday","Tuesday"]
            default: []
        }   
    },
    {timestamps: true}
);

//Create model
const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;