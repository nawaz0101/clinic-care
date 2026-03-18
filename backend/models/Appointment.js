//Appointment model
//Stores patient appointment bookings

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        patientName:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required:true
        },
        phone:{
            type: String,
            required: true
        },
        doctor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor"
        },
        date:{
            type:Date,
            required: true
        },
        reason:{
            type:String
        },
        status:{
            type: String,
            enum:["pending", "confirmed","cancelled"],
            default: "pending"
        },
        paymentId: String,

        paymentStatus:{
            type:String,
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Appointment = mongoose.model("Appointment",appointmentSchema);
export default Appointment;