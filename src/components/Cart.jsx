import CartItem from "./CartItem";
import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await fetch(`http://localhost:8000/cart/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCart(data);
      }
    } catch (err) {
      console.error("Cart fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">🛒 Your Shopping Cart</h1>

      {cart?.items?.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {cart.items.map((item, index) => {
            if (!item.productId) return null; // 🔒 Prevent crash if product is null

            return (
              <CartItem
                key={item.productId._id || index}
                product={{
                  id: item.productId._id,
                  title: item.productId.title,
                  price: item.productId.price,
                  thumbnail: item.productId.thumbnail,
                  quantity: item.quantity,
                }}
                fetchCart={fetchCart}
              />
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-600 text-lg">Your cart is empty. Add some items!</p>
      )}
    </div>
  );
}

export default Cart;
