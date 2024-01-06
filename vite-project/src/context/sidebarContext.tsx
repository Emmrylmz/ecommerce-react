import { createContext, useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';

type SidebarContextProviderProps = {
    children: React.ReactNode
}

type SidebarContextValue = {
    isOpen: boolean
    toggleSideBar:(bool: boolean) => void
    setPage: (page:string) => void
    getCurrentPage: () => string
    setFilter:(newFilter:string) => void
    getFilter:() => string
}

const SidebarContext = createContext({} as SidebarContextValue)

export function useSidebarContext() {
    return useContext(SidebarContext)
  }

export function SidebarContextProvider({ children }: SidebarContextProviderProps ) {
    const [isOpen, setIsOpen] = useState(false)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState("home")

    const toggleSideBar = () => setIsOpen(!isOpen)
    const setPage = (page:string) => setCurrentPage(page)
    const getCurrentPage = () =>  {return currentPage}
    const getFilter = () => {return filter}
    

    return (
        <SidebarContext.Provider value={{setPage ,isOpen,  toggleSideBar, getCurrentPage, setFilter, getFilter }}>
          {children}
          <Sidebar isOpen={isOpen}></Sidebar>
        </SidebarContext.Provider>
      );
    };

