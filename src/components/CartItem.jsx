import { Link } from "react-router-dom";

function CartItem({ product, fetchCart }) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const handleAdd = async (productId) => {
    await fetch(`http://localhost:8000/cart/add/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    fetchCart();
  };

  const handleRemove = async (productId) => {
    await fetch(`http://localhost:8000/cart/remove/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    fetchCart();
  };

  const handleRemoveItem = async (productId) => {
    const res = await fetch(`http://localhost:8000/cart/remove1/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }), // 👈 same as quantity decrease, but...
    });

    const data = await res.json();
    if (data.cart) {
      const item = data.cart.items.find(i => i.productId._id === productId);
      if (!item || item.quantity <= 1) {
        // this product is now removed
        console.log("Item completely removed.");
      }
    }

    fetchCart(); // update UI
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <Link to={`/ProductDetail/${product.id}`} className="block hover:underline">
        <img src={product.thumbnail} alt={product.title} width={150} className="mx-auto" />
        <p className="mt-2 font-semibold">{product.title}</p>
        <p className="text-gray-600">₹{product.price}</p>
      </Link>

      <div className="flex items-center justify-center mt-3 space-x-2">
        <button
          onClick={() => handleAdd(product.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
        >
          +
        </button>
        <p className="text-lg">{product.quantity}</p>
        <button
          onClick={() => handleRemove(product.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
        >
          -
        </button>
      </div>

      <button
        onClick={() => handleRemoveItem(product.id)}
        className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded"
      >
        🗑 Remove Item
      </button>
    </div>
  );
}

export default CartItem;
