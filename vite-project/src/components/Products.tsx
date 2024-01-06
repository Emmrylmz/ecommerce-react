
import { useProductData } from '../context/FetchData'
import { useSidebarContext } from '../context/sidebarContext';
import SingleItem from './SingleItem'



export function Products() {
 const { data, isLoading } = useProductData()
 const {getFilter} = useSidebarContext()
 let mapItems: JSX.Element[] = [];
  const filter = getFilter()

  if (data && data.length > 0) {
    let filteredData = data; // Use a descriptive variable name
  
    if (filter !== "") {
      filteredData = data.filter((item) => item.category === filter); // Filter by item.category
    }
  
    mapItems = filteredData.map((item) => (
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
  
    <div className="grid grid-cols-4 grid-rows-3  h-auto w-10/12 pl-44     ">
      {mapItems}
    </div>
  
  </>
  )
}



export default Products

