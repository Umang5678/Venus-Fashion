import Order from "../models/Order.model.js";

// 🧾 Create New Order
export const createOrder = async (req, res) => {
  try {
    console.log("📦 Received order:", req.body);
    const order = new Order(req.body);
    await order.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 👤 Get Orders for a User
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🧑‍💼 Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔄 Update Order Status
export const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      order: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
