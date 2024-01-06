  import { useEffect } from "react";
  import Products from "../components/Products";
  import { useSidebarContext } from "../context/sidebarContext";
  function Home() {
    const { setPage, setFilter,getFilter } = useSidebarContext()

    useEffect(() => {
      setFilter("")
      setPage("home")
    },[])
    
    return (
      
      <div className="flex  h-full  pt-20  ">
        <div className="flex-1 w-auto p-4 ">
          <Products />
        </div>
      </div>
      
    );
  }

  export default Home;
