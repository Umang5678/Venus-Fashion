import Product from "../models/Product.js";
import cloudinary from "./../config/cloudinary.js";

// ===============================
// 📦 Add Product (with image upload)
// ===============================
export const addProduct = async (req, res) => {
  try {
    let { name, description, category, price, stock, size, discount, occasion } =
      req.body;
    let images = [];

    if (typeof size === "string") {
      try {
        size = JSON.parse(size);
      } catch {
        try {
          // Loose JS parser to handle single quotes and unquoted keys
          size = Function('"use strict";return (' + size + ')')();
        } catch {
          size = [size];
        }
      }
    }
    if (req.files?.length) {
      console.log("FILES:", req.files);

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push(result.secure_url);
      }
    }

    let occasionParsed = [];
    if (occasion) {
      if (typeof occasion === "string") {
        try {
          occasionParsed = JSON.parse(occasion);
        } catch {
          try {
            occasionParsed = JSON.parse(occasion.replace(/'/g, '"'));
          } catch {
            occasionParsed = [occasion];
          }
        }
      } else if (Array.isArray(occasion)) {
        occasionParsed = occasion;
      }
    }

    console.log("IMAGES:", images);
    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      size,
      occasion: occasionParsed, 
      discount, // ✅ new field
      images,
    });

    res.status(201).json({
      success: true,
      message: "✅ Product added successfully",
      data: product, // ✅ consistent
    });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
};

// Example in Node/Express
export const getProducts = async (req, res) => {
  try {
    const { category, occasion, search, page, limit } = req.query;
    console.log("➡️ BACKEND: getProducts called with query:", { category, occasion, search, page, limit });

    const filter = {};

    if (category) filter.category = category;

    if (occasion) filter.occasion = { $in: [occasion] };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    res.set("Cache-Control", "no-store");

    if (page || limit) {
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 8;
      const skip = (pageNum - 1) * limitNum;

      const total = await Product.countDocuments(filter);
      const products = await Product.find(filter).skip(skip).limit(limitNum);
      console.log(`➡️ BACKEND: Paginated response returning ${products.length} products of ${total} total. pageNum: ${pageNum}, limitNum: ${limitNum}`);

      return res.json({
        success: true,
        data: products,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          pages: Math.ceil(total / limitNum)
        }
      });
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// 🔍 Get Product by ID
// ===============================
// controllers/productController.js
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// ===============================
// ✏️ Update Product
// ===============================
export const updateProduct = async (req, res) => {
  try {
    if (req.body.size && typeof req.body.size === "string") {
      try {
        req.body.size = JSON.parse(req.body.size);
      } catch {
        try {
          // Loose JS parser to handle single quotes and unquoted keys
          req.body.size = Function('"use strict";return (' + req.body.size + ')')();
        } catch {
          req.body.size = [req.body.size];
        }
      }
    }
    if (req.body.occasion && typeof req.body.occasion === "string") {
      try {
        req.body.occasion = JSON.parse(req.body.occasion);
      } catch {
        try {
          req.body.occasion = JSON.parse(req.body.occasion.replace(/'/g, '"'));
        } catch {
          req.body.occasion = [req.body.occasion];
        }
      }
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product: updated });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// ===============================
// ❌ Delete Product
// ===============================
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
