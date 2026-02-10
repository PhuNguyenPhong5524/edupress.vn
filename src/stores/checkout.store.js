import { create } from "zustand";
import axios from "axios";

const API_KEY = "6957348a9dda81df11d0c527";

const CHECKOUT_API =
  `https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=${API_KEY}`;

const CHECKOUT_ITEM_API = (id) =>
  `https://mindx-mockup-server.vercel.app/api/resources/checkout/${id}?apiKey=${API_KEY}`;

export const useCheckoutStore = create((set, get) => ({
  checkoutList: [],
  currentCheckout: null,
  loading: false,
  error: null,

  // ======================
  // FETCH CHECKOUT
  // ======================
  fetchCheckoutByToken: async (token) => {
  if (!token) return null;

  set({ loading: true, error: null });

  try {
    const res = await axios.get(`${CHECKOUT_API}&_t=${Date.now()}`);
    const list = res.data?.data?.data || [];

    const checkout = list.find(c => c.token === token);

    if (!checkout) {
      set({
        currentCheckout: null,
        loading: false,
        error: "CHECKOUT_NOT_FOUND",
      });
      return null;
    }

    set({
      currentCheckout: checkout,
      loading: false,
    });

    return checkout;
  } catch (e) {
    set({
      loading: false,
      error: "FETCH_CHECKOUT_FAILED",
    });
    return null;
  }
},

  // ======================
  // UPDATE CHECKOUT
  // ======================
  markCheckoutPaid: async (checkoutId) => {
    if (!checkoutId) return false;

    try {
      await axios.put(
        CHECKOUT_ITEM_API(checkoutId),
        {
          status: "paid",
          updatedAt: new Date().toISOString(),
        }
      );

      const { currentCheckout } = get();

      if (currentCheckout?._id === checkoutId) {
        set({
          currentCheckout: {
            ...currentCheckout,
            status: "paid",
          },
        });
      }

      return true;
    } catch (e) {
      return false;
    }
  },
}));
