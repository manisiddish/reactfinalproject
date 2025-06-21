import userDataModel from "./model.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Cart from "./cartSchema.js";
import Product from "./product.shema.js"; // adjust path if needed


export const userRegister = async (req, res) => {
  const { FullName, Email, Password } = req.body;

  try {
    const alreadyUser = await userDataModel.findOne({ email:Email });

    if (alreadyUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const data = new userDataModel({
      fullName: FullName,
      email: Email,
      password: hashedPassword
    });

    await data.save(); 

    res.status(200).json({ message: "Registration done" });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const loginverify = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password, trimmedEmail: email.trim() });

  try {
    const user = await userDataModel.findOne({ email: email.trim() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "manisiddish",
      { expiresIn: '1h' }
    );

    // ✅ Send _id back
    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/cart/add

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
    console.log("Incoming cart request:", { userId, productId }); // 👈 add this

  if (!userId || !productId) {
    return res.status(400).json({ message: "userId and productId are required" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};
// Example: controller function


export const getCart = async (req, res) => {
  const { userId } = req.params;

  console.log("🧪 Fetching cart for userId:", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("❌ Invalid userId format");
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      console.warn("⚠️ No cart found");
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log("✅ Cart fetched:", cart);
    res.status(200).json(cart);
  } catch (error) {
    console.error("❌ Error in getCart:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /cart/add/:userId
export async function addquntityToCart(req, res) {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
 

// POST /cart/remove/:userId
export async function removeFromCart(req, res) {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1); // remove the item
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
  
export const removeEntireCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove the item completely
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
