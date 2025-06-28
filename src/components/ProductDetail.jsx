import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product details");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAdd = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to the cart.");
      return;
    }

    fetch("http://localhost:8000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: product._id, quantity: 1 }),
    })
      .then((res) => res.json())
      .then(() => alert("✅ Item added to cart!"))
      .catch((err) => {
        console.error("Add to cart error:", err);
        alert("❌ Failed to add item to cart.");
      });
  };

  if (loading) return <p className="mt-20 text-center text-lg">⏳ Loading product details...</p>;
  if (error) return <p className="mt-20 text-center text-red-600 font-semibold">❌ Error: {error}</p>;
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-4 flex justify-center">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
        <div className="flex justify-center items-center border rounded-lg overflow-hidden bg-gray-50">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-96 object-contain p-4"
          />
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <p className="text-xl font-semibold text-green-600 mb-1">₹ {product.price}</p>
            <p className="text-sm text-yellow-500 mb-3">⭐ Rating: {product.rating}</p>
            <ul className="space-y-1 text-sm text-gray-600">
             
              <li><span className="font-semibold text-gray-800">Min Order Qty:</span> {product.minimumOrderQuantity || "1"}</li>
            </ul>
            <div className="mt-4">
              <h2 className="font-semibold text-gray-800 mb-1">Description:</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
