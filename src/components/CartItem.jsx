import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

function CartItem({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAdd = () => {
    dispatch(addToCart(product));
  };
  const handleremove=()=>{
     dispatch(removeFromCart(product.id));
  }

  console.log(cartItems); // Just for debugging

  return (
    <div key={product.id} className="border p-4 rounded shadow-md ">
      {/* Only wrap image/title in Link */}
      <Link to={`/ProductDetail/${product.id}`} className="block hover:underline">
        <img src={product.thumbnail} alt={product.title} width={150} className="mx-auto" />
        <p className="mt-2 font-semibold">{product.title}</p>
        <p className="text-gray-600">${product.price}</p>
      </Link>

      {/* Button is outside the Link so it doesn't trigger navigation */}
      <div className="flex"> <button
        onClick={handleAdd}
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded" >+</button>
        <p className="mt-4 ml-2">{product.quantity}</p>
        <button  onClick={handleremove} className=" ml-2 mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"> -</button></div>

    </div>
  );
}
export default CartItem;

