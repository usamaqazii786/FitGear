import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) return;
  
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };
  
  export default connectDb;