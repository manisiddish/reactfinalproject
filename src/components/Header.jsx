import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Header(){
    const items=useSelector((state)=>state.cart.items)
  

    return(<>
        <nav className="fixed top-0 z-50 flex justify-between items-center bg-blue-600 text-white font-bold text-xl p-5 w-full">
    <p>Logo</p>
    <ul className="flex gap-10">
         <Link to={"/Menu"} className="text-white">Menu</Link>
         <Link to={"/Cart"} className="text-white">Cart {items.length}</Link>
    </ul>
</nav>
       
    </>)
}
export default Header;