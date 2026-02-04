import { create } from "zustand";
import axios from "axios";

const API =
  "https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=6957348a9dda81df11d0c527";

const cartUrl = (id) =>
  `https://mindx-mockup-server.vercel.app/api/resources/cart/${id}?apiKey=6957348a9dda81df11d0c527`;

export const useCartStore = create((set, get) => ({
  cart: null,
  loading: false,
  hasFetchedCart: false,

  // ======================
  // FETCH CART
  // ======================
  fetchCart: async (userId) => {
    if (!userId || get().hasFetchedCart) return;

    set({ loading: true });
    try {
      const res = await axios.get(API);
      const carts = res.data.data.data || [];

      const cart = carts.find(
        c => c.user_id == userId && c.status === "active"
      );

      set({
        cart: cart || null,
        hasFetchedCart: true,
        loading: false
      });
    } catch (e) {
      set({ cart: null, loading: false });
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

        set({ cart: res.data });
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

  // ======================
  // CHECKOUT
  // ======================
  checkoutCart: async (userId) => {
    const { cart } = get();
    if (!cart?._id) return false;

    // set optimistic
      set({
        cart: {
          ...cart,
          status: "checked_out",
          courses: [],
        },
      });

      try {
        // update
        await axios.put(cartUrl(cart._id), {
          ...cart,
          status: "checked_out",
        });

        return true;
      } catch (err) {
        console.error("CHECKOUT CART ERROR", err);

        // rollback nếu lỗi
        fetchCart(userId);
        return false;
      }
  },



  clearCart: () => set({ cart: null }),
}));
