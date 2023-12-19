
import { productType } from '../shared/types'
import { useShoppingCart } from '../context/shoppingCartContext'
import SingleItem from './SingleItem'
import { useFetchData } from '../hooks/utils'

export function Products() {
 const {increaseCartQuantity} = useShoppingCart()
 const { data, isLoading } = useFetchData<productType[]>("https://fakestoreapi.com/products");

 if (isLoading) {
  // Show a loading indicator or placeholder while data is fetching
  return <p>Loading...</p>;
}
const productTypeData = data as productType[]; // Type assertion 
const mapItems = productTypeData.map((item) => (
  <div key={item.id}>
    <SingleItem
      id={item.id}
      title={item.title}
      price={item.price}
      image={item.image}
    />
  </div>
));
  return (
  <>
    <div className="grid grid-cols-4 grid-rows-3  h-auto  place-content-center  ">
      {mapItems}
    </div>
  </>
  )
}



export default Products

