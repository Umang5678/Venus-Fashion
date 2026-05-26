import express from "express";
import Order from "../models/Order.model.js";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/all", getAllOrders);
router.put("/update/:id", updateOrder);
router.get("/track/:query", async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const orders = await Order.find({
      $or: [
        { phone: searchQuery },
        { email: searchQuery },
      ],
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
export default router;
