import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import CartItem from "./CartItem";
function Cart(){
    const items=useSelector((state)=>state.cart.items);
    return(<div className="flex items-center flex-wrap gap-10 ml-10  mb-20"> 
              {
                 items.map((item)=>< CartItem product={item}/>)
              }
    </div>)
}
export default Cart;