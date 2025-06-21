import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Header(){
  

    return(<>
        <nav className="fixed top-0 z-50 flex justify-between items-center bg-blue-600 text-white font-bold text-xl p-5 w-full">
    <p>Logo</p>
    <ul className="flex gap-10">
         <Link to={"/signup"} className="text-white">Signup</Link>
         <Link to={"/login"} className="text-white" >Login</Link>
         <Link to={"/Menu"} className="text-white">Menu</Link>
         <Link to={"/Cart"} className="text-white">Cart </Link>
    </ul>
</nav>
       
    </>)
}
export default Header;