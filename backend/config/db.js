//MongoDB connection configuration

import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        //connect to MongoDB using environmental variable
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MOngoDB Connected");
    }catch(error){
        console.error("MongoDB Connection failed:",error.message);
        process.exit(1);
    }
};

export default connectDB;