import { create } from "zustand";
import axios from "axios";
import { Navigate } from "react-router-dom";

const API =
  "https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=6957348a9dda81df11d0c527";

const cartUrl = (id) =>
  `https://mindx-mockup-server.vercel.app/api/resources/cart/${id}?apiKey=6957348a9dda81df11d0c527`;
const API_CHECKOUT = "https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=6957348a9dda81df11d0c527";

export const useCartStore = create((set, get) => ({
  cart: null,
  loading: false,
  hasFetchedCart: false,
  cartUI: null,

  // ======================
  // FETCH CART
  // ======================
  fetchCart: async (userId) => {
    if (!userId) return;

    set({ loading: true });

    try {
      const res = await axios.get(API);
      const carts = res.data.data.data || [];

      const cart = carts.find(
        c => c.user_id == userId && c.status === "active"
      ) || null;

      set({
        cart,
        cartUI: cart,    
        hasFetchedCart: true,
        loading: false,
      });
    } catch (e) {
      set({
        cart: null,
        cartUI: null,
        loading: false,
      });
    }
  },

  // ======================
  // ADD TO CART
  // ======================
  addToCart: async (courseId, userId) => {
    if (!userId) return false;

    const { cart } = get();

    // check couses đã có trên cart chưa
    if (cart?.courses?.some(c => c.course_id === courseId)) {
      return false;
    }

    // optimistic update
    const optimisticCart = cart
    // CÓ cart → add course
      ? {
          ...cart,
          courses: [...cart.courses, { course_id: courseId }],
        }
      // Chưa có cart → tạo cart mới
      : {
          user_id: userId,
          status: "active",
          courses: [{ course_id: courseId }],
        };

    set({ cart: optimisticCart });

    try {
      // Chưa có cart → POST
      if (!cart?._id) {
        const res = await axios.post(API, {
          name: `cart-user-${userId}`,
          ...optimisticCart,
        });

        set({ cart: res.data.data });
        return true;
      }

      // CÓ cart → PUT
      await axios.put(cartUrl(cart._id), optimisticCart);
      return true;

    } catch (err) {
      console.error("Thêm vào cart error", err);

      // rollback nếu lỗi
      fetchCart(userId);
      return false;
    }
  },


  // ======================
  // REMOVE COURSE
  // ======================
  removeFromCart: async (courseId) => {
    const { cart, fetchCart } = get();
    if (!cart) return;

    const optimisticCart = {
      ...cart,
      courses: cart.courses.filter(c => c.course_id !== courseId),
    };

    // optimistic update
    set({
      cart: optimisticCart.courses.length === 0
        ? null
        : optimisticCart
    });

    try {
      // sync server
      await axios.put(cartUrl(cart._id), optimisticCart);
    } catch (e) {
      console.error("REMOVE FROM CART ERROR", e);
      // rollback nếu lỗi
      fetchCart(cart.user_id);
    }
  },


  clearCart: () => set({ cart: null }),
}));
