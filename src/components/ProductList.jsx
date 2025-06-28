import { useState, useEffect } from "react";
import ProductItem from "./ProductItem"; // Component to display a single product item

function ProductList() {
  // 🟢 Local state for products, loading, error, and search term
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🟢 Fetch products from backend on component mount
  useEffect(() => {
 fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 🟢 Filter products based on search input
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  // 🟢 Render
  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <div className="pt-20 px-6">
      <h1 className="text-2xl font-bold mb-4">Looking for something you need? Here it is:</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-8 p-2 border rounded w-full max-w-md"
      />

      {/* 🛒 Product Grid */}
      <div className="flex flex-wrap gap-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
