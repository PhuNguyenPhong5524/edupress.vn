import { create } from "zustand";
import axios from "axios";
import { Navigate } from "react-router-dom";

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

  // ======================
  // Update cart after payment
  // ======================
  updateCartAfterPayment: async (userId) => {
  if (!userId) return;

  try {
    const { cart } = get();

    // update DB nếu còn cart active
    if (cart?._id) {
      await axios.put(
        cartUrl(cart._id),
        {
          ...cart,
          courses: [],
          status: "inactive",
          updatedAt: new Date().toISOString(),
        }
      );
    }

    // clear UI cart
    set({
      cart: null,
      cartUI: [],
      hasFetchedCart: true,
    });

  } catch (err) {
    console.error("❌ updateCartAfterPayment error:", err);
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
