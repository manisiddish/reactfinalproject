import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String, // optional: URL to product image
    default: ""
  }
});
const Product = mongoose.model("Product", productSchema); // Capital "P"
export default Product;
