import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import productitemSchema from "./product.shema.js";
import productRoutes from "./routes.js"; // Make sure path is correct

const app = express();

// ✅ Middleware FIRST
app.use(cors({
  origin: ["http://localhost:5181", "http://localhost:5182"], // ✅ allow both
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(json());

// ✅ THEN register routes
app.use(productRoutes);

// ✅ Function to fetch and save products automatically
const fetchAndSaveProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    const products = data.products.map(p => ({
      title: p.title,
      price: p.price,
      description: p.description,
      stock: p.stock,
      brand: p.brand,
      category: p.category,
      thumbnail: p.thumbnail
    }));

    const count = await productitemSchema.countDocuments();
    if (count === 0) {
      await productitemSchema.insertMany(products);
      console.log("✅ Products fetched and saved to MongoDB");
    } else {
      console.log("⚠️ Products already exist, skipping import");
    }

  } catch (error) {
    console.error("❌ Error importing products:", error.message);
  }
};

// ✅ Connect to MongoDB and auto-fetch products
mongoose.connect("mongodb+srv://manisiddish:Asdf090807@cluster0.2msgkzq.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  fetchAndSaveProducts();
})
.catch((e) => {
  console.error("❌ Connection failed:", e.message);
});

// ✅ Start server
app.listen(8000, () => {
  console.log("🚀 Server is running on port 8000");
});
