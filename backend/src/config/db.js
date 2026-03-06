import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers(["1.1.1.1"]);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB error:", err.message);
  }
};

export default connectDB;
