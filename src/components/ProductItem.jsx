import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    console.log("userId from localStorage:", userId);

    if (!userId) {
      alert("Please login first to add items to your cart.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/cart/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      if (!response.ok) {
        const text = await response.text(); // Read plain text if JSON fails
        console.error("Cart error (non-JSON):", text);
        alert("Failed to add item to cart.");
        return;
      }

      const data = await response.json();
      console.log("✅ Cart response:", data);
      alert("Item added to your cart!");
    } catch (error) {
      console.error("Cart request failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  console.log(product.thumbnail)

  return (
    <div className="w-60 bg-white border rounded-xl shadow-md hover:shadow-lg p-4 transition-shadow duration-200">
      <Link to={`/ProductDetail/${product._id}`} className="block hover:underline">
        <img src="https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp" alt={product.title} className="w-full h-36 object-cover rounded-lg" />
        <h3 className="mt-3 text-md font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-gray-600">₹{product.price}</p>
      </Link>
      <button
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;
