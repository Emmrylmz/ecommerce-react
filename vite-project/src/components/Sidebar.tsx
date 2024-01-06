import { useProductData } from "../context/FetchData";
import { useSidebarContext } from "../context/sidebarContext";
import FilterComponent from "./FilterComponent";
type SideBarProps = {
  isOpen: boolean;
};
export const profileSortingCategory: string[] = [
  "Sort by purchase date - first to last",
  "Sort by purchase date - last to first ",
  "Sort by price - decreasing",
  "Sort by price - increasing",
];

function Sidebar({ isOpen }: SideBarProps) {
  
  
  const { data } = useProductData();
  const { getCurrentPage, toggleSideBar } = useSidebarContext();

  const currentPage = getCurrentPage();

  if (currentPage === "home") {
    if (data && data.length > 0) {
      const category = data.map((item) => item.category);
      const uniqueCategory = Array.from(new Set(category));
      return (
        <>
          <div
            className="fixed top-24 left-0  px-4 py-2 rounded-r-lg w-10 h-10 bg-slate-600 z-40"
            onClick={() => toggleSideBar(isOpen)}
          />
          {isOpen && <FilterComponent data={uniqueCategory} />}
        </>
      );
    }
  }
  if (currentPage === "profile") {
    return (
        <>
         <div
            className="fixed top-24 left-0  px-4 py-2 rounded-r-lg w-10 h-10 bg-slate-600 z-40"
            onClick={() => toggleSideBar(isOpen)}
          />
          {isOpen && <FilterComponent data={profileSortingCategory} />}
        </>
    )
}

  // ... rest of the component
}

export default Sidebar;


