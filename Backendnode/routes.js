import express from "express";
import { userRegister, loginverify } from "./controller.js";
import ProductItem from "./product.shema.js";
import productitemSchema from "./product.shema.js"; // Make sure this path is correct
import { getCart } from "./controller.js";
import { verifyToken } from "./middleware.js";
import { addquntityToCart, removeFromCart } from "./controller.js";
import { removeEntireCartItem } from "./controller.js";
const router = express.Router();

// User routes
router.post("/register", userRegister);
router.post("/login", loginverify);
router.post("/cart/add/:userId",addquntityToCart);
router.post("/cart/remove/:userId", verifyToken, removeFromCart);
router.post("/cart/remove1/:userId", verifyToken, removeEntireCartItem);
router.get("/cart/:userId",verifyToken, getCart);

router.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductItem.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
});



// Product route
router.get("/products", async (req, res) => {
  try {
    const products = await ProductItem.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

export default router;

