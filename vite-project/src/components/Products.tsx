
import { useProductData } from '../context/FetchData'
import SingleItem from './SingleItem'
import { productType } from '../shared/types';



export function Products() {
 const { data, isLoading,error } = useProductData()
 let mapItems: JSX.Element[] = [];

  
 

 if (data && data.length>0) {
   mapItems = data.map((item) => (
     <div key={item.id}>
       <SingleItem
         id={item.id}
         title={item.title}
         price={item.price}
         image={item.image}
       />
     </div>
   ));
 } else {
   if(isLoading)
   return <div>{isLoading}</div>; // or some other state
 }

  return (
  <>
    <div className="grid grid-cols-4 grid-rows-3  h-auto  place-content-center  ">
      {mapItems}
    </div>
  </>
  )
}



export default Products

