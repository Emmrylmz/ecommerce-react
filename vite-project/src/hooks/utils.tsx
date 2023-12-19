import { useState, useEffect } from "react";
import axios from "axios";

type TApiResponse<T> = Promise<{ data: T }>;

export function useFetchData<T>(url: string): { data: T | null; isLoading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get<T>(url)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading };
}
  
  