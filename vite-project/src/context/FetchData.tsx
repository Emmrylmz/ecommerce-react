import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import useFetchData from '../hooks/utils';
import { productType } from '../shared/types';
import axios from 'axios';




type DataContextValue = {
  data: any[] | null; // Assuming fetched data is an array
  isLoading: boolean;
  error: Error | null;
}

const DataContext = createContext({} as DataContextValue)


export function useProductData() {
  return useContext(DataContext);
}

export const DataContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<productType[] | null>(null); // Initial state for data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  

  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await axios.get<productType[]>("https://fakestoreapi.com/products")

        setData(fetchedData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Run once on mount


    
    
    const contextValue: DataContextValue = { data, isLoading, error };


  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

