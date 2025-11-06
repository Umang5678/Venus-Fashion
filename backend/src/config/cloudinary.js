import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config(); // make sure .env loads before anything else

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("✅ Cloudinary connected with:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ exists" : "❌ missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ exists" : "❌ missing",
});

export default cloudinary.v2;
