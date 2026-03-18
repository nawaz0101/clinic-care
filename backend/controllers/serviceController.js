import Service from "../models/Services.js";

// Create Service
export const createService = async (req,res)=>{
  try{

    const { name } = req.body;

    const service = new Service({ name });

    const savedService = await service.save();

    res.status(201).json(savedService);

  }catch(error){

    res.status(500).json({
      message:"Error creating service",
      error:error.message
    });

  }
};

// Get all services
export const getServices = async (req,res)=>{
  try{

    const services = await Service.find();

    res.json(services);

  }catch(error){

    res.status(500).json({
      message:"Error fetching services",
      error:error.message
    });

  }
};

// Delete service
export const deleteService = async (req,res)=>{
  try{

    const service = await Service.findByIdAndDelete(req.params.id);

    if(!service){
      return res.status(404).json({message:"Service not found"});
    }

    res.json({message:"Service deleted successfully"});

  }catch(error){

    res.status(500).json({
      message:"Error deleting service",
      error:error.message
    });

  }
};