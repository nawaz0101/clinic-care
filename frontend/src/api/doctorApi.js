//doctor api functions

import api from "./api";

//fetch all doctors

export const getDoctors = async()=>{
    const response = await api.get("/doctors");
    return response.data;
};

