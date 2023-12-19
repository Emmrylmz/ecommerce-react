import  { useShoppingCart }  from '../context/shoppingCartContext'
type StoreItemProps = {
    id: number,
    title: string,
    price: number,
    image: string
  }

export const SingleItem = ({ id, title, price, image }: StoreItemProps) => {
    const {increaseCartQuantity} = useShoppingCart()
  return (
    <div className='flex justify-center  pt-10'>
      <div className='gap-4 rounded-md border-solid border-2 h-auto w-32 grid grid-cols-1 grid-rows-3 justify-self-center py-0 justify-items-center border-black overflow-hidden' key={id}>
              <img className='row-span-5 object-contain h-32 w-20' src={image}/>
              <p className='text-sm '>{title}</p>
              <p className='h-sm'>${price}</p>
              <button className='border-2 rounded-md bg-green-300 hover:bg-green-500' onClick={() => increaseCartQuantity(id)} >Add +</button>
              <div className='flex flex-col'>
            </div>
      </div>      
    </div>
  )
}



export default SingleItem

