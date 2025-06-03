import useFetchProducts from "../hooks/useFetchProduct.js";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice.js";
import { useDispatch } from "react-redux";
function ProductDetail() {
  const { products, loading, error } = useFetchProducts();
  const { id } = useParams();
  const dispatch=useDispatch();
  const product = products.find((product) => product.id.toString() === id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;
    const handleAdd = () => {
      dispatch(addToCart(product));
    };
  

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-20 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 items-start bg-white border rounded-xl shadow-lg p-6 w-[90%] max-w-5xl">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-[400px] border shadow-md flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Product Details */}
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

          <button onClick={handleAdd} className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
