import mongoose from "mongoose";

const connectDB = async () => {
   console.log("MONGO_URL exists:", !!process.env.MONGO_URL);
  
  try {
    console.log("MONGO_URL:", process.env.MONGO_URL ? "FOUND" : "MISSING");
    await mongoose.connect(process.env.MONGO_URL);

    console.log("DB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:",error.message);
    throw error;
  }
  
};
export default connectDB;
