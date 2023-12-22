import { useState, useEffect } from 'react';



type FetchDataResult<T> = {
  data: T | null;
  isLoading: boolean;
}

export default function useFetchData<T>(url: string): FetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const fetchedData = await response.json() as T;
      setData(fetchedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading,  }; 
}