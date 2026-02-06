import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const CHECKOUT_API =
  "https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=6957348a9dda81df11d0c527";

const useFetchCheckout = () => {
  const [checkoutList, setCheckoutList] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(true);

  const fetchCheckout = useCallback(async () => {
    try {
        setLoadingCheckout(true);
        const res = await axios.get(
        `${CHECKOUT_API}&_t=${Date.now()}`
        );
        setCheckoutList(res.data?.data?.data || []);
    } catch (e) {
        setCheckoutList([]);
    } finally {
        setLoadingCheckout(false);
    }
    }, []);


  useEffect(() => {
    fetchCheckout();
  }, [fetchCheckout]);

  return {
    checkoutList,
    loadingCheckout,
    refetchCheckout: fetchCheckout, 
  };
};

export default useFetchCheckout;
