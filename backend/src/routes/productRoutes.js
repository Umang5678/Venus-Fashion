// import express from "express";
// import {
//   addProduct,
//   getProducts,
//   getProductById,
//   deleteProduct,
// } from "../controllers/productController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Admin routes (protected)
// router.post("/", protect, addProduct);
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.delete("/:id", protect, deleteProduct);

// export default router;

// import express from "express";
// import upload from "../middleware/upload.js";
// import {
//   addProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/productController.js";

// const router = express.Router();

// router.post("/", upload.array("images", 5), addProduct);
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.put("/:id", upload.array("images", 5), updateProduct);
// router.delete("/:id", deleteProduct);

// export default router;

import express from "express";
import upload from "../middleware/upload.js";
import {
  addProduct,
  getProducts,
  getProductById,
  // updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ Add product with image upload
router.post("/", upload.array("images", 5), addProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
