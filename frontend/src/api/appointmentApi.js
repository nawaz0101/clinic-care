//Appointment API functions

import api from "./api";

//Create appointment

export const createAppointment = async(appointmentData)=>{
    const response = await api.post("/appointments",appointmentData);
    return response.data;
};

