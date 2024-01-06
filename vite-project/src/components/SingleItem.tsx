import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/shoppingCartContext";
import axios from "axios";
type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const SingleItem = ({ id, title, price, image }: StoreItemProps) => {
 
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <div
      className="flex justify-center pt-10 px-4 min-w-0"
    >
      {" "}
      {/* Apply min-w-0 to container */}
      <div
        className="flex-1 rounded-lg hover:ring-2 hover:ring-offset-4 hover:ring-pink-500 hover:h-auto border-gray-200 ..."
        key={id}
      >
        <Link to={`/product/${id}`}>
        <img className="w-full h-48 object-contain" src={image} />
        </Link>
        <div className="flex flex-col justify-between h-48 text-center">
          <p className="text-lg font-medium overflow-hidden hover:overflow-visible">
            {title}
          </p>
          <p className="text-xl font-bold text-green-500">${price}</p>
          
          <button
            className="px-4 py-2 rounded-md font-medium bg-pinkish hover:bg-pink-500 text-white z-30"
            onClick={() => increaseCartQuantity(id)}
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
