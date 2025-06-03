import { useState } from "react";
import useFetchProducts from "../hooks/useFetchProduct"; // Custom hook to fetch product data
import ProductItem from "./ProductItem"; // Component to display a single product item

function ProductList() {
  // Use custom hook to fetch products and manage loading/error states
  const { products, loading, error } = useFetchProducts();

  // State to manage search input
  const [searchTerm, setSearchTerm] = useState("");

  // Show loading message while fetching products
  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  // Show error message if fetch fails
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  // Filter products based on search term (case-insensitive)
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 px-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4">Looking for something you need? Here it is:</h1>

      {/* Search input field */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        className="mb-8 p-2 border rounded w-full max-w-md"
      />

      {/* Product grid */}
      <div className="flex flex-wrap gap-12">
        {/* Render filtered products */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          // Show message if no products match the search
          <p className="text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
