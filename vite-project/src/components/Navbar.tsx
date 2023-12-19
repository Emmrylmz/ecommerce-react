import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useShoppingCart } from "../context/shoppingCartContext";
import axios from "axios";

type Props = {};

function Navbar() {
  const {currentUser, logout} = useContext(AuthContext);
  const { openCart, cartQuantity } = useShoppingCart();
  
  
  return (
    <>
      <nav className="top-0 w-full h-6 bg-gray-700 flex  items-center gap-10 py-7 rounded-b-md text-white justify-around">
        <div className="gap-10 flex px-5  ">
          <Link to={"/"}>Logo</Link>
          <Link to={"/about"}>About</Link>
        </div>
        <div className="flex  gap-10">
          {currentUser === null ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <div className="flex gap-10 px-10  ">
                <Link to={"/profile"} className="">profile</Link>
                <div>
                <button
                  onClick={openCart}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    position: "relative",
                  }}
                  className="rounded-circle"
                >
                  Cart 
                </button>
                {cartQuantity}
                </div>
                <button onClick={logout}>logout</button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
