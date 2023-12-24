import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useShoppingCart } from "../context/shoppingCartContext";
import axios from "axios";

type Props = {};

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-700 text-white h-16 flex items-center justify-between px-4 py-2 border-b border-gray-800">
      <div className="flex items-center">
        <Link to="/" className="font-bold text-2xl">
          Logo
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/about">About</Link>
        {currentUser === null ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <div className="flex items-center">
              <button
                onClick={openCart}
                className="rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
              >
                Cart
                {cartQuantity && (
                  <span className="ml-2 text-xs font-bold text-white">
                    {cartQuantity}
                  </span>
                )}
              </button>
              <button
                onClick={logout}
                className="rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
      <div className="md:hidden">
        <button className="block rounded-md p-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
