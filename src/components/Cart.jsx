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

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 mt-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">🛒 Your Cart</h1>

      {cart?.items?.length > 0 ? (
        <ul className="space-y-6">
          {cart.items.map((item, index) => (
            <CartItem
              key={index}
              product={{
                id: item.productId._id,
                title: item.productId.title,
                price: item.productId.price,
                thumbnail: item.productId.thumbnail,
                quantity: item.quantity,
              }}
              fetchCart={fetchCart} // 👈 pass this
            />
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
