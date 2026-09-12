import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined.");
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected succesfully")
  } catch (error) {
    console.error("MongoDB connection failed:", error)
  }
};


export default connectDB