import { create } from "zustand";
import axios from "axios";
import { Navigate } from "react-router-dom";

const API =
  "https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=6957348a9dda81df11d0c527";

const cartUrl = (id) =>
  `https://mindx-mockup-server.vercel.app/api/resources/cart/${id}?apiKey=6957348a9dda81df11d0c527`;

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
  addToCart: async (courseItem, userId) => {
    if (!userId || !courseItem?.course_id) return false;

    const { cart, fetchCart } = get();

    // đã có course
    if (cart?.courses?.some(c => c.course_id === courseItem.course_id)) {
      return false;
    }

    const newCourses = cart?.courses
      ? [...cart.courses, courseItem]
      : [courseItem];

    // optimistic update
    set({
      cart: cart
        ? { ...cart, courses: newCourses }
        : {
            user_id: userId,
            status: "active",
            courses: newCourses,
          },
    });

    const payload = {
      user_id: userId,
      status: "active",
      courses: newCourses,
    };

    try {
      if (!cart?._id) {
        const res = await axios.post(API, {
          name: `cart-user-${userId}`,
          ...payload,
        });
        set({ cart: res.data.data });
      } else {
        await axios.put(cartUrl(cart._id), payload);
      }

      return true;
    } catch (err) {
      console.error("addToCart error", err);
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

  clearCartUI: () => {
    set({
      cart: null,
      cartUI: null,
      hasFetchedCart: true,
    });
  },

  clearCart: () => set({ cart: null }),
}));
