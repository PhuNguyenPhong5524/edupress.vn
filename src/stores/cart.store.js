import { create } from "zustand";
import axios from "axios";

const API =
  "https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=6957348a9dda81df11d0c527";

const cartUrl = (id) =>
  `https://mindx-mockup-server.vercel.app/api/resources/cart/${id}?apiKey=6957348a9dda81df11d0c527`;

export const useCartStore = create((set, get) => ({
  cart: null,
  cartUI: [],
  loading: false,
  hasFetchedCart: false,

  // ======================
  // FETCH CART  
  // ======================
  fetchCart: async (userId) => {
    if (!userId) return;

    set({ loading: true });

    try {
      const res = await axios.get(`${API}&_t=${Date.now()}`);
      const carts = res.data?.data?.data || [];

      const activeCart = carts.find(
        c => c.user_id == userId && c.status === "active"
      ) || null;

      set({
        cart: activeCart,
        cartUI: activeCart?.courses || [],
        hasFetchedCart: true,
        loading: false,
      });
    } catch (e) {
      set({
        cart: null,
        cartUI: [],
        loading: false,
      });
    }
  },



  // ======================
  // ADD TO CART
  // ======================
  addToCart: async (courseItem, userId) => {
    if (!userId || !courseItem?.course_id) return false;

    const { cart, cartUI } = get();

    // guard
    if (cartUI.some(c => c.course_id === courseItem.course_id)) {
      return false;
    }

    const newCourses = [...cartUI, courseItem];

    // 🔥 optimistic update: SYNC CẢ cart + cartUI
    set({
      cartUI: newCourses,
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

        // update lại cart cho khớp DB
        set({
          cart: res.data.data,
        });
      } else {
        await axios.put(cartUrl(cart._id), payload);
      }

      return true;
    } catch (err) {
      console.error("addToCart error", err);

      // rollback UI nếu muốn (optional)
      set({
        cartUI,
        cart,
      });

      return false;
    }
  },


  // ======================
  // REMOVE COURSE
  // ======================
  removeFromCart: async (courseId) => {
    const { cart, fetchCart } = get();
    if (!cart?._id) return;

    const newCourses = cart.courses.filter(
      c => c.course_id !== courseId
    );

    // optimistic update
    set({
      cart: newCourses.length === 0
        ? null
        : { ...cart, courses: newCourses },
      cartUI: newCourses,
    });

    try {
      await axios.put(cartUrl(cart._id), {
        name: `cart-user-${cart.user_id}`,               
        user_id: cart.user_id,
        status: "active",
        courses: newCourses,
      });
    } catch (e) {
      console.error("REMOVE FROM CART ERROR", e);
      fetchCart(cart.user_id);
    }
  },



  // ======================
  // Update cart after payment
  // ======================
  updateCartAfterPayment: async (cartId) => {
    if (!cartId) return false;

    try {
      await axios.put(cartUrl(cartId), {
        status: "inactive",
        courses: [],
      });

      set({
        cart: null,
        cartUI: [],
        hasFetchedCart: true,
      });

      return true;
    } catch (err) {
      console.error("updateCartAfterPayment error:", err);
      return false;
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
