import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // For debugging or future logic

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-60 bg-white border rounded-xl shadow-md hover:shadow-lg p-4 transition-shadow duration-200">
      {/* Product image and title link */}
      <Link to={`/ProductDetail/${product.id}`} className="block hover:underline">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-36 object-cover rounded-lg"
        />
        <h3 className="mt-3 text-md font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-gray-600">${product.price}</p>
      </Link>

      {/* Add to Cart button */}
      <button
        onClick={handleAdd}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;
