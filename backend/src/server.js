import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import https from "https";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ CORS setup — allow your Next.js frontend
app.use(
  cors({
    origin: "*", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// ✅ Middleware

// ✅ Connect MongoDB
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Test route
app.get("/", (req, res) => res.send("API running successfully 🚀"));

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // ✅ Keep-alive ping mechanism to prevent sleeping
  const selfUrl = process.env.RENDER_EXTERNAL_URL || process.env.SELF_URL;
  if (selfUrl) {
    console.log(`🚀 Starting keep-alive self-ping for: ${selfUrl}`);
    setInterval(() => {
      const client = selfUrl.startsWith("https") ? https : http;
      client.get(selfUrl, (res) => {
        console.log(`[Keep-Alive] Pinged self at ${selfUrl}. Status: ${res.statusCode}`);
      }).on("error", (err) => {
        console.error(`[Keep-Alive] Error pinging self:`, err.message);
      });
    }, 10 * 60 * 1000); // Ping every 10 minutes
  } else {
    console.log("ℹ️ No RENDER_EXTERNAL_URL or SELF_URL env variables found. Self-ping keep-alive skipped.");
  }
});
console.log("👉 MONGO_URI USED:", process.env.MONGO_URI);
