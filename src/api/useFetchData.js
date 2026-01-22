'use client'

import axios from "axios";
import { useEffect, useState } from "react";



const useFetchData = (nameResource) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://mindx-mockup-server.vercel.app/api/resources/${nameResource}?apiKey=6957348a9dda81df11d0c527`);
          setData(response?.data.data.data);
          setLoading(false);
        } catch (error) {
          setError(error);
        }
      };
  
      fetchData();
    }, [nameResource]);
  
    return { data, error , loading };
}

export default useFetchData;