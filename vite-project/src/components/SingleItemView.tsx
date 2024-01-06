import { useParams } from "react-router-dom";
import { useProductData } from "../context/FetchData";
import { useShoppingCart } from "../context/shoppingCartContext";

const SingleItemView = () => {
  const { data } = useProductData();
  const { id } = useParams()
  console.log(typeof id)

  if (data && data.length > 0) {
    const { increaseCartQuantity } = useShoppingCart()
    const itemToSee = data.find((item) =>JSON.stringify(item.id) === id);
    
    return (
      <div className="container mx-auto pt-28 w-1/2">
        <img className="w-3/4 h-64 object-contain rounded-lg gap-4" src={itemToSee?.image} alt={itemToSee?.title} />
        <h1 className="text-2xl font-bold mb-4">{itemToSee?.title}</h1>
        <p className="text-gray-700 mb-2">Category : {itemToSee?.category}</p>
        <p className="text-xl font-semibold mb-4">Price : {itemToSee?.price}</p>
        <p className="text-gray-700 mb-4">description : {itemToSee?.description}</p>
        <div className="flex items-center mb-4">
          <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="ml-2">{itemToSee?.rating.count} reviews</p>
        </div>
        <p className="text-lg font-semibold">{itemToSee?.rating.rate}</p>
        <button
            className="px-4 py-2 rounded-md font-medium bg-pinkish hover:bg-pink-500 text-white z-30"
            onClick={() => increaseCartQuantity(itemToSee?.id)}
          >Add to cart</button>
      </div>
    );
    
  } else {
    return <>no item</>;
  }
};

export default SingleItemView;
