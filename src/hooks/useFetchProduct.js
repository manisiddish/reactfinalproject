import { useState, useEffect } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);       // Store products
  const [loading, setLoading] = useState(true);       // Loading state
  const [error, setError] = useState(null);           // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products); // data.products is an array
      } catch (err) {
        setError(err.message || "Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;
