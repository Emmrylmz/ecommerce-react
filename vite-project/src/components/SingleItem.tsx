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
    <div className="flex justify-center pt-10 px-4  ">
      <div className="w-64 h-96 rounded-lg hover:ring-2 hover:ring-offset-4 hover:ring-pink-500 hover:h-auto border-gray-200 ..." key={id}>
        <img className="w-full h-48 object-contain" src={image} />
        <div className="flex flex-col justify-between h-48 text-center">
          <p className="text-lg font-medium overflow-hidden hover:overflow-visible" >{title}</p>
          <p className="text-xl font-bold text-green-500">${price}</p>
          <button
            className="px-4 py-2 rounded-md font-medium bg-green-300 hover:bg-green-500 text-white z-30"
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
