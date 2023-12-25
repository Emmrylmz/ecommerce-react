import { useContext, useState } from "react";
import CartItem from "./CartItem";
import { useShoppingCart } from "../context/shoppingCartContext";
import { productType } from "../shared/types";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useProductData } from "../context/FetchData";
import { useNavigate } from "react-router-dom";

type cartProps = {
  isOpen: boolean;
};

const Cart = ({ isOpen }: cartProps) => {
  const { currentUser } = useContext(AuthContext);
  const { closeCart, cartItems } = useShoppingCart();
  const { data } = useProductData();
  const productTypeData = data as productType[];
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navivgate = useNavigate();

  async function handleCheckout() {
    if (!currentUser) {
      console.error("User not logged in.");
      return; // Do something to warn the user
    }

    if (!cartItems || cartItems.length === 0) {
      console.error("No items in cart.");
      return; // Do something to warn the user
    }
    try {
      const response = await axios.post("http://localhost:3000/checkout", {
        cartItems,
        userId: currentUser.user.userid,
      });

      if (response.status === 200) {
        console.log(JSON.stringify(response));
        localStorage.removeItem("shopping-cart");
        setShowSuccessMessage(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // Handle unsuccessful checkout: display error message, etc.
        console.error(response.data.message || "Checkout failed.");
      }
    } catch (error) {
      console.error(error);
      // Display user-friendly error message or navigate to error page
    }
  }

  if (data && data.length > 0) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed top-0 left-0 h-screen w-full bg-gray-900 opacity-75 z-50 transition-opacity duration-300 ease-in-out"
            onClick={closeCart}
          >
            {showSuccessMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg pt-4">
                Checkout successful! Thank you for your order.
              </div>
            )}
            <div
              className="mx-auto my-10 bg-white rounded-lg shadow-lg p-4 relative max-w-screen-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <h2 className="text-xl font-bold mb-4">Cart</h2>

                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} {...item} />
                  ))}
                </ul>

                <div className="flex justify-end mt-4">
                  <p className="text-xl font-bold mr-auto">
                    Total: $
                    {cartItems.reduce((total, cartItem) => {
                      const item = productTypeData.find(
                        (i) => i.id === cartItem.id
                      );
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0)}
                  </p>
                  <button
                    type="submit"
                    className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  } else return null;
};

export default Cart;
