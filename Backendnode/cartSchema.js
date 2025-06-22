import mongoose from 'mongoose';

// Schema for individual items in the cart
const cartItemSchema = new mongoose.Schema({
  // Reference to the product being added to the cart
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  // Quantity of the product in the cart
  quantity: { type: Number, required: true, default: 1 }
});

// Schema for the entire cart
const cartSchema = new mongoose.Schema({
  // Reference to the user who owns this cart
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Array of items added to the cart
  items: [cartItemSchema]
});

// Creating the Cart model based on the schema
const Cart = mongoose.model('Cart', cartSchema);

// Exporting the Cart model for use in other parts of the app
export default Cart;
