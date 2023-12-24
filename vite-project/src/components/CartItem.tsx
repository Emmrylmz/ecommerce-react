import { productType } from "../shared/types";
import { useShoppingCart } from "../context/shoppingCartContext";
import { useProductData } from "../context/FetchData";

type CartItemProps = {
  id: number;
  quantity: number;
};
export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const { data, isLoading } = useProductData();
  let item: productType;
  if (isLoading) {
    // Show a loading indicator or placeholder while data is fetching
    return <p>Loading...</p>;
  }

  if (data && data.length > 0) item = data?.find((i) => i.id === id);
  else return null;

  // Handle the case where the item is not found
  return (
    <div className="flex items-center gap-2">
      <img
        src={item.image}
        alt={item.title}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="flex-grow mr-auto">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-gray-500 font-sm">
          {quantity > 1 && `x${quantity}`}
        </p>
        <p className="text-gray-500 font-sm">{item.price}</p>
      </div>
      <button
        className="ml-auto bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-700"
        onClick={() => decreaseCartQuantity(id)}
      >
        {" "}
        -{" "}
      </button>
      <button
        className="ml-auto bg-green-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-green-700"
        onClick={() => increaseCartQuantity(id)}
      >
        {" "}
        +{" "}
      </button>
      <div className="flex items-center">
        <p className="font-semibold">${item.price * quantity}</p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-auto bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
