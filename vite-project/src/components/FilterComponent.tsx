import { useState } from "react";
import { useSidebarContext } from "../context/sidebarContext";

type FilterComponentProps = {
    data:string[]
    
}
function FilterComponent({ data }: FilterComponentProps) {
    const { setFilter } = useSidebarContext()
    const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div>
         <div className="sidebar fixed top-36 left-0 bg-gray-200 px-4 py-2 rounded-lg shadow-md z-40">
              <div className="mt-2">
                {data.map((category) => (
                  <div key={category} onClick={(e) => e.stopPropagation()}>
                    <input
                       // Combine indices for unique keys
                      type="checkbox"
                      value={category}
                      name={category}
                      onChange={() => {
                        setSelectedCategory(category);
                        setFilter((prevFilter) => (prevFilter === category ? "" : category));
                    
                      }}
                      checked={selectedCategory === category}
                    />
                    <label htmlFor="category">{category}</label>
                  </div>
                ))}
              </div>
            </div>
    </div>
  )
}



export default FilterComponent

