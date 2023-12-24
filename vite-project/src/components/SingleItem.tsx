import { useShoppingCart } from "../context/shoppingCartContext";
type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const SingleItem = ({ id, title, price, image }: StoreItemProps) => {
  const { increaseCartQuantity } = useShoppingCart();
  return (
    <div className="flex justify-center pt-10 px-4">
      <div className="w-64 h-96 rounded-lg border border-gray-200 ..." key={id}>
        <img className="w-full h-48 object-contain" src={image} />
        <div className="flex flex-col justify-between h-48">
          <p className="text-lg font-medium">{title}</p>
          <p className="text-xl font-bold text-green-500">${price}</p>
          <button
            className="px-4 py-2 rounded-md font-medium bg-green-300 hover:bg-green-500 text-white"
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
