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
      .then((data) => {
        alert("✅ Item added to cart!");
      })
      .catch((err) => {
        console.error("Add to cart error:", err);
        alert("❌ Failed to add item to cart.");
      });
  };

  if (loading) return <p className="mt-20 text-center">Loading product details...</p>;
  if (error) return <p className="mt-20 text-center text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-20 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 items-start bg-white border rounded-xl shadow-lg p-6 w-full max-w-4xl">
        <div className="w-full md:w-1/2 h-[400px] border shadow-md flex items-center justify-center">
          <img src={product.thumbnail} alt={product.title} className="h-full w-auto object-contain" />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-lg font-semibold text-green-700">Price: ${product.price}</p>
          <p className="text-sm text-yellow-600">Rating: {product.rating}</p>
          <p><span className="font-semibold">Warranty:</span> {product.warrantyInformation || "N/A"}</p>
          <p><span className="font-semibold">Dimensions (depth):</span> {product.dimensions?.depth || "N/A"}</p>
          <p><span className="font-semibold">Shipping:</span> {product.shippingInformation || "N/A"}</p>
          <p><span className="font-semibold">Return Policy:</span> {product.returnPolicy || "N/A"}</p>
          <p><span className="font-semibold">Minimum Order Quantity:</span> {product.minimumOrderQuantity || "1"}</p>
          <p><span className="font-semibold">Description:</span> {product.description}</p>

          <button
            onClick={handleAdd}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
