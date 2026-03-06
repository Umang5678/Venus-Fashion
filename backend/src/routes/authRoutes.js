import express from "express";
import {
  registerUser,
  loginUser,
  registerAdmin,
  loginAdmin,
  getProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

// Profile
router.get("/profile", protect, getProfile);

export default router;
