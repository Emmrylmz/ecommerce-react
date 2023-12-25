
import { useProductData } from '../context/FetchData'
import SingleItem from './SingleItem'
import { productType } from '../shared/types';



export function Products() {
 const { data, isLoading,error } = useProductData()
 let mapItems: JSX.Element[] = [];

  
 

 if (data && data.length>0) {
   mapItems = data.map((item) => (
       <SingleItem
        key={item.id}
         id={item.id}
         title={item.title}
         price={item.price}
         image={item.image}
       />
   ));
 } else {
   if(isLoading)
   return <div>{isLoading}</div>; // or some other state
 }

  return (
  <>
  <div className='flex w-full h-full justify-center pt-14'>
    <div className="grid grid-cols-4 grid-rows-3  h-auto w-4/6     ">
      {mapItems}
    </div>
  </div>
  </>
  )
}



export default Products

